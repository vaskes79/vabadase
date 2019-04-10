import Map from './Map';

let map = null;
let mock = null;
let clickHandlerMockL = null;

beforeEach(() => {
  map = new Map();
  // clickHandlerMockL = jest.spyOn(map, 'handlerBtnL');
  map.init();
  mock = jest.fn();
});

afterEach(() => {
  map = null;
  mock = null;
  clickHandlerMockL = null;
});

describe(`Create instance and render`, () => {
  it(`expect that map instance of Map`, () => {
    expect(map instanceof Map).toBeTruthy();
  });

  it(`render components into DOM`, () => {
    expect(map).toMatchSnapshot();
  });
});
