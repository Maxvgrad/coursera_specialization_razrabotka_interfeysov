'use strict';

function validate( dataset, value ) {
  switch( dataset.validator ) {
    case 'letters':
      return letters( value );
    case 'number':
      return number( value, dataset.validatorMin, dataset.validatorMax );
    case 'regexp':
      return regExpr( value, dataset.validatorPattern );
    default:
      return false;
  }

}

function letters( value ) {
  var re = new RegExp( /^[А-Яа-яA-Za-z]+$/, 'i');
  return re.test(value);
}

function number( value, min, max ) {
  value = parseInt(value);

  if( isNaN( value ) ) {
    return false;
  }

  if (min && parseInt(min) > value) {
    return false;
  }

  if (max && parseInt(max) < value) {
    return false;
  }

  return true;

}

function regExpr( value, pattern ) {
  var re = new RegExp( pattern, 'i');
  return re.test(value);
}


function check( input ) {
  if (input.dataset.hasOwnProperty('required') && !input.value) {
    return false;
  }

  return ( input.dataset.validator && input.value )
    ? validate( input.dataset, input.value)
    : true;
}


function validateForm (options) {
  var inputErrorClass = options.inputErrorClass;
  var form = document.getElementById(options.formId);

  // ÐŸÑ€Ð¸ Ð¿Ð¾Ñ‚ÐµÑ€Ðµ Ñ„Ð¾ÐºÑƒÑÐ° (blur) ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð° input Ð²Ñ‹Ð·Ñ‹Ð²Ð°ÐµÑ‚ÑÑ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð´Ð»Ñ ÑÑ‚Ð¾Ð³Ð¾ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð°.
  form.addEventListener('blur', function (event) {
    var target = event.target;
    if ( target.tagName === 'INPUT' ) {
      if ( !check( target ) ) {
        target.classList.add( inputErrorClass );
      }
    }
  }, true);

  form.addEventListener('focus', function (event) {
    var target = event.target;
    if (target.tagName === 'INPUT') {
      target.classList.remove(options.inputErrorClass);
    }
  }, true);


  //ÐŸÑ€Ð¸ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐµ Ñ„Ð¾Ñ€Ð¼Ñ‹ (submit) Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑÑŽÑ‚ÑÑ Ð²ÑÐµ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ñ‹
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.classList.remove(options.formValidClass);
    form.classList.remove(options.formInvalidClass);

    var inputs = Array.from(
      document.querySelectorAll('#' + options.formId + ' input')
    );

    var hasError = false;
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      if (!check(input)) {
        input.classList.add(options.inputErrorClass);
        hasError = true;
      }
    }

    if (hasError) {
      form.classList.add(options.formInvalidClass);
    } else {
      form.classList.add(options.formValidClass);
    }
  });



}
