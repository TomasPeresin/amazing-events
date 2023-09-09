const $eventsStatics = document.getElementById('eventsStatics');
const $pastEventsTable = document.getElementById('PastEventsStatics');
const $upcomingEventsTable = document.getElementById('upcomingStatics');

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlApi).then( (response) => response.json())
.then( (data) => {
    datos = data;

    // console.log(datos.events);

    EventsStatics(datos);
    // EventsStatics(datos);

    // imprimirEnHTML(pastCategorias, pastEvents, $pastEventsTable, crearTabla);
    // imprimirEnHTML(upcomingCategorias, upcomingEvents, $upcomingEventsTable, crearTabla);

}) 
.catch( (error) => console.log(error));

function EventsStatics(datos){
    // let losTresDatosNecesarios = []; // La idea es que quede [(mayor asistencia), (menor asistencia), (mayor capacidad)]
    
    // let pastEvents = pastEventsFilter(datos); // Usamos los past events para las dos primeras estadisticas
    
    datos.events.forEach( (event) => {
        event.percent = AgregarPorcentaje(event);
    })

    datos.events.sort((a, b) => a.percent - b.percent)

    let pastEvents = pastEventsFilter(datos);

    imprimirEventsStatics(datos.events, pastEvents, $eventsStatics);



    // losTresDatosNecesarios.push(HighestAssistance(pastEvents)); // inserto en el arreglo de 3 datos el evento con mayor porcentaje de asistencia
    // losTresDatosNecesarios.push(LowestAssistance(pastEvents)); // inserto en el arreglo el porcentaje menor de asistencia
    // losTresDatosNecesarios.push(Large)
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

    console.log(elementoHTML)

    let mayor = pastEvents[pastEvents.length - 1];
    let menor = pastEvents[0];

    datos.sort((a, b) => b.capacity - a.capacity)

    let capacidad = datos[0];

    estructura += `<td>${mayor.name} ${mayor.percent}%</td>`;
    estructura += `<td>${menor.name} ${menor.percent}%</td>`;
    estructura += `<td>${capacidad.name} ${capacidad.capacity}</td>`;

    elementoHTML.innerHTML += estructura;
}


// function HighestAssistance(eventos){
//     let highest = 0; //evento con mas asistencia
//     eventos.forEach( (event) => {
//         let porcentaje = CalcularAsistencia(event);
//         if (highest < porcentaje){
//             highest = porcentaje;
//         }
//     })
//     return highest;
// }

// function LowestAssistance(eventos){
//     let lowest = 0; //evento con mas asistencia
//     eventos.forEach( (event) => {
//         let porcentaje = CalcularAsistencia(event);
//         if (lowest >= porcentaje){
//             lowest = porcentaje;
//         }
//     })
//     return lowest;
// }

// function CalcularAsistencia(evento) { //en porcentaje
//     let porcentaje = evento.assistance*100/evento.capacity;
//     console.log(porcentaje);
//     return porcentaje;
// }

// function imprimirEnHTML(categorias, eventos, elementoHTML, funcionEstructura){
//     let estructura = elementoHTML.innerHtml;
//     categorias.forEach ( object => {
//         estructura += funcionEstructura(object, eventos)
//     });
//     elementoHTML.innerHTML += estructura;
// }

function categoriasDisponibles(arreglo){
    return [...new Set(arreglo.map(objeto => objeto.category))]
}

// // funcion para insertar el cuerpo de las cartas 
// function crearTabla(category, events){
//     let template ="";
//     template = `
//             <tr>
//                 <td>${category}</td>
//                 <td>$${revenues(category, events)}</td>
//                 <td>${assistance(category, events)}</td>
//             </tr>
//         `;
//     return template
// }

// function revenues(category, events){
//     let eventsOfCategory = events.filter(objeto => category.includes(objeto.category));
//     let ganancias = 0;
//     eventsOfCategory.forEach( evento => ganancias += evento.price * evento.assistance);
//     return ganancias;
// }

// function assistance(category, events){
//     let eventsOfCategory = events.filter(objeto => category.includes(objeto.category));
//         let asistencia = 0;
//         eventsOfCategory.forEach( evento => asistencia += evento.assistance);
//         return asistencia;
// }

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