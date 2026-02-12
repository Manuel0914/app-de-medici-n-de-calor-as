<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🍽️ Calculadora de Calorías - Aplicación Web

Una aplicación web desarrollada con JavaScript vanilla para estimar calorías y macronutrientes a partir de imágenes de alimentos.

## Resumen

He creado exitosamente una aplicación web completa en JavaScript vanilla para estimar calorías y macronutrientes a partir de imágenes de alimentos. Aquí está lo que se implementó:

### ✅ Archivos Creados

1. **index.html** - Estructura HTML principal con:
   - Título claro de la aplicación "🍽️ Calculadora de Calorías"
   - Subtítulo descriptivo explicando el propósito de la aplicación
   - Formulario de carga de imágenes con soporte de arrastrar y soltar
   - Sección de vista previa de imagen
   - Botón "Analizar Imagen"
   - Sección de resultados con tarjetas de resumen y lista detallada de alimentos

2. **css/styles.css** - Estilo moderno con:
   - Fondo con gradiente púrpura (linear-gradient de #667eea a #764ba2)
   - Bordes redondeados (border-radius de 15-20px en todo el diseño)
   - Diseño centrado y responsive (max-width: 900px)
   - Diseño basado en tarjetas para estadísticas resumidas
   - Animaciones y transiciones suaves
   - Puntos de quiebre responsive para móviles (@768px y @480px)

3. **js/app.js** - Funcionalidad completa en JavaScript con:
   - `initializeApp()` - Inicializa la aplicación y configura los event listeners
   - `handleImageUpload()` - Gestiona la selección de archivos de imagen y la vista previa
   - `analyzeImage()` - Orquesta el proceso de análisis con estado de carga
   - `simulateFoodDetection()` - Genera datos simulados de detección de alimentos (3-5 alimentos aleatorios)
   - `calculateNutritionTotals()` - Suma las calorías y macronutrientes
   - `displayResults()` - Actualiza la interfaz de usuario con los resultados del análisis
   - `createFoodItemElement()` - Crea elementos HTML para cada alimento detectado
   - Todas las funciones están bien comentadas en español con documentación estilo JSDoc

### 🎨 Características Demostradas

- **Carga de Imágenes**: Los usuarios pueden seleccionar un archivo de imagen, el cual se muestra en una vista previa
- **Simulación de Análisis**: Al hacer clic en "Analizar Imagen" se activa un análisis simulado con un estado de carga
- **Base de Datos Simulada de Alimentos**: Contiene 5 alimentos diferentes (Pechuga de Pollo, Arroz Blanco, Brócoli, Aguacate, Ensalada)
- **Visualización de Resultados**:
  - Tarjetas de resumen mostrando totales: Calorías (🔥), Proteínas (🥩), Grasas (🥑), Carbohidratos (🍞)
  - Lista detallada de alimentos detectados con íconos, porciones e información nutricional individual
- **Diseño Responsive**: Funciona en computadoras de escritorio, tabletas y dispositivos móviles

### 📸 Capturas de Pantalla

La aplicación fue probada y las capturas de pantalla muestran:

1. Página inicial con área de carga
2. Imagen cargada con botón "Analizar Imagen" visible
3. Resultados mostrados con toda la información nutricional (637 kcal totales, 57g proteína, 13g grasa, 72g carbohidratos)

### 🔒 Seguridad

- ✅ Revisión de código completada sin problemas
- ✅ Escaneo de seguridad CodeQL completado con 0 alertas
- ✅ Sin dependencias externas ni vulnerabilidades de seguridad

La aplicación está lista para usar y demuestra toda la funcionalidad solicitada con datos simulados. Proporciona una base sólida que puede mejorarse más adelante con integración de API real para detección de alimentos y análisis nutricional reales.

---

## Ejecutar Localmente

**Requisitos previos:** Node.js

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Configurar la `GEMINI_API_KEY` en [.env.local](.env.local) con tu clave API de Gemini
3. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

## Ver en AI Studio

Ver tu aplicación en AI Studio: https://ai.studio/apps/drive/1LJMa0RnD-hBXZKCiX4voaAYPFZ4TQRW_
