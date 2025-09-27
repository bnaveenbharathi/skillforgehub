# svg_to_gcode.py
# Simple CNC toolpath generator from SVG file with duplicate path removal
# Requirements: pip install svgpathtools numpy

from svgpathtools import svg2paths
import numpy as np
import sys

# -------------------------------
# CONFIGURATION
# -------------------------------
INPUT_FILE = "kolam.svg"   # Your SVG file name
OUTPUT_FILE = "kolam.gcode"

SAFE_HEIGHT = 5      # Z height for travel (mm)
CUT_DEPTH = -2       # Cutting depth (mm)
FEED_RATE = 500      # Cutting speed
PLUNGE_RATE = 200    # Z axis speed
TOLERANCE = 0.1      # Tolerance for detecting duplicate points (mm)

# -------------------------------
# HELPER FUNCTIONS
# -------------------------------
def discretize_path(path, steps=100):
    """Convert curves into discrete (x,y) points"""
    points = []
    for seg in path:
        for t in [i/steps for i in range(steps+1)]:
            point = seg.point(t)
            points.append((point.real, point.imag))
    return points

def are_paths_duplicate(path1, path2, tolerance=TOLERANCE):
    """Check if two paths are duplicates based on point proximity"""
    if len(path1) != len(path2):
        return False
    path1 = np.array(path1)
    path2 = np.array(path2)
    # Check both forward and reverse directions
    forward_diff = np.max(np.abs(path1 - path2))
    reverse_diff = np.max(np.abs(path1 - path2[::-1]))
    return min(forward_diff, reverse_diff) < tolerance

def remove_duplicate_paths(paths, steps=80):
    """Remove duplicate paths based on discretized points"""
    discretized_paths = [discretize_path(path, steps=steps) for path in paths]
    unique_paths = []
    unique_indices = []
    
    for i, path in enumerate(discretized_paths):
        if i in unique_indices:
            continue
        is_unique = True
        for j, other_path in enumerate(discretized_paths[i+1:], start=i+1):
            if j in unique_indices:
                continue
            if are_paths_duplicate(path, other_path):
                unique_indices.append(j)
                is_unique = False
        if is_unique:
            unique_paths.append(paths[i])
    
    return unique_paths

def generate_gcode(points, depth=CUT_DEPTH, feed=FEED_RATE):
    """Convert a list of points into G-code instructions"""
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

# -------------------------------
# MAIN LOGIC
# -------------------------------
def svg_to_gcode(input_svg, output_gcode):
    paths, attributes = svg2paths(input_svg)
    
    # Remove duplicate paths
    unique_paths = remove_duplicate_paths(paths, steps=80)
    print(f"Original paths: {len(paths)}, Unique paths: {len(unique_paths)}")

    gcode = [
        "G21 ; set units to mm",
        "G90 ; absolute positioning",
        "G17 ; XY plane"
    ]

    for path in unique_paths:
        points = discretize_path(path, steps=80)
        gcode += generate_gcode(points)

    gcode.append("M05 ; stop spindle")
    gcode.append("G0 X0 Y0 ; return to origin")
    gcode.append("M30 ; program end")

    with open(output_gcode, "w") as f:
        f.write("\n".join(gcode))

    print(f"G-code written to {output_gcode}")

# -------------------------------
# RUN SCRIPT
# -------------------------------
if __name__ == "__main__":
    try:
        svg_to_gcode(INPUT_FILE, OUTPUT_FILE)
    except Exception as e:
        print("Error:", e)
        sys.exit(1)