import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name=email]'),
  textareaMessage: document.querySelector('textarea[name=message]'),
};

refs.emailInput.value = formData.email;
refs.textareaMessage.value = formData.message;

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
  formData = { email: '', message: '' };
}

function onTextInput(e) {
  formData[e.target.name] = e.target.value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

refs.form.addEventListener('input', throttle(onTextInput, 500));

refs.form.addEventListener('submit', onFormSubmit);

// refs.form.addEventListener('input', e => {

// });

messageTextOutput();

function messageTextOutput() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const savedMessageJSON = JSON.parse(savedMessage);

    formData.email = savedMessageJSON.email || '';
    formData.message = savedMessageJSON.message || '';
    refs.emailInput.value = formData.email;
    refs.textareaMessage.value = formData.message;
  }
}
