import * as THREE from "https://unpkg.com/three@0.137.5/build/three.module.js";

// Tạo Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 📌 **Tạo Video Texture**
const video = document.createElement("video");
video.src = "./img/video.mp4"; // 🔥 Đảm bảo đường dẫn video chính xác
video.loop = true;
video.muted = true; // 🔇 Bắt buộc trên trình duyệt để tự động phát
video.autoplay = true;
video.playsInline = true;
video.play();

// 🎥 **Tạo Video Texture**
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

// 🎨 **Tạo vật liệu từ Video Texture**
const material = new THREE.MeshBasicMaterial({ map: videoTexture });

// 🔲 **Tạo hình lập phương với Video Texture**
const geometry = new THREE.BoxGeometry(3, 3, 3);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 🎥 Đặt camera
camera.position.z = 5;

// 🎬 **Hàm Animation**
function animate() {
  renderer.render(scene, camera);
  cube.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);
