// CORS
const PROXY_URL = process.env.PROXY_URL;
const URL = process.env.URL;
export const ERROR_MSG = {
  elemName: 'введите имя',
  elemEmail: 'ведите email в формате your@email.com',
  elemTheme: 'укажите тему сообщения',
  elemMessage: 'введите текст сообщения',
};

class Form {
  constructor(
    rootSelector = '.form',
    btnActivateSelector = '.contacts__btn',
    activeModifier = 'form--active'
  ) {
    this.form = document.querySelector(rootSelector);
    this.btn = document.querySelector(btnActivateSelector);
    this.activeModifier = activeModifier;
  }

  handleActive = () => {
    this.form.classList.toggle(this.activeModifier);
  };

  validate = () => {
    let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    let nameValue = this.form.querySelector('input[name="name"]').value.trim();
    let emailValue = this.form
      .querySelector('input[name="email"]')
      .value.trim();
    let themeMessageValue = this.form
      .querySelector('input[name="theme_message"]')
      .value.trim();
    let messageValue = this.form
      .querySelector('textarea[name="message"]')
      .value.trim();

    emailValue = emailRegExp.test(emailValue);

    !messageValue && this.showMsg(ERROR_MSG.elemMessage);
    !themeMessageValue && this.showMsg(ERROR_MSG.elemTheme);
    !emailValue && this.showMsg(ERROR_MSG.elemEmail);
    !nameValue && this.showMsg(ERROR_MSG.elemName);

    return nameValue && emailValue && themeMessageValue && messageValue
      ? true
      : false;
  };

  showMsg = message => {
    let msg;
    if (window.innerWidth >= 900) {
      msg = document.querySelector('.contacts__msg');
      msg.classList.add('contacts__msg--active');
    } else {
      msg = document.querySelector('.form__msg');
      msg.classList.add('form__msg--active');
    }
    msg.innerHTML = message ? message : 'отправка сообщения...';

    setTimeout(() => {
      if (window.innerWidth >= 900) {
        msg.classList.remove('contacts__msg--active');
      } else {
        msg.classList.remove('form__msg--active');
      }
    }, 5000);
  };

  handleSendMessage = async e => {
    e.preventDefault();
    let formData = new FormData(this.form);

    if (this.validate()) {
      const data = {
        email: formData.get('email'),
        name: formData.get('name'),
        theme_message: formData.get('theme_message'),
        message: formData.get('message'),
      };

      this.showMsg();
      try {
        let rawResponse = await fetch(PROXY_URL + URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const response = await rawResponse.json();

        if (response.ok) {
          this.handleActive();
          this.form.reset();
          this.showMsg('ваше сообщение успешно отправлено');
          return response;
        }
      } catch (err) {
        console.log('error fetch response', err);
      }
    }
  };

  keyboardHandlers = e => {
    let {keyCode, which} = e;
    let {handleActive, form, activeModifier} = this;
    let formIsOpen = form.classList.contains(activeModifier);
    // esc, q
    let closeKeys = [27, 81];
    let openForm = [13, 13];
    let isClose = closeKeys.includes(keyCode) || closeKeys.includes(which);
    let isContactsBtn = e.target.classList.contains('contacts__btn');
    let isOpen = openForm.includes(keyCode) || openForm.includes(which);

    if (isClose && formIsOpen) {
      form.classList.remove(activeModifier);
    }

    if (isOpen && isContactsBtn) {
      this.form.querySelector('input[name="name"]').focus();
      handleActive();
    }
  };

  setupListeners = () => {
    this.btn.addEventListener('click', this.handleActive);
    this.form.addEventListener('submit', this.handleSendMessage);
    window.addEventListener('keydown', this.keyboardHandlers);
  };

  init = () => {
    this.setupListeners();
  };
}

export default Form;
