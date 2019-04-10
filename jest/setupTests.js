import {dom} from './dom';
import simulant from 'jsdom-simulant';
import 'jest-extended';

// global variables
global.document.body.innerHTML = dom;

global.map = {};

window.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});

global.simulaitClick = elem => {
  let event = simulant(window, 'click');
  simulant.fire(elem, event);
};

// throw error then get any error
console.error = message => {
  throw new Error(message);
};
