'use strict';
function validateForm(arg){
  let {formId, formValidClass, formInvalidClass, inputErrorClass} = {...arg};
  let form =document.getElementById(formId);
  form.addEventListener('focus',  actionFocus, true);
  form.addEventListener('blur', actionLostFocus, true);
  form.addEventListener('keydown', actionKeydownInter, true);
  form.addEventListener('submit', actionClickSubmit, true);

  function actionFocus(event){
    if (event.target.tagName === 'INPUT') {
      event.target.classList.remove(inputErrorClass);
    }
  }

  function actionLostFocus(event){
    if (event.target.tagName === 'INPUT') {
      validator(event.target)
    }
  }

  function actionKeydownInter(event){
    if (event.target.tagName === 'INPUT') {
      if (event.code === 'NumpadEnter' || event.code === 'Enter'){
        validator(event.target)
        validationAllForm()
      }
    }
  }

  function actionClickSubmit(event){
    event.preventDefault();
    validationAllForm()

  }

  function validator(target){
    let regLetters = new RegExp('^[А-Яа-яa-zA-Z]+$');
    let regNumber = new RegExp('^[0-9]+$');
    let {validator, required, validatorMin, validatorMax, validatorPattern} = {...target.dataset};
    if ((required === '')&&(!target.value)) { target.classList.add(inputErrorClass); return;}
    if (target.value === '') {target.classList.remove(inputErrorClass); return;}
    else{
      switch (validator) {
        case "letters":
          if (regLetters.test(target.value)){target.classList.remove(inputErrorClass);}
          else{target.classList.add(inputErrorClass); return;}
          break;
        case "number":
          if ((validatorMin !== undefined)&&(validatorMax !== undefined)){
            if (regNumber.test(target.value)&&
              (Number(validatorMax) >= Number(target.value))&&
              (Number(target.value) >= Number(validatorMin)))
            {
              target.classList.remove(inputErrorClass);
            }
            else{target.classList.add(inputErrorClass);return;}
          }
          else {
            if (regNumber.test(target.value)){target.classList.remove(inputErrorClass);}
            else{target.classList.add(inputErrorClass);return;}
          }

          break;
        case "regexp":
          let regFone = new RegExp(validatorPattern);
          if (regFone.test(target.value)){target.classList.remove(inputErrorClass);}
          else{target.classList.add(inputErrorClass);return;}
          break;
      }
    }
  }

  function validationAllForm() {
    let allForms = Array.from(form);
    let answerFor = false;
    for (let i = 0; i <= allForms.length-1; i++){
      let input = allForms[i]
      if (input.nodeName === 'INPUT'){
        if (input.classList.contains(inputErrorClass)){ answerFor = false; break;}
        else {
          if (input.dataset.hasOwnProperty('required')) {
            if (input.value !== ''){ input.classList.remove(inputErrorClass);answerFor = true;}
            else { input.classList.add(inputErrorClass); answerFor = false; break; }
          }
          else {answerFor = true;}
        }
      }
    }
    if (answerFor) {
      form.classList.remove(formInvalidClass);
      form.classList.remove(formValidClass);
      form.classList.add(formValidClass);}
    else {
      form.classList.remove(formInvalidClass);
      form.classList.remove(formValidClass);
      form.classList.add(formInvalidClass);
    }
  }
}
