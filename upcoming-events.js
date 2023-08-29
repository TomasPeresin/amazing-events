console.log("Hello from upcoming events javascript");
console.log(data);

function upcomingEvents(events){
    upcomingEvents = [];
    for (let event of data.events){
        if (event.date > data.currentDate){
            upcomingEvents.push(event);
        }
    }
    return upcomingEvents;
}
// Recorro cada elemento del array para luego
// comparar la fecha de este elemento con la
// fecha actual. Si la fecha del elemento es
// mayor, lo metemos en los eventos por venir
// para luego devolverlo.

console.log(upcomingEvents(data));