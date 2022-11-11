let eventsData
let data
let date

fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(json => {
        eventsData = json
        data = eventsData.events
        date = eventsData.currentDate
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        const card = data.find(card => card._id === id)
        printDetail(card)
    })
    .catch(error => console.error(error))



function printDetail(cards) {
    const div = document.getElementById('details')
    div.innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center height-information border">
            <div>
                <img class="img-information px-2 my-4" src="${cards.image}" alt="${cards.name}">
            </div>
            <div class="me-2 ms-2">
                <h3 class="px-3 pt-3">${cards.name}</h3>
                <p class="fs-5 px-3">Date: ${cards.date}</p>
                <p class="fs-5 px-3">${cards.description}</p>
                <p class="fs-5 px-3">Place: ${cards.place}</p>
                <p class="fs-5 px-3">Capacity: ${cards.capacity}</p>
                <p class="fs-5 px-3">Assistance: ${cards.assistance ? cards.assistance : cards.estimate}</p>
            </div>
        </div>
    `
}