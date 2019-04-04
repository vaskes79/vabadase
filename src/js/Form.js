import axios from 'axios';

// CORS
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const URL = 'https://us-central1-static-bp.cloudfunctions.net/addMessage ';

// SETUP AXIOS
axios.defaults.baseURL = PROXY_URL + URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Form {
  constructor(
    rootSelector = '.form',
    btnActivateSelector = '.contacts__btn',
    activeModifire = 'form--active'
  ) {
    this.form = document.querySelector(rootSelector);
    this.btn = document.querySelector(btnActivateSelector);
    this.activeModifire = activeModifire;
  }

  handleActive = () => {
    this.form.classList.toggle(this.activeModifire);
  };

  validate = () => {
    let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    let nameValue = this.form.querySelector('input[name="name"]').value !== '';
    let emailValue = this.form.querySelector('input[name="email"]').value;
    let themeMessageValue =
      this.form.querySelector('input[name="theme_message"]').value !== '';
    let messageValue =
      this.form.querySelector('textarea[name="message"]').value !== '';

    emailValue = emailRegExp.test(emailValue);

    return nameValue && emailValue && themeMessageValue && messageValue;
  };

  showMsg = () => {
    let msg;
    if (window.innerWidth >= 900) {
      msg = document.querySelector('.contacts__msg');
      msg.classList.add('contacts__msg--active');
    } else {
      msg = document.querySelector('.form__msg');
      msg.classList.add('form__msg--active');
    }
    msg.innerHTML = 'ваше сообщение успешно отправлено';

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

      try {
        const rawResponse = await axios.post(null, data);
        if (rawResponse.statusText === 'OK') {
          this.handleActive();
          this.form.reset();
          this.showMsg();
        }
      } catch (err) {
        console.log('axios request error', err);
      }
    }
  };

  keyboardHandlers = e => {
    let {keyCode, which} = e;
    let {handleActive, form, activeModifire} = this;
    let formIsOpen = form.classList.contains(activeModifire);
    // esc, q
    let closeKeys = [27, 81];
    let openForm = [13, 13];
    let isClose = closeKeys.includes(keyCode) || closeKeys.includes(which);
    let isContactsBtn = e.target.classList.contains('contacts__btn');
    let isOpen = openForm.includes(keyCode) || openForm.includes(which);

    if (isClose && formIsOpen) {
      form.classList.remove(activeModifire);
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
