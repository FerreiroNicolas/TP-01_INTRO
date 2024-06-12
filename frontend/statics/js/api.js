function response_recibed(response) {
    return response.json();
}
    
function data(data) {
    const movies = data.peliculas;
    let output = '';
    movies.forEach(movie => {
        output += `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${movie.url_imagen}" class="card-img-top" alt="${movie.nombre_de_pelicula}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.nombre_de_pelicula}</h5>
                            <p class="card-text">Año: ${movie.año_de_estreno}</p>
                        </div>
                </div>
            </div>
            `;
        });
        document.getElementById('api-movies').innerHTML = output;
    }

function request_error(error) {
    alert("ERROR: " + error);
    console.error('Error al recuperar datos de películas:', error);
    document.getElementById('api-movies').innerHTML = '<p>No se pudieron cargar los datos de películas.</p>';
}

fetch('http://localhost:5000/api.html')
    .then(response_recibed)
    .then(data)
    .catch(request_error);


