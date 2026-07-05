/**
 * Componente Statistics
 * Muestra la cantidad total, de favoritos y de bloqueados
 */
export const Statistics = ({ total, favorites, blocked }) => {
  return (
    <div className="statistics">
      <div className="stat-item">
        <h3>Total</h3>
        <p>{total}</p>
      </div>
      <div className="stat-item">
        <h3>Favoritos</h3>
        <p>{favorites}</p>
      </div>
      <div className="stat-item">
        <h3>Bloqueados</h3>
        <p>{blocked}</p>
      </div>
    </div>
  );
};
