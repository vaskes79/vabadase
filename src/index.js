import Nav from './js/Nav';
import Slider from './js/Slider';
import Gallery from './js/Gallery';
import './sass/main.scss';

const nav = new Nav('.nav', 'nav--close', '.nav__logo', '.nav__link');
const slider = new Slider(
  '.slider',
  '.slider__left-btn',
  '.slider__right-btn',
  '.slider__slide',
  'slider__slide--active',
  'slider__slide--hide',
);

const gallery = new Gallery();

nav.init();
slider.init();
gallery.init();

