import * as firebase from 'firebase/app';// eslint-disable-line import/no-unresolved
import 'firebase/firestore'; // eslint-disable-line import/no-unresolved

class Score {
  static initBase() {
    firebase.initializeApp({ // eslint-disable-line no-undef
      apiKey: 'AIzaSyBZ07ZYBN1nQiUiNe7cuUrFJy327wtBi3s',
      authDomain: 'AUTHDOMAIN',
      projectId: 'coronavirus-game-95a5f',
    });
    window.db = firebase.firestore(); // eslint-disable-line no-undef
  }

  static saveUser(playerName, playerScore) {
    const name = playerName;
    const score = playerScore;
    return window.db.collection('users').add({
      first: name,
      score,
    })
      .then(() => {
        const data = `data submited: ${playerName}-${playerScore}`;
        return data;
      })
      .catch(() => {
      });
  }

  static readScore() {
    return window.db.collection('users').orderBy('score', 'desc').limit(10)
      .get()
      .then((querySnapshot) => {
        const query = querySnapshot;

        return query;
      })
      .catch(() => {
      });
  }
}


export default Score;
