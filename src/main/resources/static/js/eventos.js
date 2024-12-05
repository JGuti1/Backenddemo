document.addEventListener('DOMContentLoaded', cargarEventos);

function cargarEventos() {
    fetch('/api/eventos')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#eventos-table tbody');
            tbody.innerHTML = '';
            data.forEach(evento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${evento.id}</td>
                    <td>${evento.usuario.nombre}</td>
                    <td>${evento.nombre}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.descripcion}</td>
                    <td>${evento.fechaCreacion}</td>
                    <td>
                        <button onclick="editarEvento(${evento.id})">Editar</button>
                        <button onclick="eliminarEvento(${evento.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function guardarEvento() {
    const id = document.getElementById('evento-id').value;
    const usuarioId = document.getElementById('usuario-id').value;
    const nombre = document.getElementById('nombre').value;
    const lugar = document.getElementById('lugar').value;
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('descripcion').value;

    const evento = {
        usuario: { id: usuarioId },
        nombre,
        lugar,
        fecha,
        descripcion
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/eventos/${id}` : '/api/eventos';

    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(evento)
    })
    .then(response => response.json())
    .then(() => {
        cargarEventos();
        limpiarFormulario();
    });
}

function editarEvento(id) {
    fetch(`/api/eventos/${id}`)
        .then(response => response.json())
        .then(evento => {
            document.getElementById('evento-id').value = evento.id;
            document.getElementById('usuario-id').value = evento.usuario.id;
            document.getElementById('nombre').value = evento.nombre;
            document.getElementById('lugar').value = evento.lugar;
            document.getElementById('fecha').value = evento.fecha;
            document.getElementById('descripcion').value = evento.descripcion;
        });
}

function eliminarEvento(id) {
    fetch(`/api/eventos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            cargarEventos();
        } else {
            console.error('Error al eliminar el evento');
        }
    })
    .catch(error => console.error('Error:', error));
}

function limpiarFormulario() {
    document.getElementById('evento-id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('lugar').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('descripcion').value = '';
}