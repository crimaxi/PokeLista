/**
 * Componente LoadingSpinner
 * Indicador visual para el estado de carga
 */
export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};
