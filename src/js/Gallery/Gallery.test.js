import Gallery from './Gallery';
let gallery = null;
let mock = null;
let clickHandlerMockL = null;

beforeEach(() => {
  gallery = new Gallery();
  // clickHandlerMockL = jest.spyOn(gallery, 'handlerBtnL');
  gallery.init();
  mock = jest.fn();
});

afterEach(() => {
  gallery = null;
  mock = null;
  clickHandlerMockL = null;
});

describe(`Create instance and render`, () => {
  it(`expect that gallery instance of Gallery`, () => {
    expect(gallery instanceof Gallery).toBeTruthy();
  });

  it(`render components into DOM`, () => {
    expect(gallery).toMatchSnapshot();
  });
});
