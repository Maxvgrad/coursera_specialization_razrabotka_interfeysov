/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
  let m = minutes + interval
  return pad(Math.floor(hours + (m / 60)) % 24) + ":" + pad(m % 60)
};

function pad(n) {
  if (n < 10) {
    return '0' + n
  }
  return n
}
