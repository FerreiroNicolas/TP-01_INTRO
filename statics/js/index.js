document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'thewdb'; // Clave de prueba pública de OMDb
    const apiURL = `https://www.omdbapi.com/?s=batman&apikey=${apiKey}`;

    document.querySelector('.iniciar').addEventListener('click', function(event) {
        event.preventDefault();
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                if (data && data.Search) {
                    localStorage.setItem('movies', JSON.stringify(data.Search));
                    window.location.href = 'api.html';
                } else {
                    console.error('No se encontraron resultados en la API.');
                }
            })
            .catch(error => console.error('Error al consumir la API:', error));
    });
});
