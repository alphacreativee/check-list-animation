document.addEventListener("DOMContentLoaded", () => {
  // Đặt easing (hiệu ứng làm mềm) để sử dụng trong các animation GSAP
  const ease = "power4.inOut";

  // Lấy tất cả các thẻ <a> trên trang và thêm sự kiện click
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Ngăn hành vi mặc định (chuyển trang ngay lập tức)

      const href = link.getAttribute("href"); // Lấy giá trị thuộc tính href

      // Kiểm tra nếu href không bắt đầu bằng '#' và khác với URL hiện tại
      if (href && !href.startsWith("#") && href !== window.location.pathname) {
        animationTransition().then(() => {
          // Sau khi hiệu ứng hoàn tất, chuyển hướng tới href
          window.location.href = href;
        });
      }
    });
  });

  // Hiệu ứng khi tải trang
  revealTransition().then(() => {
    // Khi hiệu ứng kết thúc, ẩn các phần tử `.block`
    gsap.set(".block", {
      visibility: "hidden",
    });
  });

  // Hàm tạo hiệu ứng khi tải trang
  function revealTransition() {
    return new Promise((resolve) => {
      // Đặt trạng thái ban đầu của các phần tử `.block` với scaleY là 1 (đầy đủ chiều cao)
      gsap.set(".block", { scaleY: 1 });

      // Tạo hiệu ứng thu nhỏ dần chiều cao về 0
      gsap.to(".block", {
        scaleY: 0, // Thu nhỏ theo trục Y
        duration: 1, // Thời gian 1 giây
        ease: ease, // Hiệu ứng easing (làm mềm chuyển động)
        onComplete: resolve, // Gọi resolve để báo hiệu Promise hoàn thành
        stagger: {
          each: 0.1, // Mỗi phần tử bắt đầu cách nhau 0.1 giây
          from: "start", // Hiệu ứng bắt đầu từ phần tử đầu tiên
          grid: "auto", // Sắp xếp các phần tử dạng lưới tự động
          axis: "x", // Áp dụng hiệu ứng theo trục X
        },
      });
    });
  }

  // Hàm tạo hiệu ứng khi nhấn vào link để chuyển trang
  function animationTransition() {
    return new Promise((resolve) => {
      // Đặt trạng thái ban đầu của `.block`: thu nhỏ hoàn toàn và hiện lên
      gsap.set(".block", { scaleY: 0, visibility: "visible" });

      // Tạo hiệu ứng phóng to dần chiều cao
      gsap.to(".block", {
        scaleY: 1, // Phóng to theo trục Y
        duration: 1, // Thời gian 1 giây
        ease: ease, // Hiệu ứng easing
        onComplete: resolve, // Gọi resolve để báo hiệu Promise hoàn thành
        stagger: {
          each: 0.1, // Mỗi phần tử bắt đầu cách nhau 0.1 giây
          from: "start", // Hiệu ứng bắt đầu từ phần tử đầu tiên
          grid: [2, 5], // Các phần tử được sắp xếp thành 2 hàng và 5 cột
          axis: "x", // Áp dụng hiệu ứng theo trục X
        },
      });
    });
  }
});
