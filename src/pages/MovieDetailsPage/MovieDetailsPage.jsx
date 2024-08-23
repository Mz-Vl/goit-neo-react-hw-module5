import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();

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
        <Link to={location.state?.from || '/movies'}>Go back</Link>
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <p>{movie.overview}</p>
        <nav>
            <Link to="cast">View Cast</Link>
            <Link to="reviews">View Reviews</Link>
        </nav>
        <Outlet />
    </div>
    );
};

export default MovieDetailsPage;