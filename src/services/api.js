import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yjc2M2RjMDM2NGEzYzg1ZjJkMjJmMmQyODc4NGNjZSIsIm5iZiI6MTcyNDQyODA1Ni43MTEwNTcsInN1YiI6IjY2YzhhYzQ2ZDc0MTM2OWNkYjg3NjZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3-aSDXr0fmbW-c3bS9YSKNdXcvU-qOxYVO3Sc-QdGs8';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
    Authorization: `Bearer ${API_KEY}`,
    },
});

export const getTrendingMovies = () => api.get('/trending/movie/day');
export const searchMovies = (query) => api.get('/search/movie', { params: { query } });
export const getMovieDetails = (movieId) => api.get(`/movie/${movieId}`);
export const getMovieCredits = (movieId) => api.get(`/movie/${movieId}/credits`);
export const getMovieReviews = (movieId) => api.get(`/movie/${movieId}/reviews`);