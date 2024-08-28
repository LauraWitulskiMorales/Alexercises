function sortByVowel(list) {
    var sorted = [];
  
    function countVowels(str) {
      return (str.match(/[aeiouAEIOU]/g) || []).length;
    }
  
    list.sort(function(a, b) {
      return countVowels(a) - countVowels(b);
    });
  
    for (var i = 0; i < list.length; i++) {
      sorted.push(list[i]);
    }
  
    return sorted;
  }

console.log(sortByVowel(['Alice', 'Bob', 'Mallory'])); // => ['Bob', 'Mallory', 'Alice']