// Variables
const trHighest = document.getElementById('tr-highest')
const trCategoryUpcoming = document.getElementById('tr-categoryUpcoming')
const trCategoryUpcomingRevenues = document.getElementById('tr-categoryUpcomingRevenues')
const trCategoryUpcomingAttendance = document.getElementById('tr-categoryUpcomingAttendance')
const trCategoryPast = document.getElementById('tr-categoryPast')
const trCategoryPastRevenues = document.getElementById('tr-categoryPastRevenues')
const trCategoryPastAttendance = document.getElementById('tr-categoryPastAttendance')
let eventsData
let data
let date

// Peticion
fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(json => {
        eventsData = json
        data = eventsData.events
        date = eventsData.currentDate
        highestAttendance(data)
        lowestAttendance(data)
        largerCapacity(data)
        const setArray = new Set(data.map( property => property))
        const arrayCategory = Array.from(setArray).filter(value => value.category !== "Food Fair")
        const arrayCategory2 = Array.from(setArray).filter(value => value.category)
        createUpcoming(arrayCategory, date)
        createPast(arrayCategory2, date)
    })
    .catch(error => console.error(error))

// Funciones 
function highestAttendance(events) {
    let filterAssistance = events.filter(property => property.assistance)
    let highAttendance = filterAssistance.map(property => parseInt(property.assistance))
    const maxValue = highAttendance.reduce((previous, current) => {
        return Math.max(previous, current)
    }, 0)
    const compareData = events.filter(property => parseInt(property.assistance) == maxValue)
    printInfo(compareData)
}

function lowestAttendance(events) {
    let filterAssistance = events.filter(property => property.assistance)
    let lowAttendance = filterAssistance.map(property => parseInt(property.assistance))
    const minValue = lowAttendance.reduce((previous, current) => {
        return Math.min(previous, current)
    })
    const compareData = events.filter(property => parseInt(property.assistance) == minValue)
    printInfo(compareData)
}

function largerCapacity(events) {
    let filterAssistance = events.filter(property => property.capacity)
    let highAttendance = filterAssistance.map(property => parseInt(property.capacity))
    const lCapacity = highAttendance.reduce((previous, current) => {
        return Math.max(previous, current)
    }, 0)
    const compareData = events.filter(property => parseInt(property.capacity) == lCapacity)
    printInfo(compareData)
}

function printInfo(event) {
    event.map(property => {
        let infoTd = document.createElement('td')
        infoTd.classList.add('table-secondary')
        infoTd.innerHTML = `
            <td>Name: <span class="fw-bold">${property.name}</span></td>
        `
        trHighest.appendChild(infoTd)
    })
}

function createUpcoming(events, fetchDate) {
    // Resultados temporales
    const resultTemp = {}
    const resultTemp2 = {}
    // Calcular totales
    events.map(property => {
        if(property.date > fetchDate) {
            const partialResult = resultTemp[property.category]
            resultTemp[property.category] = partialResult ? partialResult + property.price : property.price
            const partialResult2 = resultTemp2[property.category]
            resultTemp2[property.category] = partialResult2 ? partialResult2 + parseInt(property.estimate) : parseInt(property.estimate)
        }
    })
    renderUpcoming(resultTemp, resultTemp2)
}

function renderUpcoming(resultTemp, resultTemp2) {
    const totals = Object
    // Guarda las categorias
    const category = totals.keys(resultTemp, resultTemp2)
    const totalResult = category.map(totalResult => (
    {
        category: totalResult,
        price: resultTemp[totalResult],
        estimate: resultTemp2[totalResult]
    }))

    totalResult.map(property => {
        let infoTd = document.createElement('tr'), infoTd2 = document.createElement('tr'), infoTd3 = document.createElement('tr')
        infoTd.textContent = `${property.category}`
        infoTd2.textContent = `${property.price}`
        infoTd3.textContent = `${property.estimate}`
        trCategoryUpcoming.appendChild(infoTd)
        trCategoryUpcomingRevenues.appendChild(infoTd2)
        trCategoryUpcomingAttendance.appendChild(infoTd3)
    })
}

function createPast(events, fetchDate) {
    // Resultados temporales
    const resultTemp = {}
    const resultTemp2 = {}
    // Calcular totales
    events.map(property => {
        if(property.date < fetchDate) {
            const partialResult = resultTemp[property.category]
            resultTemp[property.category] = partialResult ? partialResult + property.price : property.price
            const partialResult2 = resultTemp2[property.category]
            resultTemp2[property.category] = partialResult2 ? partialResult2 + parseInt(property.assistance) : parseInt(property.assistance)
        }
    })
    renderPast(resultTemp, resultTemp2)
}

function renderPast(resultTemp, resultTemp2) {
    const totals = Object
    // Guarda las categorias
    const category = totals.keys(resultTemp, resultTemp2)
    const totalResult = category.map(totalResult => (
    {
        category: totalResult,
        price: resultTemp[totalResult],
        assistance: resultTemp2[totalResult]
    }))

    totalResult.map(property => {
        let infoTd = document.createElement('tr'), infoTd2 = document.createElement('tr'), infoTd3 = document.createElement('tr')
        infoTd.textContent = `${property.category}`
        infoTd2.textContent = `${property.price}`
        infoTd3.textContent = `${property.assistance}`
        trCategoryPast.appendChild(infoTd)
        trCategoryPastRevenues.appendChild(infoTd2)
        trCategoryPastAttendance.appendChild(infoTd3)
    })
}