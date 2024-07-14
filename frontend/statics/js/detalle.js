const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Esta película no existe. Redirigiendo a la página principal.',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.href = "/api.html";
    });
}

const mainDetalle = document.getElementById('mainDetalle');
const title_movie = document.getElementById('title_movie')
const nombre = document.getElementById('nombre');
const url_imagen = document.getElementById('url_imagen');
const año_de_estreno = document.getElementById('año_de_estreno');
const genero = document.getElementById('genero');
const duracion = document.getElementById('duracion');
const sinopsis = document.getElementById('sinopsis');
const director = document.getElementById('director');
const actores_principales = document.getElementById('actores_principales');
const productora = document.getElementById('productora');
const pais_de_origen = document.getElementById('pais_de_origen');
const puntaje_segun_critica = document.getElementById('puntaje_segun_critica');
const url_trailer = document.getElementById('url_trailer');
const es_tendencia = document.getElementById('es_tendencia');

fetch(`http://localhost:5000/detalle/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const movie = data.pelicula;
        title_movie.innerHTML = `${movie.nombre_de_pelicula}`;
        mainDetalle.innerHTML = `
            <section class="detalle" data-aos="zoom-in">
                <div class="contenedorDetalle">
                    <div class="imgDetalle">
                        <img src="${movie.url_imagen}" alt="${movie.nombre_de_pelicula} poster de película">
                    </div>
                    <div class="textoDetalle">
                        <h1><strong>${movie.nombre_de_pelicula}</strong></h1>
                        <p>Año de estreno: ${movie.año_de_estreno}</p> 
                        <h3>Género</h3> 
                        <p>${movie.genero}</p>
                        <h3>Duración</h3> 
                        <p> ${movie.duracion} minutos</p>
                        <h3>Sinopsis</h3> 
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
                    <h2>Mira el trailer aquí abajo</h2>
                    <iframe width="560" height="315" src="${movie.url_trailer}" title="YouTube video player" frameborder="0" allowfullscreen></iframe> 
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
        nombre.value = movie.nombre_de_pelicula;
        url_imagen.value = movie.url_imagen;
        año_de_estreno.value = movie.año_de_estreno;
        genero.value = movie.genero;
        duracion.value = movie.duracion;
        sinopsis.value = movie.sinopsis;
        director.value = movie.director;
        actores_principales.value = movie.actores_principales;
        productora.value = movie.productora;
        pais_de_origen.value = movie.pais_de_origen;
        puntaje_segun_critica.value = movie.puntaje_segun_critica;
        url_trailer.value = movie.url_trailer;
        es_tendencia.checked = movie.es_tendencia;
        
        renderizar_opiniones(data.opiniones);
        const editarPeliculaLink = document.getElementById('editarPeliculaLink');
        editarPeliculaLink.addEventListener('click', function(event) {
            event.preventDefault();

            var myModal = new bootstrap.Modal(document.getElementById('modalEditarPelicula'), {
                keyboard: false
            });
            myModal.show();
        });
    })
    .catch(error => {
        console.error('Error al recuperar datos de películas:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al recuperar datos de películas',
            confirmButtonText: 'Aceptar'
        });
    });

function renderizar_opiniones(opiniones) {
    const opin = document.getElementById('opiniones');
    let output = '';
    if (opiniones && opiniones.length > 0) {
        output += `
            <div class="contenedorOpiniones">
                <h2 class="titulo-seccion">¿Qué piensan los espectadores?</h2>
        `;
        opiniones.forEach(opinion => {
            output += `
                <div class="col-md-12">
                    <div class="opinion-card">
                        <p class="opinion-texto"><strong>Fecha y hora de publicaion:</strong> ${opinion.fecha_de_opinion}</p>
                        <p class="opinion-texto"><strong>Opinión:</strong> ${opinion.opinion}</p>
                        <p class="opinion-puntaje"><strong>Puntaje:</strong> ${opinion.puntaje} /10</p>
                        <button class="eliminar-opinion" data-id="${opinion.id_opinion}">Eliminar</button>
                    </div>
                </div>
            `;
        });
        output += `</div>`;
    } else {
        output = '<div class="contenedorOpiniones"><p>No hay opiniones disponibles, sé el primero en opinar sobre esta película.</p></div>';
    }
    opin.innerHTML = output;
    agregarEventosEliminar();
}

function agregarEventosEliminar() {
    const botones_eliminar = document.querySelectorAll('.eliminar-opinion');
    botones_eliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id_opinion = this.getAttribute('data-id');
            eliminar_opinion(id_opinion);
        });
    });
}

function eliminar_opinion(id_opinion) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la opinión. ¿Quieres continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/detalle/${id_opinion}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Opinión eliminada correctamente',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    location.reload();
                });
            })
            .catch(error => {
                console.error('Error al eliminar opinión:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al eliminar opinión',
                    confirmButtonText: 'Aceptar'
                });
            });
        }
    });
}

const formEditarPelicula = document.getElementById('form-editar-pelicula');
formEditarPelicula.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = {
        nombre_de_pelicula: nombre.value,
        url_imagen: url_imagen.value,
        año_de_estreno: parseInt(año_de_estreno.value),
        genero: genero.value,
        duracion: parseInt(duracion.value),
        sinopsis: sinopsis.value,
        director: director.value,
        actores_principales: actores_principales.value,
        productora: productora.value,
        pais_de_origen: pais_de_origen.value,
        puntaje_segun_critica: parseFloat(puntaje_segun_critica.value),
        url_trailer: url_trailer.value,
        es_tendencia: es_tendencia.checked
    };

    fetch(`http://localhost:5000/detalle/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Película modificada:', data);
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Película modificada exitosamente',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            var myModal = bootstrap.Modal.getInstance(document.getElementById('modalEditarPelicula'));
            myModal.hide();
        });
    })
    .catch(error => {
        console.error('Error al modificar película:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al modificar película',
            confirmButtonText: 'Aceptar'
        });
    });
});

const formAgregarOpinion = document.getElementById('formAgregarOpinion');

formAgregarOpinion.addEventListener('submit', function(event) {
    event.preventDefault();

    const opinion = document.getElementById('opinion').value;
    const puntaje = document.getElementById('puntaje').value;

    const data = {
        opinion: opinion,
        puntaje: parseFloat(puntaje)
    };

    fetch(`http://localhost:5000/detalle/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        formAgregarOpinion.reset();

        if (data.opiniones && data.opiniones.length > 0) {
            renderizar_opiniones(data.opiniones);
        } else {
            const opin = document.getElementById('opiniones');
            opin.innerHTML = '<div class="contenedorOpiniones"><p>No hay opiniones disponibles.</p></div>';
        }

        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Opinión agregada exitosamente',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            location.reload();
        });
    })
    .catch(error => {
        console.error('Error al agregar opinión:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al agregar opinión',
            confirmButtonText: 'Aceptar'
        });
    });
});