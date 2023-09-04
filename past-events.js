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

const $cartasPastEvents = pastEvents();

// agarramos las categorias posibles
const $arregloCategorias = categoriasDisponibles($cartasPastEvents)

// inyectamos en el html segun corresponda
imprimirEnHTML($cartasPastEvents, $cards, crearCards);
imprimirEnHTML($arregloCategorias, $categories, crearCategories);

// filtrar cartas segun los checks activos
$botonSubmit.addEventListener("click", (event) =>{
    event.preventDefault();
    let cartasFiltradas = filtrarPorTexto($cartasPastEvents);
    hayCartas(cartasFiltradas);
});

// filtrar cartas segun los checks activos
$categories.addEventListener("change", (e) =>{filtrarCategorias($cartasPastEvents)});
