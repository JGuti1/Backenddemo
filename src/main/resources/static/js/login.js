document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const politicas = document.getElementById('politicas').checked;

    if (!politicas) {
        alert('Debes aceptar las políticas de privacidad');
        return;
    }

    const loginRequest = {
        email,
        password
    };

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Credenciales incorrectas');
        }
    })
    .then(usuario => {
        localStorage.setItem('usuarioId', usuario.id); // Almacena el ID del usuario en localStorage
        alert('Inicio de sesión exitoso');
        window.location.href = 'eventos.html'; // Redirige a la página CRUD
    })
    .catch(error => {
        alert(error.message);
    });
});