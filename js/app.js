// Variables
const btnBorrarCurso = document.querySelectorAll('.borrar-curso');


// EventListeners
eventListeners();

function eventListeners (){
    document.addEventListener('click', eliminarCurso)

}




// Funciones


function eliminarCurso(e) {
    e.preventDefault();
    if ( e.target.classList.contains('borrar-curso')) {
        let curso = e.target.parentElement.parentElement
        curso.remove()
    }
}