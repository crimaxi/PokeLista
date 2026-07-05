import { ItemCard } from './ItemCard';

/**
 * Componente ItemList
 * Renderiza la lista completa de elementos obtenidos de la API
 */
export const ItemList = ({ items, favorites, onToggleFavorite }) => {
  if (!items || items.length === 0) {
    return <div className="item-list empty">No hay elementos para mostrar</div>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard 
          key={item.name} 
          item={item}
          isFavorite={favorites.includes(item.name)}
          onToggleFavorite={() => onToggleFavorite(item.name)}
        />
      ))}
    </div>
  );
};
