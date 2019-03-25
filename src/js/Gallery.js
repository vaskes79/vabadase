class Gallery {
  constructor(
    rootElem = '.gallery-items',
    items = '.gallery-items__item',
    itemsContainer = '.gallery-items__container',
    openModifire = 'gallery-items--open',
    links = '.gallery-items__link',
    nextBtn = '.gallery-items__btn-R',
    previousBtn = '.gallery-items__btn-L',
    closeBtn = '.gallery-items__btn-close',
    imgShow = '.gallery-items__img-show'
  ) {
    this.rootElem = document.querySelector(rootElem);
    this.items = document.querySelectorAll(items);
    this.closeBtn = document.querySelector(closeBtn);
    this.nextBtn = document.querySelector(nextBtn);
    this.previousBtn = document.querySelector(previousBtn);
    this.itemsContainer = document.querySelector(itemsContainer);
    this.imgShow = document.querySelector(imgShow);
    this.linkName = links;
    this.openModifire = openModifire;

    this.init = this.init.bind(this);
    this.openHandler = this.openHandler.bind(this);
    this.setHandlers = this.setHandlers.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
    this.previousHandler = this.previousHandler.bind(this);
  }

  init() {
    this.setHandlers();
  }

  nextHandler() {
    console.log('next');
  }

  previousHandler() {
    console.log('previous');
  }

  openHandler(e) {
    e.preventDefault();

    switch (e.target.tagName) {
      case 'A':
        this.imgShow.src = e.target.href;
        break;
      case 'IMG':
        this.imgShow.src = e.target.parentNode.href;
        break;
    }

    this.rootElem.classList.add(this.openModifire);
  }

  closeHandler() {
    this.rootElem.classList.remove(this.openModifire);
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
