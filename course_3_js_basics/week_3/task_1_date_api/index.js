/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
  let result;
  try {
    result = date.match(/\d{2,4}/g).map(s => Number(s));
  } catch (e) {
    throw TypeError();
  }
  return {
    _value: new Date(result[0], result[1]-1, result[2], result[3], result[4]),
    get value() {
      return this.toString();
    },
    add: function (number, timeUnit) {
      if (number < 0) {
        throw TypeError();
      }
      this._mutate(number, timeUnit)
      return this;
    },
    subtract: function (number, timeUnit) {
      if (number < 0) {
        throw TypeError();
      }

      this._mutate(-1 * number, timeUnit)
      return this;
    },

    _getFunction: function (timeUnit) {
      switch (timeUnit) {
        case 'hours':
          return this._value.setHours;
        case 'months':
          return this._value.setMonth;
        case 'days':
          return this._value.setHours;
        case 'minutes':
          return this._value.setMinutes;
        case 'years':
          return this._value.setMinutes;
        default:
          throw TypeError();
      }
    },

    _parseNumber: function (number, timeUnit) {
      if (timeUnit === 'months') {
        return number -1;
      } else if (timeUnit === 'days') {
        return number * 24;
      }
      return number;
    },

    _mutate(number, timeUnit) {
      let d = this._value
      switch (timeUnit) {
        case 'hours':
          return d.setHours(d.getHours() + number);
        case 'months':
          return d.setMonth(d.getMonth() + number);
        case 'days':
          return d.setDate(d.getDate() + number);
        case 'minutes':
          return d.setMinutes(d.getMinutes() + number);
        case 'years':
          return d.setFullYear(d.getFullYear() + number);
        default:
          throw TypeError();
      }
    },

    toString: function () {
      let d = this._value;
      return `${d.getFullYear()}-${this._pad(d.getMonth() + 1)}-${this._pad(d.getDate())} ${this._pad(d.getHours())}:${this._pad(d.getMinutes())}`
    },
    _pad: function (n) {
        if (n < 10) {
          return '0' + n
        }
        return n
    }
  }
};
