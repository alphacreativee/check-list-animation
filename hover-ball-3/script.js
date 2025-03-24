const blob = document.querySelector(".blob");

document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;

  // Tính toán vị trí chuột và di chuyển blob
  const x = (clientX / innerWidth - 0.5) * 100;
  const y = (clientY / innerHeight - 0.5) * 100;

  blob.style.transform = `translate(${x}px, ${y}px) rotateY(${x}deg) rotateX(${y}deg)`;
});
