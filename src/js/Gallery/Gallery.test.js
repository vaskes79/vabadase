import Gallery from './Gallery';
let gallery = null;
let mock = null;
let clickHandlerMockL = null;
let clickHandlerMockR = null;
let openHandlerMock = null;

const ROOT_CLASS = 'gallery-items';
const ITEMS_CLASS = `${ROOT_CLASS}__link`;
const VIEW_BOX_CLASS = `${ROOT_CLASS}__img-view`;
const BTN_CLOSE_CLASS = `${ROOT_CLASS}__btn-close`;
const BTN_PREVIOUS_CLASS = `${ROOT_CLASS}__btn-L`;
const BTN_NEXT_CLASS = `${ROOT_CLASS}__btn-R`;
const CONTAINER_CLASS = `${ROOT_CLASS}__container`;
const WRAP_ITEMS_CLASS = `${ROOT_CLASS}__wrap-items`;
const IMG_SHOW_CLASS = `${ROOT_CLASS}__img-show`;
const MODIFIRE_OPEN_CLASS = `${ROOT_CLASS}--open`;

beforeEach(() => {
  gallery = new Gallery();
  clickHandlerMockL = jest.spyOn(gallery, 'previousHandler');
  clickHandlerMockR = jest.spyOn(gallery, 'nextHandler');
  openHandlerMock = jest.spyOn(gallery, 'openHandler');
  gallery.init();
  mock = jest.fn();
});

afterEach(() => {
  gallery = null;
  mock = null;
  clickHandlerMockL = null;
  clickHandlerMockR = null;
  openHandlerMock = null;
});

describe(`Create instance and render`, () => {
  it(`expect that gallery instance of Gallery`, () => {
    expect(gallery instanceof Gallery).toBeTruthy();
  });

  it(`render components into DOM`, () => {
    expect(gallery).toMatchSnapshot();
  });
});

describe(`props`, () => {
  describe(`default props`, () => {
    it(`this.gallery exists has class ${ROOT_CLASS}`, () => {
      let elem = gallery.gallery;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(ROOT_CLASS)).toBeTrue();
    });

    it(`this.items collection exists has class ${ITEMS_CLASS}`, () => {
      let elem = gallery.items;
      expect(elem).not.toBeNil();
      [].forEach.call(elem, item => {
        expect(item.classList.contains(ITEMS_CLASS)).toBeTrue();
      });
    });

    it(`this.viewBox exists has class ${VIEW_BOX_CLASS}`, () => {
      let elem = gallery.viewBox;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(VIEW_BOX_CLASS)).toBeTrue();
    });

    it(`this.btnClose exists has class ${BTN_CLOSE_CLASS}`, () => {
      let elem = gallery.btnClose;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(BTN_CLOSE_CLASS)).toBeTrue();
    });

    it(`this.btnPrevious exists has class ${BTN_PREVIOUS_CLASS}`, () => {
      let elem = gallery.btnPrevious;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(BTN_PREVIOUS_CLASS)).toBeTrue();
    });

    it(`this.btnNext exists has class ${BTN_NEXT_CLASS}`, () => {
      let elem = gallery.btnNext;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(BTN_NEXT_CLASS)).toBeTrue();
    });

    it(`this.container exists has class ${CONTAINER_CLASS}`, () => {
      let elem = gallery.container;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(CONTAINER_CLASS)).toBeTrue();
    });

    it(`this.wrapItemsClassName exists has class ${WRAP_ITEMS_CLASS}`, () => {
      let elem = gallery.wrapItemsClassName;
      expect(elem).not.toBeNil();
      expect(elem).toBeString();
      expect(elem).toEqual(WRAP_ITEMS_CLASS);
    });

    it(`this.imgShowClassName exists has class ${IMG_SHOW_CLASS}`, () => {
      let elem = gallery.imgShowClassName;
      expect(elem).not.toBeNil();
      expect(elem).toBeString();
      expect(elem).toEqual(IMG_SHOW_CLASS);
    });

    it(`this.modifiers exists has class ${MODIFIRE_OPEN_CLASS}`, () => {
      let elem = gallery.modifiers;
      expect(elem).not.toBeNil();
      expect(elem).toBeObject();
      expect(elem.open).toEqual(MODIFIRE_OPEN_CLASS);
    });

    it(`this.dataItems exists and contain 10 object`, () => {
      let data = gallery.dataItems;
      expect(data).not.toBeNil();
      expect(data).toBeArray();
      expect(data.length).toEqual(10);
    });

    it(`this.widthGallery exists and contain number value 900`, () => {
      let elem = gallery.widthGallery;
      expect(elem).not.toBeNil();
      expect(elem).toBeNumber();
      expect(elem).toEqual(900);
    });
  });
});

describe('methods', () => {
  const listMethods = [
    'createItems',
    'createImgItem',
    'addEventHandlers',
    'removeEventHandlers',
    'setHandlers',
    'openHandler',
    'closeHandler',
    'nextHandler',
    'previousHandler',
    'keyboardHandlers',
    'setCurrentPosition',
    'showControlls',
    'init',
  ];

  listMethods.forEach(method => {
    describe(`${method}`, () => {
      it(`${method} exists`, () => {
        expect(gallery[method]).toBeFunction();
      });

      it(`${method} toBeCalled`, () => {
        gallery[method] = mock;
        gallery[method]();
        expect(gallery[method]).toBeCalled();
      });

      if (method === 'setCurrentPosition') {
        it(`${method} wrapItems === -200px`, () => {
          let imgElem = gallery.container.querySelectorAll(
            `.${ITEMS_CLASS}`
          )[2];
          simulaitClick(imgElem);
          let elem = document.querySelector(`.${WRAP_ITEMS_CLASS}`);
          let styles = getComputedStyle(elem);
          let trValue = styles.transform;
          expect(trValue).toEqual('translateX(-200%)');
        });
      }

      if (method === 'createItems') {
        it(`check wrapItems, dtatItems, endPos, startPos`, () => {
          expect(gallery.wrapItems).not.toBeNil();
          expect(gallery.endPos).toBeNumber();
          expect(gallery.endPos).toEqual(9);
          expect(gallery.startPos).toBeNumber();
          expect(gallery.startPos).toEqual(0);
        });
      }

      if (method === 'createImgItem') {
        it(`created element`, () => {
          let createdItem = gallery.createImgItem({
            src: '#some-url.jpg',
            alt: 'test annotation',
            index: 2,
            description: 'some description',
          });

          expect(createdItem.className).toEqual(IMG_SHOW_CLASS);
          expect(createdItem.dataset['index']).toEqual('2');
          expect(createdItem.dataset['description']).toEqual(
            'some description'
          );
          expect(createdItem.getAttribute('src')).toEqual('#some-url.jpg');
          expect(createdItem.getAttribute('alt')).toEqual('test annotation');
        });
      }
    });
  });
});

describe(`events`, () => {
  it(`img item 1: click openHadler is works`, () => {
    let elem = gallery.container.querySelectorAll(`.${ITEMS_CLASS}`)[1];
    simulaitClick(elem);

    expect(openHandlerMock).toBeCalled();
    expect(openHandlerMock).toHaveBeenCalledTimes(1);

    expect(gallery.currentIndex).toBeNumber();
    expect(gallery.currentIndex).toEqual(1);
    expect(gallery.gallery.classList.contains(MODIFIRE_OPEN_CLASS)).toBeTrue();
  });

  it(`this.btnClose: click closeHandler is works`, () => {
    let elem = gallery.btnClose;
    simulaitClick(elem);

    expect(gallery.currentIndex).toBeNumber();
    expect(gallery.currentIndex).toEqual(0);
    expect(gallery.gallery.classList.contains(MODIFIRE_OPEN_CLASS)).toBeFalse();
  });

  it(`this.btnPrevious click previousHandler is works`, () => {
    let imgElem = gallery.container.querySelectorAll(`.${ITEMS_CLASS}`)[2];
    let btnElem = gallery.btnPrevious;

    simulaitClick(imgElem);
    expect(gallery.currentIndex).toEqual(2);

    simulaitClick(btnElem);
    expect(gallery.currentIndex).toEqual(1);
  });

  it(`this.btnNext click nextHandler is works`, () => {
    let imgElem = gallery.container.querySelectorAll(`.${ITEMS_CLASS}`)[2];
    let btnElem = gallery.btnNext;

    simulaitClick(imgElem);
    expect(gallery.currentIndex).toEqual(2);

    simulaitClick(btnElem);
    expect(gallery.currentIndex).toEqual(3);
  });

  it(`keydown: keyboardHandlers is works`, () => {
    let imgElem = gallery.container.querySelectorAll(`.${ITEMS_CLASS}`)[2];
    simulaitClick(imgElem);

    expect(gallery.gallery.classList.contains(MODIFIRE_OPEN_CLASS)).toBeTrue();
    expect(gallery.currentIndex).toEqual(2);

    // hit key h or arrow right
    map.keydown({keyCode: 72, which: 37});
    expect(gallery.currentIndex).toEqual(1);

    // hit key l or arrow left
    map.keydown({keyCode: 76, which: 39});
    map.keydown({keyCode: 76, which: 39});
    expect(gallery.currentIndex).toEqual(3);

    // hit key q or esc
    map.keydown({keyCode: 27, which: 81});
    expect(gallery.gallery.classList.contains(MODIFIRE_OPEN_CLASS)).toBeFalse();
  });
});
