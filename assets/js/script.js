const searchButton = document.getElementById('boton-buscar');
const searchInput = document.getElementById('form-control');
const contenedorPadre = document.getElementById('contenedor-data');

let todosLosPersonajes = [];
let currentPage = 1;
let loading = false;

const urlDragonBall = "https://dragonball-api.com/api/characters";

// Función para cargar datos desde la API
const cargarDatos = async (currentPage) => {
    loading = true;
    try {
        const response = await fetch(`${urlDragonBall}?page=${currentPage}`);
        if (!response.ok) throw "Vaya... Tuvimos un problema con la API.";

        const data = await response.json();
        const dataPersonajes = data.items;

        // Acumulamos en un array plano
        todosLosPersonajes = [...todosLosPersonajes, ...dataPersonajes];

        // Agregamos sin limpiar el contenedor
        renderizarPersonajes(dataPersonajes, false);
    } catch (error) {
        contenedorPadre.innerHTML = `
            <h2 class="text-center my-3">${error}</h2>
            <img class="mx-auto" src="assets/img/error-image.png" alt="error-image" style="width: 400px"/>`;
    }
    loading = false;
};

// Scroll infinito
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (!loading && scrollTop + clientHeight >= scrollHeight - 5) {
        currentPage++;
        cargarDatos(currentPage);
    }
});

// Función para renderizar personajes
const renderizarPersonajes = (personajes, limpiar = false) => {
    if (limpiar) contenedorPadre.innerHTML = "";

    personajes.forEach(personaje => {
        const modalId = `modal-${personaje.id}`;

        contenedorPadre.innerHTML += `
            <div class="col-3 pb-2 d-flex justify-content-center" data-id="${personaje.id}">
                <div class="card bg-dark p-2 text-dark bg-opacity-10 mx-2 my-2" style="width: 500px; overflow: visible; position: relative; border: none;">
                    <img class="card-img-top p-2 img-hover" alt="${personaje.name}" style="width: 100%; height: 400px; object-fit: contain;" src="${personaje.image}" />
                    <div class="card card-body">
                        <h5 class="card-title">${personaje.name}</h5>
                        <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#${modalId}">
                            Ver más
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="${modalId}-label">${personaje.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                  </div>
                  <div class="modal-body d-flex gap-4 flex-wrap">
                    <img src="${personaje.image}" alt="${personaje.name}" style="width: 250px; height: auto; object-fit: contain;">
                    <div>
                        <p><strong>Nombre:</strong> ${personaje.name}</p>
                        <p><strong>Género:</strong> ${personaje.gender}</p>
                        <p><strong>KI:</strong> ${personaje.ki}</p>
                        <p><strong>Descripción:</strong> ${personaje.description || "No disponible."}</p>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    });
};

// Búsqueda por nombre
searchButton.addEventListener('click', () => {
    const termino = searchInput.value.trim().toLowerCase();

    if (termino === "") {
        renderizarPersonajes(todosLosPersonajes, true);
        return;
    }

    const personajesFiltrados = todosLosPersonajes.filter(personaje =>
        personaje.name.toLowerCase().includes(termino)
    );

    if (personajesFiltrados.length === 0) {
        contenedorPadre.innerHTML = `
            <h3 class="text-center mt-3">No se encontraron personajes con ese nombre.</h3>`;
    } else {
        renderizarPersonajes(personajesFiltrados, true);
    }
});

// Permitir Enter en el input para buscar
searchButton.addEventListener('click', (e) => {
    e.preventDefault(); // ⛔ Previene que el formulario recargue la página

    const termino = searchInput.value.trim().toLowerCase();

    if (termino === "") {
        renderizarPersonajes(todosLosPersonajes, true);
        return;
    }

    const personajesFiltrados = todosLosPersonajes.filter(personaje =>
        personaje.name.toLowerCase().includes(termino)
    );

    if (personajesFiltrados.length === 0) {
        contenedorPadre.innerHTML = `
            <h3 class="text-center mt-3">No se encontraron personajes con ese nombre.</h3>`;
    } else {
        renderizarPersonajes(personajesFiltrados, true);
    }
});


// Cargar primera página
cargarDatos(currentPage);
