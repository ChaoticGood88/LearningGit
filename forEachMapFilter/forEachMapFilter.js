//For Each
//doubleValues
function doubleValues(arr) {
  let doubledArray = [];
  arr.forEach(function(val) {
    doubledArray.push(val * 2);
  });
  return doubledArray;
}
//Only Even Values
function onlyEvenValues(arr) {
    let evenArray = [];
    arr.forEach(function(val) {
      if (val % 2 === 0) {
        evenArray.push(val);
      }
    });
    return evenArray;
  }
  //Show First and Last
  function showFirstAndLast(arr) {
    let resultArray = [];
    arr.forEach(function(val) {
      resultArray.push(val[0] + val[val.length - 1]);
    });
    return resultArray;
  }
  //Add Key and Value
  function addKeyAndValue(arr, key, value) {
    arr.forEach(function(obj) {
      obj[key] = value;
    });
    return arr;
  }
  //Vowel Count
  function vowelCount(str) {
    let vowels = "aeiou";
    let result = {};
  
    str.toLowerCase().split('').forEach(function(char) {
      if (vowels.indexOf(char) !== -1) {
        if (result[char]) {
          result[char]++;
        } else {
          result[char] = 1;
        }
      }
    });
  
    return result;
  }
  //Map
  //Double Values With Map
  function doubleValuesWithMap(arr) {
    return arr.map(function(val) {
      return val * 2;
    });
  }
  //Val Times Index
  function valTimesIndex(arr) {
    return arr.map(function(val, index) {
      return val * index;
    });
  }
  //Extract Key
  function extractKey(arr, key) {
    return arr.map(function(obj) {
      return obj[key];
    });
  }
  //Extract Full Name
  function extractFullName(arr) {
    return arr.map(function(obj) {
      return `${obj.first} ${obj.last}`;
    });
  }
  //Filter
  //Filer By Value
  function filterByValue(arr, key) {
    return arr.filter(function(obj) {
      return obj.hasOwnProperty(key);
    });
  }
  //Find
  function find(arr, value) {
    const filtered = arr.filter(function(item) {
      return item === value;
    });
    return filtered.length > 0 ? filtered[0] : undefined;
  }
  //Find In Obj
  function findInObj(arr, key, value) {
    const filtered = arr.filter(function(obj) {
      return obj[key] === value;
    });
    return filtered.length > 0 ? filtered[0] : undefined;
  }
  //Remove Vowels
  function removeVowels(str) {
    // Define the vowels to be removed
    const vowels = 'aeiouAEIOU';
  
    // Convert the string to lowercase and filter out vowels
    return str
      .toLowerCase()
      .split('')
      .filter(function(char) {
        return !vowels.includes(char);
      })
      .join('');
  }
  //Double Odd Numbers
  function doubleOddNumbers(arr) {
    return arr
      .filter(function(num) {
        return num % 2 !== 0; // Filter out odd numbers
      })
      .map(function(num) {
        return num * 2; // Double the odd numbers
      });
  }
  