// ========================================
// APLICACIÓN DE CALCULADORA DE CALORÍAS
// ========================================

// Variables globales para almacenar elementos del DOM
let imageInput;
let imagePreview;
let previewImage;
let analyzeButton;
let resultsSection;
let foodsList;

// Inicialización de la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicializa la aplicación y configura los event listeners
 */
function initializeApp() {
    // Obtener referencias a los elementos del DOM
    imageInput = document.getElementById('imageInput');
    imagePreview = document.getElementById('imagePreview');
    previewImage = document.getElementById('previewImage');
    analyzeButton = document.getElementById('analyzeButton');
    resultsSection = document.getElementById('resultsSection');
    foodsList = document.getElementById('foodsList');

    // Configurar event listeners
    imageInput.addEventListener('change', handleImageUpload);
    analyzeButton.addEventListener('click', analyzeImage);

    console.log('Aplicación inicializada correctamente');
}

/**
 * Maneja la carga de una imagen por parte del usuario
 * @param {Event} event - Evento de cambio del input de archivo
 */
function handleImageUpload(event) {
    const file = event.target.files[0];

    // Verificar que se haya seleccionado un archivo
    if (!file) {
        return;
    }

    // Verificar que el archivo sea una imagen
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido');
        return;
    }

    // Crear un FileReader para leer la imagen
    const reader = new FileReader();

    reader.onload = function(e) {
        // Mostrar la vista previa de la imagen
        previewImage.src = e.target.result;
        imagePreview.classList.remove('hidden');
        analyzeButton.classList.remove('hidden');
        
        // Ocultar los resultados anteriores si existen
        resultsSection.classList.add('hidden');
        
        console.log('Imagen cargada correctamente:', file.name);
    };

    // Leer el archivo como URL de datos
    reader.readAsDataURL(file);
}

/**
 * Analiza la imagen cargada y muestra los resultados
 * En esta versión simulada, genera datos de ejemplo
 */
function analyzeImage() {
    console.log('Iniciando análisis de imagen...');
    
    // Simular un pequeño tiempo de procesamiento
    analyzeButton.textContent = 'Analizando...';
    analyzeButton.disabled = true;

    setTimeout(() => {
        // Simular la detección de alimentos (datos mock)
        const detectedFoods = simulateFoodDetection();
        
        // Calcular totales de calorías y macronutrientes
        const totals = calculateNutritionTotals(detectedFoods);
        
        // Mostrar los resultados en la interfaz
        displayResults(detectedFoods, totals);
        
        // Restaurar el botón
        analyzeButton.textContent = 'Analizar Imagen';
        analyzeButton.disabled = false;
        
        console.log('Análisis completado');
    }, 1500);
}

/**
 * Simula la detección de alimentos en una imagen
 * @returns {Array} Array de objetos con información de alimentos detectados
 */
function simulateFoodDetection() {
    // Base de datos simulada de alimentos con sus nutrientes
    const foodDatabase = [
        {
            name: 'Pechuga de Pollo',
            icon: '🍗',
            portion: '150g',
            calories: 248,
            protein: 47,
            fat: 5,
            carbs: 0
        },
        {
            name: 'Arroz Blanco',
            icon: '🍚',
            portion: '200g',
            calories: 260,
            protein: 5,
            fat: 1,
            carbs: 58
        },
        {
            name: 'Brócoli',
            icon: '🥦',
            portion: '100g',
            calories: 34,
            protein: 3,
            fat: 0,
            carbs: 7
        },
        {
            name: 'Aguacate',
            icon: '🥑',
            portion: '50g',
            calories: 80,
            protein: 1,
            fat: 7,
            carbs: 4
        },
        {
            name: 'Ensalada',
            icon: '🥗',
            portion: '80g',
            calories: 15,
            protein: 1,
            fat: 0,
            carbs: 3
        }
    ];

    // Seleccionar aleatoriamente entre 3 y 5 alimentos
    const numFoods = Math.floor(Math.random() * 3) + 3;
    const selectedFoods = [];
    
    // Crear una copia del array para no modificar el original
    const availableFoods = [...foodDatabase];
    
    // Seleccionar alimentos aleatorios sin repetir
    for (let i = 0; i < numFoods && availableFoods.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableFoods.length);
        selectedFoods.push(availableFoods[randomIndex]);
        availableFoods.splice(randomIndex, 1);
    }

    console.log('Alimentos detectados:', selectedFoods);
    return selectedFoods;
}

/**
 * Calcula los totales de calorías y macronutrientes
 * @param {Array} foods - Array de alimentos detectados
 * @returns {Object} Objeto con totales de calorías y macronutrientes
 */
function calculateNutritionTotals(foods) {
    const totals = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0
    };

    // Sumar todos los valores de cada alimento
    foods.forEach(food => {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.fat += food.fat;
        totals.carbs += food.carbs;
    });

    console.log('Totales calculados:', totals);
    return totals;
}

/**
 * Muestra los resultados del análisis en la interfaz
 * @param {Array} foods - Array de alimentos detectados
 * @param {Object} totals - Totales de calorías y macronutrientes
 */
function displayResults(foods, totals) {
    // Actualizar los valores totales en las tarjetas de resumen
    document.getElementById('totalCalories').textContent = totals.calories;
    document.getElementById('totalProtein').textContent = totals.protein;
    document.getElementById('totalFat').textContent = totals.fat;
    document.getElementById('totalCarbs').textContent = totals.carbs;

    // Limpiar la lista de alimentos anterior
    foodsList.innerHTML = '';

    // Crear elementos HTML para cada alimento detectado
    foods.forEach(food => {
        const foodItem = createFoodItemElement(food);
        foodsList.appendChild(foodItem);
    });

    // Mostrar la sección de resultados con animación
    resultsSection.classList.remove('hidden');
    
    // Hacer scroll suave hacia los resultados
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Crea un elemento HTML para un alimento individual
 * @param {Object} food - Objeto con información del alimento
 * @returns {HTMLElement} Elemento div con la información del alimento
 */
function createFoodItemElement(food) {
    // Crear el contenedor principal
    const foodItem = document.createElement('div');
    foodItem.className = 'food-item';

    // Crear el icono del alimento
    const foodIcon = document.createElement('div');
    foodIcon.className = 'food-icon';
    foodIcon.textContent = food.icon;

    // Crear el contenedor de información
    const foodInfo = document.createElement('div');
    foodInfo.className = 'food-info';

    // Nombre del alimento
    const foodName = document.createElement('div');
    foodName.className = 'food-name';
    foodName.textContent = food.name;

    // Porción
    const foodPortion = document.createElement('div');
    foodPortion.className = 'food-portion';
    foodPortion.textContent = food.portion;

    // Agregar nombre y porción al contenedor de info
    foodInfo.appendChild(foodName);
    foodInfo.appendChild(foodPortion);

    // Crear el contenedor de nutrientes
    const foodNutrients = document.createElement('div');
    foodNutrients.className = 'food-nutrients';

    // Calorías
    const foodCalories = document.createElement('div');
    foodCalories.className = 'food-calories';
    foodCalories.textContent = `${food.calories} kcal`;

    // Macronutrientes
    const foodMacros = document.createElement('div');
    foodMacros.className = 'food-macros';
    foodMacros.textContent = `P: ${food.protein}g | G: ${food.fat}g | C: ${food.carbs}g`;

    // Agregar calorías y macros al contenedor de nutrientes
    foodNutrients.appendChild(foodCalories);
    foodNutrients.appendChild(foodMacros);

    // Ensamblar todos los elementos
    foodItem.appendChild(foodIcon);
    foodItem.appendChild(foodInfo);
    foodItem.appendChild(foodNutrients);

    return foodItem;
}
