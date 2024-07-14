function response_recibed(response) {
    return response.json();
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
        link.setAttribute("href", `/detalle/?id=${movie.id}`);
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

fetch('http://localhost:5000/catalogo')
    .then(response_recibed)
    .then(parse_data)
    .catch(request_error);
    
    
document.getElementById('form-agregar-pelicula').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        nombre_de_pelicula: document.getElementById('nombre').value,
        url_imagen: document.getElementById('url_imagen').value,
        año_de_estreno: parseInt(document.getElementById('año_de_estreno').value),
        genero: document.getElementById('genero').value,
        duracion: parseInt(document.getElementById('duracion').value),
        sinopsis: document.getElementById('sinopsis').value,
        director: document.getElementById('director').value,
        actores_principales: document.getElementById('actores_principales').value,
        productora: document.getElementById('productora').value,
        pais_de_origen: document.getElementById('pais_de_origen').value,
        puntaje_segun_critica: parseFloat(document.getElementById('puntaje_segun_critica').value),
        url_trailer: document.getElementById('url_trailer').value,
        es_tendencia: document.getElementById('es_tendencia').checked
    };

    fetch('http://localhost:5000/catalogo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar película');
        }
        return response.json();
    })
    .then(data => {
        console.log('Película agregada:', data);
        cargarPeliculas();

        var modalElement = bootstrap.Modal.getInstance(document.getElementById('modalAgregarPelicula'));
        modalElement.hide();

        Swal.fire({
            title: 'Película agregada',
            text: 'La película se agregó correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            location.reload();
        });
    })
    .catch(error => {
        console.error('Error al agregar película:', error);
        Swal.fire({
            title: 'Error',
            text: 'Error al agregar película, por favor inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
});

function cargarPeliculas() {
    fetch('http://localhost:5000/catalogo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar películas');
            }
            return response.json();
        })
        .then(data => {
            parse_data(data);
        })
        .catch(error => {
            console.error('Error al cargar las películas:', error);
            document.getElementById('api-movies').innerHTML = '<p>No se pudieron cargar los datos de películas.</p>';
        });
}