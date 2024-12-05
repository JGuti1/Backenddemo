document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repetirPassword = document.getElementById('repetir-password').value;
    const politicas = document.getElementById('politicas').checked;

    if (password !== repetirPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (!politicas) {
        alert('Debes aceptar las políticas de privacidad');
        return;
    }

    const usuario = {
        nombre,
        email,
        password
    };

    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario registrado con éxito');
            window.location.href = 'iniciarsesion.html'; // Redirige a la página de inicio de sesión
        } else if (response.status === 409) {
            alert('El correo electrónico ya está registrado');
        } else {
            alert('Error al registrar el usuario');
        }
    })
    .catch(error => console.error('Error:', error));
});