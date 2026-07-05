import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ItemList } from './components/ItemList';
import { FavoritesPanel } from './components/FavoritesPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

function App() {
  // URL de la PokeAPI para obtener pokémon (los 151 de la primera generación)
  const [apiUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=151');
  
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para la lista filtrada
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // Estado para los favoritos (almacena nombres de pokemon)
  const [favorites, setFavorites] = useState([]);

  // Usar el hook personalizado para consumir la API
  const { data, loading, error } = useFetch(apiUrl);

  // Extraer el listado de pokémon
  const pokemon = data?.results || [];

  // Lógica de filtrado: actualizar lista filtrada cuando cambien pokemon o searchTerm
  useEffect(() => {
    if (pokemon && pokemon.length > 0) {
      // Filtrar pokemon por nombre, ignorando mayúsculas/minúsculas
      const filtered = pokemon.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [pokemon, searchTerm]);

  // Función para agregar o eliminar un pokémon de favoritos
  const toggleFavorite = (pokemonName) => {
    setFavorites((prev) =>
      prev.includes(pokemonName)
        ? prev.filter((name) => name !== pokemonName)
        : [...prev, pokemonName]
    );
  };

  // Obtener los objetos completos de los favoritos
  const favoritePokemons = pokemon.filter((p) => favorites.includes(p.name));

  return (
    <div className="app">
      <Header />
      
      {/* Barra de búsqueda */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="main-container">
        {/* Mostrar spinner mientras carga */}
        {loading && <LoadingSpinner />}

        {/* Mostrar error si falla la petición */}
        {error && <ErrorMessage error={error} />}

        {/* Mostrar lista filtrada si no hay error ni está cargando */}
        {!loading && !error && (
          <>
            {filteredPokemon.length > 0 ? (
              <ItemList 
                items={filteredPokemon} 
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="no-results">
                {pokemon.length === 0 ? (
                  <p>No hay Pokémon para mostrar</p>
                ) : (
                  <p>No se encontraron Pokémon que coincidan con "{searchTerm}"</p>
                )}
              </div>
            )}

            {/* Panel de favoritos a la derecha */}
            <FavoritesPanel 
              favorites={favoritePokemons}
              onRemoveFavorite={toggleFavorite}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
