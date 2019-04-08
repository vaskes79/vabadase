import {dom} from './dom';
import 'jest-extended';

// global variables
global.document.body.innerHTML = dom;

// Simulate window resize event
const resizeEvent = document.createEvent('Event');
resizeEvent.initEvent('resize', true, true);

global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = height || global.window.innerHeight;
  global.window.dispatchEvent(resizeEvent);
};

// throw error then get any error
console.error = message => {
  throw new Error(message);
};
