const $eventsStatics = document.getElementById('eventsStatics');
const $pastEventsTable = document.getElementById('PastEventsStatics');
const $upcomingEventsTable = document.getElementById('upcomingStatics');

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlApi).then( (response) => response.json())
.then( (data) => {
    datos = data;

    datos.events.forEach( (event) => {
        event.percent = AgregarPorcentaje(event);
    })

    datos.events.sort((a, b) => a.percent - b.percent)

    EventsStatics(datos);

    let pastEvents = pastEventsFilter(datos);
    let upcomingEvents = upcomingEventsFilter(datos);

    UpcomingStatics(upcomingEvents);
    PastStatics(pastEvents);
    
}) 
.catch( (error) => console.log(error));

function UpcomingStatics(events){
    let categorias = categoriasDisponibles(events);
    categorias.forEach( (categoria) => {
        let eventos = events;
        let eventosFiltrados = eventos.filter( (event) => categoria.includes(event.category))
        StatisticsImprimir(eventosFiltrados, $upcomingEventsTable);
    })
}

function PastStatics(events){
    let categorias = categoriasDisponibles(events);
    categorias.forEach( (categoria) => {
        let eventos = events;
        let eventosFiltrados = eventos.filter( (event) => categoria.includes(event.category))
        StatisticsImprimir(eventosFiltrados, $pastEventsTable);
    })    
}

function StatisticsImprimir(eventos, elementoHTML){
    let estructura = "";

    let revenues = Revenues(eventos);
    let asistencia = Assistance(eventos);
    let categoria = eventos[0].category;

    estructura += `
    <tr>
        <td>${categoria}</td>
        <td>${revenues}</td>
        <td>${asistencia}%</td>
    </tr>
    `;
    elementoHTML.innerHTML += estructura;
}

function Revenues(eventos){
    let ganancias = 0;
    if (Object.keys(eventos[0]).includes("estimate")){
        eventos.forEach( evento => ganancias += evento.price * evento.estimate);
    }
    else{
        eventos.forEach( evento => ganancias += evento.price * evento.assistance);
    }

    let formato = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(ganancias);
    return formato;
}

function Assistance(eventos){
    let asistencia = 0;
    eventos.forEach( evento => asistencia += evento.percent);
    asistencia = asistencia/eventos.length;

    let formato = asistencia.toFixed(2);
    return formato;
}

function categoriasDisponibles(arreglo){
    return [...new Set(arreglo.map(objeto => objeto.category))]
}

// funcion para insertar el cuerpo de las cartas 
function crearTabla(category, events){
    let template ="";
    template = `
            <tr>
                <td>${category}</td>
                <td>$${revenues(category, events)}</td>
                <td>${assistance(category, events)}</td>
            </tr>
        `;
    return template
}

function pastEventsFilter(objeto) {
    let pastEventsArray = [];
    for (let event of objeto.events) {
      if (event.date <= objeto.currentDate) {
        pastEventsArray.push(event);
      }
    }
    return pastEventsArray;
}

function upcomingEventsFilter(objeto){
    let upcomingEventsArray = [];
    for (let event of objeto.events){
        if (event.date > objeto.currentDate){
            upcomingEventsArray.push(event);
        }
    }
    return upcomingEventsArray;
}

function AgregarPorcentaje(evento) {
    if (Object.keys(evento).includes("assistance")){
        return evento.assistance*100/evento.capacity;
    }
    else{
        return evento.estimate*100/evento.capacity;
    }
}

function imprimirEventsStatics(datos, pastEvents, elementoHTML){
    let estructura = "";

    let mayor = pastEvents[pastEvents.length - 1];
    let menor = pastEvents[0];

    datos.sort((a, b) => b.capacity - a.capacity)

    let capacidad = datos[0];

    estructura += `<td>${mayor.name} ${mayor.percent}%</td>`;
    estructura += `<td>${menor.name} ${menor.percent}%</td>`;
    estructura += `<td>${capacidad.name} ${capacidad.capacity}</td>`;

    elementoHTML.innerHTML += estructura;
}

function EventsStatics(datos){
    let pastEvents = pastEventsFilter(datos);
    imprimirEventsStatics(datos.events, pastEvents, $eventsStatics);
}