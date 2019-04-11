import {dom} from './dom';
import simulant from 'jsdom-simulant';
import fetch from 'jest-fetch-mock';
import 'jest-extended';
global.mock = null;

// global variables
global.document.body.innerHTML = dom;

global.map = {};
global.fetch = fetch;
window.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});

global.simulaitClick = elem => {
  let event = simulant(window, 'click');
  simulant.fire(elem, event);
};

beforeEach(() => {
  mock = jest.fn();
});

afterEach(() => {
  window.innerWidth = 1200;
  mock = null;
});

// throw error then get any error
console.error = message => {
  throw new Error(message);
};
