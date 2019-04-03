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

  handleActive = e => {
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

  handleSendMessage = async e => {
    e.preventDefault();
    let formData = new FormData(this.form);
    console.log('validate result', this.validate());

    if (this.validate()) {
      const data = {
        email: formData.get('email'),
        name: formData.get('name'),
        theme_message: formData.get('theme_message'),
        message: formData.get('message'),
      };

      try {
        const rawResponse = await axios.post(null, data);
        console.log(rawResponse);
        if (rawResponse.statusText === 'OK') {
          this.handleActive();
          this.form.reset();
        }
      } catch (err) {
        console.log('axios request error', err);
      }
    }
  };

  init = () => {
    this.btn.addEventListener('click', this.handleActive);
    this.form.addEventListener('submit', this.handleSendMessage);
  };
}

export default Form;
