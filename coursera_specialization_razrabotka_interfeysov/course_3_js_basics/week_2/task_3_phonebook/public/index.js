// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  let args = command.split(' ')

  switch (args[0]) {
    case 'ADD':
      return add(args[1], args[2].split(','));
    case 'REMOVE_PHONE':
      return remove(args[1]);
    case 'SHOW':
      return show();
    default:
      throw Error();
  }
};

const namePhoneDic = {}
const phoneNameDic = {}

function add(name, phones) {
    if (namePhoneDic.hasOwnProperty(name)) {
      let existingPhones = namePhoneDic[name];
      phones.forEach(p => existingPhones.push(p));
    } else {
      namePhoneDic[name] = phones;
    }
    phones.forEach(phone => phoneNameDic[phone] = name);
    return true;
}

function show() {
  let result = []
  for (let key in namePhoneDic) {
    result.push(`${key}: ${namePhoneDic[key].join(', ')}`)
  }
  return result.sort();
}

function remove(phone) {
  let name = phoneNameDic[phone];
  if (name != null) {
    delete phoneNameDic[phone];
    let phones = namePhoneDic[name];
    if (phones.length > 1) {
      let index = phones.findIndex(e => e === phone);
      phones.splice(index, 1);
    } else {
      delete namePhoneDic[name];
    }
    return true;
  }
  return false;
}

