document.getElementById('evento-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const lugar = document.getElementById('lugar').value;
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('descripcion').value;
    const usuarioId = localStorage.getItem('usuarioId'); // Obtiene el ID del usuario desde localStorage

    if (!usuarioId) {
        alert('Usuario no autenticado');
        return;
    }

    const evento = {
        usuario: { id: usuarioId },
        nombre,
        lugar,
        fecha,
        descripcion
    };

    fetch('/api/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(evento)
    })
    .then(response => {
        if (response.ok) {
            alert('Evento agregado con éxito');
            window.location.href = 'miseventos.html'; // Redirige a la página de "Mis Eventos"
        } else {
            alert('Error al agregar el evento');
        }
    })
    .catch(error => console.error('Error:', error));
});