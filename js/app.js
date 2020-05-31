// Variables

const carrito = document.querySelector('#lista-carrito tbody')

const btnVaciarCarrito = document.getElementById('vaciar-carrito')

// EventListeners
eventListeners();

function eventListeners() {
    // Elimina los cursos del carrito
    document.addEventListener('click', eliminarCurso)

    // Agrega los cursos al carrito
    document.addEventListener('click', agregarCarrito)

    // Agrega los cursos del LocalStorage al DOM
    document.addEventListener('DOMContentLoaded', agregarCursoDOM )
}


btnVaciarCarrito.addEventListener('click', vaciarCarrito)




// Funciones


// Agrega los cursos en un objeto 
function agregarCarrito(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement
        leerDatosCurso(curso)
    }
}


// Almacena los datos del curso en un objeto

function leerDatosCurso(curso) {
    const infoCurso = {
        img: curso.querySelector('img').getAttribute('src'),
        instructor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        titulo: curso.querySelector('h4').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    AgregarCurso(infoCurso)
}

// Agrega el curso al DOM

function AgregarCurso(curso) {
    let row = document.createElement('tr')
    row.innerHTML = `
                        <td>
                        <img src=${curso.img} width ="150px" height="100px">
                        </td>
                        <td>${curso.titulo}</td>
                        <td>${curso.instructor}</td>
                        <td>${curso.precio}</td>
                        <td>
                          <a href=# class="borrar-curso" data-id =${curso.id}>X</a> 
                        </td>`

    carrito.appendChild(row)
    agregarCursoLocalStorage(curso)
}

// Almacena los cursos en el LocalStorage en forma de STRING

function agregarCursoLocalStorage(curso){
    cursos = leerLocalStorage()
    cursos.push(curso)

    localStorage.setItem('cursos', JSON.stringify(cursos))

    
}


// Almacena los cursos en un array en fomra de JSON

function leerLocalStorage(){
    let cursos;

    if (localStorage.getItem('cursos') === null){
        cursos = []
    }else {
        cursos = JSON.parse(localStorage.getItem('cursos'))
    }
    return cursos;
}

// Crea y muestra los datos almacenados del LocalStorage al DOM

function agregarCursoDOM() {
    let cursos = leerLocalStorage()

    cursos.forEach( ( curso ) => {
        let row = document.createElement('tr')
        row.innerHTML = `
                            <td>
                            <img src=${curso.img} width ="150px" height="100px">
                            </td>
                            <td>${curso.titulo}</td>
                            <td>${curso.instructor}</td>
                            <td>${curso.precio}</td>
                            <td>
                              <a href=# class="borrar-curso" data-id =${curso.id}>X</a> 
                            </td>`
    
        carrito.appendChild(row)
    })
}

// Elimina el curso del DOM y activa La funcion para eliminarlos del LocalStorage

function eliminarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('borrar-curso')) {
        let curso = e.target.parentElement.parentElement
        let cursoId = curso.querySelector('a').getAttribute('data-id')
        curso.remove()
        eliminarCursoLocalStorage(cursoId)
    }
}

// Elimina los cursos del LocalStorage

function eliminarCursoLocalStorage(cursoId){
    
    cursosLS = leerLocalStorage()
    cursosLS.forEach( (curso, index) => {
        if ( curso.id === cursoId ){
            cursosLS.splice( index, 1)
        }
    })

    localStorage.setItem('cursos', JSON.stringify(cursosLS))

}

// Vacia el LocalStorage y el Carrito

function vaciarCarrito(e){
    e.preventDefault()
    while (carrito.firstElementChild){
        carrito.firstElementChild.remove()
        
    }
    vaciarLocalStorage()
    return false
}

function vaciarLocalStorage(){
    localStorage.clear()
}