import Nav from './js/Nav';
import Slider from './js/Slider';
import Gallery from './js/Gallery';
import Form from './js/Form';
import Map from './js/Map';
import './sass/main.scss';

const nav = new Nav('.nav', 'nav--close', '.nav__logo', '.nav__link');
const slider = new Slider(
  '.slider',
  '.slider__left-btn',
  '.slider__right-btn',
  '.slider__slide',
  'slider__slide--active',
  'slider__slide--hide'
);

const gallery = new Gallery();
const form = new Form();
const map = new Map();

nav.init();
slider.init();
gallery.init();
form.init();
map.init();
