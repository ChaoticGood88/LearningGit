function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

const filterOutOdds = (...nums) => nums.filter(num => num % 2 === 0);

//findMin
const findMin = (...args) => Math.min(...args);

//mergeObjects
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

//doubleAndReturnArgs
const doubleAndReturnArgs = (arr, ...args) => {
    const doubledArgs = args.map(arg => arg * 2);
    return [...arr, ...doubledArgs];
  };

//removeRandom
const removeRandom = (items) => {
    const index = Math.floor(Math.random() * items.length);
    return [...items.slice(0, index), ...items.slice(index + 1)];
  };

//extend
const extend = (array1, array2) => [...array1, ...array2];

//addKeyVal
const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });

//removeKey
const removeKey = (obj, key) => {
    const { [key]: removed, ...newObj } = obj;
    return newObj;
  };

//combine
const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });

//update
const update = (obj, key, val) => ({ ...obj, [key]: val });


