import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

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
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;