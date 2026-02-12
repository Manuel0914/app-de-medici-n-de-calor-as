// ================================
// SCRIPT DE LA APLICACIÓN
// Calculadora de Calorías
// ================================

/**
 * Función que se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicación cargada correctamente');
    inicializarApp();
});

/**
 * Inicializa la aplicación y configura los event listeners
 */
function inicializarApp() {
    // Obtener referencias a los elementos del DOM
    const botonAnalizar = document.getElementById('botonAnalizar');
    const inputImagen = document.getElementById('inputImagen');
    
    // Configurar event listeners
    if (botonAnalizar) {
        botonAnalizar.addEventListener('click', analizarImagen);
    }
    
    if (inputImagen) {
        inputImagen.addEventListener('change', manejarSeleccionImagen);
    }
    
    console.log('Event listeners configurados');
}

/**
 * Maneja la selección de una imagen
 * @param {Event} evento - El evento de cambio del input
 */
function manejarSeleccionImagen(evento) {
    const archivo = evento.target.files[0];
    
    if (archivo) {
        console.log('Imagen seleccionada:', archivo.name);
        // Aquí se podría mostrar una vista previa de la imagen
        // (implementación futura)
    }
}

/**
 * Base de datos simulada de alimentos con información nutricional
 */
const baseDatosAlimentos = [
    { nombre: 'Arroz Blanco', calorias: 130, proteinas: 2.7, grasas: 0.3, carbohidratos: 28, emoji: '🍚' },
    { nombre: 'Pollo a la Plancha', calorias: 165, proteinas: 31, grasas: 3.6, carbohidratos: 0, emoji: '🍗' },
    { nombre: 'Ensalada Verde', calorias: 25, proteinas: 2, grasas: 0.3, carbohidratos: 5, emoji: '🥗' },
    { nombre: 'Frijoles', calorias: 130, proteinas: 9, grasas: 0.5, carbohidratos: 23, emoji: '🫘' },
    { nombre: 'Aguacate', calorias: 160, proteinas: 2, grasas: 15, carbohidratos: 9, emoji: '🥑' },
    { nombre: 'Tomate', calorias: 22, proteinas: 1, grasas: 0.2, carbohidratos: 5, emoji: '🍅' },
    { nombre: 'Plátano', calorias: 105, proteinas: 1.3, grasas: 0.4, carbohidratos: 27, emoji: '🍌' },
    { nombre: 'Pescado', calorias: 140, proteinas: 28, grasas: 3, carbohidratos: 0, emoji: '🐟' }
];

/**
 * Función principal para analizar la imagen
 * Se ejecuta cuando el usuario presiona el botón "Analizar"
 */
function analizarImagen() {
    console.log('Analizando imagen...');
    
    const inputImagen = document.getElementById('inputImagen');
    const seccionResultados = document.getElementById('seccionResultados');
    
    // Verificar que se haya seleccionado una imagen
    if (!inputImagen.files || !inputImagen.files[0]) {
        alert('Por favor, selecciona una imagen primero');
        return;
    }
    
    // Simular detección de alimentos (seleccionar 3-4 alimentos aleatorios)
    const alimentosDetectados = simularDeteccionAlimentos();
    
    // Calcular totales
    const totales = calcularTotales(alimentosDetectados);
    
    // Mostrar resultados
    mostrarResultados(alimentosDetectados, totales);
    
    // Mostrar la sección de resultados
    if (seccionResultados) {
        seccionResultados.classList.remove('hidden');
    }
    
    console.log('Análisis completado');
}

/**
 * Simula la detección de alimentos seleccionando aleatoriamente de la base de datos
 * @returns {Array} Array de alimentos detectados
 */
function simularDeteccionAlimentos() {
    // Seleccionar entre 3 y 4 alimentos aleatorios
    const numAlimentos = Math.floor(Math.random() * 2) + 3; // 3 o 4
    const alimentosSeleccionados = [];
    const indicesUsados = new Set();
    
    while (alimentosSeleccionados.length < numAlimentos && alimentosSeleccionados.length < baseDatosAlimentos.length) {
        const indiceAleatorio = Math.floor(Math.random() * baseDatosAlimentos.length);
        
        if (!indicesUsados.has(indiceAleatorio)) {
            indicesUsados.add(indiceAleatorio);
            alimentosSeleccionados.push({...baseDatosAlimentos[indiceAleatorio]});
        }
    }
    
    return alimentosSeleccionados;
}

/**
 * Calcula los totales de calorías y macronutrientes
 * @param {Array} alimentos - Array de alimentos detectados
 * @returns {Object} Objeto con totales calculados
 */
function calcularTotales(alimentos) {
    const totales = {
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0
    };
    
    alimentos.forEach(alimento => {
        totales.calorias += alimento.calorias;
        totales.proteinas += alimento.proteinas;
        totales.grasas += alimento.grasas;
        totales.carbohidratos += alimento.carbohidratos;
    });
    
    // Redondear valores a un decimal
    totales.proteinas = Math.round(totales.proteinas * 10) / 10;
    totales.grasas = Math.round(totales.grasas * 10) / 10;
    totales.carbohidratos = Math.round(totales.carbohidratos * 10) / 10;
    
    return totales;
}

/**
 * Muestra los resultados del análisis en la interfaz
 * @param {Array} alimentos - Array de alimentos detectados
 * @param {Object} totales - Objeto con totales calculados
 */
function mostrarResultados(alimentos, totales) {
    const contenidoResultados = document.getElementById('contenidoResultados');
    
    if (!contenidoResultados) return;
    
    // Crear HTML para tarjetas de totales
    const htmlTotales = `
        <div class="totales-grid">
            <div class="total-card">
                <div class="total-emoji">🔥</div>
                <div class="total-info">
                    <div class="total-valor">${totales.calorias}</div>
                    <div class="total-label">Calorías</div>
                </div>
            </div>
            <div class="total-card">
                <div class="total-emoji">🥩</div>
                <div class="total-info">
                    <div class="total-valor">${totales.proteinas}g</div>
                    <div class="total-label">Proteínas</div>
                </div>
            </div>
            <div class="total-card">
                <div class="total-emoji">🥑</div>
                <div class="total-info">
                    <div class="total-valor">${totales.grasas}g</div>
                    <div class="total-label">Grasas</div>
                </div>
            </div>
            <div class="total-card">
                <div class="total-emoji">🍞</div>
                <div class="total-info">
                    <div class="total-valor">${totales.carbohidratos}g</div>
                    <div class="total-label">Carbohidratos</div>
                </div>
            </div>
        </div>
    `;
    
    // Crear HTML para lista de alimentos
    const htmlAlimentos = alimentos.map(alimento => `
        <div class="alimento-item">
            <div class="alimento-emoji">${alimento.emoji}</div>
            <div class="alimento-info">
                <div class="alimento-nombre">${alimento.nombre}</div>
                <div class="alimento-detalles">
                    ${alimento.calorias} kcal • 
                    P: ${alimento.proteinas}g • 
                    G: ${alimento.grasas}g • 
                    C: ${alimento.carbohidratos}g
                </div>
            </div>
        </div>
    `).join('');
    
    // Actualizar contenido
    contenidoResultados.innerHTML = `
        <h3 class="subtitulo-resultados">Totales</h3>
        ${htmlTotales}
        <h3 class="subtitulo-resultados" style="margin-top: 30px;">Alimentos Detectados</h3>
        <div class="alimentos-lista">
            ${htmlAlimentos}
        </div>
    `;
}
