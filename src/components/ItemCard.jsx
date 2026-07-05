/**
 * Componente ItemCard
 * Tarjeta individual del producto/servicio con su imagen y botones de acción
 */
export const ItemCard = ({ item, isFavorite, isBlocked, onToggleFavorite, onToggleBlock }) => {
  if (isBlocked) return null;

  return (
    <div className="item-card">
      {item.image && <img src={item.image} alt={item.name} />}
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="card-actions">
        <button
          className={`btn-favorite ${isFavorite ? 'active' : ''}`}
          onClick={onToggleFavorite}
          title="Añadir a favoritos"
        >
          ❤️
        </button>
        <button
          className="btn-block"
          onClick={onToggleBlock}
          title="Bloquear elemento"
        >
          ❌
        </button>
      </div>
    </div>
  );
};
