/**
 * Componente ErrorMessage
 * Mensaje claro si la petición a la API falla
 */
export const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error-message">
      <h2>⚠️ Error</h2>
      <p>{error || 'Ocurrió un error al cargar los datos'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-retry">
          Reintentar
        </button>
      )}
    </div>
  );
};
