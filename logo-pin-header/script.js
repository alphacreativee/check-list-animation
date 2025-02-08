gsap.registerPlugin(ScrollTrigger);
const logo = document.querySelector("#logo");
const originalHeight = logo.offsetHeight;
const scaleFactor = 2;

const scaledHeight = originalHeight * scaleFactor;
console.log(scaledHeight);

const animate = () => {
  gsap.from("#logo", {
    duration: 3,
    scale: scaleFactor,
    y: window.innerHeight * 0.5 - scaledHeight * 0.5 + 48,
    transformOrigin: "left center",

    scrollTrigger: {
      trigger: ".hero-img",
      start: "top top",
      end: "bottom top",
      pin: true,
      markers: true,
      scrub: true,
    },
  });
};
animate();
