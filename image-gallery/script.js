gsap.registerPlugin(ScrollTrigger);

let wheel = document.querySelector(".wheel"),
  images = gsap.utils.toArray(".wheel__card");

function setup() {
  let radius = wheel.offsetWidth / 2,
    center = radius,
    slice = 360 / images.length,
    DEG2RAD = Math.PI / 180;
  gsap.set(images, {
    x: (i) => center + radius * Math.sin(i * slice * DEG2RAD),
    y: (i) => center - radius * Math.cos(i * slice * DEG2RAD),
    rotation: (i) => i * slice,
    xPercent: -50,
    yPercent: -50,
  });
}

setup();

window.addEventListener("resize", setup);

gsap.to(wheel, {
  rotation: -360,
  ease: "none",
  duration: images.length,
  scrollTrigger: {
    start: 0,
    end: "max",
    scrub: 1,
    markers: true,
  },
});
