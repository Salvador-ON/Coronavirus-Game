class Score {
  static initBase() {
    firebase.initializeApp({ // eslint-disable-line no-undef
      apiKey: 'AIzaSyBZ07ZYBN1nQiUiNe7cuUrFJy327wtBi3s',
      authDomain: 'AUTHDOMAIN',
      projectId: 'coronavirus-game-95a5f',
    });

    // Initialize Firebase
    window.db = firebase.firestore(); // eslint-disable-line no-undef
  }

  static saveUser(playerName, playerScore) {
    const name = playerName;
    const score = playerScore;
    window.db.collection('users').add({
      first: name,
      score,
    })
      .then((docRef) => {
        // console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        // console.error('Error adding document: ', error);
      });
  }

  static readScore() {
    window.db.collection('users').orderBy('score', 'desc').limit(3)
      .get()
      .then((querySnapshot) => querySnapshot)
      .catch((error) => { // eslint-disable-line no-undef
        // console.log('Error getting documents: ', error);
      });
  }
}


export default Score;
