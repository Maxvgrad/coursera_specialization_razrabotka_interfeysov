'use strict';

// Код валидации формы

function validateForm(config) {
  const form = document.querySelector(`#${config.formId}`);
  form.addEventListener('submit', function (event) {
    //Фактической отправки происходить не должно. Страница не должна перезагружаться.
    event.preventDefault();
    //При отправке формы (submit) проверяются все элементы. Обратите внимание, что форму можно отправить несколькими способами: нажатием enter на элементе input и кликом.
    //Если при отправке формы нет ошибок, форме добавляется класс из настройки formValidClass: автоматически появляется сообщение, что форма не содержит ошибок.
    //Если при отправке формы обнаружены ошибки, в форму добавляется класс из настройки formInvalidClass: автоматически появится сообщение, что форма содержит ошибки.
    const errors = [];

    for (let i = 0, len = form.length; i < len; i++) {
      const element = form[i];
      if (element.tagName === 'INPUT') {
        if (element.classList.contains(config.inputErrorClass)) {
          errors.push('error');
        } else if (!isValid(element)) {
          element.classList.add(config.inputErrorClass);
          errors.push('error');
        }
      }
    }

    if (errors.length > 0) {
      form.classList.add(config.formInvalidClass);
      form.classList.remove(config.formValidClass);
    } else {
        form.classList.add(config.formValidClass);
        form.classList.remove(config.formInvalidClass);
    }
  });

  form.addEventListener('blur', function (event) {
    if (event.target.tagName === 'INPUT') {
      //При потере фокуса (blur) элемента input вызывается проверка для этого элемента.
      if (!isValid(event.target) && !event.target.classList.contains(config.inputErrorClass)) {
        //Если элемент не прошел проверку, на него добавляется класс из настройки inputErrorClass.
        event.target.classList.add(config.inputErrorClass);
      }
    }
  }, true);

  form.addEventListener('focus', function (event) {
    //Класс с ошибкой (inputErrorClass) удаляется при фокусе на элемент (focus).
    if (event.target.tagName === 'INPUT') {
      if (event.target.classList.contains(config.inputErrorClass)) {
        event.target.classList.remove(config.inputErrorClass);
      }
    }
  }, true);
}

function isValid(element) {
  if (element.dataset.hasOwnProperty('required') && !element.value) {
    return false;
  } else if (element.value && element.dataset.hasOwnProperty('validator')) {
    const errors = getValidator(element.dataset.validator)(element);
    return errors.length === 0
  }
  return true;
}

function getValidator(type) {
  switch (type.toLowerCase()) {
    case 'letters':
      return function validate(element) {
        const letters = /^[А-Яа-яA-Za-z]+$/;
        if(!element.value.match(letters)) {
          return ['error'];
        }
        return [];
      };
    case 'number':
      return function validate(element) {
        const numbers = /^[+\-0-9]+$/;
        if(!element.value.match(numbers)) {
          return ['error'];
        }
        if (element.dataset.hasOwnProperty('validatorMin') && Number(element.value) <  Number(element.dataset.validatorMin)) {
          return ['error'];
        }
        if (element.dataset.hasOwnProperty('validatorMax') && Number(element.value) > Number(element.dataset.validatorMax)) {
          return ['error'];
        }
        return [];
      };
    case 'regexp':
      return function validate(element) {
        console.log(element.dataset.validatorPattern);
        console.log(element.value.match(RegExp(element.dataset.validatorPattern)));
        console.log(!element.value.match(RegExp(element.dataset.validatorPattern)));
        if(!element.value.match(RegExp(element.dataset.validatorPattern))) {
          return ['error'];
        }
        return [];
      };
    default:
      throw TypeError('Unsupported type: ' + type)
  }
}
