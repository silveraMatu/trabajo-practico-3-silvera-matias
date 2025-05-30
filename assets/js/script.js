const urlDragonBall = "https://dragonball-api.com/api/characters";
const contenedorPadre = document.getElementById('contenedor-data');

const cargarDatos = async(url) =>{
    try{
        const response = await fetch(url);
        if(!response.ok) throw new error('Tuvimos un problema con la API');

        const data = await response.json();
        const dataPersonajes = data.items;

        //Mostrar items en el documento.
        dataPersonajes.forEach((personaje) => {
            contenedorPadre.innerHTML += `
                <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
                    <div class="card">
                        <img
                            class="card-img-top"
                            src=${personaje.image}
                        />
                    <div class="card-body">
                        <h5 class="card-title">${personaje.name}</h5>
                        <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                        <button class="btn btn-success btn-ver-detalles">Ver más</button>
                    </div>
                    </div>
                </div>
                `;
        });
        
    } catch (error){
        console.error(error);
    }

}
cargarDatos(urlDragonBall);

