// Variables
const trHighest = document.getElementById('tr-highest')
const trCategoryUpcoming = document.getElementById('tr-categoryUpcoming')
const trCategoryUpcomingRevenues = document.getElementById('tr-categoryUpcomingRevenues')
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
        const setArray2 = new Set(data.map(property => property.category))
        const arrayCategory = Array.from(setArray).filter(value => value.category !== "Food Fair")
        const arrayCategory2 = Array.from(setArray2).filter(value => value !== "Food Fair")
        createUpcoming(arrayCategory, arrayCategory2, date)
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

function createUpcoming(value1, value2, fetchDate) {
    value2.map(property => {
        let infoTd = document.createElement('tr')
        infoTd.textContent = `${property}`
        trCategoryUpcoming.appendChild(infoTd)
    })

    // Resultados temporales
    const resultTemp = {}
  
    // Calcular totales
    value1.map(property => {
        if(property.date > fetchDate) {
            const partialResult = resultTemp[property.category]
            resultTemp[property.category] = partialResult ? partialResult + property.price : property.price
        }
    })

    // Pasamos los resultados al formato array indicado
    const totals = Object
    // Guarda las categorias
    const category = totals.keys(resultTemp)
    const totalResult = category.map(totalResult => (
    {
        category: totalResult,
        price: resultTemp[totalResult]
    }
    ))

    totalResult.map(property => {
        let infoTd = document.createElement('tr')
        infoTd.textContent = `${property.price}`
        trCategoryUpcomingRevenues.appendChild(infoTd)
    })
}