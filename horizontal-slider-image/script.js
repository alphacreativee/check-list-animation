// Lấy tất cả các phần tử wrapper-testimonial
const wrapperTestimonials = document.querySelectorAll(".slider-wrapper");

// Nếu có bất kỳ phần tử testimonial nào
if (wrapperTestimonials.length > 0) {
  // Lặp qua từng phần tử wrapper
  wrapperTestimonials.forEach((wrapper) => {
    const testimonial = wrapper.querySelector(".slider");

    // Hàm để tính toán lượng cuộn cần thiết
    const getScrollAmount = () => {
      const racesWidth = testimonial.scrollWidth;
      return racesWidth - window.innerWidth + 200;
    };

    // Hàm để tạo tween animation cho testimonial
    const createTween = (testimonial, scrollAmount) => {
      return gsap.to(testimonial, {
        x: -scrollAmount,
        duration: 3,
        ease: "none",
      });
    };

    // Hàm để tạo ScrollTrigger cho phần tử wrapper
    const createScrollTrigger = (wrapper, tween, scrollAmount) => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 15%",
        end: `+=${scrollAmount}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true,
      });
    };

    // Tính toán lượng cuộn cần thiết
    const scrollAmount = getScrollAmount();
    // Tạo tween animation cho testimonial
    const tween = createTween(testimonial, scrollAmount);
    // Tạo ScrollTrigger cho phần tử wrapper
    createScrollTrigger(wrapper, tween, scrollAmount);
  });

  // Làm mới ScrollTrigger sau khi tất cả triggers đã được thiết lập
  ScrollTrigger.refresh();
}
