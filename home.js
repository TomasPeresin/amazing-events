// agarramos las categorias posibles
const $arregloCategorias = categoriasDisponibles(data.events);

// inyectamos en el html segun corresponda
imprimirEnHTML(data.events, $cards, crearCards);
imprimirEnHTML($arregloCategorias, $categories, crearCategories);

// filtrar cartas segun los checks activos
$botonSubmit.addEventListener("click", (event) =>{
    event.preventDefault();
    let cartasFiltradas = filtrarPorTexto(data.events);
    hayCartas(cartasFiltradas);
});

// filtrar cartas segun los checks activos
$categories.addEventListener("change", (e) =>{filtrarCategorias(data.events)});