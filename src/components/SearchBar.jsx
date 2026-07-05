/**
 * Componente SearchBar
 * Barra de búsqueda para filtrar elementos por nombre
 */
export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar Pokémon por nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
