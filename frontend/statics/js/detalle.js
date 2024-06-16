const params = new URLSearchParams(window.location.search);
const id = params.get("id")


if (id === null) {
    window.location.href = "/api.html";
    alert("Esta pelicula no existe. Te redirijioms a la pagina principal")
}

function response_recibed(response) {
    return response.json();
}

function buscar_data(data) {
    const movie = data.peliculas; 
    let output = `
         <section class="detalle" data-aos="zoom-in">
            <div class="contenedorDetalle">
                <div class="imgDetalle">
                    <img src="${movie.url_imagen}" alt="${movie.nombre_de_pelicula} poster de pelicula">
                </div>
                <div class="textoDetalle">
                    <h1>${movie.nombre_de_pelicula}</h1> 
                    <p>Año de estreno: ${movie.año_de_estreno}</p> 
                    <p>Género: ${movie.genero}</p>
                    <p>Duración: ${movie.duracion} minutos</p>
                    <h2>Sinopsis</h2> 
                    <p>${movie.sinopsis}</p>
                    <div class="contenedorCreditos">
                        <div>
                            <h3>Director</h3>
                            <p>${movie.director}</p>
                        </div>
                        <div>
                            <h3>Actores principales</h3>
                            <p>${movie.actores_principales}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="trailer" data-aos="fade-up" data-aos-offset="400" data-aos-delay="50" data-aos-duration="1000">
            <div class="contenedorTrailer">
                <h2>Mira su trailer aquí abajo</h2>
                <iframe width="560" height="315" src="${movie.url_trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
            </div>
            <div class="contenedorInfo">
                <div class="info">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">Información extra sobre la película</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Productora</strong></td>
                                <td>${movie.productora}</td>
                            </tr>
                            <tr>
                                <td><strong>País de origen</strong></td>
                                <td>${movie.pais_de_origen}</td>
                            </tr>
                            <tr>
                                <td><strong>Puntaje según la crítica</strong></td>
                                <td>${movie.puntaje_segun_critica}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
    document.getElementById('mainDetalle').innerHTML = output;
}

function request_error(error) {
    alert("ERROR: " + error);
    console.error('Error al recuperar datos de películas:', error);
    document.getElementById('api-movies').innerHTML = '<p>No se pudieron cargar los datos de películas.</p>';
}

fetch(`http://localhost:5000/detalle/detalle.html${id}`)
    .then(response_recibed)
    .then(buscar_data)
    .catch(request_error);
