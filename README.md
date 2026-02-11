Clima-App | React Native & TypeScript 🌦️
Aplicación móvil de alto rendimiento para la consulta meteorológica global, construida con React Native y el ecosistema Expo. El proyecto destaca por un uso intensivo de TypeScript (85.5%) para garantizar la seguridad de tipos y una arquitectura modular basada en componentes y hooks personalizados.

🛠️ Stack Tecnológico
Frontend: React Native (Expo SDK).

Lenguaje: TypeScript (Tipado estricto para modelos de datos).

Routing: File-based routing (directorio /app).

API: Integración con OpenWeather API (Current Weather & Geocoding).

Herramientas: ESLint para calidad de código y TSConfig optimizado.

🏗️ Arquitectura y Código
El proyecto sigue una estructura organizada para facilitar la escalabilidad:

/components: UI Components reutilizables y modulares.

/hooks: Lógica de estado y efectos extraída para mayor limpieza en las vistas.

/api: Capa de servicios con manejo de peticiones asíncronas y normalización de datos.

Destacado Técnico: Consumo de API
He implementado una capa de servicios robusta que incluye:

- Interfaces Estrictas: Definición de WeatherData y CityResult para asegurar que el flujo de datos sea predecible.

- Manejo de Errores: Captura detallada de errores HTTP y respuestas fallidas de la API.

- Geolocalización: Soporte para búsqueda por nombre de ciudad y por coordenadas geográficas (lat/lon).

✨ Funcionalidades Clave
- Búsqueda Inteligente: Autocompletado y búsqueda de hasta 6 ciudades simultáneas mediante la API de Geocoding.

- Datos en Tiempo Real: Visualización de temperatura (actual/sensación térmica), humedad, viento y descripción climática localizada al español.

- UI Dinámica: Los iconos y descripciones se renderizan dinámicamente según la respuesta del servidor.

🚀 Instalación y Despliegue
Clona el repositorio.

- Instala las dependencias: npm install.

- Configura tu config.ts con la OPENWEATHER_API_KEY.

- Inicia el entorno: npx expo start.
