import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { Header } from './components/Header';
import { ItemList } from './components/ItemList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

function App() {
  // URL de la PokeAPI para obtener pokémon
  const [apiUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  // Usar el hook personalizado para consumir la API
  const { data, loading, error } = useFetch(apiUrl);

  // Extraer el listado de pokémon
  const pokemon = data?.results || [];

  return (
    <div className="app">
      <Header />

      <div className="main-container">
        {/* Mostrar spinner mientras carga */}
        {loading && <LoadingSpinner />}

        {/* Mostrar error si falla la petición */}
        {error && <ErrorMessage error={error} />}

        {/* Mostrar lista de elementos si no hay error ni está cargando */}
        {!loading && !error && <ItemList items={pokemon} />}
      </div>
    </div>
  );
}

export default App;
