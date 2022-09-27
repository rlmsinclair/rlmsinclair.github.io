(function () {

  let playerId;
  let playerRef;


  document.addEventListener("keypress", function onEvent(event) {
    if (event.keyCode == 13) {
      game = firebase.database().ref(`game/`);
      if (!game.numOfLetters) {
        game.set({
          word : document.getElementById('form').value,
          numOfLetters : 1,
        })
      }
      if (game.numOfLetters) {
        numOfLetters = game.numOfLetters;
        console.log(numOfLetters);
        game.set({
          word : document.getElementById('form').value,
        })
      }
      document.getElementById('text-shown').innerHTML = document.getElementById('form').value;
    }

});

  document.getElementById('submit').addEventListener("click", function() {
    alert('test');
  });

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
