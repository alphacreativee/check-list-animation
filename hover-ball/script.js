import { spline } from "https://cdn.skypack.dev/@georgedoescode/spline@1.0.1";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0";

// Lấy phần tử <path>
const path = document.querySelector("path");
const root = document.documentElement;

let hueNoiseOffset = 0;
let noiseStep = 0.0008; // Giảm chút để hiệu ứng mượt hơn
const simplex = new SimplexNoise();
const points = createPoints();

(function animate() {
  path.setAttribute("d", spline(points, 1, true));

  // Cập nhật vị trí các điểm dựa trên noise
  for (let point of points) {
    const nX = noise(point.noiseOffsetX, point.noiseOffsetY);
    const nY = noise(point.noiseOffsetY, point.noiseOffsetX);

    // Biên độ biến dạng có thể điều chỉnh
    const distortion = 12;

    point.x = map(
      nX,
      -1,
      1,
      point.originX - distortion,
      point.originX + distortion
    );
    point.y = map(
      nY,
      -1,
      1,
      point.originY - distortion,
      point.originY + distortion
    );

    point.noiseOffsetX += noiseStep;
    point.noiseOffsetY += noiseStep;
  }

  // Đổi màu theo noise
  const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
  const hue = map(hueNoise, -1, 1, 0, 360);
  root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
  root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
  document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;

  hueNoiseOffset += noiseStep / 6;

  requestAnimationFrame(animate);
})();

// Hàm tạo hình tròn gốc
function createPoints() {
  const points = [];
  const numPoints = 12; // Tăng số điểm để tròn hơn
  const angleStep = (Math.PI * 2) / numPoints;
  const radius = 73;

  for (let i = 0; i < numPoints; i++) {
    const theta = i * angleStep;

    const x = 100 + Math.cos(theta) * radius;
    const y = 100 + Math.sin(theta) * radius;

    points.push({
      x,
      y,
      originX: x,
      originY: y,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    });
  }

  return points;
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function noise(x, y) {
  return simplex.noise2D(x, y);
}

// Hiệu ứng khi hover
path.addEventListener("mouseover", () => {
  noiseStep = 0.006; // Biến dạng nhanh hơn
});

path.addEventListener("mouseleave", () => {
  noiseStep = 0.0008; // Trở về trạng thái mượt hơn
});
