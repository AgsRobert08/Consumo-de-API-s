// Inicializamos la página en 1 para empezar desde la primera página de resultados
let pagina = 1;

// Obtenemos las referencias a los botones de navegación (anterior y siguiente)
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Evento para el botón "Siguiente"
btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) { // Limita a un máximo de 1000 páginas
        pagina += 1; 
        cargarPeliculas(); // Llama a la función para cargar la nueva página
    }
});

// Evento para el botón "Anterior"
btnAnterior.addEventListener('click', () => {
    if (pagina > 1) { // Evita números de página menores a 1
        pagina -= 1; 
        cargarPeliculas(); // Llama a la función para cargar la nueva página
    }
});

// Función principal para cargar las películas desde la API
const cargarPeliculas = async () => {
    try {
        // Realiza la solicitud HTTP usando `fetch`
        // La URL incluye el número de página (`${pagina}`) y la clave de API
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cba87a7cf2b6b1ba7b6fa79cd8611548&language=es-MX&page=${pagina}`);
        
        console.log(respuesta); // Muestra la respuesta completa en la consola 

        // Verifica si la solicitud fue exitosa (código de estado 200)
        if (respuesta.status === 200) {
            // Convierte la respuesta JSON en un objeto JavaScript
            // `await` asegura que la conversión termine antes de continuar
            const datos = await respuesta.json();
            
            // Inicializa una cadena vacía para almacenar las películas
            let peliculas = '';

            // Itera sobre los resultados de la API (cada película)
            datos.results.forEach(pelicula => {
                // Construye el HTML para cada película
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            // Inserta el HTML generado en el contenedor de películas en la página
            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            // deternina la API Key inválida
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            // error de recurso no encontrado
            console.log('La película que buscas no existe');
        } else {
            // Otros códigos de error
            console.log('Hubo un error y no sabemos qué pasó');
        }

    } catch (error) {
        // Captura errores que ocurran durante la solicitud o procesamiento de datos
        console.log(error); // Muestra el error en la consola para depuración
    }
};

// Llama a la función 
cargarPeliculas();

/**fetch: Es una función de JavaScript que permite hacer solicitudes HTTP (como GET o POST) 
 * para obtener datos de un servidor o API. Devuelve una promesa con la respuesta de la solicitud.

await: Se utiliza dentro de funciones asincrónicas (async) para esperar que una promesa 
(como la de fetch) se resuelva antes de continuar con la ejecución del código, 
haciéndolo más legible y secuencial. */