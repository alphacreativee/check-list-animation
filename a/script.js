gsap.registerPlugin(ScrollTrigger);
if ($(".why-choose").length) {
  console.log("a");
  const items = gsap.utils.toArray(".why-choose__card");
  const lastCard = items[items.length - 1];
  let lastCardHeight = lastCard.clientHeight + 80;
  const element = document.querySelector(".why-choose");
  let startPoint;

  if (window.innerWidth < 991) {
    startPoint = element.classList.contains("animation-center")
      ? "top 30%"
      : "top 30%";
  } else {
    startPoint = element.classList.contains("animation-center")
      ? "top 40%"
      : "top 30%";
  }

  let endPointImage =
    document.querySelector(".why-choose__animation").clientHeight -
    lastCardHeight;
  gsap.timeline({
    scrollTrigger: {
      trigger: ".why-choose__image",
      start: "top top",
      end: `+=${endPointImage}px`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      markers: true,
    },
  });
  items.forEach((item, index) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: startPoint,
        endTrigger: ".why-choose__container--card",
        end: `bottom top+=${lastCardHeight}px`,
        pin: true,
        scrub: true,
      },
    });

    if (item === lastCard) {
      tl.to(item, {
        scale: 1,
        transformOrigin: "center center",
      });
    } else {
      tl.to(item, {
        scale: 0.8 + 0.02 * index,
        transformOrigin: "center center",
        backgroundColor: "#d8d8d8",
      });
    }
  });
}
