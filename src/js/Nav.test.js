import Nav from './Nav';
let nav = null;

beforeEach(() => {
  nav = new Nav();
});

afterEach(() => {
  nav = null;
});

describe('create instance', () => {
  it('expect that nav instance of Nav', () => {
    expect(nav instanceof Nav).toBeTruthy();
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

  // describe('user props', () => {
  //     let user = new Nav( '.user', 'user--close', '.user__logo', '.user__list' );

  //   it('this.user exists has class .user', () => {
  //     expect(user.user).not.toBeNil();
  //     expect(user.user.classList.contains('user')).toBeTrue();
  //   });

  //   it('this.btn exists has class .user__logo', () => {
  //     expect(user.btn).not.toBeNil();
  //     expect(user.btn.classList.contains('user__logo')).toBeTrue();
  //   });

  //   it('this.links exists has class .user__logo', () => {
  //     expect(user.links).not.toBeNil();
  //     expect(user.links.classList.contains('user__list')).toBeTrue();
  //   });

  //   it('this.activeModifire exists has value user--close', () => {
  //     expect(user.activeModifire).not.toBeNil();
  //     expect(user.activeModifire).toBeString();
  //     expect(user.activeModifire).toBe('user--close');
  //   });
  // })
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
    it(`${method} exists`, () => {
      expect(nav[method]).toBeFunction();
    });
  });
});
