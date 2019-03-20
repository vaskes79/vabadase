class Nav {
  constructor(elem, activeClass, btn, links) {
    this.elem = document.querySelector(elem);
    this.btn = document.querySelector(btn);
    this.links = document.querySelectorAll(links);
    this.activeClass = activeClass;

    this.clickHandler = this.clickHandler.bind(this);
  }

  init() {
    this.elem.classList.add(this.activeClass);
    this.btn.addEventListener('click', this.clickHandler);

    this.links.forEach(link =>
      link.addEventListener('click', this.clickHandler),
    );
  }

  clickHandler() {
    this.elem.classList.toggle(this.activeClass);
  }
}

export default Nav;
