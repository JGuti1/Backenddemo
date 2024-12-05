document.addEventListener('DOMContentLoaded', cargarEventos);

function cargarEventos() {
    const usuarioId = localStorage.getItem('usuarioId'); // Obtiene el ID del usuario desde localStorage

    fetch(`/api/eventos?usuarioId=${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            const eventosContainer = document.getElementById('eventos-container');
            eventosContainer.innerHTML = '';
            data.forEach(evento => {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${evento.nombre}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${evento.lugar}</h6>
                            <p class="card-text">${evento.descripcion}</p>
                            <p class="card-text"><small class="text-muted">${evento.fecha}</small></p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button class="btn btn-primary" onclick="editarEvento(${evento.id})">Editar</button>
                                <button class="btn btn-danger" onclick="eliminarEvento(${evento.id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                `;
                eventosContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
}

function editarEvento(id) {
    window.location.href = `editarEvento.html?id=${id}`;
}

function eliminarEvento(id) {
    fetch(`/api/eventos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            cargarEventos();
        } else {
            alert('Error al eliminar el evento');
        }
    })
    .catch(error => console.error('Error:', error));
}