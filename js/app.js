//Variables

const buscador = document.querySelector('#busqueda');


// eventListener

document.body.addEventListener('click', eliminarObjeto);

buscador.addEventListener('keyup', escribirEnecabezado);



// Funciones


function eliminarObjeto(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        let elemento;
        elemento = e.target.parentElement.parentElement;
        elemento.remove()

    }
}


function escribirEnecabezado (e) {
    let encabezado;
    encabezado = document.getElementById('encabezado');
    encabezado.textContent = e.target.value;
}