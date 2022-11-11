// Variables
const contenedor = document.getElementById('contenedorNotas')
let inputTitulo = document.getElementById('inputTitulo')
let inputTexto = document.getElementById('inputTexto')
const btnGuardar = document.getElementById('guardar')
const btnBorrar = document.getElementById('borrar') 
let inputBuscar = document.getElementById('buscar')
const buttonSearch = document.getElementById('buttonSearch')
let switchRealizada = document.getElementById('switch-realizada')
let valorTitulo = ''
let valorTexto = ''
let guardarNotas = []

// EventListener
inputTitulo.addEventListener('blur', e => {
    valorTitulo = e.target.value
})

inputTexto.addEventListener('blur', e => {
    valorTexto = e.target.value
})

btnGuardar.addEventListener('click', agregarNota)

btnBorrar.addEventListener('click', e => {
    inputTexto.value = ''
    inputTitulo.value = ''
})

switchRealizada.addEventListener('change', e => {
    let filtrado = filtrarRealizada(guardarNotas)
    filtrado = filtrarTexto(filtrado)
    pintarNotas(filtrado)
})

buttonSearch.addEventListener('click', e => {
    filtrarTexto(guardarNotas)
})

// Funciones
function agregarNota(titulo, texto) {
    titulo = valorTitulo
    texto = valorTexto
    if(titulo.length > 0 && texto.length > 0) {
        guardarNotas.push({
            id: guardarNotas.length + 1,
            titulo,
            texto,
            realizada: false
        })
        pintarNotas(guardarNotas)
    }
}

function pintarNotas(notas) {
    if(notas.length === 0){
        limpiarHTML()
        const noHay = document.createElement('h3')
        noHay.classList.add('text-light', 'fw-bold', 'text-center', 'display-4', 'mt-3')
        noHay.textContent = 'No hay cards para mostrar'
        contenedor.appendChild(noHay)
    } else {
        limpiarHTML()
        notas.map(elemento => {
            const {titulo, id, texto, realizada} = elemento
            let notas = document.createElement('div')
            notas.classList.add('rounded','bg-light','mt-4', 'w-50', 'py-4' ,'d-flex')
            notas.innerHTML = `
                <input style="width:1.5rem" class="ms-5 mb-5" onClick="marcarRealizada(${id})" type="checkbox" ${realizada ? "checked": ""}>
                <div class="ms-5 w-100 div-text">
                    <span class="fw-bold fs-4 titulo">${titulo}</span>
                    <p class="fs-5 texto texto-p">${texto}</p>
                    <button onclick="borrarNota(${id})" class="w-50 btn btn-sm btn-danger fs-6 fw-bold">Borrar Nota</button>
                </div> 
            `
            contenedor.appendChild(notas)
        })
    } 
}

function marcarRealizada(id) {
    guardarNotas.forEach(notas => {
        if(id === notas.id) {
            notas.realizada = !notas.realizada 
            if(notas.realizada) {
                let marcarTitulo = document.querySelector('.div-text')
                marcarTitulo.classList.add('text-decoration-line-through')
            } else {
                let marcarTitulo = document.querySelector('.div-text')
                marcarTitulo.classList.remove('text-decoration-line-through')
            }
        }
    })
}

function filtrarRealizada(notas) {
    let valorChecked = document.getElementById('checkbox').checked
    let notasHechas = notas.filter(nota => nota.realizada === valorChecked )
    pintarNotas(notasHechas)
}
 
function filtrarTexto(notas) {
    let texto = inputBuscar.value.toLowerCase().trim()
    let filtro = notas.filter(nota => nota.titulo.toLowerCase().includes(texto))
    pintarNotas(filtro)
}

function borrarNota(id) {
    guardarNotas = guardarNotas.filter( notas => notas.id !== id)
    pintarNotas(guardarNotas)
}

function limpiarHTML() {
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}