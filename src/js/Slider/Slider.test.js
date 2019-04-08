import Slider from './Slider';
let slider = null;
let mock = null;
let clickHandlerMockL = null;
let clickHandlerMockR = null;

beforeEach(() => {
  slider = new Slider();
  clickHandlerMockL = jest.spyOn(slider, 'handlerBtnL');
  clickHandlerMockR = jest.spyOn(slider, 'handlerBtnR');
  slider.init();
  mock = jest.fn();
});

afterEach(() => {
  slider = null;
  mock = null;
  clickHandlerMockL = null;
  clickHandlerMockR = null;
});

describe(`Create instance and render`, () => {
  it(`expect that slider instance of Slider`, () => {
    expect(slider instanceof Slider).toBeTruthy();
  });

  it(`render components into DOM`, () => {
    expect(slider).toMatchSnapshot();
  });
});

describe(`props`, () => {
  describe(`default props`, () => {
    it(`this.slider exists has class .slider`, () => {
      let elem = slider.slider;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(`slider`)).toBeTrue();
    });

    it(`this.btnL exists has class .slider__left-btn`, () => {
      let elem = slider.btnL;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(`slider__left-btn`)).toBeTrue();
    });

    it(`this.btnR exists has class .slider__right-btn`, () => {
      let elem = slider.btnR;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(`slider__right-btn`)).toBeTrue();
    });

    it(`this.slides collection exists has class .slider__slide`, () => {
      let elem = slider.slides;
      expect(elem).not.toBeNil();

      [].forEach.call(elem, slide => {
        expect(slide.classList.contains('slider__slide')).toBeTrue();
      });
    });

    it(`this.slidesContainer exists has class .slider__slides-container`, () => {
      let elem = slider.slidesContainer;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(`slider__slides-container`)).toBeTrue();
    });

    it(`this.activeSlide exists has class .slider__slide--active`, () => {
      let elem = slider.activeSlide;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(`slider__slide--active`)).toBeTrue();
    });

    it('this.activeModifire exists has value slider__slide--active', () => {
      let elem = slider.activeModifire;
      expect(elem).not.toBeNil();
      expect(elem).toBeString();
      expect(elem).toBe('slider__slide--active');
    });
  });
});

describe('methods', () => {
  const listMethods = [
    'handlerBtnL',
    'handlerBtnR',
    'rotateContainer',
    'setHandlers',
    'init',
  ];

  listMethods.forEach(method => {
    describe(`${method}`, () => {
      it(`${method} exists`, () => {
        expect(slider[method]).toBeFunction();
      });

      it(`${method} toBeCalled`, () => {
        slider[method] = mock;
        slider[method]();
        expect(slider[method]).toBeCalled();
      });

      if (method === 'rotateContainer') {
        it(`set angle deg`, () => {
          let elem = slider.slidesContainer;
          let style = getComputedStyle(elem);
          let tr = style.transform;
          expect(tr).toBeEmpty();

          slider.rotateContainer(180);
          style = getComputedStyle(elem);
          tr = style.transform;
          expect(tr).toEqual('rotateY(180deg)');
        });
      }
    });
  });
});

describe(`events`, () => {
  it(`slider.btnL: click`, () => {
    let elem = slider.btnL;

    simulaitClick(elem);
    expect(clickHandlerMockL).toBeCalled();
    expect(clickHandlerMockL).toHaveBeenCalledTimes(1);
  });

  it(`slider.btnR: click`, () => {
    let elem = slider.btnR;

    simulaitClick(elem);
    expect(clickHandlerMockR).toBeCalled();
    expect(clickHandlerMockR).toHaveBeenCalledTimes(1);
  });
});
