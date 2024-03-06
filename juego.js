const iconoButton = document.querySelector(".navbar-icono");
const navbar = document.querySelector(".navbar");
const botonInicio = document.getElementById('botonInicio');
const juego = document.getElementById('juego');
const preguntaDiv = document.getElementById('pregunta');
const opcionesDiv = document.getElementById('opciones');
const puntuacionActualDiv = document.getElementById('puntuacionActual');
const preguntasRestantesDiv = document.getElementById('preguntasRestantes');
const maximaPuntuacion = document.getElementById('maximaPuntuacion');
const puntuacionDiv = document.getElementById('puntuacion');

let indicePreguntaActual = 0;
let puntuacion = 0;
let preguntasRespondidas = 0;
let puntuacionMaxima = 0;
let juegoTerminado = false;

const todasLasPreguntas = [
    {
        pregunta: '¿En qué año nací?',
        opciones: ['2000', '2005', '2003'],
        opcionCorrecta: 1,
    },
    {
        pregunta: '¿Cuál es mi segundo nombre?',
        opciones: ['Carlos', 'Agustín', 'Javier'],
        opcionCorrecta: 2,
    },
    {
        pregunta: '¿Qué estoy estudiando?',
        opciones: ['Desarrollo de Software', 'Diseño Gráfico', 'Ingeniería Informática'],
        opcionCorrecta: 0,
    },
    {
        pregunta: '¿Dónde estoy estudiando?',
        opciones: ['UTN', 'UADE', 'UBA'],
        opcionCorrecta: 1,
    },
    {
        pregunta: '¿Cuál es mi nacionalidad?',
        opciones: ['Uruguayo', 'Italiano', 'Argentino'],
        opcionCorrecta: 2,
    },
    {
        pregunta: '¿Dónde vivo?',
        opciones: ['Villa Lugano', 'Belgrano', 'Liniers'],
        opcionCorrecta: 0,
    },
    {
        pregunta: '¿Cuáles son los últimos dos dígitos de mi celular?',
        opciones: ['13', '12', '21'],
        opcionCorrecta: 1,
    },
    {
        pregunta: '¿Cuál de estos es mi correo electrónico verdadero?',
        opciones: ['sbertoia@gmail.com', 'santibertoia@gmail.com', 'santinobertoia@gmail.com'],
        opcionCorrecta: 2,
    },
    {
        pregunta: '¿Cuál de estos no es uno de mis conocimientos de programación?',
        opciones: ['Java', 'JavaScript', 'CSS'],
        opcionCorrecta: 0,
    },
    {
        pregunta: '¿Cuál es el nivel de mi conocimiento en Python?',
        opciones: ['Básico', 'Avanzado', 'Intermedio'],
        opcionCorrecta: 1,
    },
    {
        pregunta: '¿Cuál de estos no es uno de los software y herramientas que controlo?',
        opciones: ['Figma', 'Canva', 'Photoshop'],
        opcionCorrecta: 2,
    },
    {
        pregunta: '¿Cuál es el nivel de mi conocimiento en Figma?',
        opciones: ['Intermedio', 'Avanzado', 'Básico'],
        opcionCorrecta: 0,
    },
    {
        pregunta: '¿Cuál es mi idioma nativo?',
        opciones: ['Inglés', 'Español', 'Portugués'],
        opcionCorrecta: 1,
    },
    {
        pregunta: '¿De qué era mi bachillerato?',
        opciones: ['Artístico', 'Técnico', 'Economía y Administración'],
        opcionCorrecta: 2,
    },
    {
        pregunta: '¿En cuál de las UTNs realicé mi Diplomatura en Python?',
        opciones: ['UTN.BA', 'UTN.FRC', 'UTN.FRM'],
        opcionCorrecta: 0,
    },
    {
        pregunta: '¿Cuál es el nivel de inglés que alcancé en mi curso en el Centro Universitario de Idiomas?',
        opciones: ['B1', 'B2', 'C1'],
        opcionCorrecta: 1,
    },
    {
        pregunta: '¿Cuántos cursos realicé en freeCodeCamp?',
        opciones: ['1', '2', '3'],
        opcionCorrecta: 2,
    },
    {
        pregunta: '¿Cuántos cursos realicé del Ministerio de Educación GCBA?',
        opciones: ['1', '3', '2'],
        opcionCorrecta: 0,
    },
    {
        pregunta: '¿Cuántas páginas aparecen en mi portafolio?',
        opciones: ['8', '11', '10'],
        opcionCorrecta: 1,
    },
    {
        pregunta: '¿Cuál de estas páginas no aparece en mi portafolio?',
        opciones: ['Galería', 'Sitio Info de IP', 'Blog Personal'],
        opcionCorrecta: 2,
    },
];

function obtenerPreguntasAleatorias(cantidad) {
    const preguntasAleatorias = [];
    const preguntasDisponibles = [...todasLasPreguntas];

    for (let i = 0; i < cantidad; i++) {
        if (preguntasDisponibles.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
            const preguntaAleatoria = preguntasDisponibles.splice(indiceAleatorio, 1)[0];
            preguntasAleatorias.push(preguntaAleatoria);
        }
    }

    return preguntasAleatorias;
}

botonInicio.addEventListener('click', iniciarJuego);

function iniciarJuego() {
    puntuacionActualDiv.textContent = 'Puntuación actual: 0';
    preguntasRestantesDiv.textContent = 'Preguntas restantes: 5';
    puntuacionActualDiv.style.display = 'block';
    preguntasRestantesDiv.style.display = 'block';
    maximaPuntuacion.style.display = 'none';
    if (juegoTerminado) {
        botonInicio.textContent = 'Jugar de nuevo';
    } else {
        botonInicio.textContent = 'Jugar';
    }
    botonInicio.style.display = 'none';
    juego.style.display = 'block';
    preguntasAleatorias = obtenerPreguntasAleatorias(5);
    indicePreguntaActual = 0;
    puntuacion = 0;
    preguntasRespondidas = 0;
    mostrarPregunta();
}

function mostrarPregunta() {
    if (indicePreguntaActual < preguntasAleatorias.length) {
        preguntaDiv.textContent = preguntasAleatorias[indicePreguntaActual].pregunta;
        opcionesDiv.innerHTML = '';
        for (let i = 0; i < preguntasAleatorias[indicePreguntaActual].opciones.length; i++) {
            const opcionBoton = document.createElement('button');
            opcionBoton.textContent = preguntasAleatorias[indicePreguntaActual].opciones[i];
            opcionBoton.addEventListener('click', () => comprobarRespuesta(i));
            opcionesDiv.appendChild(opcionBoton);
        }
        puntuacionActualDiv.textContent = 'Puntuación actual: ' + puntuacion;
        preguntasRestantesDiv.textContent = 'Preguntas restantes: ' + (preguntasAleatorias.length - indicePreguntaActual);
    } else {
        finalizarJuego();
    }
}

function comprobarRespuesta(indiceOpcion) {
    const opcionesBotones = opcionesDiv.querySelectorAll('button');
    opcionesBotones.forEach((boton, index) => {
        if (index === indiceOpcion) {
            boton.classList.add('selected');

            if (index === preguntasAleatorias[indicePreguntaActual].opcionCorrecta) {
                boton.classList.add('correct');
            } else {
                boton.classList.add('wrong');
            }
        } else {
            boton.disabled = true;
        }
    });

    if (indiceOpcion === preguntasAleatorias[indicePreguntaActual].opcionCorrecta) {
        puntuacion++;

        if (puntuacion > puntuacionMaxima) {
            puntuacionMaxima = puntuacion;
        }
    }

    indicePreguntaActual++;
    preguntasRespondidas++;

    setTimeout(mostrarPregunta, 1000);
}

function finalizarJuego() {
    juego.style.display = 'none';
    botonInicio.style.display = 'block';
    botonInicio.textContent = 'Volver a Jugar';
    puntuacionActualDiv.style.display = 'none';
    preguntasRestantesDiv.style.display = 'none';

    maximaPuntuacion.textContent = `Puntuación máxima: ${puntuacionMaxima}`;
    maximaPuntuacion.style.display = 'block';
}

function toggleNavbarLinks() {
    navbar.classList.toggle("active");
}

iconoButton.addEventListener("click", toggleNavbarLinks);
