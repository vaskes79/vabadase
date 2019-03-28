class Gallery {
  constructor(gal = '.gallery-items') {
    this.gallery = document.querySelector(gal);
    this.items = document.querySelectorAll(`${gal}__link`);
    this.viewBox = document.querySelector(`${gal}__img-view`);
    this.btnClose = document.querySelector(`${gal}__btn-close`);
    this.btnPrevious = document.querySelector(`${gal}__btn-L`);
    this.btnNext = document.querySelector(`${gal}__btn-R`);
    this.container = document.querySelector(`${gal}__container`);

    this.wrapItemsClassName = `${gal.slice(1)}__wrap-items`;
    this.imgShowClassName = `${gal.slice(1)}__img-show`;
    this.modifires = {
      open: `${gal}--open`.slice(1),
    };

    this.dataItems = [];
    this.widthGallery = 900;

    this.openHandler = this.openHandler.bind(this);
    this.createImgItem = this.createImgItem.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.showControlls = this.showControlls.bind(this);
    this.previousHandler = this.previousHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
    this.keyboardHandlers = this.keyboardHandlers.bind(this);
  }
  createItems() {
    let {items, createImgItem, viewBox, dataItems, wrapItemsClassName} = this;
    dataItems = [].map.call(items, item => {
      const {
        href: src,
        dataset: {alt, index, description},
      } = item;
      return {
        src,
        alt,
        index,
        description,
      };
    });
    let wrapItems = document.createElement('div');
    wrapItems.className = wrapItemsClassName;
    dataItems.forEach(item => {
      wrapItems.appendChild(createImgItem(item));
    });
    viewBox.appendChild(wrapItems);

    this.wrapItems = document.querySelector('.' + wrapItemsClassName);
    this.dataItems = dataItems;
    this.endPos = dataItems.length - 1;
    this.startPos = 0;
  }

  createImgItem({src, alt, index, description}) {
    const {imgShowClassName} = this;
    const imgItem = document.createElement('img');

    imgItem.src = src;
    imgItem.setAttribute('class', imgShowClassName);
    imgItem.setAttribute('alt', alt);
    imgItem.dataset['index'] = index;
    imgItem.dataset['description'] = description;

    return imgItem;
  }

  setHandlers() {
    let {
      openHandler,
      closeHandler,
      nextHandler,
      previousHandler,
      keyboardHandlers,
      btnClose,
      btnPrevious,
      btnNext,
      container,
      showGallery,
      widthGallery,
    } = this;

    if (window.innerWidth >= this.widthGallery) {
      container.addEventListener('click', openHandler);
      btnClose.addEventListener('click', closeHandler);
      btnPrevious.addEventListener('click', previousHandler);
      btnNext.addEventListener('click', nextHandler);
      window.addEventListener('keydown', keyboardHandlers);
    }

    window.addEventListener('resize', ({target: {innerWidth}}) => {
      if (innerWidth >= widthGallery) {
        container.addEventListener('click', openHandler);
        btnClose.addEventListener('click', closeHandler);
        btnPrevious.addEventListener('click', previousHandler);
        btnNext.addEventListener('click', nextHandler);
        window.addEventListener('keydown', keyboardHandlers);
      } else {
        container.removeEventListener('click', openHandler);
        btnClose.removeEventListener('click', closeHandler);
        btnPrevious.removeEventListener('click', previousHandler);
        btnNext.removeEventListener('click', nextHandler);
        window.removeEventListener('keydown', keyboardHandlers);
      }
    });
  }

  openHandler(e) {
    e.preventDefault();
    let {
      openHandler,
      setCurrentPosition,
      modifires: {open},
      gallery,
    } = this;

    document.body.style.cssText = 'overflow: hidden';
    let currentItem;
    switch (e.target.tagName) {
      case 'A':
        currentItem = e.target;
        break;
      case 'IMG':
        currentItem = e.target.parentNode;
        break;
    }
    this.currentIndex = parseInt(currentItem['dataset']['index']);
    setCurrentPosition();
    gallery.classList.add(open);
  }

  closeHandler(e) {
    let {
      modifires: {open},
      gallery,
    } = this;

    gallery.classList.remove(open);
    document.body.style.cssText = 'overflow: auto';
  }

  nextHandler(e) {
    this.currentIndex++;
    this.setCurrentPosition();
  }

  previousHandler(e) {
    this.currentIndex--;
    this.setCurrentPosition();
  }

  keyboardHandlers(e) {
    let {keyCode, which} = e;
    let {
      setCurrentPosition,
      gallery,
      modifires: {open},
    } = this;
    let galleryIsOpen = gallery.classList.contains(open);
    // esc, q
    let closeKeys = [27, 81];
    // h, →
    let prevKeys = [72, 37];
    // h, ←
    let nextKeys = [76, 39];
    let isClose = closeKeys.includes(keyCode) || closeKeys.includes(which);
    let isPrev = prevKeys.includes(keyCode) || prevKeys.includes(which);
    let isNext = nextKeys.includes(keyCode) || nextKeys.includes(which);

    if (isClose && galleryIsOpen) {
      gallery.classList.remove(open);
    }
    if (isPrev && galleryIsOpen) {
      this.currentIndex--;
      setCurrentPosition();
    }
    if (isNext && galleryIsOpen) {
      this.currentIndex++;
      setCurrentPosition();
    }
  }

  setCurrentPosition() {
    let {showControlls, currentIndex, startPos, endPos} = this;
    let offset = currentIndex * -100;

    if (currentIndex <= startPos) offset = 0;
    if (currentIndex >= endPos) offset = endPos * -100;
    this.wrapItems.style.cssText = `transform: translateX(${offset}%);`;
    showControlls();
  }

  showControlls() {
    let {currentIndex, endPos, btnPrevious, btnNext} = this;
    btnPrevious.style.cssText = 'cursor: pointer; opacity: 1; visible: visible';
    btnNext.style.cssText = 'cursor: pointer; opacity: 1; visible: visible';
    if (currentIndex <= 0) {
      btnPrevious.style.cssText = 'opacity: 0; visible: hidden';
      this.currentIndex = 0;
    }
    if (currentIndex >= endPos) {
      btnNext.style.cssText = 'opacity: 0; visible: hidden';
      this.currentIndex = endPos;
    }
  }

  init() {
    this.createItems();
    this.setHandlers();
  }
}

export default Gallery;
