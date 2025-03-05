function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotive();

const canvas = document.querySelector(".canvas");
console.log(canvas);

const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

const frameCount = 300;
const currentFrame = (index) => `./imgs/img${(index + 1).toString()}.png`;

const images = [];
const imageSeq = {
  frame: 1,
};
for (let i = 1; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
  console.log(images);
}
gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 1,
    trigger: ".canvas",
    start: "top top",
    end: "600% top",
    scroller: "#main",
  },
  onUpdate: render,
});
images[1].onload = render;
function render() {
  scaleImage(images[imageSeq.frame], context);
}
function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: ".canvas",
  pin: true,
  scroller: "#main",
  start: "top top",
  end: "600% top",
});
document.querySelectorAll(".section-item").forEach((section) => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main",
    },
  });
});
// [".section-two", ".section-three", ".section-four"].forEach((section) => {
//   gsap.to(section, {
//     scrollTrigger: {
//       trigger: section,
//       start: "top top",
//       end: "bottom top",
//       pin: true,
//       scroller: "#main",
//     },
//   });
// });
// gsap.to(".section-two", {
//   scrollTrigger: {
//     trigger: ".section-two",
//     start: "top top",
//     end: "bottom top",
//     pin: true,
//     scroller: "#main",
//   },
// });
// gsap.to(".section-three", {
//   scrollTrigger: {
//     trigger: ".section-three",
//     start: "top top",
//     end: "bottom top",
//     pin: true,
//     scroller: "#main",
//   },
// });
// gsap.to(".section-four", {
//   scrollTrigger: {
//     trigger: ".section-four",
//     start: "top top",
//     end: "bottom top",
//     pin: true,
//     scroller: "#main",
//   },
// });
