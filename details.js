const $queryString = location.search;

const $params = new URLSearchParams($queryString);

const $id = $params.get("id");

const $evento = data.events.find(evento => evento._id === $id);

const $detailBody = document.getElementById("carta2");

function crearCartaDetalles(evento){
    let template = "";
    template = `
        <img src="${evento.image}" class="col-6 p-3" alt="${evento.name} image" />
        <div class="col-5 d-flex flex-wrap flex-column text-center justify-content-center bg-white me-4">
            <h3>${evento.name}</h3>
            <p><b>Date:</b> ${evento.date}</p>
            <p><b>description:</b> ${evento.description}</p>
            <p><b>Place:</b> ${evento.place}</p>
            <p><b>Capacity:</b> ${evento.capacity}</p>
            <p><b>Price:</b> ${evento.price}</p>
        </div>
        `
    return template;
}

imprimirEnHTML([$evento], $detailBody, crearCartaDetalles);