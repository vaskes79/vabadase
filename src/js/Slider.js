class Slider {
  constructor(elem, btnL, btnR, slides, activeModifire, hideSlideModifire) {
    this.elem = document.querySelector(elem);
    this.btnL = document.querySelector(btnL);
    this.btnR = document.querySelector(btnR);
    this.slides = this.elem.querySelectorAll(slides);
    this.slidesContainer = this.slides[0].parentNode;
    this.activeSlide = this.elem.querySelector(`.${activeModifire}`);
    this.activeModifire = activeModifire;
    this.hideModifire = hideSlideModifire;
    this.angledeg = 0;

    this.init = this.init.bind(this);
    this.handlerBtnR = this.handlerBtnR.bind(this);
    this.handlerBtnL = this.handlerBtnL.bind(this);
    this.rotateContainer = this.rotateContainer.bind(this);
  }

  init() {
    this.eventHandlers();
  }

  rotateContainer(angledeg) {
    this.slidesContainer.style.cssText = `
        -webkit-transform: rotateY(${angledeg}deg);
        -moz-transform: rotateY(${angledeg}deg);
        -o-transform: rotateY(${angledeg}deg);
        -ms-transform: rotateY(${angledeg}deg);
        transform: rotateY(${angledeg}deg);
    `;
  }

  handlerBtnL() {
    let currentSlide = this.activeSlide;
    let angledeg = this.angledeg;
    currentSlide.classList.toggle(this.activeModifire);

    if (this.slidesContainer.firstChild === this.activeSlide) {
      angledeg = -180 * this.slides.length + 180;
      currentSlide = this.slidesContainer.lastChild;
    } else {
      angledeg = angledeg + 180;
      currentSlide = this.activeSlide.previousSibling;
    }

    currentSlide.classList.toggle(this.activeModifire);
    this.rotateContainer(angledeg);
    this.angledeg = angledeg;
    this.activeSlide = currentSlide;
  }

  handlerBtnR() {
    let currentSlide = this.activeSlide;
    let angledeg = this.angledeg;
    currentSlide.classList.toggle(this.activeModifire);

    if (this.slidesContainer.lastChild === this.activeSlide) {
      angledeg = 0;
      currentSlide = this.slidesContainer.firstChild;
    } else {
      angledeg = angledeg - 180;
      currentSlide = this.activeSlide.nextSibling;
    }

    currentSlide.classList.toggle(this.activeModifire);
    this.rotateContainer(angledeg);
    this.angledeg = angledeg;
    this.activeSlide = currentSlide;
  }

  eventHandlers() {
    this.btnL.addEventListener('click', this.handlerBtnL);
    this.btnR.addEventListener('click', this.handlerBtnR);
  }
}

export default Slider;
