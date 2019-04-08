class Nav {
  constructor(
    nav = '.nav',
    activeModifire = 'nav--close',
    btn = '.nav__logo',
    linksContainer = '.nav__list'
  ) {
    this.nav = document.querySelector(nav);
    this.btn = document.querySelector(btn);
    this.links = document.querySelector(linksContainer);
    this.activeModifire = activeModifire;
  }

  addHandlers() {
    this.nav.classList.add(this.activeModifire);
    this.btn.addEventListener('click', this.clickHandler);
    this.links.addEventListener('click', this.clickHandler);
  }

  removeHandlers() {
    this.nav.classList.remove(this.activeModifire);
    this.btn.removeEventListener('click', this.clickHandler);
    this.links.removeEventListener('click', this.clickHandler);
  }

  resizeHandler = () => {
    window.addEventListener('resize', e => {
      let width = e.currentTarget.innerWidth;
      if (width >= 900) {
        this.removeHandlers();
      } else if (width < 900) {
        this.addHandlers();
      }
    });
  };

  clickHandler = () => {
    this.nav.classList.toggle(this.activeModifire);
  };

  init() {
    if (window.innerWidth < 900) {
      this.nav.classList.add(this.activeModifire);
      this.addHandlers();
    }

    this.resizeHandler();
  }
}

export default Nav;
