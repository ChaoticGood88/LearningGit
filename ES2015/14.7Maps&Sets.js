//#1 
[1,2,3,4]

//#2 
"ref"

//#3 
Map(2) {
  [1, 2, 3] => true,
  [1, 2, 3] => false
}

//Has Duplicate
const hasDuplicate = arr => new Set(arr).size !== arr.length;

//Vowel Count
const vowelCount = str => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const vowelMap = new Map();
  
    for (let char of str.toLowerCase()) {
      if (vowels.has(char)) {
        vowelMap.set(char, (vowelMap.get(char) || 0) + 1);
      }
    }
  
    return vowelMap;
  };