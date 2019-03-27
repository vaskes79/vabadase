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

    this.openHandler = this.openHandler.bind(this);
    this.createImgItem = this.createImgItem.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.showControlls = this.showControlls.bind(this);
    this.previousHandler = this.previousHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }
  createItems() {
    let {items, createImgItem, viewBox, dataItems, wrapItemsClassName} = this;
    // 1. create array
    dataItems = [].map.call(items, item => {
      const {
        href: src,
        dataset: {allt, index, description},
      } = item;
      return {
        src,
        allt,
        index,
        description,
      };
    });
    // 2. create elemen wrapItems
    let wrapItems = document.createElement('div');
    wrapItems.className = wrapItemsClassName;
    // 3. create elements imgItems and add to this.wrapItems
    dataItems.forEach(item => {
      wrapItems.appendChild(createImgItem(item));
    });
    // 4. get container items link and add this.wrapItems
    viewBox.appendChild(wrapItems);
    // update this
    this.wrapItems = document.querySelector('.' + wrapItemsClassName);
    this.dataItems = dataItems;
    // 5. set
    this.endPos = dataItems.length - 1;
    // 6. set
    this.startPos = 0;
    console.log(this);
  }

  createImgItem({src, allt, index, description}) {
    const {imgShowClassName} = this;

    const imgItem = document.createElement('img');
    imgItem.src = src;
    imgItem.setAttribute('className', imgShowClassName);
    imgItem.setAttribute('allt', allt);
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
    } = this;

    // 1. set handlers for open gallery events
    container.addEventListener('click', openHandler);
    // 2. set handlers for close events
    btnClose.addEventListener('click', closeHandler);
    // 3. set handlers for controls events
    btnPrevious.addEventListener('click', previousHandler);
    btnNext.addEventListener('click', nextHandler);
    // 4. set handlers for keyboard events
  }

  openHandler(e) {
    // console.log('openHandler is working');
    e.preventDefault();
    let {
      openHandler,
      setCurrentPosition,
      modifires: {open},
      gallery,
    } = this;

    // 0. block scroll
    document.body.style.cssText = 'overflow: hidden';
    // 1. get index
    let currentItem;
    switch (e.target.tagName) {
      case 'A':
        currentItem = e.target;
        break;
      case 'IMG':
        currentItem = e.target.parentNode;
        break;
    }
    // 2. set this.currentIndex
    this.currentIndex = parseInt(currentItem['dataset']['index']);
    // 3. set position wrapItems
    setCurrentPosition();
    // 4. show gallery
    gallery.classList.add(open);
  }

  closeHandler(e) {
    let {
      modifires: {open},
      gallery,
    } = this;

    gallery.classList.remove(open);
    // 0. block scroll
    document.body.style.cssText = 'overflow: auto';
  }

  nextHandler(e) {
    console.log('nextHandler is working');
    this.currentIndex++;
    this.setCurrentPosition();
  }

  previousHandler(e) {
    console.log('previousHandler is working');
    this.currentIndex--;
    this.setCurrentPosition();
  }

  keyboardHandlers(e) {
    console.log('keyboardHandlers is working');
  }

  setCurrentPosition() {
    let {showControlls, currentIndex, startPos, endPos} = this;
    // 1. calculate
    let offset = currentIndex * -100;
    // 4. condition
    if (currentIndex <= startPos) offset = 0;
    if (currentIndex >= endPos) offset = endPos * -100;
    // 5. update value
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
