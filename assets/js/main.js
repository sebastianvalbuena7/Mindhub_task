// Variables
const cardHome = document.getElementById('article-cards')
const spaceCheck = document.getElementById('category')
let inputSearch = document.getElementById('search')
const buttonSearch = document.getElementById('buttonSearch')
const setArray = new Set(events.map( property => property.category ))
const arrayCategory = Array.from(setArray)
let filtrado = []

// EventListener
spaceCheck.addEventListener('change', e => {
    const checked = Array.from(document.querySelectorAll('input[type = "checkbox"]:checked')).map( input => input.value )
    const cardsFilters = filterCategory(events, checked)
    filtrado = cardsFilters.map( e => e)
    printCards(cardsFilters)
})

buttonSearch.addEventListener('click', e => {
    e.preventDefault()
    filtrado = valorFiltrado()
    let text = inputSearch.value.toLowerCase().trim()
    const cardsTextFilters = filterText(filtrado, text)
    printCards(cardsTextFilters)
})

// Funciones
function valorFiltrado() {
    if(filtrado.length === 0) {
        return events
    }
    return filtrado
}

printCards(events)
function printCards(event) {
    limpiarHTML()
    event.map(property =>  {
        const {image, name, description, price, _id} = property
        let infoCards = document.createElement('div')
        infoCards.classList.add('card', 'card-width', 'me-auto', 'ms-auto', 'd-block', 'mb-4', 'bg-dark')
        infoCards.innerHTML = `
            <img src="${image}" class="card-img-top height-img" alt="${name}">
            <div class="card-body">
                <h5 class="card-title text-center text-light mb-3">${name}</h5>
                <p class="card-text text-light mb-1">${description}</p>
                <div class="d-flex justify-content-around mb-1 mt-3">
                    <a href="#" class="btn text-light">Price $ ${price}</a>
                    <a href="./information.html?id=${_id}" class="btn text-light button-cards">Details</a>
                </div>
            </div>
            `
        cardHome.appendChild(infoCards)
    })
}

createCheckbox(arrayCategory, spaceCheck)
function createCheckbox(value, contenedor) {
    let template = ''
    value.forEach( values => template += `
        <label class="btn">
            <input type="checkbox" value="${values}" class="me-2" value="" checked> ${values}
        </label>
    `)
    contenedor.innerHTML = template
}

function filterCategory(event, condition) {
    let filters = event.filter(evento => condition.includes(evento.category))
    return filters
}

function filterText(eventsArray, text) {
    let filter = eventsArray.filter(event => event.name.toLowerCase().includes(text) || event.description.toLowerCase().includes(text))
    return filter
}

function limpiarHTML() {
    while(cardHome.firstChild) {
        cardHome.removeChild(cardHome.firstChild)
    }
}