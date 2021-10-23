/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
  return tweet.split(' ').filter((word) => word[0] === '#').map((w) => w.slice(1));
};
