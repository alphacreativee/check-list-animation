const createElm = function (menuItem) {
  let menuItemsTexts = menuItem.children[0].children[0];

  const menuItemsTextsArray = [...menuItemsTexts.textContent];

  menuItemsTexts.textContent = "";

  const textsArray = [];

  menuItemsTextsArray.forEach((menuItemText) => {
    textsArray.push(`<span>${menuItemText}</span>`);
  });

  textsArray.forEach((textArray) => {
    menuItemsTexts.innerHTML += textArray;
  });

  const parentElm = menuItemsTexts.parentElement;

  const parentElmHeight = parentElm.clientHeight;
  parentElm.style.height = `${parentElmHeight}px`;

  const cloneItem = menuItemsTexts.cloneNode(true);
  parentElm.appendChild(cloneItem);
};

const animation = function (menuItem) {
  gsap.defaults({
    ease: "power1",
    stagger: {
      amount: 0.14,
      from: "start",
    },
  });
  menuItem.addEventListener("mouseover", function () {
    gsap.to(this.children[0].children[0].children, {
      y: "-100%",
    });
    gsap.to(this.children[0].children[1].children, {
      y: "-100%",
    });
  });

  menuItem.addEventListener("mouseleave", function () {
    gsap.to(this.children[0].children[0].children, {
      y: "0",
    });
    gsap.to(this.children[0].children[1].children, {
      y: "0",
    });
  });
};

const targetItems = document.querySelectorAll(".js-menu-item");

targetItems.forEach((targetItem) => {
  const menuItem = targetItem;
  createElm(menuItem);
  animation(menuItem);
});
