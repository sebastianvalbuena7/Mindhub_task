// Variables
const pesos = document.querySelector('#inputArgentina')
const dolar = document.querySelector('#inputEstadosUnidos')
let pesosArgentinos = 0
let dolarEstadosUnidos = 0

// EventListeners
pesos.addEventListener('blur', e => {
    pesosArgentinos = parseInt(e.target.value)
    conversionDolar()
})
dolar.addEventListener('blur', e => {
    dolarEstadosUnidos = parseInt(e.target.value)
    conversionPesos()
})

// Funciones
function conversionDolar() {
    dolarEstadosUnidos = pesosArgentinos / 159
    dolar.value = dolarEstadosUnidos
}

function conversionPesos() {
    pesosArgentinos = dolarEstadosUnidos * 159
    pesos.value = pesosArgentinos
}