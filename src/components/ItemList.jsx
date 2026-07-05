import { ItemCard } from './ItemCard';

/**
 * Componente ItemList
 * Contenedor principal de los resultados de búsqueda
 */
export const ItemList = ({ items, onToggleFavorite, onToggleBlock, blocked, favorites }) => {
  if (!items || items.length === 0) {
    return <div className="item-list empty">No hay elementos para mostrar</div>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isFavorite={favorites.includes(item.id)}
          isBlocked={blocked.includes(item.id)}
          onToggleFavorite={() => onToggleFavorite(item.id)}
          onToggleBlock={() => onToggleBlock(item.id)}
        />
      ))}
    </div>
  );
};
