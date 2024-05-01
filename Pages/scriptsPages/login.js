document.addEventListener("DOMContentLoaded", function() {
    // Crea los usuarios si no existen en el localStorage
    if (!localStorage.getItem("usuarios")) {
        var usuarios = [
            { usuario: "admin", contraseña: "admin123", tipo: "admin", correo: "carlos@gmail.com" },
            { usuario: "user", contraseña: "user123", tipo: "user", correo: "zaira@gmail.com" },
            { usuario: "user2", contraseña: "user123", tipo: "user", correo: "daniel@gmail.com" }
        ];
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    // Evento submit del formulario de login
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var usuario = document.getElementById("usuario").value;
        var contraseña = document.getElementById("contraseña").value;
        var usuarios = JSON.parse(localStorage.getItem("usuarios"));

        var usuarioEncontrado = usuarios.find(function(u) {
            return u.usuario === usuario && u.contraseña === contraseña;
        });

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));

            // Redireccionar
            if (usuarioEncontrado.tipo === "admin") {
                window.location.href = "../moduloAdmin/perfilAdmin.html";
            } else if (usuarioEncontrado.tipo === "user") {
                window.location.href = "../moduloUsuario/perfilUsuario.html";
            }
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});
