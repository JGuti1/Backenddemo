document.addEventListener('DOMContentLoaded', function() {
    cargarEventos();
});

function cargarEventos() {
    fetch('/api/eventos')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('#usuarios-table tbody');
            tbody.innerHTML = '';
            data.forEach(evento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${evento.id}</td>
                    <td>${evento.nombre}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.fechaHora}</td>
                    <td>${evento.descripcion}</td>
                    <td>
                        <button class="editar" onclick="editarEvento(${evento.id})">Editar</button>
                        <button class="eliminar" onclick="eliminarEvento(${evento.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar eventos:', error);
        });
}

function crear_editar_Usuario() {
    const id = document.getElementById('usuario-id').value;
    const nombre = document.getElementById('nombre').value;
    const lugar = document.getElementById('lugar').value;
    const fechaHora = document.getElementById('datetime').value;
    const descripcion = document.getElementById('description').value;

    const evento = {
        nombre,
        lugar,
        fechaHora,
        descripcion
    };

    let method = 'POST';
    let url = '/api/eventos';

    if (id) {
        method = 'PUT';
        url = `/api/eventos/${id}`;
    }

    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(evento)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        limpiarFormulario();
        cargarEventos();
    })
    .catch(error => {
        console.error('Error al guardar el evento:', error);
    });
}

function editarEvento(id) {
    fetch(`/api/eventos/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(evento => {
            document.getElementById('usuario-id').value = evento.id;
            document.getElementById('nombre').value = evento.nombre;
            document.getElementById('lugar').value = evento.lugar;
            document.getElementById('datetime').value = evento.fechaHora;
            document.getElementById('description').value = evento.descripcion;
        })
        .catch(error => {
            console.error('Error al cargar el evento:', error);
        });
}

function eliminarEvento(id) {
    fetch(`/api/eventos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        cargarEventos();
    })
    .catch(error => {
        console.error('Error al eliminar el evento:', error);
    });
}

function limpiarFormulario() {
    document.getElementById('usuario-id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('lugar').value = '';
    document.getElementById('datetime').value = '';
    document.getElementById('description').value = '';
}

