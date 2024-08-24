import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
    const fetchMovieCast = async () => {
        try {
            const response = await getMovieCredits(movieId);
            setCast(response.data.cast);
        } catch (error) {
            console.error('Error fetching movie cast:', error);
        }
    };

    fetchMovieCast();
    }, [movieId]);

    return (
    <div className={styles.container}>
        <h2>Movie Cast</h2>
        <ul className={styles.castList}>
            {cast.map((actor) => (
            <li key={actor.id} className={styles.castItem}>
                    <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className={styles.actorImage}/>
                    <div className={styles.actorInfo}>
                        <p>{actor.name}</p>
                        <p>Character: {actor.character}</p>
                    </div>
            </li>
            ))}
        </ul>
    </div>
    );
};

export default MovieCast;