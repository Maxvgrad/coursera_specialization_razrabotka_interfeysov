'use strict';

// ÐšÐ¾Ð´ Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ð¸ Ñ„Ð¾Ñ€Ð¼Ñ‹
(function () {
  window.validateForm = function (param) {
    let form = document.getElementById(param.formId);
    form.addEventListener('blur', function (event) {
      if (event.target.tagName === "INPUT") {
        checkInput(event.target)
      }
    }, true);
    form.addEventListener('focus', function (event) {
      if (event.target.tagName === "INPUT" && event.target.classList.contains(param.inputErrorClass)) {
        event.target.classList.remove(param.inputErrorClass);
      }
    }, true);

    form.addEventListener('submit',  function (event) {
      event.preventDefault();

      if (form.classList.contains(param.formValidClass)) {
        form.classList.remove(param.formValidClass);
      }
      if (form.classList.contains(param.formInvalidClass)) {
        form.classList.remove(param.formInvalidClass);
      }

      let elems = Array.from(form.querySelectorAll("input"));
      let isValid = true;
      elems.forEach(function (elem) {
        checkInput(elem);
        isValid = (isValid && !elem.classList.contains(param.inputErrorClass)) ? true : false;
      });
      if (isValid) {
        form.classList.add(param.formValidClass);
      }
      else {
        form.classList.add(param.formInvalidClass);
      }
    });

    function checkInput (elem) {
      let isValid = (elem.hasAttribute("data-required") && !elem.value) ? false : true;
      switch (elem.dataset.validator) {
        case "letters":
          isValid = (isValid && /^[a-z]*$|^[А-Яа-яa-zA-Z]*$/i.test(elem.value)) ? true : false;
          break;
        case "number":
          isValid = (isValid && /^\d*$/.test(elem.value)) ? true : false;
          if (elem.hasAttribute("data-validator-min")) {
            isValid = (isValid && elem.value >= Number(elem.dataset.validatorMin)) ? true : false;
          }
          if (elem.hasAttribute("data-validator-max")) {
            isValid = (isValid && elem.value <= Number(elem.dataset.validatorMax)) ? true : false;
          }
          break;
        case "regexp":
          var re = new RegExp(elem.dataset.validatorPattern);
          isValid = (isValid && re.test(elem.value)) ? true : false;
          break;
      }
      if (!isValid) {
        elem.classList.add(param.inputErrorClass);
      }
    }
  }
})();
