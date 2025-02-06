document.querySelectorAll(".wrapper-img").forEach((wrapper) => {
  new hoverEffect({
    parent: wrapper,
    intensity: wrapper.getAttribute("data-intensity"),
    angle: Math.PI / 2,
    image1: wrapper.getAttribute("data-image1"),
    image2: wrapper.getAttribute("data-image2"),
    displacementImage: wrapper.getAttribute("data-displacement"),
  });
});
