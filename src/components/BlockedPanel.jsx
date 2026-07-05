/**
 * Componente BlockedPanel
 * Para visualizar y desbloquear los elementos ocultos
 */
export const BlockedPanel = ({ blocked, allItems, onUnblock }) => {
  const blockedItems = allItems.filter((item) => blocked.includes(item.id));

  return (
    <aside className="blocked-panel">
      <h2>🚫 Bloqueados ({blocked.length})</h2>
      <div className="blocked-list">
        {blockedItems.length === 0 ? (
          <p>No hay elementos bloqueados</p>
        ) : (
          blockedItems.map((item) => (
            <div key={item.id} className="blocked-item">
              <span>{item.name}</span>
              <button onClick={() => onUnblock(item.id)}>Desbloquear</button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
