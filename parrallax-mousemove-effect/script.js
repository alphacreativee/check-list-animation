const gallery = document.querySelector(".gallery");

const itemPosition = [
  {
    top: "5%",
    left: "5%",
  },
  {
    top: "35%",
    left: "35%",
  },
  {
    top: "15%",
    left: "85%",
  },
  {
    top: "58%",
    left: "58%",
  },
  {
    top: "7%",
    left: "50%",
  },
  {
    top: "55%",
    left: "15%",
  },
];

const items = document.querySelectorAll(".item");

items.forEach((item, index) => {
  item.style.top = itemPosition[index].top;
  item.style.left = itemPosition[index].left;
});

document.addEventListener("mousemove", (e) => {
  items.forEach((item, index) => {
    const animationFactor = item.getAttribute("parallax");

    console.log(animationFactor);
    const detalX = (e.clientX - window.innerWidth / 2) * animationFactor;
    const detalY = (e.clientY - window.innerHeight / 2) * animationFactor;

    gsap.to(item, {
      x: detalX,
      y: detalY,
      duratipn: 0.75,
    });
  });
});
