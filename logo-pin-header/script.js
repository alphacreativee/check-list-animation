gsap.registerPlugin(ScrollTrigger);
const logo = document.querySelector("#logo");
const originalHeight = logo.offsetHeight;
const scaleFactor = 2;

const scaledHeight = originalHeight * scaleFactor;

const animate = () => {
  gsap.from("#logo", {
    duration: 3,
    scale: scaleFactor,
    y: innerHeight * 0.5 - scaledHeight / 2,
    transformOrigin: "left center",

    scrollTrigger: {
      trigger: ".hero-img",
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      markers: true,
    },
  });
};
animate();
