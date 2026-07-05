# Proyecto Final - Front End

Aplicación React para gestionar elementos con búsqueda, favoritos y bloqueo de elementos.

## Estructura del Proyecto

```
src/
├── hooks/
│   ├── useFetch.js          # Hook para peticiones a API
│   └── useLocalStorage.js   # Hook para persistencia de datos
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── Statistics.jsx
│   ├── ItemList.jsx
│   ├── ItemCard.jsx
│   ├── FavoritesPanel.jsx
│   ├── BlockedPanel.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── App.jsx                  # Componente principal
├── main.jsx                 # Punto de entrada
├── App.css
└── index.css
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar servidor de desarrollo:
```bash
npm run dev
```

3. Compilar para producción:
```bash
npm run build
```

## Características

- ✅ Búsqueda de elementos en tiempo real
- ✅ Sistema de favoritos persistente
- ✅ Bloqueo de elementos
- ✅ Estadísticas en vivo
- ✅ Interfaz responsiva
- ✅ Manejo de errores y carga

## Autores

[Añadir nombres de integrantes]

## Licencia

MIT
