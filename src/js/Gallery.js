class Gallery {
  constructor(
    elem = '.gallery-items',
    galleryItems = '.gallery-items__item',
    activeModifire = 'gallery-items--active',
    classNameLink = '.gallery-items__link'
  ) {
    this.elem = document.querySelector(elem);
    this.galleryItems = document.querySelectorAll(galleryItems);
    this.linkName = classNameLink;
    this.activeModifire = activeModifire;

    this.init = this.init.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  init() {
    console.log(this);
    this.setHandlers();
  }

  clickHandler(e) {
    e.preventDefault();

    this.galleryItems.forEach(item =>
      item.classList.remove(this.activeModifire)
    );

    e.target.parentNode.parentNode.classList.add(this.activeModifire);
  }

  setHandlers() {
    this.galleryItems.forEach(item => {
      item
        .querySelector(this.linkName)
        .addEventListener('click', this.clickHandler);
    });
  }
}

export default Gallery;
