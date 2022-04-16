/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
  function wrap(operation) {
    return new Promise(function (resolve, reject) {
      function next(err, data) {

        if (err) {
          // console.log("NEXT: " + err);
          reject(err);
        }
        // console.log("NEXT: " + data)
        resolve(data)
      }

      operation(next)
    })
  }

  Promise.all(
    operations.map(wrap)
  )
    .then(function (data) {
      // console.log("THEN: " + data)
      callback(null, data);
    })
    .catch(function (ex) {
      // console.log("CATCH: " + ex)
      callback(ex)
    })
};
