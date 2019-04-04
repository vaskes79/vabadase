class Slider {
  constructor(
    slider = '.slider',
    btnL = '.slider__left-btn',
    btnR = '.slider__right-btn',
    slides = '.slider__slide',
    activeModifire = 'slider__slide--active'
  ) {
    this.slider = document.querySelector(slider);
    this.btnL = this.slider.querySelector(btnL);
    this.btnR = this.slider.querySelector(btnR);
    this.slides = this.slider.querySelectorAll(slides);
    this.slidesContainer = this.slides[0].parentNode;
    this.activeSlide = this.slider.querySelector(`.${activeModifire}`);
    this.activeModifire = activeModifire;
    this.angledeg = 0;
  }

  rotateContainer = angledeg => {
    this.slidesContainer.style.cssText = `
        -webkit-transform: rotateY(${angledeg}deg);
        -moz-transform: rotateY(${angledeg}deg);
        -o-transform: rotateY(${angledeg}deg);
        -ms-transform: rotateY(${angledeg}deg);
        transform: rotateY(${angledeg}deg);
    `;
  };

  handlerBtnL = () => {
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
  };

  handlerBtnR = () => {
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
  };

  setHandlers() {
    this.btnL.addEventListener('click', this.handlerBtnL);
    this.btnR.addEventListener('click', this.handlerBtnR);
  }

  init() {
    this.setHandlers();
  }
}

export default Slider;
