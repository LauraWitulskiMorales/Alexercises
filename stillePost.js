const replaceCharacterAt = (word, replacement, position) => {
	if (position >= word.length) {
  	return word;
  }
  
	return word.substring(0, position) + replacement + word.substring(position+1);
}

const playerOne = (word) => {
	return new Promise((resolve) => {
    setTimeout(() => {
	    resolve(replaceCharacterAt(word, 'b', 0));
    }, 1000);
  });
}

const playerTwo = (word) => {
	return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.8) {
				resolve(replaceCharacterAt(word, 'b', 1));
      } else {
        reject();
      }
    }, 1000);
  });
}

const playerThree = (word) => {
	return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.5) {
				resolve(replaceCharacterAt(word, 'b', 2));
      } else {
        reject();
      }
    }, 1000);
  });
}

// Aufgabe 1

// Promise 
const stillePost = (word) => {
  let forgotten = [];
	
  return playerOne (word)
    .then(result => {
      return playerTwo(result)
        .catch(() => {
          forgotten.push("PlayerTwo");
          return result;
        });
    })
    .then(result => {
      return playerThree(result)
        .catch(() => {
          forgotten.push("PlayerThree");
          return result;
        });
    })
    .then(finalResult => {
      console.log("Start word:", word);
      console.log("Final result:", finalResult);
      console.log("Players who forgot:", forgotten.length > 0 ? forgotten.join(", ") : "None");
    });
} 

// Async 
async function stillePost (word) {
  let forgotten = [];
  let result;

  try {
    result = await playerOne(word);
  } catch {
    forgotten.push("PlayerOne")
    result = word
  }
  try {
    result = await playerTwo(word);
  } catch {
    forgotten.push("PlayerTwo")
  }
  try {
    result = await playerThree(word);
  } catch {
    forgotten.push("PlayerThree");
  }
  console.log("Start word:", word);
  console.log("Final result:", result);
  console.log("Players who forgot:", forgotten.length > 0 ? forgotten.join(", ") : "None");
}

stillePost('aaa');


// Aufgabe 2

const createPlayer = (position, forgetfulness) => {
  return (word) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() <= forgetfulness) {
          reject(`Player at postition ${position} forgot the word`);
        } else {
          resolve(replaceCharacterAt(word, "b", position));
        }
      }, 1000);
    });
  };
};

const createPlayers = (wordLength) => {
  let players = [];
  for (let i = 0; i < wordLength; i++) {
    let forgetfulness = 0.1 + Math.random() * 0.8;
    players.push(createPlayer(i, forgetfulness));
  }
  return players;
};

const stillePost = async (word) => {
  let players = createPlayers(word.length);
  let currentWord = word;
  let forgotten = [];

  for (let i = 0; i < players.length; i++) {
    try {
      currentWord = await players[i](currentWord);
    } catch (e) {
      forgotten.push(`Player ${i + 1}`);
      console.log(e);
    }
  }
  console.log("Start word:", word);
  console.log("Final result:", currentWord);
  console.log("Players who forgot:", forgotten.length > 0 ? forgotten.join(", ") : "None");
}

stillePost('aaaa');