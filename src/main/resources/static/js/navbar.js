document.addEventListener('DOMContentLoaded', function() {
    const usuarioId = localStorage.getItem('usuarioId');
    const navbarContainer = document.getElementById('navbar-container');

    if (usuarioId) {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand d-flex align-items-center" href="index.html">
                        <img src="/img/de.png" alt="Logo" width="40" height="40" class="me-2">
                        SISTEMA DE EVENTOS USC
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="eventos.html">Eventos</a>
                            </li>
                            <li class="nav-item mx-1">
                                <a class="nav-link" href="miseventos.html">Mis Eventos</a>
                            </li>
                            <li class="nav-item dropdown mx-5">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Cuenta
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li><a class="dropdown-item" href="miperfil.html">Mi Perfíl</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="#" id="logout">Cerrar Sesión</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        document.getElementById('logout').addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('usuarioId');
            window.location.href = 'index.html';
        });
    } else {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand d-flex align-items-center" href="index.html">
                        <img src="/img/de.png" alt="Logo" width="40" height="40" class="me-2">
                        SISTEMA DE EVENTOS USC
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="iniciarsesion.html">Iniciar sesión</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="registrar.html">Registrarse</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
});