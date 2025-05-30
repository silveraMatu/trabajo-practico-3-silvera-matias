const urlDragonBall = "https://dragonball-api.com/api/characters";
const contenedorPadre = document.getElementById('#contenedor-data');

const cargarDatos = async(url) =>{
    try{
        const response = await fetch(url);
        if(!response.ok) throw new error('Tuvimos un problema con la API');

        const data = await response.json();
        const personajes = data.items;

        //Mostrar items en consola.
        return personajes;
        
    } catch (error){
        console.error(error);
    }

}
console.log(cargarDatos(urlDragonBall));

