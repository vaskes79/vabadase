import {dom} from './dom';
import 'jest-extended';

// global variables
global.document.body.innerHTML = dom;

// throw error then get any error
console.error = message => {
  throw new Error(message);
};
