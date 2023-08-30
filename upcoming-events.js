console.log("Hello from upcoming events javascript");
console.log(data);

function upcomingEvents(){
    let upcomingEventsArray = [];
    for (let event of data.events){
        if (event.date > data.currentDate){
            upcomingEventsArray.push(event);
        }
    }
    return upcomingEventsArray;
}
// Recorro cada elemento del array para luego
// comparar la fecha de este elemento con la
// fecha actual. Si la fecha del elemento es
// mayor, lo metemos en los eventos por venir
// para luego devolverlo.

const $cards = document.getElementById("cards");

cardsBody = '';

for (let event of upcomingEvents()) {
    cardsBody += 
    `
    <div class="card mb-4" style="width: 18rem">
        <img src=${event.image} class="card-img-top" alt="${event.image}" style="height: 190px;"/>
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text" style="height: 72px">
                ${event.description}
            </p>
            <div class="d-flex justify-content-between align-content-end flex-wrap">
                <p>Price: $${event.price}</p>
                <a href="details.html" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
    `
}

$cards.innerHTML = cardsBody;