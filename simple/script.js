/** Base de datos de alimentos simulada */
var baseDatosAlimentos = [
    { nombre: 'Arroz blanco', calorias: 210, proteinas: 4, grasas: 0.5, carbohidratos: 46, emoji: '🍚' },
    { nombre: 'Pechuga de pollo', calorias: 165, proteinas: 31, grasas: 3.6, carbohidratos: 0, emoji: '🍗' },
    { nombre: 'Ensalada mixta', calorias: 50, proteinas: 2, grasas: 0.5, carbohidratos: 10, emoji: '🥗' },
    { nombre: 'Pasta con tomate', calorias: 320, proteinas: 11, grasas: 5, carbohidratos: 58, emoji: '🍝' },
    { nombre: 'Huevos revueltos', calorias: 200, proteinas: 14, grasas: 15, carbohidratos: 2, emoji: '🥚' },
    { nombre: 'Salmón a la plancha', calorias: 250, proteinas: 30, grasas: 14, carbohidratos: 0, emoji: '🐟' },
    { nombre: 'Tostada con aguacate', calorias: 190, proteinas: 4, grasas: 10, carbohidratos: 22, emoji: '🥑' },
    { nombre: 'Lentejas estofadas', calorias: 230, proteinas: 18, grasas: 1, carbohidratos: 40, emoji: '🍲' }
];

/** Frases de feedback nutricional */
var feedbackPool = [
    'Buena combinación de proteínas y carbohidratos.',
    'Podrías añadir más verduras para aumentar la fibra.',
    'El plato tiene un buen aporte energético para una comida principal.',
    'Considera reducir las grasas saturadas en futuras comidas.',
    'El contenido proteico es adecuado para mantener la masa muscular.',
    'Intenta incluir grasas saludables como aceite de oliva o frutos secos.',
    'Buena fuente de carbohidratos complejos para energía sostenida.'
];

/** Frases de sugerencias */
var sugerenciasPool = [
    'Añadir ensalada verde',
    'Sustituir por integral',
    'Incluir fruta de postre',
    'Reducir la porción de sal',
    'Añadir una fuente de omega-3',
    'Beber agua durante la comida'
];

/** Referencia a los elementos del DOM */
var fileInput = document.getElementById('file-input');
var uploadArea = document.getElementById('upload-area');
var previewContainer = document.getElementById('preview-container');
var imagePreview = document.getElementById('image-preview');
var btnRemoveImage = document.getElementById('btn-remove-image');
var btnAnalyze = document.getElementById('btn-analyze');
var btnText = document.getElementById('btn-text');
var btnSpinner = document.getElementById('btn-spinner');
var resultsSection = document.getElementById('results-section');

/** Estado de la imagen seleccionada */
var imagenSeleccionada = false;

/** Inicializar eventos al cargar la página */
function inicializarApp() {
    uploadArea.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', manejarSeleccionImagen);

    btnRemoveImage.addEventListener('click', eliminarImagen);

    btnAnalyze.addEventListener('click', analizarImagen);

    uploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', function () {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        var archivos = e.dataTransfer.files;
        if (archivos.length > 0 && archivos[0].type.startsWith('image/')) {
            mostrarVistaPrevia(archivos[0]);
        }
    });
}

/** Manejar la selección de imagen desde el input de archivo */
function manejarSeleccionImagen(e) {
    var archivo = e.target.files[0];
    if (archivo) {
        mostrarVistaPrevia(archivo);
    }
}

/** Mostrar la vista previa de la imagen seleccionada */
function mostrarVistaPrevia(archivo) {
    var lector = new FileReader();
    lector.onloadend = function () {
        imagePreview.src = lector.result;
        previewContainer.classList.remove('hidden');
        uploadArea.classList.add('hidden');
        imagenSeleccionada = true;
        btnAnalyze.disabled = false;
    };
    lector.readAsDataURL(archivo);
}

/** Eliminar la imagen seleccionada y restablecer la vista */
function eliminarImagen() {
    imagePreview.src = '';
    previewContainer.classList.add('hidden');
    uploadArea.classList.remove('hidden');
    fileInput.value = '';
    imagenSeleccionada = false;
    btnAnalyze.disabled = true;
    resultsSection.classList.add('hidden');
}

/** Simular la detección de alimentos en la imagen */
function simularDeteccionAlimentos() {
    var cantidad = 3 + Math.floor(Math.random() * 2);
    var indices = [];
    var seleccionados = [];

    while (indices.length < cantidad) {
        var idx = Math.floor(Math.random() * baseDatosAlimentos.length);
        if (indices.indexOf(idx) === -1) {
            indices.push(idx);
            seleccionados.push(baseDatosAlimentos[idx]);
        }
    }

    return seleccionados;
}

/** Seleccionar elementos aleatorios de un array */
function seleccionarAleatorios(arr, cantidad) {
    var copia = arr.slice();
    var resultado = [];
    for (var i = 0; i < cantidad && copia.length > 0; i++) {
        var idx = Math.floor(Math.random() * copia.length);
        resultado.push(copia.splice(idx, 1)[0]);
    }
    return resultado;
}

/** Analizar la imagen y mostrar los resultados */
function analizarImagen() {
    if (!imagenSeleccionada) return;

    btnAnalyze.disabled = true;
    btnText.textContent = 'Analizando...';
    btnSpinner.classList.remove('hidden');

    setTimeout(function () {
        var alimentos = simularDeteccionAlimentos();

        var totalCalorias = 0;
        var totalProteinas = 0;
        var totalGrasas = 0;
        var totalCarbohidratos = 0;

        for (var i = 0; i < alimentos.length; i++) {
            totalCalorias += alimentos[i].calorias;
            totalProteinas += alimentos[i].proteinas;
            totalGrasas += alimentos[i].grasas;
            totalCarbohidratos += alimentos[i].carbohidratos;
        }

        var resumen = alimentos.map(function (a) {
            return a.emoji + ' ' + a.nombre;
        }).join(', ');

        var feedback = seleccionarAleatorios(feedbackPool, 3);
        var sugerencias = seleccionarAleatorios(sugerenciasPool, 3);

        mostrarResultados({
            summary: resumen,
            calories: Math.round(totalCalorias),
            macros: {
                protein: Math.round(totalProteinas * 10) / 10,
                carbs: Math.round(totalCarbohidratos * 10) / 10,
                fats: Math.round(totalGrasas * 10) / 10
            },
            feedback: feedback,
            suggestions: sugerencias
        });

        btnText.textContent = 'Analizar comida';
        btnSpinner.classList.add('hidden');
        btnAnalyze.disabled = false;
    }, 1500);
}

/** Mostrar los resultados del análisis en la interfaz */
function mostrarResultados(datos) {
    document.getElementById('result-summary-text').textContent = datos.summary;
    document.getElementById('result-calories').textContent = datos.calories;
    document.getElementById('result-protein').textContent = datos.macros.protein + 'g';
    document.getElementById('result-carbs').textContent = datos.macros.carbs + 'g';
    document.getElementById('result-fats').textContent = datos.macros.fats + 'g';

    var feedbackList = document.getElementById('result-feedback');
    feedbackList.innerHTML = '';
    for (var i = 0; i < datos.feedback.length; i++) {
        var li = document.createElement('li');
        li.textContent = datos.feedback[i];
        feedbackList.appendChild(li);
    }

    var suggestionsList = document.getElementById('result-suggestions');
    suggestionsList.innerHTML = '';
    for (var j = 0; j < datos.suggestions.length; j++) {
        var span = document.createElement('span');
        span.className = 'suggestion-tag';
        span.textContent = datos.suggestions[j];
        suggestionsList.appendChild(span);
    }

    resultsSection.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', inicializarApp);
