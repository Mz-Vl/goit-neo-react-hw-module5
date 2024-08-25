import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const backLinkLocationRef = useRef(location.state?.from ?? '/');

    useEffect(() => {
    const fetchMovieDetails = async () => {
        try {
            const response = await getMovieDetails(movieId);
            setMovie(response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    fetchMovieDetails();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    return (
    <div className={styles.container}>
        <Link to={backLinkLocationRef.current} className={styles.backButton}>
            ← Go back
        </Link>
        <div className={styles.movieContent}>
            <div className={styles.posterContainer}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
            />
            </div>
            <div className={styles.movieInfo}>
                <h1 className={styles.movieTitle}>{movie.title}</h1>
                <p className={styles.userScore}>User Score: {Math.round(movie.vote_average * 10)}%</p>
            <div className={styles.infoSection}>
                <h2 className={styles.infoTitle}>Overview</h2>
                <p>{movie.overview}</p>
            </div>
                <div className={styles.infoSection}>
                <h2 className={styles.infoTitle}>Genres</h2>
                <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
            </div>
        </div>
        <div className={styles.additionalInfo}>
            <h2 className={styles.infoTitle}>Additional information</h2>
            <div className={styles.additionalLinks}>
            <Link to="cast" className={styles.additionalLink}>Cast</Link>
            <Link to="reviews" className={styles.additionalLink}>Reviews</Link>
            </div>
        </div>
        <Outlet />
    </div>
    );
};


export default MovieDetailsPage;