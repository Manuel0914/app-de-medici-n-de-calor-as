// ===========================
// Aplicación de Medición de Calorías
// JavaScript principal (vanilla)
// ===========================

// --- Datos simulados (mock) de alimentos ---
// Cada alimento tiene: nombre, calorías, proteínas (g), grasas (g) y carbohidratos (g)
const MOCK_FOOD_DATABASE = [
  { nombre: "Arroz blanco", calorias: 206, proteinas: 4.3, grasas: 0.4, carbohidratos: 44.5 },
  { nombre: "Pechuga de pollo", calorias: 165, proteinas: 31, grasas: 3.6, carbohidratos: 0 },
  { nombre: "Ensalada mixta", calorias: 45, proteinas: 2.5, grasas: 0.5, carbohidratos: 8.2 },
  { nombre: "Frijoles negros", calorias: 132, proteinas: 8.9, grasas: 0.5, carbohidratos: 23.7 },
  { nombre: "Plátano maduro frito", calorias: 250, proteinas: 1.2, grasas: 11, carbohidratos: 38 },
  { nombre: "Aguacate", calorias: 160, proteinas: 2, grasas: 15, carbohidratos: 8.5 },
  { nombre: "Tortilla de maíz", calorias: 52, proteinas: 1.4, grasas: 0.7, carbohidratos: 10.7 },
  { nombre: "Huevo frito", calorias: 90, proteinas: 6.3, grasas: 7, carbohidratos: 0.4 },
  { nombre: "Pan integral", calorias: 69, proteinas: 3.6, grasas: 1.1, carbohidratos: 11.8 },
  { nombre: "Pasta con salsa", calorias: 220, proteinas: 7, grasas: 3.5, carbohidratos: 42 },
  { nombre: "Sopa de verduras", calorias: 85, proteinas: 3, grasas: 1.5, carbohidratos: 15 },
  { nombre: "Bistec de res", calorias: 271, proteinas: 26, grasas: 18, carbohidratos: 0 }
];

// --- Referencias a elementos del DOM ---
const imageInput = document.getElementById("image-input");
const uploadArea = document.getElementById("upload-area");
const imagePreview = document.getElementById("image-preview");
const analyzeBtn = document.getElementById("analyze-btn");
const resultsSection = document.getElementById("results-section");
const loadingIndicator = document.getElementById("loading");
const foodListContainer = document.getElementById("food-list");
const caloriesValue = document.getElementById("calories-value");
const proteinValue = document.getElementById("protein-value");
const fatsValue = document.getElementById("fats-value");
const carbsValue = document.getElementById("carbs-value");

// Variable para rastrear si hay una imagen cargada
let imagenCargada = false;

// ===========================
// Función: Manejar la subida de imagen
// Se activa cuando el usuario selecciona un archivo
// ===========================
function manejarSubidaImagen(event) {
  const archivo = event.target.files[0];

  // Verificar que se seleccionó un archivo y que es una imagen
  if (archivo && archivo.type.startsWith("image/")) {
    const lector = new FileReader();

    // Cuando la imagen se carga, mostrar la vista previa
    lector.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.classList.add("visible");
      uploadArea.classList.add("has-image");
      uploadArea.querySelector("p").textContent = archivo.name;
      imagenCargada = true;
      analyzeBtn.disabled = false;
    };

    // Leer el archivo como URL de datos (base64)
    lector.readAsDataURL(archivo);
  }
}

// ===========================
// Función: Simular la detección de alimentos
// Selecciona alimentos aleatorios del mock para simular
// una detección por IA
// ===========================
function simularDeteccionAlimentos() {
  // Seleccionar entre 2 y 5 alimentos aleatorios
  const cantidad = Math.floor(Math.random() * 4) + 2;
  const alimentosDetectados = [];
  const indicesUsados = new Set();

  while (alimentosDetectados.length < cantidad) {
    const indice = Math.floor(Math.random() * MOCK_FOOD_DATABASE.length);
    // Evitar duplicados
    if (!indicesUsados.has(indice)) {
      indicesUsados.add(indice);
      alimentosDetectados.push({ ...MOCK_FOOD_DATABASE[indice] });
    }
  }

  return alimentosDetectados;
}

// ===========================
// Función: Calcular calorías y macronutrientes totales
// Recibe un arreglo de alimentos y devuelve los totales
// ===========================
function calcularTotales(alimentos) {
  const totales = {
    calorias: 0,
    proteinas: 0,
    grasas: 0,
    carbohidratos: 0
  };

  // Sumar los valores de cada alimento
  alimentos.forEach(function (alimento) {
    totales.calorias += alimento.calorias;
    totales.proteinas += alimento.proteinas;
    totales.grasas += alimento.grasas;
    totales.carbohidratos += alimento.carbohidratos;
  });

  // Redondear los valores a un decimal
  totales.calorias = Math.round(totales.calorias);
  totales.proteinas = Math.round(totales.proteinas * 10) / 10;
  totales.grasas = Math.round(totales.grasas * 10) / 10;
  totales.carbohidratos = Math.round(totales.carbohidratos * 10) / 10;

  return totales;
}

// ===========================
// Función: Mostrar resultados en pantalla
// Recibe los alimentos detectados y los totales calculados
// ===========================
function mostrarResultados(alimentos, totales) {
  // Limpiar la lista de alimentos anterior
  foodListContainer.innerHTML = "";

  // Crear un elemento <li> por cada alimento detectado
  alimentos.forEach(function (alimento) {
    const li = document.createElement("li");
    li.innerHTML =
      '<span class="food-name">' + alimento.nombre + "</span>" +
      '<span class="food-calories">' + alimento.calorias + " kcal</span>";
    foodListContainer.appendChild(li);
  });

  // Actualizar los valores de calorías y macronutrientes
  caloriesValue.textContent = totales.calorias;
  proteinValue.textContent = totales.proteinas + "g";
  fatsValue.textContent = totales.grasas + "g";
  carbsValue.textContent = totales.carbohidratos + "g";

  // Ocultar indicador de carga y mostrar resultados
  loadingIndicator.classList.remove("visible");
  resultsSection.classList.add("visible");
}

// ===========================
// Función: Analizar imagen (flujo principal)
// Coordina la simulación y muestra de resultados
// ===========================
function analizarImagen() {
  // Verificar que hay una imagen cargada
  if (!imagenCargada) {
    return;
  }

  // Ocultar resultados anteriores y mostrar carga
  resultsSection.classList.remove("visible");
  loadingIndicator.classList.add("visible");

  // Simular un tiempo de procesamiento (1.5 segundos)
  setTimeout(function () {
    // Paso 1: Simular detección de alimentos
    const alimentosDetectados = simularDeteccionAlimentos();

    // Paso 2: Calcular totales
    const totales = calcularTotales(alimentosDetectados);

    // Paso 3: Mostrar resultados en pantalla
    mostrarResultados(alimentosDetectados, totales);
  }, 1500);
}

// ===========================
// Event Listeners
// ===========================

// Abrir selector de archivos al hacer clic en el área de subida
uploadArea.addEventListener("click", function () {
  imageInput.click();
});

// Manejar cuando el usuario selecciona una imagen
imageInput.addEventListener("change", manejarSubidaImagen);

// Analizar imagen al hacer clic en el botón
analyzeBtn.addEventListener("click", analizarImagen);
