gsap.registerPlugin(ScrollTrigger);

const bgColors = ["#ff0000", "#00ff00", "#0000ff", "#6A5AF9"];

const bgColorElement = document.querySelector(".bg-color");

gsap.utils.toArray(".item").forEach((item, index) => {
  let img = item.querySelector(".item-image img");
  gsap.fromTo(
    img,
    {
      clipPath: "polygon(0 0 , 100% 0 , 100% 0 , 0 0)",
    },
    {
      clipPath: "polygon(0 0 , 100% 0 , 100% 100% , 0 100%)",
      ease: "power1.out",
      duration: 2,
      scrollTrigger: {
        trigger: item,
        start: "center bottom",
        end: "bottom top",
        markers: true,
        // toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
        // onEnter: Hành động khi phần tử cuộn vào vùng start.
        // onLeave: Hành động khi phần tử rời khỏi vùng end.
        // onEnterBack: Hành động khi cuộn ngược lại và phần tử quay trở lại vùng start.
        // onLeaveBack: Hành động khi cuộn ngược và phần tử rời khỏi vùng start.

        toggleActions: "play none none none",
        onEnter: () => updateBackground(bgColors[index]),
        onEnterBack: () => updateBackground(bgColors[index]),
      },
    }
  );
});

function updateBackground(color) {
  gsap.to(bgColorElement, {
    background: `linear-gradient(0deg, ${color} 0%, rgba(252, 176, 69, 0) 100%)`,
    duration: 2,
    ease: "power1.out",
  });
}
