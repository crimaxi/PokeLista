/**
 * Componente BlockedPanel
 * Para visualizar y desbloquear los elementos ocultos
 */
export const BlockedPanel = ({ blocked, allItems, onUnblock }) => {
  const blockedItems = allItems.filter((item) => blocked.includes(item.name));

  return (
    <aside className="blocked-panel">
      <h2>🚫 Bloqueados ({blocked.length})</h2>
      <div className="blocked-list">
        {blockedItems.length === 0 ? (
          <p className="empty-message">No hay elementos bloqueados</p>
        ) : (
          blockedItems.map((item) => (
            <div key={item.name} className="blocked-item">
              <span>{item.name.toUpperCase()}</span>
              <button type="button" onClick={() => onUnblock(item.name)}>
                Desbloquear
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
