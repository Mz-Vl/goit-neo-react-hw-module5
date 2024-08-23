import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
    const fetchMovieReviews = async () => {
        try {
            const response = await getMovieReviews(movieId);
            setReviews(response.data.results);
        } catch (error) {
            console.error('Error fetching movie reviews:', error);
        }
    };

    fetchMovieReviews();
    }, [movieId]);

    return (
    <div className={styles.container}>
        <h2>Movie Reviews</h2>
        {reviews.length > 0 ? (
            <ul className={styles.reviewList}>
            {reviews.map((review) => (
                <li key={review.id}>
                    <h3>{review.author}</h3>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
        ) : (
        <p>No reviews available for this movie.</p>
        )}
    </div>
    );
};

export default MovieReviews;