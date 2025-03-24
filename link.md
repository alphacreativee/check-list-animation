<!-- https://codepen.io/GreenSock/pen/XJrrYpE -->
<!-- https://codepen.io/GreenSock/pen/xxWdeMK -->
<!-- https://gsap.com/docs/v3/Plugins/Observer/ -->

<!-- https://www.youtube.com/watch?v=cLn3y7Lm1tc&t=49s -->

<!-- gió biển treo -->
<!-- https://codepen.io/GreenSock/pen/qBzvvgj -->
<!-- filter -->
<!-- https://codepen.io/GreenSock/pen/VwJVJQV -->

<!-- css animation show item grid -->
<!-- https://codepen.io/GreenSock/pen/WNqKpGL -->
<!-- https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Observer.min.js -->

<!-- https://gsap.com/community/forums/topic/31492-parallaximage-full-reveal-on-scroll-using-scrolltrigger-and-some-css-hacks/ -->

<!-- hover text -->
<!-- https://codepen.io/Juxtopposed/pen/mdQaNbG -->

<!-- slider -->
<!-- https://www.youtube.com/watch?v=OTjmnF27ADk -->

<!-- slider -->
<!-- https://www.youtube.com/watch?v=OTjmnF27ADk -->

<!-- slider -->
<!-- https://www.youtube.com/watch?v=OTjmnF27ADk -->

<!-- webgl -->
<!-- https://seeren.github.io/liquify-js/ -->
<!-- text -->
<!-- https://codepen.io/aniketkr/pen/jOxpoYb -->

<!-- https://codepen.io/GreenSock/pens/tags/?selected_tag=text-effects&cursor=ZD0xJm89MCZwPTg= -->

<!-- https://gsap.com/community/forums/topic/24798-scrolltrigger-reverse-stagger/ -->

<!-- css button -->
<!-- https://codepen.io/mKaran243/pen/xxWOZqX -->

https://codepen.io/maeolive/pen/ExqrZPL

<!-- multi scroll -->
<!-- https://codepen.io/ux-designer22/full/abRgXoP -->

hover text

<!-- https://gsap.com/community/forums/topic/38710-how-to-create-gsap-hover-split-text/ -->

cursor mouse trail
https://codepen.io/th-akash/pen/vYzOJgR

<!-- hover circle  -->

https://codepen.io/wifidev/pen/GYGwpv

<!-- https://codepen.io/Uzair-3455/pen/RwwJoQz -->

slide circle
https://codepen.io/creativeocean/pen/dyOxxGb

https://gsap.com/community/forums/topic/23549-circular-menu/

https://gsap.com/community/forums/topic/30338-circular-carouselslider/
https://gsap.com/community/forums/topic/31694-3d-rounded-carousel-with-gsap/
https://codepen.io/elegantseagulls/pen/LYJaLNx
https://gsap.com/community/forums/topic/37692-3d-carousel-with-more-items/
https://gsap.com/community/forums/topic/39782-vertical-image-slider-with-changing-text/
https://gsap.com/community/forums/topic/17644-vertical-round-carousel/

https://freebiesupply.com/blog/css-js-sliders-from-codepen/
http://gsap.com/community/forums/topic/28552-creating-vertical-carousel/

https://gsap.com/community/forums/topic/41306-gsap-fixed-circle-slider-by-scrolling/

<!-- slide doc la -->

https://codepen.io/suez/pen/grJONP

cricle scroll parallax vertical
https://codepen.io/GreenSock/pen/XWzRraJ

link git

<!-- https://github.com/codrops -->

btv

<!-- https://tympanus.net/Development/OnScrollLayoutFormations/ -->
<!-- https://tympanus.net/Development/OnScrollShapeMorph/ -->

https://tympanus.net/Development/TileScroll/

<!-- slider -->

https://tympanus.net/Development/ShapesSlideshow/index3.html

https://codepen.io/jtrancozo/pen/mEoEVw

<!-- https://tympanus.net/Development/LiquidDistortion/index5.html -->

menu overlay svg codepen
https://codepen.io/Lucas_Mas/pen/RwvPLjj
https://codepen.io/osmosupply/pen/JoPPOXj
https://gsap.com/community/forums/topic/27055-overlay-menu-how-to-lock-the-body-scroll-when-active/
https://www.youtube.com/watch?v=WENG-Ee8FTQ

https://gsap.com/community/forums/topic/19947-custom-cursor-movement-disappears-on-scroll/

3d hover ball
https://codepen.io/Tino-the-bold/pen/JjgqVym

pin image change content
https://codepen.io/snorkltv/pen/vYVBPJq

https://codepen.io/snorkltv/pen/MWPgoXV

https://tympanus.net/Development/ShapesSlideshow/
https://github.com/caiteesmith/threejs-sphere

<!-- scroll product image -->

https://www.youtube.com/watch?v=-iDet4p7484

https://github.com/thesiyhbrand/fanta

https://github.com/developermickey/Lagunitas-Website-YouTube

<!-- three js -->

https://www.youtube.com/watch?v=Ud_hP2raTmk
https://www.youtube.com/watch?v=k66veZnKbFU

<!-- slider vertical parrallax -->

https://codepen.io/Okaybeok/pen/qBjRrGb

https://codesandbox.io/p/sandbox/custom-pagination-circular-progress-bar-swiper-qoh8f9?file=%2Findex.html

https://codepen.io/livehighvu06/pen/abqRYKr

https://codepen.io/apovkh/pen/poNgzzm

https://codepen.io/leon9208/pen/poyvQWa

function swiperBanner() { if ($(".hero-sec").length) { var swiperBanner = new Swiper(".swiper-banner", { direction: "vertical", // Giữ vertical như yêu cầu trước loop: true, speed: 1500, grabCursor: true, watchSlidesProgress: true, mousewheel: true, // Dùng cú pháp mới keyboard: true, autoplay: { delay: 2000, // 2 giây mỗi slide disableOnInteraction: true, }, pagination: { el: ".swiper-pagination", clickable: true, renderBullet: function (index, className) { return '<span class="' + className + '"></span>'; }, }, on: { // Giữ logic interleave của bạn progress: function (swiper) { swiper.slides.forEach(function (slide) { var slideProgress = slide.progress || 0; var innerOffset = swiper.height _ 0.9; var innerTranslate = slideProgress _ innerOffset; if (!isNaN(innerTranslate)) { var slideInner = slide.querySelector(".slide-banner"); if (slideInner) { slideInner.style.transform = "translate3d(0, " + innerTranslate + "px, 0)"; } } }); }, touchStart: function (swiper) { swiper.slides.forEach(function (slide) { slide.style.transition = ""; }); }, setTransition: function (swiper, speed) { var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)"; swiper.slides.forEach(function (slide) { slide.style.transition = speed + "ms " + easing; var slideInner = slide.querySelector(".slide-banner"); if (slideInner) { slideInner.style.transition = speed + "ms " + easing; } }); }, slideChange: function (swiper) { // Reset animation khi chuyển slide var bullets = document.querySelectorAll(".swiper-pagination-bullet"); bullets.forEach(function (bullet) { bullet.style.animation = "none"; void bullet.offsetWidth; // Trigger reflow if (bullet.classList.contains("swiper-pagination-bullet-active")) { bullet.style.animation = ""; } }); }, }, }); } } swiperBanner();

.swiper-pagination { position: relative; bottom: 10px; } .swiper-pagination-bullet { width: 10px; height: 10px; background: #ccc; /_ Màu bullet mặc định _/ opacity: 0.5; position: relative; transition: opacity 0.3s; // Vòng tròn tiến trình bên ngoài &::before { content: ""; position: absolute; top: 50%; left: 50%; width: 16px; /_ Lớn hơn bullet _/ height: 16px; border: 2px solid #000; /_ Màu vòng tròn tiến trình _/ border-radius: 50%; transform: translate(-50%, -50%); clip-path: circle(0% at 50% 50%); /_ Ban đầu ẩn hết _/ transition: clip-path 0s; /_ Reset animation _/ } } .swiper-pagination-bullet-active { opacity: 1; background: #000; /_ Màu bullet khi active _/ &::before { animation: progressCircle 2s linear forwards; /_ Chạy vòng tròn trong 2s _/ } } // Animation cho vòng tròn tiến trình @keyframes progressCircle { 0% { clip-path: circle(0% at 50% 50%); } 100% { clip-path: circle(50% at 50% 50%); } }
