import { useFetch } from '../hooks/useFetch';

/**
 * Componente FavoritesPanel
 * Panel lateral que muestra la lista de pokémon favoritos
 */
export const FavoritesPanel = ({ favorites, onRemoveFavorite }) => {
  return (
    <aside className="favorites-panel">
      <h2>❤️ Favoritos ({favorites.length})</h2>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p className="empty-message">No tienes favoritos aún</p>
        ) : (
          favorites.map((pokemon) => (
            <FavoriteItem 
              key={pokemon.name} 
              pokemon={pokemon}
              onRemove={() => onRemoveFavorite(pokemon.name)}
            />
          ))
        )}
      </div>
    </aside>
  );
};

/**
 * Componente FavoriteItem
 * Renderiza un item individual en la lista de favoritos
 */
const FavoriteItem = ({ pokemon, onRemove }) => {
  // Consumir API para obtener detalles y imagen
  const { data: pokemonDetails } = useFetch(pokemon.url);

  const imageUrl = pokemonDetails?.sprites?.front_default || null;

  return (
    <div className="favorite-item">
      {imageUrl && (
        <img src={imageUrl} alt={pokemon.name} className="favorite-image" />
      )}
      <div className="favorite-info">
        <span className="favorite-name">{pokemon.name.toUpperCase()}</span>
      </div>
      <button 
        className="btn-remove-favorite"
        onClick={onRemove}
        title="Quitar de favoritos"
      >
        ✕
      </button>
    </div>
  );
};
