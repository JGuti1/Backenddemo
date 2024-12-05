document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('usuarioId'); // Elimina el ID del usuario del almacenamiento local
    window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
});