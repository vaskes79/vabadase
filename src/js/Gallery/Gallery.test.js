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

describe(`props`, () => {
  describe(`default props`, () => {
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
      let elem = gallery.dataItems;
      expect(elem).not.toBeNil();
      expect(elem).toBeArray();
      expect(elem).toBeArrayOfSize(10);
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
  // const listMethods = [
  //   'handlerBtnL',
  //   'handlerBtnR',
  //   'rotateContainer',
  //   'setHandlers',
  //   'init',
  // ];
  // listMethods.forEach(method => {
  //   describe(`${method}`, () => {
  //     it(`${method} exists`, () => {
  //       expect(slider[method]).toBeFunction();
  //     });
  //     it(`${method} toBeCalled`, () => {
  //       slider[method] = mock;
  //       slider[method]();
  //       expect(slider[method]).toBeCalled();
  //     });
  //     if (method === 'rotateContainer') {
  //       it(`set angle deg`, () => {
  //         let elem = slider.slidesContainer;
  //         let style = getComputedStyle(elem);
  //         let tr = style.transform;
  //         expect(tr).toBeEmpty();
  //         slider.rotateContainer(180);
  //         style = getComputedStyle(elem);
  //         tr = style.transform;
  //         expect(tr).toEqual('rotateY(180deg)');
  //       });
  //     }
  //   });
  // });
});

describe(`events`, () => {
  // it(`slider.btnL: click`, () => {
  //   let elem = slider.btnL;
  //   simulaitClick(elem);
  //   expect(clickHandlerMockL).toBeCalled();
  //   expect(clickHandlerMockL).toHaveBeenCalledTimes(1);
  // });
  // it(`slider.btnR: click`, () => {
  //   let elem = slider.btnR;
  //   simulaitClick(elem);
  //   expect(clickHandlerMockR).toBeCalled();
  //   expect(clickHandlerMockR).toHaveBeenCalledTimes(1);
  // });
});
