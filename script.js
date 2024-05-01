$(document).ready(function () {
    $(".slider").slick();
});

// Captura el botón registrate
var boton = document.getElementById('botonInvitacion');
boton.addEventListener('click', function() {
    window.location.href = 'Pages/registro.html';
});
