document.addEventListener('DOMContentLoaded', function() {
    const movies = localStorage.getItem('movies');
    if (movies) {
        const parsedMovies = JSON.parse(movies);
        let output = '';
        parsedMovies.forEach(movie => {
            output += `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <p class="card-text">Año: ${movie.Year}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('api-movies').innerHTML = output;
    } else {
        document.getElementById('api-movies').innerHTML = '<p>No se encontraron resultados.</p>';
    }
});