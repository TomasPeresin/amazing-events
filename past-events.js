console.log("Hello from past events javascript");
console.log(data);

function pastEvents(events){
    pastEvents = [];
    for (let event of data.events){
        if (event.date <= data.currentDate){
            pastEvents.push(event);
        }
    }
    return pastEvents;
}
// Recorro cada elemento del array para luego
// comparar la fecha de este elemento con la
// fecha actual. Si la fecha del elemento es
// menor o igual, lo metemos en los eventos
// pasados para luego devolverlo.

console.log(pastEvents(data));