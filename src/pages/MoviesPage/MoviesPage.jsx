import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const response = await searchMovies(query);
          setMovies(response.data.results);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="searchQuery"
          defaultValue={query}
          placeholder="Search for a movie..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;