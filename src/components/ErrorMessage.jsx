/**
 * Componente ErrorMessage
 * Muestra un mensaje claro si la petición a la API falla
 */
export const ErrorMessage = ({ error }) => {
  return (
    <div className="error-message">
      <h2>⚠️ Error</h2>
      <p>{error || 'Ocurrió un error al cargar los datos'}</p>
    </div>
  );
};
