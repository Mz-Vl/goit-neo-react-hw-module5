import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const backLinkHref = location.state?.from ?? '/';

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
            <Link to={backLinkHref} className={styles.backButton}>
                ← Go back
            </Link>
            
            <div className={styles.movieInfo}>
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className={styles.poster}
                />
                <div className={styles.details}>
                    <h1>{movie.title}</h1>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                    <h2>Genres</h2>
                    <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
                </div>
            </div>

            <div className={styles.additionalInfo}>
                <h2>Additional information</h2>
                <nav className={styles.nav}>
                    <Link to="cast" state={{ from: backLinkHref }} className={styles.link}>Cast</Link>
                    <Link to="reviews" state={{ from: backLinkHref }} className={styles.link}>Reviews</Link>
                </nav>
            </div>
            
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;