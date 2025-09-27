import tkinter as tk
from tkinter import filedialog, scrolledtext, ttk, messagebox
import re
import os
# SVG to G-code imports
try:
    from svgpathtools import svg2paths
except ImportError:
    svg2paths = None
import sys
import numpy as np


DEFAULT_GCODE_FILE = "kolam.gcode"
SAFE_HEIGHT = 5      # Z height for travel (mm)
CUT_DEPTH = -2       # Cutting depth (mm)
FEED_RATE = 500      # Cutting speed
PLUNGE_RATE = 200    # Z axis speed

def discretize_path(path, steps=100):
    points = []
    for seg in path:
        for t in [i/steps for i in range(steps+1)]:
            point = seg.point(t)
            points.append((point.real, point.imag))
    return points

def generate_gcode(points, depth=CUT_DEPTH, feed=FEED_RATE):
    gcode = []
    if not points:
        return gcode
    gcode.append(f"G0 Z{SAFE_HEIGHT}")  # lift tool
    start = points[0]
    gcode.append(f"G0 X{start[0]:.2f} Y{start[1]:.2f}")  # move to start
    gcode.append(f"G1 Z{depth:.2f} F{PLUNGE_RATE}")      # plunge
    for x, y in points[1:]:
        gcode.append(f"G1 X{x:.2f} Y{y:.2f} F{feed}")    # cut move
    gcode.append(f"G0 Z{SAFE_HEIGHT}")  # retract tool
    return gcode

def svg_to_gcode(input_svg, output_gcode):
    if svg2paths is None:
        raise ImportError("svgpathtools is required for SVG conversion. Please install it with 'pip install svgpathtools'.")
    paths, attributes = svg2paths(input_svg)
    # Sort paths from top to bottom (assuming Y increases downward in SVG; smaller average Y is top)
    paths = sorted(paths, key=lambda p: (p.bbox()[2] + p.bbox()[3]) / 2)  # Sort by increasing average Y (top first)
    gcode = [
        "G21 ; set units to mm",
        "G90 ; absolute positioning",
        "G17 ; XY plane"
    ]
    for path in paths:
        points = discretize_path(path, steps=80)
        gcode += generate_gcode(points)
    gcode.append("M05 ; stop spindle")
    gcode.append("G0 X0 Y0 ; return to origin")
    gcode.append("M30 ; program end")
    with open(output_gcode, "w") as f:
        f.write("\n".join(gcode))
    return True

def strip_comment(line):
    line = re.sub(r'\(.*?\)', '', line)
    if ';' in line:
        line = line.split(';', 1)[0]
    return line.strip()

def parse_gcode_text(text):
    commands = []
    prev_pos = {'X': None, 'Y': None, 'Z': None}
    for i, raw in enumerate(text.splitlines()):
        raw_strip = raw.strip()
        if not raw_strip:
            continue
        cleaned = strip_comment(raw_strip)
        if not cleaned:
            commands.append({'raw': raw_strip, 'code': None, 'args': {}, 'orig_lineno': i})
            continue
        parts = cleaned.split()
        code = parts[0].upper()
        args = {}
        for token in parts[1:]:
            token = token.strip()
            if len(token) < 2:
                continue
            key = token[0].upper()
            try:
                val = float(token[1:])
            except:
                continue
            args[key] = val
        # Check for duplicate position
        is_duplicate = True
        for key in ['X', 'Y', 'Z']:
            if key in args:
                if prev_pos[key] != args[key]:
                    is_duplicate = False
            elif prev_pos[key] is not None:
                is_duplicate = False
        if is_duplicate and code in ['G0', 'G1']:
            continue  # Skip duplicate move to same position
        # Update prev_pos
        for key in ['X', 'Y', 'Z']:
            if key in args:
                prev_pos[key] = args[key]
        commands.append({'raw': raw_strip, 'code': code, 'args': args, 'orig_lineno': i})
    return commands

def is_straight_line(points, tolerance=0.1):
    if len(points) < 3:
        return True
    points_np = np.array(points)
    start = points_np[0]
    end = points_np[-1]
    line_vec = end - start
    line_len = np.linalg.norm(line_vec)
    if line_len == 0:
        return True
    max_dev = 0
    for p in points_np[1:-1]:
        p_vec = p - start
        proj = np.dot(p_vec, line_vec) / line_len**2 * line_vec
        dev = np.linalg.norm(p_vec - proj)
        if dev > max_dev:
            max_dev = dev
    return max_dev < tolerance

class GCodeViewer(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("G-code Kolam Viewer")
        self.geometry("1100x720")
        self.configure(padx=8, pady=8)

        # state
        self.commands = []
        self.current_index = 0
        self.is_playing = False
        self.after_id = None
        self.pos = {'x': 0.0, 'y': 0.0, 'z': 5.0}
        self.min_x = self.max_x = self.min_y = self.max_y = None
        self.scale = 1.0
        self.pad = 20
        self.canvas_width = 700
        self.canvas_height = 700
        self.drawn_items = []
        self.head_marker = None
        self.current_path = []  # Buffer for consecutive G1 points

        self._build_ui()

        # load G-code file if exists
        if os.path.exists(DEFAULT_GCODE_FILE):
            with open(DEFAULT_GCODE_FILE, "r", encoding="utf-8", errors="ignore") as f:
                txt = f.read()
            self.load_gcode_text(txt)
        else:
            self.load_gcode_text("; No G-code found: output.gcode missing\n")

    def _build_ui(self):
        left = tk.Frame(self)
        left.grid(row=0, column=0, sticky="ns")
        right = tk.Frame(self)
        right.grid(row=0, column=1, sticky="nsew")
        self.grid_columnconfigure(1, weight=1)
        self.grid_rowconfigure(0, weight=1)

        self.canvas = tk.Canvas(left, width=self.canvas_width, height=self.canvas_height, bg="white", relief="sunken", bd=2)
        self.canvas.pack()

        ctrl = tk.Frame(left)
        ctrl.pack(fill="x", pady=(8,0))
        ttk.Button(ctrl, text="Load G-code", command=self.load_gcode_file).grid(row=0, column=0, padx=4)
        ttk.Button(ctrl, text="Generate from SVG", command=self.convert_svg_and_load).grid(row=0, column=6, padx=4)
        self.play_btn = ttk.Button(ctrl, text="Play Step-by-Step", command=self.toggle_play)
        self.play_btn.grid(row=0, column=1, padx=4)
        ttk.Button(ctrl, text="Step ▶", command=lambda: self.step(1)).grid(row=0, column=2, padx=4)
        ttk.Button(ctrl, text="◀ Step", command=lambda: self.step(-1)).grid(row=0, column=3, padx=4)
        ttk.Button(ctrl, text="Reset", command=self.reset_view).grid(row=0, column=4, padx=4)
        ttk.Button(ctrl, text="Generate Full", command=self.generate_full).grid(row=0, column=5, padx=4)

        ttk.Label(ctrl, text="Speed (steps/s)").grid(row=1, column=0, columnspan=2, pady=(6,0))
        self.speed_var = tk.DoubleVar(value=100.0)  # Adjusted for reasonable speed
        self.speed_scale = ttk.Scale(ctrl, from_=1, to=1000, orient="horizontal", variable=self.speed_var)
        self.speed_scale.grid(row=1, column=2, columnspan=5, sticky="ew", padx=4)

        info = tk.Frame(left)
        info.pack(fill="x", pady=(8,0))
        self.status_label = ttk.Label(info, text="Line: 0 / 0    Pos: X0 Y0 Z5    Pen: UP")
        self.status_label.pack()

        top_right = tk.Frame(right)
        top_right.pack(fill="both", expand=True)
        self.gtext = scrolledtext.ScrolledText(top_right, width=60)
        self.gtext.pack(fill="both", expand=True)
        self.gtext.tag_configure("current", background="#ffe79e")

        bottom_right = tk.Frame(right)
        bottom_right.pack(fill="x")
        ttk.Label(bottom_right, text="Legend:").grid(row=0, column=0, sticky="w")
        ttk.Label(bottom_right, text="Green lines = drawn (Z <= 0)").grid(row=0, column=1, sticky="w", padx=8)

    def convert_svg_and_load(self):
        svg_path = filedialog.askopenfilename(filetypes=[("SVG files", "*.svg"), ("All files", "*.*")])
        if not svg_path:
            return
        gcode_path = DEFAULT_GCODE_FILE
        try:
            svg_to_gcode(svg_path, gcode_path)
        except Exception as e:
            messagebox.showerror("SVG to G-code Error", str(e))
            return
        with open(gcode_path, "r", encoding="utf-8", errors="ignore") as f:
            txt = f.read()
        self.load_gcode_text(txt)

    def load_gcode_file(self):
        path = filedialog.askopenfilename(filetypes=[("G-code files", "*.gcode *.nc *.txt"), ("All files", "*.*")])
        if not path:
            return
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            txt = f.read()
        self.load_gcode_text(txt)

    def load_gcode_text(self, text):
        self.commands = parse_gcode_text(text)
        self.current_index = 0
        self.pos = {'x': 0.0, 'y': 0.0, 'z': 5.0}
        self.drawn_items.clear()
        self.current_path = []
        self._compute_bounds()
        self._setup_transform()
        self._render_full_gcode_text()
        self._clear_canvas()
        self._draw_axes()
        self._place_head_marker()
        self.update_status()

    def _render_full_gcode_text(self):
        self.gtext.config(state="normal")
        self.gtext.delete("1.0", "end")
        for c in self.commands:
            self.gtext.insert("end", c['raw'] + "\n")
        self.gtext.config(state="disabled")

    def _compute_bounds(self):
        x = 0.0
        y = 0.0
        min_x = min_y = float("inf")
        max_x = max_y = float("-inf")
        for c in self.commands:
            args = c['args']
            if 'X' in args:
                x = args['X']
            if 'Y' in args:
                y = args['Y']
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y
        if min_x == float("inf"):
            min_x = 0; max_x = 100
            min_y = 0; max_y = 100
        self.min_x, self.max_x, self.min_y, self.max_y = min_x, max_x, min_y, max_y

    def _setup_transform(self):
        w = self.canvas_width
        h = self.canvas_height
        pad = self.pad
        data_w = max(1.0, self.max_x - self.min_x)
        data_h = max(1.0, self.max_y - self.min_y)
        scale_x = (w - 2 * pad) / data_w
        scale_y = (h - 2 * pad) / data_h
        self.scale = min(scale_x, scale_y)
        self.offset_x = pad - self.min_x * self.scale
        self.offset_y = pad + self.min_y * self.scale
        self.w = w; self.h = h

    def coord_to_canvas(self, x, y):
        cx = self.offset_x + x * self.scale
        cy = self.h - (self.pad + (y - self.min_y) * self.scale)
        return cx, cy

    def _clear_canvas(self):
        self.canvas.delete("all")
        self.head_marker = None

    def _draw_axes(self):
        self.canvas.create_rectangle(2, 2, self.canvas_width-2, self.canvas_height-2, outline="#ccc")

    def _place_head_marker(self):
        x, y = self.pos['x'], self.pos['y']
        cx, cy = self.coord_to_canvas(x, y)
        r = 5
        self.head_marker = self.canvas.create_oval(cx-r, cy-r, cx+r, cy+r, fill="red")

    def _move_head_marker(self, x, y):
        cx, cy = self.coord_to_canvas(x, y)
        r = 5
        if self.head_marker:
            self.canvas.coords(self.head_marker, cx-r, cy-r, cx+r, cy+r)
        else:
            self.head_marker = self.canvas.create_oval(cx-r, cy-r, cx+r, cy+r, fill="red")

    def toggle_play(self):
        if self.is_playing:
            self.is_playing = False
            if self.after_id:
                self.after_cancel(self.after_id)
            self.play_btn.config(text="Play Step-by-Step")
        else:
            self.is_playing = True
            self.play_btn.config(text="Pause")
            self._play_loop()

    def _play_loop(self):
        if not self.is_playing:
            return
        self.step(1)
        delay_ms = max(10, int(1000.0 / max(1.0, self.speed_var.get())))
        self.after_id = self.after(delay_ms, self._play_loop)

    def step(self, direction=1):
        if direction == 1:
            if self.current_index >= len(self.commands):
                self._draw_current_path()  # Ensure last path is drawn
                self.is_playing = False
                self.play_btn.config(text="Play Step-by-Step")
                return
            cmd = self.commands[self.current_index]
            self._execute_command(cmd)
            self._highlight_line(self.current_index)
            self.current_index += 1
        else:
            new_index = max(0, self.current_index - 1)
            self._reset_and_replay_to(new_index)
        self.update_status()

    def generate_full(self):
        self._reset_and_replay_to(len(self.commands))
        self.current_index = len(self.commands)
        self._draw_current_path()  # Ensure last path is drawn
        self._highlight_line(self.current_index - 1 if self.commands else 0)
        self.update_status()

    def _reset_and_replay_to(self, index):
        self.pos = {'x': 0.0, 'y': 0.0, 'z': 5.0}
        for item in self.drawn_items:
            self.canvas.delete(item)
        self.drawn_items.clear()
        if self.head_marker:
            self.canvas.delete(self.head_marker)
            self.head_marker = None
        self._place_head_marker()
        self.current_path = []
        self.current_index = 0
        for i in range(index):
            cmd = self.commands[i]
            self._execute_command(cmd)
            self.current_index += 1
        if index > 0:
            self._highlight_line(index - 1)
        else:
            self._highlight_line(0)

    def _execute_command(self, cmd):
        code = cmd.get('code')
        args = cmd.get('args', {})
        prev = self.pos.copy()
        new_x, new_y, new_z = prev['x'], prev['y'], prev['z']

        if 'X' in args: new_x = args['X']
        if 'Y' in args: new_y = args['Y']
        if 'Z' in args: new_z = args['Z']

        draw = False
        if code is not None:
            if code.startswith('G'):
                gnum = code[1:]
                if gnum in ('1', '01'):
                    if (prev['z'] <= 0.0) or (new_z <= 0.0):
                        if (new_x != prev['x']) or (new_y != prev['y']):
                            draw = True

        xy_changed = (new_x != prev['x']) or (new_y != prev['y'])
        if xy_changed:
            if draw:
                # Buffer the point for potential straight line simplification
                if not self.current_path:
                    self.current_path = [(prev['x'], prev['y'])]
                self.current_path.append((new_x, new_y))
            else:
                # Non-draw move: Draw any pending path and reset buffer
                self._draw_current_path()
                self.current_path = []

        # Update position and move marker
        self.pos['x'], self.pos['y'], self.pos['z'] = new_x, new_y, new_z
        self._move_head_marker(new_x, new_y)

        # If Z lift or end of commands, draw the path
        if new_z > 0 or code == 'G0':
            self._draw_current_path()
            self.current_path = []

    def _draw_current_path(self):
        if len(self.current_path) < 2:
            return
        points = self.current_path
        if is_straight_line(points):
            # Draw single straight line from start to end
            start_x, start_y = points[0]
            end_x, end_y = points[-1]
            x1, y1 = self.coord_to_canvas(start_x, start_y)
            x2, y2 = self.coord_to_canvas(end_x, end_y)
            line_id = self.canvas.create_line(x1, y1, x2, y2, width=2, capstyle="round", joinstyle="round", fill="green")
            self.drawn_items.append(line_id)
        else:
            # Draw as segmented lines
            for i in range(len(points) - 1):
                x1, y1 = self.coord_to_canvas(points[i][0], points[i][1])
                x2, y2 = self.coord_to_canvas(points[i+1][0], points[i+1][1])
                line_id = self.canvas.create_line(x1, y1, x2, y2, width=2, capstyle="round", joinstyle="round", fill="green")
                self.drawn_items.append(line_id)

    def _highlight_line(self, lineno):
        self.gtext.tag_remove("current", "1.0", "end")
        char_line = 1
        for i, c in enumerate(self.commands):
            if i == lineno:
                self.gtext.tag_add("current", f"{char_line}.0", f"{char_line}.0 lineend")
                self.gtext.see(f"{char_line}.0")
                break
            char_line += 1

    def reset_view(self):
        self.is_playing = False
        if self.after_id:
            self.after_cancel(self.after_id)
        self.current_index = 0
        self.pos = {'x': 0.0, 'y': 0.0, 'z': 5.0}
        for item in self.drawn_items:
            self.canvas.delete(item)
        self.drawn_items.clear()
        self.current_path = []
        self._clear_canvas()
        self._draw_axes()
        self._place_head_marker()
        self._highlight_line(0)
        self.update_status()

    def update_status(self):
        total = len(self.commands)
        idx = min(self.current_index, total)
        pen = "DOWN" if self.pos['z'] <= 0.0 else "UP"
        self.status_label.config(text=f"Line: {idx} / {total}    Pos: X{self.pos['x']:.2f} Y{self.pos['y']:.2f} Z{self.pos['z']:.2f}    Pen: {pen}")

if __name__ == "__main__":
    app = GCodeViewer()
    app.mainloop()