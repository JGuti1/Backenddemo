document.addEventListener('DOMContentLoaded', function() {
    const usuarioId = localStorage.getItem('usuarioId');

    // Cargar los datos del usuario
    fetch(`/usuarios/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del usuario');
            }
            return response.json();
        })
        .then(usuario => {
            document.getElementById('nombre').value = usuario.nombre || '';
            document.getElementById('email').value = usuario.email || '';
        })
        .catch(error => console.error('Error:', error));

    // Manejar el envío del formulario
    document.getElementById('perfil-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const usuario = {
            nombre,
            email,
            password
        };

        fetch(`/usuarios/${usuarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if (response.ok) {
                alert('Perfil actualizado con éxito');
                window.location.href = 'index.html';
            } else {
                alert('Error al actualizar el perfil');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});