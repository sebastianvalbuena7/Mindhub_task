// Ejercicio 1
function beerAlcohol1(beers, levelAlcohol) {
    const newArray = beers.filter(beer => {
        if(beer.abv <= levelAlcohol) {
            let newBeer = {
                nombre: beer.name,
                alcohol: beer.abv,
                amargor: beer.ibu
            }
            return newBeer
        }
    })
    console.log(newArray)
}
beerAlcohol1(beers, 5)

// Ejercicio 2
function beerAlcohol2(beers) {
    // Compara beer1 y beer2 y ordena con beer1 - beer2, los valores de abv
    beers.sort((beer1, beer2) => beer2.abv - beer1.abv)
    const newArray = [beers[0],beers[1],beers[2],beers[3],beers[4],beers[5],beers[6],beers[7], beers[8], beers[9]]
    return newArray
}
console.log(beerAlcohol2(beers))

// Ejercicio 3
function beerAlcohol3(beers) {
    beers.sort((beer1, beer2) => beer1.ibu - beer2.ibu)
    const newArray = [beers[0],beers[1],beers[2],beers[3],beers[4],beers[5],beers[6],beers[7], beers[8], beers[9]]
    return newArray
}
console.log(beerAlcohol3(beers))

// Ejercicio 4
function beerAlcohol4(beers, propiedad, valBoolean) {
    if(valBoolean) {
        const ascendente = beers.sort((beer1, beer2) => beer1[propiedad] - beer2[propiedad])
        const newArray = [ascendente[0],ascendente[1],ascendente[2],ascendente[3],ascendente[4],ascendente[5],ascendente[6],ascendente[7], ascendente[8], ascendente[9]]
        return newArray
    } else {
        const descendente = beers.sort((beer1, beer2) => beer2[propiedad] - beer1[propiedad])
        const newArray = [descendente[0],[1],descendente[2],descendente[3],descendente[4],descendente[5],descendente[6],descendente[7], descendente[8], descendente[9]]
        return newArray
    }
}
console.log(beerAlcohol4(beers, 'abv', false))

// Ejercicio 5
const table = document.querySelector('#tableJs')

function beerAlcohol5(beers, id) {
    beers.forEach(element => {
        if(id === element.id) {
            let infoTable = document.createElement('tr')
            infoTable.innerHTML = `
                <td>${element.name}</td>
                <td>${element.abv}</td>
                <td>${element.ibu}</td>
            `
            table.appendChild(infoTable)
        }
    })
}

beerAlcohol5(beers, 1)