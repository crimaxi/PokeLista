# Pokédex - API Viewer

Aplicación React que consume la **PokeAPI** para demostrar:

## 📋 Requerimientos Implementados

### 1. **Consumo de API** ✅
- Conexión a la PokeAPI pública
- Obtención de listado de Pokémon con imágenes

### 2. **Hook Personalizado** ✅
- `useFetch.js` - Hook reutilizable para manejar peticiones HTTP
- Gestión automática de estados (data, loading, error)

### 3. **Manejo de Estados** ✅
- **Estado de Carga**: Indicador visual (spinner) mientras se consulta la API
- **Estado de Error**: Mensaje claro si la petición falla

### 4. **Despliegue del Listado** ✅
- Renderización de lista completa de Pokémon
- Visualización de imagen oficial de cada Pokémon
- Nombre del Pokémon en cada tarjeta

### 5. **Arquitectura Limpia** ✅
- Componentes funcionales y separados:
  - `Header.jsx` - Encabezado
  - `ItemList.jsx` - Contenedor de lista
  - `ItemCard.jsx` - Tarjeta individual
  - `LoadingSpinner.jsx` - Indicador de carga
  - `ErrorMessage.jsx` - Manejo de errores
- Hook personalizado en carpeta `hooks/`

## 📁 Estructura

```
src/
├── hooks/
│   └── useFetch.js          # Hook para consumir API
├── components/
│   ├── Header.jsx
│   ├── ItemList.jsx
│   ├── ItemCard.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── App.jsx                   # Componente principal
├── main.jsx                  # Punto de entrada
├── App.css                   # Estilos de componentes
└── index.css                 # Estilos globales
```

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 🌐 Despliegue en línea

### Opción 1: Vercel
1. Crea una cuenta en Vercel y conecta tu repositorio de GitHub.
2. Selecciona este proyecto y usa los ajustes por defecto.
3. Vercel detectará Vite automáticamente y construirá la app con:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Haz clic en Deploy.

### Opción 2: Netlify
1. Crea una cuenta en Netlify y arrastra la carpeta `dist` generada por `npm run build`.
2. O bien, conecta el repositorio y define:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Confirma el despliegue.

### Verificar el sitio
- Abre la URL generada por Vercel o Netlify.
- Confirma que la página cargue correctamente y que se vea el listado de Pokémon, los paneles laterales y la sección de equipo.

## 📌 API Utilizada

**[PokeAPI](https://pokeapi.co/)** - API pública y gratuita de Pokémon

- **Endpoint**: `https://pokeapi.co/api/v2/pokemon`
- **Detalles**: `https://pokeapi.co/api/v2/pokemon/{name}`

## 🛠 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **Fetch API** - Consumo de API

## ✨ Características

- Carga de Pokémon desde API
- Imágenes oficiales de alta calidad
- Interfaz responsiva
- Manejo automático de errores
- Indicador visual de carga

## 📝 Notas

- El proyecto consume 20 Pokémon iniciales (configurable en App.jsx)
- Cada tarjeta hace una petición adicional para obtener los detalles del Pokémon
- Estilos optimizados para desktop y mobile
