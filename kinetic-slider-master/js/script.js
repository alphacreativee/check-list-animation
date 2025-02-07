console.clear();

const imageElements = document.querySelectorAll(".image-container img");
const images = Array.from(imageElements).map((img) => img.src);

const texts = Array.from(imageElements).map((img) => [img.alt || "IMAGE"]); // Lấy alt làm text
const bgDisplacementSprite = document
  .querySelector(".image-container")
  .getAttribute("data-bg-displacement-sprite");
const cursorDisplacementSprite = document
  .querySelector(".image-container")
  .getAttribute("data-cursorDisplacementSprite");
const slider = new rgbKineticSlider({
  slideImages: images,
  itemsTitles: texts,

  backgroundDisplacementSprite: bgDisplacementSprite,
  cursorDisplacementSprite: cursorDisplacementSprite,

  cursorImgEffect: true,
  cursorTextEffect: false,
  cursorScaleIntensity: 0.6,
  cursorMomentum: 0.2,

  swipe: true,
  swipeDistance: window.innerWidth * 0.35,
  swipeScaleIntensity: 2,

  slideTransitionDuration: 1.2,
  transitionScaleIntensity: 30,
  transitionScaleAmplitude: 160,

  nav: true,
  navElement: ".main-nav",

  textsDisplay: true,
  textTitleSize: 130,
  textsTiltEffect: true,
  googleFonts: ["Playfair Display: 700"],
  textsRgbEffect: true,
  textsRgbIntensity: 1,
});
