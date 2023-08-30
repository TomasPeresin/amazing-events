console.log("Hello from past events javascript");
console.log(data);

function pastEvents(){
    let pastEventsArray = [];
    for (let event of data.events){
        if (event.date <= data.currentDate){
            pastEventsArray.push(event);
        }
    }
    return pastEventsArray;
}
// Recorro cada elemento del array para luego
// comparar la fecha de este elemento con la
// fecha actual. Si la fecha del elemento es
// menor o igual, lo metemos en los eventos
// pasados para luego devolverlo.

const $cards = document.getElementById("cards");

cardsBody = '';

for (let event of pastEvents()) {
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