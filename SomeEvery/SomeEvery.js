//Has Odd Number
// Function implementation
function hasOddNumber(arr) {
    return arr.some(function(num) {
      return num % 2 !== 0;
    });
  }
  //Has a Zero
  function hasAZero(num) {
    return num.toString().split('').some(function(digit) {
      return digit === '0';
    });
  }
  //Has Only Odd Numbers
  function hasOnlyOddNumbers(arr) {
    return arr.every(function(num) {
      return num % 2 !== 0;
    });
  }
  //Has No Duplicates
  function hasNoDuplicates(arr) {
    return arr.every(function(num, index) {
      return arr.indexOf(num) === index;
    });
  }
  //Has Certain Key
  function hasCertainKey(arr, key) {
    return arr.every(function(obj) {
      return obj.hasOwnProperty(key);
    });
  }
  //Has Certain Value
  function hasCertainValue(arr, key, value) {
    return arr.every(function(obj) {
      return obj[key] === value;
    });
  }