import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Statistics } from './components/Statistics';
import { ItemList } from './components/ItemList';
import { FavoritesPanel } from './components/FavoritesPanel';
import { BlockedPanel } from './components/BlockedPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

function App() {
  const [apiUrl, setApiUrl] = useState(''); // Cambiar por la URL de tu API
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const { data: items, loading, error } = useFetch(apiUrl);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [blocked, setBlocked] = useLocalStorage('blocked', []);

  useEffect(() => {
    if (items) {
      const filtered = items.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [items, searchTerm]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const toggleBlock = (id) => {
    setBlocked((prev) =>
      prev.includes(id) ? prev.filter((blocked) => blocked !== id) : [...prev, id]
    );
  };

  const handleRetry = () => {
    // Recargar los datos
    setApiUrl(apiUrl);
  };

  return (
    <div className="app">
      <Header />
      <SearchBar value={searchTerm} onSearch={setSearchTerm} />
      <Statistics
        total={items?.length || 0}
        favorites={favorites.length}
        blocked={blocked.length}
      />

      <div className="main-container">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage error={error} onRetry={handleRetry} />}
        {!loading && !error && (
          <>
            <ItemList
              items={filteredItems}
              onToggleFavorite={toggleFavorite}
              onToggleBlock={toggleBlock}
              blocked={blocked}
              favorites={favorites}
            />
            <FavoritesPanel
              favorites={favorites}
              allItems={items || []}
              onRemoveFavorite={toggleFavorite}
            />
            <BlockedPanel
              blocked={blocked}
              allItems={items || []}
              onUnblock={toggleBlock}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
