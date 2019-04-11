import Form, {ERROR_MSG} from './Form';
const ROOT_CLASS = 'form';
const BTN_ACTIVE = `contacts__btn`;
const ACTIVE_MODIFIRE = `${ROOT_CLASS}--active`;
const MSG_CONTACTS = '.contacts__msg';
const MSG_FORM = '.form__msg';
let formInst = null;
const FORM_DATA = {
  elemName: null,
  elemEmail: null,
  elemTheme: null,
  elemMessage: null,
};

beforeEach(() => {
  formInst = new Form();
  formInst.init();
});

afterEach(() => {
  formInst.form.classList.remove(ACTIVE_MODIFIRE);
  formInst = null;
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
  beforeEach(() => {
    FORM_DATA['elemName'] = formInst.form.querySelector('input[name="name"]');
    FORM_DATA['elemEmail'] = formInst.form.querySelector('input[name="email"]');
    FORM_DATA['elemTheme'] = formInst.form.querySelector(
      'input[name="theme_message"]'
    );
    FORM_DATA['elemMessage'] = formInst.form.querySelector(
      'textarea[name="message"]'
    );
    FORM_DATA['elemName']['value'] = '   check remove space    ';
    FORM_DATA['elemEmail']['value'] = '   some@email.com    ';
    FORM_DATA['elemTheme']['value'] = '  some text     ';
    FORM_DATA['elemMessage']['value'] = '    some largest text   ';
  });

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
        it(`check valid data`, () => {
          let valid = formInst.validate();
          expect(valid).toBeTrue();
        });

        it(`check invalid data wrong email address`, () => {
          FORM_DATA['elemEmail']['value'] = '   some@email    ';
          let valid = formInst.validate();
          expect(valid).toBeFalse();
        });
      }

      if (method === 'showMsg') {
        Object.keys(ERROR_MSG).forEach(nameElem => {
          let message = ERROR_MSG[nameElem];
          it(`window size = 910px message error name === ${message}`, () => {
            window.innerWidth = 910;

            formInst.showMsg(message);
            let msgContact = document.querySelector(MSG_CONTACTS).textContent;
            expect(msgContact).toBeString();
            expect(msgContact).toEqual(message);
          });

          it(`window size = 890px message error name === ${message}`, () => {
            window.innerWidth = 890;

            formInst.showMsg(message);
            let msgForm = document.querySelector(MSG_FORM).textContent;
            expect(msgForm).toBeString(message);
            expect(msgForm).toEqual(message);
          });
        });
      }
    });
  });
});

describe(`events`, () => {
  describe(`mouse`, () => {
    it(`open close form click to this.btn === .contacts__btn`, () => {
      let elem = formInst.btn;
      expect(formInst.form.classList.contains(ACTIVE_MODIFIRE)).toBeFalse();
      simulaitClick(elem);
      expect(formInst.form.classList.contains(ACTIVE_MODIFIRE)).toBeTrue();
    });
  });

  describe(`keyboard`, () => {
    it(`keydown: esq q keys is works`, () => {
      let elem = formInst.btn;
      simulaitClick(elem);

      // hit key q or esc
      map.keydown({
        keyCode: 27,
        which: 81,
        target: {classList: {contains: () => false}},
      });
      expect(formInst.form.classList.contains(ACTIVE_MODIFIRE)).toBeFalse();
    });

    it(`keydown: enter keys is works`, () => {
      // hit key q or esc
      map.keydown({
        keyCode: 13,
        which: 13,
        target: {classList: {contains: () => true}},
      });
      expect(formInst.form.classList.contains(ACTIVE_MODIFIRE)).toBeTrue();
    });
  });
});
