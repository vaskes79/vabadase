import Form from './Form';
const ROOT_CLASS = 'form';
const BTN_ACTIVE = `contacts__btn`;
const ACTIVE_MODIFIRE = `${ROOT_CLASS}--active`;
let formInst = null;
let mock = null;
let valid = null;
let elemName = null;
let elemEmail = null;
let elemTheme = null;
let elemMessage = null;
// let openHandlerMock = null;

beforeEach(() => {
  formInst = new Form();
  // openHandlerMock = jest.spyOn(formInst, 'openHandler');
  mock = jest.fn();
  formInst.init();
});

afterEach(() => {
  formInst = null;
  mock = null;
  valid = null;
  // openHandlerMock = null;
});

describe(`Create instance and render`, () => {
  it(`expect that formInst instance of Form`, () => {
    expect(formInst instanceof Form).toBeTruthy();
  });

  it(`render components into DOM`, () => {
    expect(formInst).toMatchSnapshot();
  });
});

describe(`props`, () => {
  describe(`default props`, () => {
    it(`this.formInst exists has class ${ROOT_CLASS}`, () => {
      let elem = formInst.form;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(ROOT_CLASS)).toBeTrue();
    });

    it(`this.btn exists has class ${BTN_ACTIVE}`, () => {
      let elem = formInst.btn;
      expect(elem).not.toBeNil();
      expect(elem.classList.contains(BTN_ACTIVE)).toBeTrue();
    });

    it(`this.activeModifier exists has class ${ACTIVE_MODIFIRE}`, () => {
      let selector = formInst.activeModifier;
      expect(selector).not.toBeNil();
      expect(selector).toEqual(ACTIVE_MODIFIRE);
    });
  });
});

describe('methods', () => {
  const listMethods = [
    'handleActive',
    'validate',
    'showMsg',
    'handleSendMessage',
    'keyboardHandlers',
    'setupListeners',
    'init',
  ];
  listMethods.forEach(method => {
    describe(`${method}`, () => {
      it(`${method} exists`, () => {
        expect(formInst[method]).toBeFunction();
      });
      it(`${method} toBeCalled`, () => {
        formInst[method] = mock;
        formInst[method]();
        expect(formInst[method]).toBeCalled();
      });
      if (method === 'handleActive') {
        it(`toggle state from open close`, () => {
          let elem = formInst.form;
          expect(elem.classList.contains(ACTIVE_MODIFIRE)).toBeFalse();
          formInst.handleActive();
          expect(elem.classList.contains(ACTIVE_MODIFIRE)).toBeTrue();
        });
      }
      if (method === 'validate') {
        beforeEach(() => {
          elemName = formInst.form.querySelector('input[name="name"]');
          elemEmail = formInst.form.querySelector('input[name="email"]');
          elemTheme = formInst.form.querySelector(
            'input[name="theme_message"]'
          );
          elemMessage = formInst.form.querySelector('textarea[name="message"]');
          elemName.value = '   check remove space    ';
          elemEmail.value = '   some@email.com    ';
          elemTheme.value = '  some text     ';
          elemMessage.value = '    some largest text   ';
        });

        it(`check valid data`, () => {
          valid = formInst.validate();
          expect(valid).toBeTrue();
        });

        it(`check invalid data wrong email address`, () => {
          elemEmail.value = '   some@email    ';
          valid = formInst.validate();
          expect(valid).toBeFalse();
        });
      }
    });
  });
});

describe(`events`, () => {});
