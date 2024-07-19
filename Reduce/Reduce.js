//Extract Value
function extractValue(arr, key) {
    return arr.reduce(function(accumulator, currentObj) {
      accumulator.push(currentObj[key]);
      return accumulator;
    }, []);
  }
  //Vowel Count
  function vowelCount(str) {
    const vowels = "aeiou";
    return str.toLowerCase().split('').reduce(function(accumulator, char) {
      if (vowels.includes(char)) {
        accumulator[char] = (accumulator[char] || 0) + 1;
      }
      return accumulator;
    }, {});
  }
  //Add Key and Value
  function addKeyAndValue(arr, key, value) {
    return arr.reduce(function(accumulator, obj) {
      const newObj = { ...obj, [key]: value };
      accumulator.push(newObj);
      return accumulator;
    }, []);
  }
  //Partition
  function partition(arr, callback) {
    return arr.reduce(function(accumulator, currentValue) {
      if (callback(currentValue)) {
        accumulator[0].push(currentValue);
      } else {
        accumulator[1].push(currentValue);
      }
      return accumulator;
    }, [[], []]);
  }