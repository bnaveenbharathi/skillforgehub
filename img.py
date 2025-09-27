import cv2
import numpy as np
import svgwrite
import torch
from torch import nn
import torchvision.transforms as transforms
from PIL import Image

# Custom simple U-Net model for binary segmentation (AI enhancement)
class SimpleUNet(nn.Module):
    def __init__(self):
        super(SimpleUNet, self).__init__()
        # Encoder
        self.enc1 = self.conv_block(1, 32)
        self.enc2 = self.conv_block(32, 64)
        self.pool = nn.MaxPool2d(2)
        # Bottleneck
        self.bottleneck = self.conv_block(64, 128)
        # Decoder
        self.upconv2 = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.dec2 = self.conv_block(128, 64)
        self.upconv1 = nn.ConvTranspose2d(64, 32, 2, stride=2)
        self.dec1 = self.conv_block(64, 32)
        # Output
        self.out = nn.Conv2d(32, 1, 1)
        self.sigmoid = nn.Sigmoid()

    def conv_block(self, in_ch, out_ch):
        return nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.ReLU()
        )

    def forward(self, x):
        # Encoder
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool(e1))
        # Bottleneck
        b = self.bottleneck(self.pool(e2))
        # Decoder
        d2 = self.upconv2(b)
        d2 = torch.cat([d2, e2], dim=1)
        d2 = self.dec2(d2)
        d1 = self.upconv1(d2)
        d1 = torch.cat([d1, e1], dim=1)
        d1 = self.dec1(d1)
        # Output
        out = self.sigmoid(self.out(d1))
        return out

def zhangSuen(image): 
    def neighbours(x, y, img):
        """Return 8-neighbours of point (x,y) in clockwise order."""
        return [
            img[x-1, y],   img[x-1, y+1], img[x, y+1],   img[x+1, y+1],
            img[x+1, y],   img[x+1, y-1], img[x, y-1],   img[x-1, y-1]
        ]

    def transitions(n):
        """Number of 0 to 1 transitions in the ordered sequence."""
        n = n + [n[0]]  # Wrap around
        return sum((a == 0 and b == 1) for a, b in zip(n, n[1:]))

    img = image.copy().astype(np.uint8)  # Ensure uint8
    rows, cols = img.shape
    changing1 = changing2 = True
    while changing1 or changing2:
        changing1 = []
        for x in range(1, rows - 1):
            for y in range(1, cols - 1):
                if img[x, y] != 1:
                    continue
                n = neighbours(x, y, img)
                n_sum = sum(n)
                if (2 <= n_sum <= 6 and
                    transitions(n) == 1 and
                    n[0] * n[2] * n[4] == 0 and
                    n[2] * n[4] * n[6] == 0):
                    changing1.append((x, y))
        for x, y in changing1:
            img[x, y] = 0
        changing2 = []
        for x in range(1, rows - 1):
            for y in range(1, cols - 1):
                if img[x, y] != 1:
                    continue
                n = neighbours(x, y, img)
                n_sum = sum(n)
                if (2 <= n_sum <= 6 and
                    transitions(n) == 1 and
                    n[0] * n[2] * n[6] == 0 and
                    n[0] * n[4] * n[6] == 0):
                    changing2.append((x, y))
        for x, y in changing2:
            img[x, y] = 0
        changing1 = bool(changing1)
        changing2 = bool(changing2)
    return img

def kolam_png_to_svg(image_path, svg_path="kolam.svg", scale=1.0, min_stroke_width=1.0, use_ai_segmentation=False, model_path=None):
    # Step 1: Read the image in grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Image not found: {image_path}")

    h, w = img.shape

    # Step 2: Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(img, (5, 5), 0)

    if use_ai_segmentation:
        # Step 3-AI: Use AI (Simple U-Net) for segmentation if enabled
        # Note: This requires a pretrained model; load from model_path
        if model_path is None:
            raise ValueError("Model path required for AI segmentation")
        model = SimpleUNet()
        model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
        model.eval()

        # Preprocess for model
        transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Resize((256, 256)),  # Resize for model input; adjust as needed
            transforms.Normalize(mean=[0.5], std=[0.5])
        ])
        pil_img = Image.fromarray(blurred)
        input_tensor = transform(pil_img).unsqueeze(0)  # Add batch dim

        # Inference
        with torch.no_grad():
            output = model(input_tensor)
        mask = output.squeeze().cpu().numpy() > 0.5  # Binary mask
        mask = cv2.resize((mask * 255).astype(np.uint8), (w, h))  # Resize back
        thresh = mask
    else:
        # Step 3: Adaptive thresholding (non-AI fallback)
        thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                       cv2.THRESH_BINARY_INV, 11, 2)

    # Step 4: Morphological closing to connect small gaps
    kernel = np.ones((3, 3), np.uint8)
    closing = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

    # Step 4.5: Compute distance transform for adaptive thickness
    dist = cv2.distanceTransform(closing, cv2.DIST_L2, 5)

    # Step 5: Detect dots
    params = cv2.SimpleBlobDetector_Params()
    params.filterByArea = True
    params.minArea = 5
    params.maxArea = 800
    params.filterByCircularity = False
    detector = cv2.SimpleBlobDetector_create(params)
    keypoints = detector.detect(closing)
    dots = [(int(k.pt[0]), int(k.pt[1])) for k in keypoints]

    # Step 6: Skeletonize strokes
    norm_closing = closing // 255
    try:
        from cv2.ximgproc import thinning, THINNING_ZHANGSUEN
        skeleton = thinning(closing, thinningType=THINNING_ZHANGSUEN)
    except ImportError:
        skeleton = zhangSuen(norm_closing) * 255

    # Step 7: Extract contours
    contours, _ = cv2.findContours(skeleton, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

    # Step 8: Create SVG
    dwg = svgwrite.Drawing(svg_path, size=(w * scale, h * scale))

    # Draw dots (adaptive radius)
    for k in keypoints:
        x, y = int(k.pt[0]), int(k.pt[1])
        radius = max(1, k.size / 2 * scale)
        dwg.add(dwg.circle(center=(x * scale, y * scale), r=radius, fill="black"))

    # Draw strokes with adaptive smoothing and stroke width
    for cnt in contours:
        if len(cnt) < 5:
            continue

        # Compute average thickness
        total_dist = 0.0
        count = 0
        for i in range(0, len(cnt), 5):  # Sample every 5th point for efficiency
            x, y = cnt[i][0]
            total_dist += dist[y, x]
            count += 1
        avg_dist = total_dist / count if count > 0 else 1.0
        avg_thickness = 2 * avg_dist

        # Boost if thin
        if avg_thickness < 3.0:
            avg_thickness *= 1.5

        # Dynamic epsilon
        arc_length = cv2.arcLength(cnt, False)
        epsilon = 0.001 * arc_length
        approx = cv2.approxPolyDP(cnt, epsilon, False)
        points = [(int(p[0][0] * scale), int(p[0][1] * scale)) for p in approx]

        # Adaptive stroke width
        stroke_width = max(min_stroke_width, avg_thickness * scale)
        dwg.add(dwg.polyline(points=points, stroke="black",
                             fill="none", stroke_width=str(stroke_width)))

    dwg.save()
    print(f"Enhanced SVG saved at {svg_path}")

# Example usage:
# Save this code as kolam_converter_ai.py
# Install required libraries: pip install opencv-python svgwrite numpy torch torchvision pillow
# For AI: Train or obtain a pretrained U-Net model and save as 'unet_model.pth'
# Run: python kolam_converter_ai.py
# kolam_png_to_svg("kolam.png", "kolam.svg", scale=1.5, min_stroke_width=1.0, use_ai_segmentation=True, model_path="unet_model.pth")
kolam_png_to_svg("kolam.png", "kolam.svg", scale=1.5, min_stroke_width=1.0)