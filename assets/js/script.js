let currentPage = 1;
let loading = false;

const urlDragonBall = "https://dragonball-api.com/api/characters";
const contenedorPadre = document.getElementById('contenedor-data');

const cargarDatos = async(currentPage) =>{
    loading = true
    try{
        const response = await fetch(`${urlDragonBall}?page=${currentPage}`);
        if(!response.ok) throw new error('Tuvimos un problema con la API');

        const data = await response.json();
        const dataPersonajes = data.items;
        console.log(data);
        //Mostrar items en el documento.
        dataPersonajes.forEach(personaje => {
            contenedorPadre.innerHTML += `
                <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
                    <div class="card bg-dark p-2 text-dark bg-opacity-10 mx-2 my-2" style="width: 500px;
                     border: none;">
                        <img
                            class="card-img-top p-2" alt=${personaje.name}
                            style="width: 100%; height: 400px; object-fit: contain;"
                            src=${personaje.image}
                        />
                        <div class="card card-body">
                            <h5 class="card-title">${personaje.name}</h5>
                            <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                            <button class="btn btn-success btn-ver-detalles">Ver más</button>
                        </div>
                    </div>
                </div>
                `;
                loading = false;
        });

        window.addEventListener('scroll', ()=>{
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

            if(!loading && scrollTop + scrollHeight >= clientHeight - 5){
                currentPage++;
                cargarDatos(currentPage);
            }
        })
        
    } catch (error){
        console.error(error);
    }

}


cargarDatos(currentPage);

