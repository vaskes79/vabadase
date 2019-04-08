import {dom} from './dom';
import simulant from 'jsdom-simulant';
import 'jest-extended';

// global variables
global.document.body.innerHTML = dom;

global.simulaitClick = elem => {
  const event = simulant(window, 'click');
  simulant.fire(elem, event);
};

global.resizeTo = (width, height) => {
  const event = simulant(window, 'resize');
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = height || global.window.innerHeight;

  simulant.fire(window, event);
};

// throw error then get any error
console.error = message => {
  throw new Error(message);
};
