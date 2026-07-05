/**
 * Componente SearchBar
 * Barra de búsqueda para filtrar elementos
 */
export const SearchBar = ({ onSearch, value }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar elementos..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
