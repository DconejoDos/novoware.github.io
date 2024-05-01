document.addEventListener("DOMContentLoaded", function () {
    var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuarioActual) {
        document.getElementById("NickName").textContent = usuarioActual.usuario;
        document.getElementById("Correo").textContent = usuarioActual.correo;
    }
});
