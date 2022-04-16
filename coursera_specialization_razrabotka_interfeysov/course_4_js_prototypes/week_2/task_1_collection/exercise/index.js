module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection(collection) {
  let c = []
  if (collection instanceof Collection) {
    c = collection.values()
  } else if (collection instanceof Array) {
    c = collection
  }
  this.collection = c;
}


// Методы коллекции
Collection.prototype.values = function () {
  return this.collection.slice();
};
Collection.prototype.append = function (element) {
  if (element instanceof Array) {
    element.forEach(e => this.append(e))
  } else if (element instanceof Collection) {
    element.values().forEach(e => this.append(e))
  }
  else {
      this.collection.push(element);
  }
};
Collection.prototype.count = function () {
  return this.collection.length;
};

Collection.prototype.at = function (index) {
  if (index <= 0 || index > this.count()) {
    return null
  }
  return this.collection[index-1]
};

Collection.prototype.removeAt = function (index) {
  if (this.at(index) == null) {
    return false;
  }
  this.collection.splice(index-1, 1)
  return true;
};

// другие методы


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (collection) {
  let val = collection || []
  return new Collection(val)
};
