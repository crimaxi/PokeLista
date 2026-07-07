import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ItemList } from './components/ItemList';
import { FavoritesPanel } from './components/FavoritesPanel';
import { BlockedPanel } from './components/BlockedPanel';
import { Statistics } from './components/Statistics';
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

  // Estados persistidos en localStorage para favoritos y bloqueados
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [blockedItems, setBlockedItems] = useLocalStorage('blockedItems', []);

  // Usar el hook personalizado para consumir la API
  const { data, loading, error } = useFetch(apiUrl);

  // Extraer el listado de pokémon
  const pokemon = data?.results || [];

  // Lógica de filtrado: actualizar lista filtrada cuando cambien pokemon, searchTerm o bloqueados
  useEffect(() => {
    if (pokemon.length > 0) {
      const normalizedSearch = searchTerm.toLowerCase();
      const filtered = pokemon.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(normalizedSearch);
        const isBlocked = blockedItems.includes(item.name);
        return matchesSearch && !isBlocked;
      });
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon([]);
    }
  }, [pokemon, searchTerm, blockedItems]);

  // Función para agregar o eliminar un pokémon de favoritos
  const toggleFavorite = (pokemonName) => {
    setFavorites((prev) =>
      prev.includes(pokemonName)
        ? prev.filter((name) => name !== pokemonName)
        : [...prev, pokemonName]
    );
  };

  // Función para bloquear o desbloquear un pokémon
  const toggleBlock = (pokemonName) => {
    setBlockedItems((prev) =>
      prev.includes(pokemonName)
        ? prev.filter((name) => name !== pokemonName)
        : [...prev, pokemonName]
    );

    setFavorites((prev) => prev.filter((name) => name !== pokemonName));
  };

  const unblockPokemon = (pokemonName) => {
    setBlockedItems((prev) => prev.filter((name) => name !== pokemonName));
  };

  // Obtener los objetos completos de los favoritos
  const favoritePokemons = pokemon.filter((p) => favorites.includes(p.name));

  const teamMembers = [
    { name: 'Christopher', role: 'Diseño y experiencia de usuario' },
    { name: 'Alexis', role: 'Desarrollo y lógica de la app' },
  ];

  return (
    <div className="app">
      <Header />

      {/* Barra de búsqueda */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <Statistics
        total={pokemon.length}
        favorites={favorites.length}
        blocked={blockedItems.length}
      />

      <section className="team-section" aria-label="identificación del equipo">
        <div className="team-section__header">
          <h2>Equipo de desarrollo</h2>
          <p>Proyecto final de evaluación</p>
        </div>
        <div className="team-members">
          {teamMembers.map((member) => (
            <div className="team-member" key={member.name}>
              <span className="team-member__name">{member.name}</span>
              <span className="team-member__role">{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="main-container">
        {/* Mostrar spinner mientras carga */}
        {loading && <LoadingSpinner />}

        {/* Mostrar error si falla la petición */}
        {error && <ErrorMessage error={error} />}

        {/* Mostrar lista filtrada si no hay error ni está cargando */}
        {!loading && !error && (
          <>
            <div className="content-area">
              {filteredPokemon.length > 0 ? (
                <ItemList
                  items={filteredPokemon}
                  favorites={favorites}
                  blockedItems={blockedItems}
                  onToggleFavorite={toggleFavorite}
                  onToggleBlock={toggleBlock}
                />
              ) : (
                <div className="no-results">
                  {pokemon.length === 0 ? (
                    <p>No hay Pokémon para mostrar</p>
                  ) : (
                    <p>
                      {searchTerm
                        ? `No se encontraron Pokémon que coincidan con "${searchTerm}"`
                        : 'No hay Pokémon visibles en este momento'}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="side-panels">
              <FavoritesPanel
                favorites={favoritePokemons}
                onRemoveFavorite={toggleFavorite}
              />
              <BlockedPanel
                blocked={blockedItems}
                allItems={pokemon}
                onUnblock={unblockPokemon}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
