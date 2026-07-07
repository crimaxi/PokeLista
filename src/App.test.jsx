// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { useFetch } from './hooks/useFetch';

vi.mock('./hooks/useFetch', () => ({
  useFetch: vi.fn(),
}));

describe('App bloqueados', () => {
  beforeEach(() => {
    useFetch.mockImplementation((url) => {
      if (url === 'https://pokeapi.co/api/v2/pokemon?limit=151') {
        return {
          data: {
            results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' }],
          },
          loading: false,
          error: null,
        };
      }

      return {
        data: {
          sprites: {
            other: {
              'official-artwork': { front_default: 'pikachu.png' },
            },
          },
        },
        loading: false,
        error: null,
      };
    });
  });

  it('bloquea un elemento, lo elimina de favoritos y lo oculta en resultados', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /agregar a favoritos/i }));
    expect(screen.getByText(/favoritos/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /bloquear/i }));

    expect(screen.getByText(/No tienes favoritos aún/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /desbloquear/i })).toBeInTheDocument();
    expect(screen.getByText(/No se encontraron Pokémon que coincidan con ""/i)).toBeInTheDocument();
  });

  it('muestra la sección de identificación del equipo en la página principal', () => {
    render(<App />);

    expect(screen.getByText(/equipo de desarrollo/i)).toBeInTheDocument();
    expect(screen.getByText(/ana/i)).toBeInTheDocument();
    expect(screen.getByText(/luis/i)).toBeInTheDocument();
  });

  it('persiste favoritos y bloqueados en localStorage', () => {
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /agregar a favoritos/i }));
    fireEvent.click(screen.getByRole('button', { name: /bloquear/i }));

    expect(window.localStorage.getItem('favorites')).toContain('pikachu');
    expect(window.localStorage.getItem('blockedItems')).toContain('pikachu');

    unmount();
    render(<App />);

    expect(screen.getByRole('button', { name: /desbloquear/i })).toBeInTheDocument();
  });
});
