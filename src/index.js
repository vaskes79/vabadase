import Nav from './js/Nav';
import Slider from './js/Slider';
import Gallery from './js/Gallery';
import Form from './js/Form';
import Map from './js/Map';
import './sass/main.scss';

const slider = new Slider();
const nav = new Nav();
const form = new Form();

nav.init();
slider.init();
form.init();

if (window.innerWidth >= 900) {
  const gallery = new Gallery();
  const map = new Map();
  gallery.init();
  map.init();
}
