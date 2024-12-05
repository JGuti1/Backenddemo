document.addEventListener('DOMContentLoaded', cargarEventos);

function cargarEventos() {
    fetch('/api/eventos')
        .then(response => response.json())
        .then(data => {
            const eventosContainer = document.getElementById('eventos-container');
            eventosContainer.innerHTML = '';
            data.slice(0, 3).forEach((evento, index) => {
                const item = document.createElement('div');
                item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `
                    <div class="d-flex justify-content-center">
                        <div class="card mb-4 shadow-sm" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${evento.nombre}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${evento.lugar}</h6>
                                <p class="card-text">${evento.descripcion}</p>
                                <p class="card-text"><small class="text-muted">${evento.fecha}</small></p>
                            </div>
                        </div>
                    </div>
                `;
                eventosContainer.appendChild(item);
            });
        })
        .catch(error => console.error('Error:', error));
}