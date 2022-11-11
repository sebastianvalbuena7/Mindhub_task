const info = events

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get('id')
const card = info.find(card => card._id === id)

const div = document.getElementById('details')
div.innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center height-information border">
        <div>
            <img class="img-information px-2 my-4" src="${card.image}" alt="${card.name}">
        </div>
        <div class="me-2 ms-2">
            <h3 class="px-3 pt-3">${card.name}</h3>
            <p class="fs-5 px-3">Date: ${card.date}</p>
            <p class="fs-5 px-3">${card.description}</p>
            <p class="fs-5 px-3">Place: ${card.place}</p>
            <p class="fs-5 px-3">Capacity: ${card.capacity}</p>
            <p class="fs-5 px-3">Assistance: ${card.assistance}</p>
        </div>
    </div>
`