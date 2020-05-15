class Score {

  static initBase(){
    firebase.initializeApp({
      apiKey: 'AIzaSyBZ07ZYBN1nQiUiNe7cuUrFJy327wtBi3s',
      authDomain: 'AUTHDOMAIN',
      projectId: 'coronavirus-game-95a5f',
    });
    
    // Initialize Firebase
    window.db = firebase.firestore();
  
  }
  
  static saveUser(playerName, playerScore){
    console.log("hey saved")
    var name = playerName
    var score = playerScore
    window.db.collection("users").add({
      first: name,
      score: score,
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  
  }
  
  static readScore(){
  
    window.db.collection("users").orderBy("score", "desc").limit(3)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(`${doc.data().first} => ${doc.data().score}`);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  
  }


}


export default Score;
