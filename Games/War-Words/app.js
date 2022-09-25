(function () {

  let playerId;
  let playerRef;

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      playerRef.set({
        id: playerId,
      })
      playerRef.onDisconnect().remove();
    } else {

    }
  })

  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  })
})();
