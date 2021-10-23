// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var lib = require('./index.js');

// Коллекция данных
var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    },
];

/*
!!!!!!!
CASE 1
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Сэм', gender: 'Мужской', email: 'luisazamora@example.com' },
    { name: 'Эмили', gender: 'Женский', email: 'example@example.com' },
    { name: 'Мэт', gender: 'Мужской', email: 'danamcgee@example.com' },
    { name: 'Шерри', gender: 'Женский', email: 'danamcgee@example.com' },
    { name: 'Стелла', gender: 'Женский', email: 'waltersguzman@example.com' }
]);

/*
!!!!!!!
CASE 2
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
  friends,
  lib.select('name'),
  lib.filterIn('favoriteFruit', ['Яблоко'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Эмили' },
    { name: 'Мэт' }
]);

/*
!!!!!!!
CASE 3
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
  friends,
  lib.select('name', 'gender', 'email'),
  lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
  lib.select('name', 'gender', 'email'),
  lib.filterIn('gender', ['Женский', 'Мужской'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Сэм', gender: 'Мужской', email: 'luisazamora@example.com' },
    { name: 'Эмили', gender: 'Женский', email: 'example@example.com' },
    { name: 'Мэт', gender: 'Мужской', email: 'danamcgee@example.com' },
    { name: 'Шерри', gender: 'Женский', email: 'danamcgee@example.com' },
    { name: 'Стелла', gender: 'Женский', email: 'waltersguzman@example.com' }
]);


/*
!!!!!!!
CASE 4
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
  friends
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
]);


/*
!!!!!!!
CASE 5
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
  friends,
  lib.select('name', 'gender', 'email'),
  lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
  lib.select('name', 'email', 'favoriteFruit'),
  lib.filterIn('gender', ['Женский'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Эмили', email: 'example@example.com' },
    { name: 'Шерри', email: 'danamcgee@example.com' },
    { name: 'Стелла', email: 'waltersguzman@example.com' }
]);

/*
!!!!!!!
CASE 6
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
  friends,
  lib.select('name', 'gender', 'email', 'favoriteFruit'),
  lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
  lib.select('name', 'email', 'favoriteFruit'),
  lib.filterIn('favoriteFruit', ['Апельсин', 'Яблоко']),
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    {
        name: 'Эмили',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
]);

/*
!!!!!!!
  CASE 7
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
  friends,
  lib.select('name', 'gender', 'email'),
  lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
  lib.select('name', 'email', 'favoriteFruit'),
  lib.filterIn('favoriteFruit', ['Апельсин', 'Яблоко']),
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    {
        name: 'Эмили',
        email: 'example@example.com',
    },
    {
        name: 'Мэт',
        email: 'danamcgee@example.com',
    },
]);

/*
!!!!!!!
  CASE 7
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var testFriends = friends.slice(0)

testFriends.push(
  {
      id: 12,
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com',
      favoriteFruit: 'Картофель'
  }
)

var result = lib.query(
  testFriends,
  lib.select('id'),
  lib.filterIn('id', [32, 12]),
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    {id: 12}
]);

/*
!!!!!!!
  CASE 8
!!!!!!!
*/

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var testFriends = friends.slice(0)

testFriends.push(
  {
      id: 12,
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com',
      favoriteFruit: 'Картофель'
  }
)

var result = lib.query(
  testFriends,
  lib.filterIn('id', [32, 12]),
  lib.select('id'),
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    {id: 12}
]);

console.info('OK!');
