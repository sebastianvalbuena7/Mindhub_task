// Variables
const cardUpcoming = document.getElementById('cards-upcoming')
const spaceCheck = document.getElementById('category')
let inputSearch = document.getElementById('search')
const buttonSearch = document.getElementById('buttonSearch')
const setArray = new Set(events.map( property => property.category ))
const arrayCategory = Array.from(setArray)

// EventListener
spaceCheck.addEventListener('change', e => {
    let filtro = filtrado()
    printCards(filtro)
})

buttonSearch.addEventListener('click', e => {
    e.preventDefault()
    let filtro = filtrado()
    printCards(filtro)
})

// Funciones
function filtrado() {
    const checked = Array.from(document.querySelectorAll('input[type = "checkbox"]:checked')).map( input => input.value )
    const cardsFilters = filterCategory(events, checked)
    let text = inputSearch.value.toLowerCase().trim()
    const cardsTextFilters = filterText(cardsFilters, text)
    return cardsTextFilters
}

printCards(events)
function printCards(event){
    limpiarHTML()
    event.map(property =>  {
    const {image, name, description, price, date, _id} = property
    if(date > currentDate ) {
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
        cardUpcoming.appendChild(infoCards)
        }
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
    while(cardUpcoming.firstChild) {
        cardUpcoming.removeChild(cardUpcoming.firstChild)
    }
}