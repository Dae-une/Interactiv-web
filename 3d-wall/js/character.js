class Character {
  constructor(info) {
    this.mainElem = document.createElement("div");
    this.mainElem.classList.add("character");
    this.mainElem.innerHTML = `
        <div class="character">
          <div class="character-face-con character-head">
            <div class="character-face character-head-face face-front"></div>
            <div class="character-face character-head-face face-back"></div>
          </div>
          <div class="character-face-con character-torso">
            <div class="character-face character-torso-face face-front"></div>
            <div class="character-face character-torso-face face-back"></div>
          </div>
          <div class="character-face-con character-arm character-arm-right">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
          </div>
          <div class="character-face-con character-arm character-arm-left">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
          </div>
          <div class="character-face-con character-leg character-leg-right">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
          </div>
          <div class="character-face-con character-leg character-leg-left">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
          </div>
        </div>`;
    document.querySelector(".stage").appendChild(this.mainElem);

    this.mainElem.style.left = `${info.xPos}%`;
    this.xPos = info.xPos;
    this.runningState;
    this.scrollState = false;
    this.lastScrollTop = 0;
    this.speed = info.speed;
    this.direction;
    this.animationId;

    this.init();
  }
}

Character.prototype.init = function () {
  const self = this;
  self.lastScrollTop = scrollY;
  window.addEventListener("scroll", function () {
    clearTimeout(self.scrollState);

    if (!self.scrollState) {
      self.mainElem.classList.add("running");
      self.scrollState = true;
    }

    self.scrollState = this.setTimeout(function () {
      self.scrollState = false;
      self.mainElem.classList.remove("running");
    }, 500);

    if (self.lastScrollTop > scrollY) {
      self.mainElem.setAttribute("data-direction", "backward");
    } else {
      self.mainElem.setAttribute("data-direction", "forward");
    }
  });

  let keydonw = false;
  window.addEventListener("keydown", function (e) {
    if (keydonw) return;

    if (self.runningState) return;
    if (e.code === "ArrowLeft") {
      keydonw = true;
      self.direction = "left";
      self.mainElem.setAttribute("data-direction", "left");
      self.mainElem.classList.add("running");
      self.run();
      self.runningState = true;
    } else if (e.code === "ArrowRight") {
      keydonw = true;
      self.direction = "right";
      self.mainElem.setAttribute("data-direction", "right");
      self.mainElem.classList.add("running");
      self.run();
      self.runningState = true;
    }
  });

  window.addEventListener("keyup", function (e) {
    self.mainElem.classList.remove("running");
    cancelAnimationFrame(self.animationId);
    self.runningState = false;
    keydonw = false;
  });
};

Character.prototype.run = function () {
  const self = this;

  if (self.direction === "left") {
    self.xPos -= self.speed;
  } else if (self.direction === "right") {
    self.xPos += self.speed;
  }

  if (self.xPos < 2) {
    self.xPos = 2;
  }
  if (self.xPos >= 88) {
    self.xPos = 88;
  }
  self.mainElem.style.left = `${self.xPos}%`;

  self.animationId = requestAnimationFrame(self.run.bind(self));
};
