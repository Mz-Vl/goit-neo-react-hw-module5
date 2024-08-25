import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    const location = useLocation();

    return (
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
    );
};

export default MovieList;