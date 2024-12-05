// Store sensitive data in environment variables or a separate secure file.
const GOOGLE_CLIENT_ID = '779399358432-r3vi7iktmq56j7rakqi7r88hlu22h452.apps.googleusercontent.com'; // Replace with your Google Client ID

document.addEventListener('DOMContentLoaded', function() {
    // Verifica si el objeto google está disponible
    if (typeof google !== 'undefined') {
        // Google OAuth Initialization
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredentialResponse,
        });

        google.accounts.id.renderButton(
            document.getElementById('googleSignInDiv'),
            { theme: 'outline', size: 'large' } // Options for styling
        );
    } else {
        console.error('Google API script not loaded');
    }
});

function handleGoogleCredentialResponse(response) {
    const idToken = response.credential;
    const userInfo = JSON.parse(atob(idToken.split('.')[1])); // Decode ID Token payload

    console.log("ID: " + userInfo.sub);
    console.log('Full Name: ' + userInfo.name);
    console.log('Given Name: ' + userInfo.given_name);
    console.log('Family Name: ' + userInfo.family_name);
    console.log("Image URL: " + userInfo.picture);
    console.log("Email: " + userInfo.email);

    // Aquí puedes almacenar el ID del usuario en localStorage y redirigir a la página de eventos
    localStorage.setItem('usuarioId', userInfo.sub);
    localStorage.setItem('usuarioNombre', userInfo.name);
    localStorage.setItem('usuarioEmail', userInfo.email);
    window.location.href = 'eventos.html';
}