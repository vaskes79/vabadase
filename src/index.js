import Nav from './js/Nav.js';
import './sass/main.scss'

const nav = new Nav('.nav', 'nav--close', '.nav__logo', '.nav__link');

nav.init();
