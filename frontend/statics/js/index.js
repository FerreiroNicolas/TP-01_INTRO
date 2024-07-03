function response_recibed(response) {
    return response.json();
}

function data_inicio(data) {
    const tendencias = data.tendencias;
    const masAclamadas = data.mas_aclamadas;

    let outputTendencias = '';
    let outputAclamadas = '';

    tendencias.forEach(pelicula => {
        outputTendencias += `
            <div class="col">
                <a href="/detalle/detalle.html?id=${pelicula.id}">
                    <div class="pelicula">
                        <img src="${pelicula.url_imagen}" alt="${pelicula.nombre_de_pelicula}">
                        <h4 class="tituloPelicula">${pelicula.nombre_de_pelicula}</h4>
                    </div>
                </a>
            </div>
        `;
    });

    masAclamadas.forEach(pelicula => {
        outputAclamadas += `
            <div class="gallery-item">
                <a href="/detalle/detalle.html?id=${pelicula.id}">
                    <img src="${pelicula.url_imagen}" alt="${pelicula.nombre_de_pelicula}">
                </a>
            </div>
        `;
    });

    document.getElementById('peliculas_tendencia').innerHTML = outputTendencias;
    document.getElementById('peliculas_aclamadas').innerHTML = outputAclamadas;
}

function request_error(error) {
    alert("ERROR: " + error);
    console.error('Error al recuperar datos de películas:', error);
}

fetch('http://localhost:5000/index.html')
    .then(response_recibed)
    .then(data_inicio)
    .catch(request_error);