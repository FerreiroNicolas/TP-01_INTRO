function response_recibed(response) {
    return response.json();
}
    
function data(data) {
    const movies = data.peliculas;
    let output = '';
    movies.forEach(movie => {
        output += `
            <div class="col-md-3 mb-4">
                <a href="/detalle/detalle.html?id=${movie.id}" style="text-decoration: none;">
                    <div class="card">
                        <img src="${movie.url_imagen}" class="card-img-top" alt="${movie.nombre_de_pelicula}">
                            <div class="card-body">
                                <h5 class="card-title">${movie.nombre_de_pelicula}</h5>
                                <p class="card-text">Año: ${movie.año_de_estreno}</p>
                            </div>
                    </div>
                </a>
            </div>
            `;
        });
        document.getElementById('api-movies').innerHTML = output;
}

function parse_data(data) {
    const movies = data.peliculas;
    const container = document.getElementById('api-movies');
    container.innerHTML = ''; 

    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const item = document.createElement("div");
        item.setAttribute("class", "col-md-3 mb-4");

        const link = document.createElement("a");
        link.setAttribute("href", `/detalle/detalle.html?id=${movie.id}`);
        link.setAttribute("style", "text-decoration: none;");

        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const image = document.createElement("img");
        image.setAttribute("src", movie.url_imagen);
        image.setAttribute("class", "card-img-top");
        image.setAttribute("alt", movie.nombre_de_pelicula);

        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.textContent = movie.nombre_de_pelicula;

        const cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        cardText.textContent = `Año: ${movie.año_de_estreno}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(image);
        card.appendChild(cardBody);
        link.appendChild(card);
        item.appendChild(link);

        container.appendChild(item);
    }
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


