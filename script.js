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
 * Función principal para analizar la imagen
 * Se ejecuta cuando el usuario presiona el botón "Analizar"
 */
function analizarImagen() {
    console.log('Analizando imagen...');
    
    const inputImagen = document.getElementById('inputImagen');
    const seccionResultados = document.getElementById('seccionResultados');
    const contenidoResultados = document.getElementById('contenidoResultados');
    
    // Verificar que se haya seleccionado una imagen
    if (!inputImagen.files || !inputImagen.files[0]) {
        alert('Por favor, selecciona una imagen primero');
        return;
    }
    
    // Mostrar la sección de resultados
    if (seccionResultados) {
        seccionResultados.classList.remove('hidden');
    }
    
    // Mostrar un mensaje temporal
    // (En el futuro, aquí se mostrarían los resultados reales)
    if (contenidoResultados) {
        contenidoResultados.innerHTML = `
            <p><strong>Análisis en proceso...</strong></p>
            <p>La imagen ha sido seleccionada correctamente.</p>
            <p style="margin-top: 15px; font-size: 0.9em; color: #999;">
                Nota: La funcionalidad de análisis se implementará en una versión futura.
            </p>
        `;
    }
    
    console.log('Análisis completado (versión básica)');
}

/**
 * Función auxiliar para mostrar resultados
 * @param {Object} datos - Objeto con los datos nutricionales
 */
function mostrarResultados(datos) {
    // Esta función se implementará cuando se conecte con una API real
    console.log('Mostrando resultados:', datos);
}
