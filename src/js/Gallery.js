class Gallery {
  constructor(
    rootElem = '.gallery-items',
    openModifire = 'gallery-items--open',
    itemsContainer = '.gallery-items__container',
    items = '.gallery-items__item',
    itemLinks = '.gallery-items__link',
    closeBtn = '.gallery-items__btn-close',
    nextBtn = '.gallery-items__btn-R',
    previousBtn = '.gallery-items__btn-L',
    currentImg = '.gallery-items__img-show'
  ) {
    this.rootElem = document.querySelector(rootElem);
    this.openModifire = openModifire;

    this.itemsContainer = document.querySelector(itemsContainer);
    this.items = document.querySelectorAll(items);
    this.itemLinks = document.querySelectorAll(itemLinks);

    this.closeBtn = document.querySelector(closeBtn);
    this.nextBtn = document.querySelector(nextBtn);
    this.previousBtn = document.querySelector(previousBtn);

    this.currentImg = document.querySelector(currentImg);

    this.openHandler = this.openHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  init() {
    this.setHandlers();
    this.createStorageImages();
  }

  createStorageImages() {
    this.storageImages = [].map.call(this.itemLinks, item => item.href);
  }

  nextHandler(imgSrc) {
    console.log('nextBtn');
    if (imgSrc) {
      this.nextBtn.style.cssText = 'opacity: 1; cursor: pointer;';
      // this.nextImg.src = imgSrc;
    }
  }

  previousHandler(imgSrc) {
    console.log('previousBtn');
    if (imgSrc) {
      this.previousBtn.style.cssText = 'opacity: 1; cursor: pointer;';
      // this.previousImg.src = imgSrc;
    }
  }

  openHandler(e) {
    e.preventDefault();
    let currentImg, previousImg, nextImg, currentImgIndex, storImg;
    storImg = this.storageImages;

    switch (e.target.tagName) {
      case 'A':
        currentImg = e.target;
        break;
      case 'IMG':
        currentImg = e.target.parentNode;
        break;
    }

    currentImgIndex = storImg.findIndex(item => item === currentImg.href);

    previousImg = currentImgIndex === 0 ? null : storImg[currentImgIndex - 1];
    nextImg =
      currentImgIndex === storImg.length - 1
        ? null
        : storImg[currentImgIndex + 1];

    this.currentImg.src = currentImg.href;

    this.previousHandler(previousImg);
    this.nextHandler(nextImg);
    this.rootElem.classList.add(this.openModifire);
    document.body.style.cssText = 'overflow: hidden';
  }

  closeHandler() {
    this.rootElem.classList.remove(this.openModifire);
    this.previousBtn.style.cssText = 'opacity: 0; cursor: none';
    this.nextBtn.style.cssText = 'opacity: 0; cursor: none';
    document.body.style.cssText = 'overflow: visible';
  }

  setHandlers() {
    this.itemsContainer.addEventListener('click', this.openHandler);
    this.closeBtn.addEventListener('click', this.closeHandler);
    this.nextBtn.addEventListener('click', this.nextHandler);
    this.previousBtn.addEventListener('click', this.previousHandler);

    document.addEventListener('keydown', e => {
      if (e.keyCode === 27 || e.which === 27) {
        this.closeHandler();
      }
    });
  }
}

export default Gallery;
