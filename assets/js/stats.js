// Variables
const trHighest = document.getElementById('tr-highest')
const tbodyUpcoming = document.getElementById('data-upcoming')
const tbodyPast = document.getElementById('data-past')
const trCategoryUpcoming = document.getElementById('tr-categoryUpcoming')
const trCategoryUpcomingRevenues = document.getElementById('tr-categoryUpcomingRevenues')
const trCategoryUpcomingAttendance = document.getElementById('tr-categoryUpcomingAttendance')
const trCategoryPast = document.getElementById('tr-categoryPast')
const trCategoryPastRevenues = document.getElementById('tr-categoryPastRevenues')
const trCategoryPastAttendance = document.getElementById('tr-categoryPastAttendance')
let pastEvents
let upcomingEvents
let upcomingCategories
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

        pastEvents = data.filter(event => event.date < eventsData.currentDate)
        upcomingEvents = data.filter(event => event.date > eventsData.currentDate)

        upcomingCategories = Array.from(new Set(upcomingEvents.map(event => event.category)))
        pastCategories = Array.from(new Set(pastEvents.map(event => event.category)))

        highestAttendance(data)
        lowestAttendance(data)
        largerCapacity(data)
        createUpcoming(upcomingCategories, upcomingEvents)
        createPast(pastCategories, pastEvents)
    })
    // .catch(error => console.error(error))

// Funciones 
function highestAttendance(events) {
    let array = []
    let filterAssistance = events.filter(property => property.assistance).map(property => {
        array = {
            name: property.name,
            assistance: parseInt(property.assistance),
            capacity: parseInt(property.capacity)
        }
        return array
    })
    const operation = filterAssistance.map(elem => {
        array = {
            name: elem.name,
            value:  Math.trunc(elem.assistance * 100 / elem.capacity)
        }
        return array
    })
    const accessValue = operation.filter(property => property.value).map(property => property.value).reduce((a,b) => Math.max(a, b))
    const compareData = operation.filter(property => property.value == accessValue)
    printInfo(compareData)
}

function lowestAttendance(events) {
    let array = []
    let filterAssistance = events.filter(property => property.assistance).map(property => {
        array = {
            name: property.name,
            assistance: parseInt(property.assistance),
            capacity: parseInt(property.capacity)
        }
        return array
    })
    const operation = filterAssistance.map(elem => {
        array = {
            name: elem.name,
            value:  Math.trunc(elem.assistance * 100 / elem.capacity)
        }
        return array
    })
    const accessValue = operation.filter(property => property.value).map(property => property.value).reduce((a,b) => Math.min(a, b))
    const compareData = operation.filter(property => property.value == accessValue)
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

function createUpcoming(categories, events) {
    let array = []
    categories.forEach(property => {
        let eventsCategory = events.filter(event => event.category === property)
        
        let porcentaje = eventsCategory.map(event => (event.estimate * 100 / event.capacity))

        let totals = porcentaje.reduce((a, b) => a + b)
        let averageAssistance = totals/porcentaje.length
        
        let ingresos = eventsCategory.map(event => event.estimate * event.price).reduce((a, b) => a + b)

        const category = {
            name: property,
            estimate: averageAssistance.toFixed(0),
            revenues: ingresos
        }
        array.push(category)
    })
    renderUpcoming(array)
}

function renderUpcoming(events) {
    let template = ''
    events.forEach((event, index) => {
        template += `
        <tr>
        <td class="table-secondary">${events[index].name}</td>
        <td class="table-secondary">$${events[index].revenues}</td>
        <td class="table-secondary">${events[index].assistance || events[index].estimate}%</td>
        </tr> `
    })
    tbodyUpcoming.innerHTML = template
}

function createPast(categories, events) {
    let array = []
    categories.forEach(property => {
        let eventsCategory = events.filter(event => event.category === property)
        
        let porcentaje = eventsCategory.map(event => (event.assistance * 100 / event.capacity))

        let totals = porcentaje.reduce((a, b) => a + b)
        let averageAssistance = totals/porcentaje.length
        
        let ingresos = eventsCategory.map(event => event.assistance * event.price).reduce((a, b) => a + b)

        const category = {
            name: property,
            estimate: averageAssistance.toFixed(0),
            revenues: ingresos
        }
        array.push(category)
    })
    renderPast(array)
}

function renderPast(events) {
    let template = ''
    events.forEach((event, index) => {
        template += `
        <tr>
        <td class="table-secondary">${events[index].name}</td>
        <td class="table-secondary">$${events[index].revenues}</td>
        <td class="table-secondary">${events[index].assistance || events[index].estimate}%</td>
        </tr> `
    })
    tbodyPast.innerHTML = template
}