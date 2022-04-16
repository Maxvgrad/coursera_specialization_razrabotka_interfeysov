/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
  let values = hashtags.map(w => w.toLowerCase())
  return Array.from(new Set(values)).join(', ')
};
