import Nav from './Nav';
let nav = null;
let mock = null;
let clickHandlerMock = null;

beforeEach(() => {
  nav = new Nav();
  nav.init();
  mock = jest.fn();
  clickHandlerMock = jest.spyOn(nav, 'clickHandler');
});

afterEach(() => {
  nav = null;
  mock = null;
  clickHandlerMock = null;
});

describe('Create instance and render', () => {
  it('expect that nav instance of Nav', () => {
    expect(nav instanceof Nav).toBeTruthy();
  });

  it('render components into DOM', () => {
    expect(nav).toMatchSnapshot();
  });
});

describe('props', () => {
  describe('default props', () => {
    it('this.nav exists has class .nav', () => {
      expect(nav.nav).not.toBeNil();
      expect(nav.nav.classList.contains('nav')).toBeTrue();
    });

    it('this.btn exists has class .nav__logo', () => {
      expect(nav.btn).not.toBeNil();
      expect(nav.btn.classList.contains('nav__logo')).toBeTrue();
    });

    it('this.links exists has class .nav__logo', () => {
      expect(nav.links).not.toBeNil();
      expect(nav.links.classList.contains('nav__list')).toBeTrue();
    });

    it('this.activeModifire exists has value nav--close', () => {
      expect(nav.activeModifire).not.toBeNil();
      expect(nav.activeModifire).toBeString();
      expect(nav.activeModifire).toBe('nav--close');
    });
  });
});

describe('methods', () => {
  const listMethods = [
    'addHandlers',
    'removeHandlers',
    'resizeHandler',
    'clickHandler',
    'init',
  ];

  listMethods.forEach(method => {
    describe(`${method}`, () => {
      it(`${method} exists`, () => {
        expect(nav[method]).toBeFunction();
      });

      it(`${method} toBeCalled`, () => {
        nav[method] = mock;
        nav[method]();
        expect(nav[method]).toBeCalled();
      });
    });
  });
});

describe('events', () => {
  it(`resize: innerWidth < 900`, () => {
    resizeTo(890);
    expect(nav.nav.classList.contains('nav--close')).toBeTrue();
  });

  it(`resize: innerWidth > 900`, () => {
    resizeTo(910);
    expect(nav.nav.classList.contains('nav--close')).toBeFalse();
  });

  it(`nav.btn: click`, () => {
    resizeTo(890);
    simulaitClick(nav.btn);
    expect(clickHandlerMock).toBeCalled();
    expect(clickHandlerMock).toHaveBeenCalledTimes(1);
  });

  it(`nav.links: click`, () => {
    resizeTo(890);
    simulaitClick(nav.links);
    expect(clickHandlerMock).toBeCalled();
    expect(clickHandlerMock).toHaveBeenCalledTimes(1);
  });
});
