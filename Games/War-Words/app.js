(function () {

  let playerId;
  let playerRef;



  var ref = firebase.database().ref("game/word");
  ref.on("value", function(snapshot) {
    childArray = new Array()
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      childArray.push(childData)
   });
    document.getElementById('text-shown').innerHTML = childArray.join('');
  });

  document.addEventListener("keypress", function onEvent(event) {
    if (event.keyCode == 13) {
      game = firebase.database().ref(`game/`);
      var ref = firebase.database().ref("game/word");
      childArray = new Array()
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          childData = childSnapshot.val();
          childArray.push(childData);
        });
      });
      childArray.push(document.getElementById('form').value)
      game.set({
        word : childArray,
      });
    }

});

  document.getElementById('submit').addEventListener("click", function() {
    alert('Word Reset')
    firebase.database().ref("game/word").remove();
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
