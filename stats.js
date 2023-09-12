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
    let eventosFiltrados = FiltradoPorCategoria(events);
    eventosFiltrados.sort((a, b) => b.asistencia - a.asistencia)
    eventosFiltrados.forEach( fila => StatisticsImprimir(fila, $upcomingEventsTable));
}

function PastStatics(events){
    let eventosFiltrados = FiltradoPorCategoria(events);
    eventosFiltrados.sort((a, b) => b.asistencia - a.asistencia)
    eventosFiltrados.forEach( fila => StatisticsImprimir(fila, $pastEventsTable));
}

function FiltradoPorCategoria(events){
    let cateDisponibles = categoriasDisponibles(events);
    let categoriasObjeto = [];
    cateDisponibles.forEach( 
        categoria => categoriasObjeto.push(creacionObjetoCategoria(events, categoria))
        );
    return categoriasObjeto;
}

function creacionObjetoCategoria(events, c){
    eventosFiltrados = events.filter( (event) => c.includes(event.category))
    let cate = c;
    let revenue = Revenues(eventosFiltrados);
    let asistencia = Assistance(eventosFiltrados);

    return {categoria : cate, revenue: revenue, asistencia: asistencia};
}

function StatisticsImprimir(fila, elementoHTML){
    let estructura = "";

    estructura += `
    <tr>
        <td>${fila.categoria}</td>
        <td>${fila.revenue}</td>
        <td>${fila.asistencia}%</td>
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

    estructura += `<td>${mayor.name} ${mayor.percent.toFixed(2)}%</td>`;
    estructura += `<td>${menor.name} ${menor.percent}%</td>`;
    estructura += `<td>${capacidad.name} ${capacidad.capacity}</td>`;

    elementoHTML.innerHTML += estructura;
}

function EventsStatics(datos){
    let pastEvents = pastEventsFilter(datos);
    imprimirEventsStatics(datos.events, pastEvents, $eventsStatics);
}