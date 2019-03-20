class Nav {
  constructor(elem, activeClass, btn, links) {
    this.elem = document.querySelector(elem);
    this.btn = document.querySelector(btn);
    this.links = document.querySelectorAll(links);
    this.activeClass = activeClass;

    this.clickHandler = this.clickHandler.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  init() {
    if (window.innerWidth < 900) {
      this.elem.classList.add(this.activeClass);
    }
    this.btn.addEventListener('click', this.clickHandler);

    this.resizeHandler();

    this.links.forEach(link =>
      link.addEventListener('click', this.clickHandler),
    );
  }

  resizeHandler() {
    window.addEventListener('resize', e => {
      let width = e.currentTarget.innerWidth;
      if (width >= 900) {
        this.elem.classList.remove(this.activeClass);
      } else if (width <= 900) {
        this.elem.classList.add(this.activeClass);
      }
    });
  }

  clickHandler() {
    this.elem.classList.toggle(this.activeClass);
  }
}

export default Nav;
