import { useFetch } from '../hooks/useFetch';

/**
 * Componente ItemCard
 * Renderiza una tarjeta individual del Pokémon con su imagen y botón de favoritos
 */
export const ItemCard = ({ item, isFavorite, onToggleFavorite }) => {
  // Consumir la API para obtener los detalles del Pokémon (incluyendo imagen)
  const { data: pokemonDetails, loading } = useFetch(item.url);

  // Obtener la URL de la imagen desde los detalles
  const imageUrl = pokemonDetails?.sprites?.other?.['official-artwork']?.front_default ||
                   pokemonDetails?.sprites?.front_default ||
                   null;

  return (
    <div className="item-card">
      {/* Mostrar spinner mientras se cargan los detalles */}
      {loading ? (
        <div className="card-placeholder">Cargando...</div>
      ) : (
        <>
          {/* Mostrar imagen del Pokémon */}
          {imageUrl ? (
            <img src={imageUrl} alt={item.name} className="card-image" />
          ) : (
            <div className="card-placeholder">Sin imagen</div>
          )}
          
          {/* Mostrar nombre del Pokémon */}
          <h3 className="card-title">{item.name.toUpperCase()}</h3>

          {/* Botón para agregar/quitar de favoritos */}
          <button 
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '❤️ Favorito' : '🤍 Agregar'}
          </button>
        </>
      )}
    </div>
  );
};
