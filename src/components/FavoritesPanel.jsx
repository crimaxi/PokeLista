/**
 * Componente FavoritesPanel
 * Listado que se despliega a la derecha de la página
 */
export const FavoritesPanel = ({ favorites, allItems, onRemoveFavorite }) => {
  const favoriteItems = allItems.filter((item) => favorites.includes(item.id));

  return (
    <aside className="favorites-panel">
      <h2>❤️ Favoritos ({favorites.length})</h2>
      <div className="favorites-list">
        {favoriteItems.length === 0 ? (
          <p>No tienes favoritos aún</p>
        ) : (
          favoriteItems.map((item) => (
            <div key={item.id} className="favorite-item">
              <span>{item.name}</span>
              <button onClick={() => onRemoveFavorite(item.id)}>✕</button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
