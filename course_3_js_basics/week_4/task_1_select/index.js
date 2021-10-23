/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    let result = collection;
    for (let i = 1; i < arguments.length; i++) {
        const fun = arguments[i];
        if (fun.name === 'filterIn') {
            result = result.filter(e => fun(e));
        }
    }
    for (let i = 1; i < arguments.length; i++) {
        const fun = arguments[i]
        if (fun.name === 'select') {
            result = result.map(e => fun(e));
        }
    }
    return result;
}

/**
 * @params {String[]}
 */
function select() {
    let args = arguments;
    return function select(element) {
        // return a new element with args
        let result = {}
        Array.from(args).forEach(prop => {
            if (element.hasOwnProperty(prop)) {
                result[prop] = element[prop]
            }
        })
        return result;
    };
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(element) {
        return element.hasOwnProperty(property) && values.includes(element[property]);
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
