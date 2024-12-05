document.addEventListener('DOMContentLoaded', cargarEventos);

function cargarEventos() {
    fetch('/api/eventos')
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
                        </div>
                    </div>
                `;
                eventosContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
}