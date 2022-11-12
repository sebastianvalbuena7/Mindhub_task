let eventsData
let data
let date

fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(json => {
        eventsData = json
        data = eventsData.events
        date = eventsData.currentDate
        highestAttendance(data)
        printInfo(data)
    })
    .catch(error => console.error(error))

function highestAttendance(events) {
    let filterAssistance = events.filter(property => property.assistance)
    let highAttendance = filterAssistance.map(property => parseInt(property.assistance))
    const sum = highAttendance.reduce((previous, current) => {
        return Math.max(previous, current)
    }, 0)
    const iterar = events.filter(property => parseInt(property.assistance) == sum)
    console.log(iterar)
    printInfo(iterar)
}

function printInfo(event) {
    
}