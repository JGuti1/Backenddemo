document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('id');

    fetch(`/api/eventos/${eventoId}`)
        .then(response => response.json())
        .then(evento => {
            document.getElementById('evento-id').value = evento.id;
            document.getElementById('nombre').value = evento.nombre;
            document.getElementById('lugar').value = evento.lugar;
            document.getElementById('fecha').value = evento.fecha;
            document.getElementById('descripcion').value = evento.descripcion;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('evento-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('evento-id').value;
    const nombre = document.getElementById('nombre').value;
    const lugar = document.getElementById('lugar').value;
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('descripcion').value;

    const evento = {
        nombre,
        lugar,
        fecha,
        descripcion
    };

    fetch(`/api/eventos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(evento)
    })
    .then(response => {
        if (response.ok) {
            alert('Evento actualizado con éxito');
            window.location.href = 'miseventos.html'; // Redirige a la página de "Mis Eventos"
        } else {
            alert('Error al actualizar el evento');
        }
    })
    .catch(error => console.error('Error:', error));
});