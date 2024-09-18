const replaceCharacterAt = (word, replacement, position) => {
	if (position >= word.length) {
  	return word;
  }
  
	return word.substring(0, position) + replacement + word.substring(position+1);
}

const createPlayer = (position, forgetfulness) => {
    return (word) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() <= forgetfulness) {
            reject(`Player at postition ${position} forgot the word`);
          } else {
            resolve(replaceCharacterAt(word, "b", position));
          }
        }, 1000 + Math.random() * 4000);
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
  
  // Async 
  /*const lautePost = async (word) => {
    let players = createPlayers(word.length);
    let currentWord = word;
    let forgotten = [];
    let results = [];
  
    await Promise.all(players.map(async (player, index) => {
        try {
            results[index] = await player(word);
        } catch (e) {
            forgotten.push(`Player ${index + 1}`);
        }
      }));
    const firstResult = results.find(result => result !== undefined);

    console.log("Start word:", word);
    console.log("Final result:", firstResult !== undefined ? firstResult : "None");
    console.log("Players who forgot:", forgotten.length > 0 ? forgotten.join(", ") : "None");
    }
    */


// Promise.then
    const lautePost = (word) => {
        let players = createPlayers(word.length)
        let forgotten = [];
        let results = [];

        let playerPromises = players.map(async (player, index) => {
            return player(word)
              .then(result => {
                results[index] = result;
              })
              .catch (e => {
                forgotten.push(`Player ${index + 1}`);
              });
        });

        Promise.all(playerPromises)
          .then(() => {
            const firstResult = results.find(result => result !== undefined);
            console.log("Start word:", word);
            console.log("Final result:", firstResult !== undefined ? firstResult : "None");
            console.log("Players who forgot:", forgotten.length > 0 ? forgotten.join(", ") : "None");
          })
          .catch(e => {
            console.log("An error has occured");
          });
    }

  
  lautePost('aaaaa');