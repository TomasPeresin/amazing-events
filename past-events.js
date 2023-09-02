// Agarramos el contenedor donde van a ir las cartas
const $cards = document.getElementById("cards");
// Agarramos el contenedor donde van las categorias
const $categories = document.getElementById("categories");

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

// funcion para insertar el cuerpo de las cartas 
function crearCards(card){
    let template ="";
    template = `
        <div class="card mb-4" style="width: 18rem">
            <img src=${card.image} class="card-img-top" alt="${card.image}" style="height: 190px;"/>
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text" style="height: 72px">
                    ${card.description}
                </p>
                <div class="d-flex justify-content-between align-content-end flex-wrap">
                    <p>Price: $${card.price}</p>
                    <a href="details.html" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
        `;
    return template
}

// funcion para insertar las categorias
function crearCategories(string){
    let template = "";
    template = `
        <div>
            <input type="checkbox" name="${string}" value="${string}" id ="${string}"/>
            <label for="${string}">${string}</label>
        </div>
    `;
    return template;
}
// funcion para insertar parrafos
function crearParrafo(string){
    let template = "";
    template = `
            <p>${string}</p>
        `;
    return template;
} 

// agarramos las categorias posibles
let cartasPastEvents = pastEvents();
const arregloCategorias = [ ...new Set(cartasPastEvents.map(objeto => objeto.category))]

// funcion reutilizable que agarra (un elemento iterable; donde se introduce; la funcion que inserta el texto)
function imprimirEnHTML(arreglo, elementoHTML, funcionEstructura){
    let estructura = "";
    arreglo.forEach ( object => {
        estructura += funcionEstructura(object)
    });
    elementoHTML.innerHTML = estructura;
}

// inyectamos en el html segun corresponda
imprimirEnHTML(cartasPastEvents, $cards, crearCards);
imprimirEnHTML(arregloCategorias, $categories, crearCategories);

// filtrar cartas segun los checks activos
$categories.addEventListener("change", (event) =>{
    let nodeList = document.querySelectorAll("input[type='checkbox']:checked");
    let arregloValores = Array.from(nodeList).map(check=>check.value)
    if (arregloValores.length > 0){
        let cartasFiltradas = cartasPastEvents.filter(objeto => arregloValores.includes(objeto.category));
        hayCartas(cartasFiltradas);
    }
    else {
        imprimirEnHTML(cartasPastEvents, $cards, crearCards);
    }
});

function hayCartas(objetos){
    if (objetos.length > 0){
        imprimirEnHTML(objetos, $cards, crearCards);
    }
    else{
        let mensajeInformativo = ["Ups! ninguna carta concuerda con los filtros pedidos. ¿Probamos con otros?"];
        imprimirEnHTML(mensajeInformativo, $cards, crearParrafo);
    }
}