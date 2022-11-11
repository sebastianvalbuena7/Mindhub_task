// Variables
const inputEstatura = document.querySelector('#inputEstatura')
const inputPeso = document.querySelector('#inputPeso')
const resultado = document.querySelector('#resultado')
const calcular = document.querySelector('#button')
let estatura = 0
let peso = 0

// EventListener
eventListener()
function eventListener() {
    inputEstatura.addEventListener('blur', e => {
        estatura = parseInt(e.target.value) / 100
    })

    inputPeso.addEventListener('blur', e => {
        peso = parseInt(e.target.value)
    })

    calcular.addEventListener('click', buttonCalcular)
}
// Funciones
function buttonCalcular() {
    let imc = peso / (estatura ** 2)
    imc = imc.toFixed(2)
    resultado.value = imc
}