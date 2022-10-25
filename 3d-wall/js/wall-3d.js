(function () {
  const barElem = document.querySelector(".progress-bar");
  const stageElem = document.querySelector(".stage");
  const houseElem = document.querySelector(".house");
  const selectCharacterElem = document.querySelector(".select-character");
  const mousePosition = { x: 0, y: 0 };
  let maxScrollVale;

  window.addEventListener("scroll", function () {
    const scrollPer = scrollY / maxScrollVale;
    const zMove = scrollPer * 990 - 490;
    houseElem.style.transform = `translateZ(${zMove}vw)`;

    // progress bar
    barElem.style.width = `${scrollPer * 100}%`;
  });

  const resizeHandler = () => {
    maxScrollVale = document.body.offsetHeight - window.innerHeight;
  };

  window.addEventListener("mousemove", function (e) {
    mousePosition.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePosition.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform = `rotateX(${mousePosition.y * 5}deg) rotateY(${
      mousePosition.x * 5
    }deg)`;
  });

  window.addEventListener("resize", resizeHandler);

  stageElem.addEventListener("click", function (e) {
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
      speed: Math.random() * 0.7,
    });
  });

  selectCharacterElem.addEventListener("click", function (e) {
    const value = e.target.getAttribute("data-char");
    document.body.setAttribute("data-char", value);
  });

  resizeHandler();
})();
