import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingMovies } from '../../services/api';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
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

export default HomePage;