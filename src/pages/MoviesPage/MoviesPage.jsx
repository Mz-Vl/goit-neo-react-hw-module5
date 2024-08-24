import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') || '';
  const location = useLocation();

  useEffect(() => {
    const storedMovies = localStorage.getItem('searchResults');
    const storedQuery = localStorage.getItem('searchQuery');
    
    if (query && query === storedQuery && storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else if (query) {
      handleSearch();
    }
  }, [query]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;

    try {
      const response = await searchMovies(query);
      setMovies(response.data.results);
      localStorage.setItem('searchResults', JSON.stringify(response.data.results));
      localStorage.setItem('searchQuery', query);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchParams({ query: newQuery });
    if (!newQuery) {
      setMovies([]);
      localStorage.removeItem('searchResults');
      localStorage.removeItem('searchQuery');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }} className={styles.movieLink}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className={styles.movieImage}
              />
              <h3 className={styles.movieTitle}>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;