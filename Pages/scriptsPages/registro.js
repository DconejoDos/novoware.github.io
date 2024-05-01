
function register(usuario, email, contrasena) {
    firebase.auth().createUserWithEmailAndPassword(usuario, email, contrasena)
    .then((userCredential) => {
      alert("Usuario registrado con éxito");
      window.location = '../login.html';
    })
    .catch((error) => {
        
      alert("Error: " + error.message);
      
    });
  }