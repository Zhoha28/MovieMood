import React, {useState, useEffect} from 'react';
import Search from "./components/Search.jsx";
import Spacer from "./components/Spacer.jsx";
import Spinner from "./components/Spinner.jsx"
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    // usedebounce by waiting for user to stop typing
    useDebounce(()=> setDebouncedSearchTerm(searchTerm), 1500,[searchTerm])


    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = query ?
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch movies, try again later!!');
            }

            const data = await response.json();

            if (data.Response === 'false') {
                setErrorMessage(data.Error || "Failed to fetch movies");
                setMovieList([]);
            } else {
                setMovieList(data.results || []);
            }
        } catch (error) {
            console.error(`Error fetching movies ${error}`);
            setErrorMessage('Error fetching Movies, please try again later :)');
        } finally {
                setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm]);
    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                <header>
                    <img src='../hero-img.png' alt="Hero Banner"/>
                    <h1 className="title">Movies <span className="text-gradient"> Tailored </span>For You!!</h1>
                    <div className="text-white text-center">
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </div>
                </header>
                <Spacer/>
                <section className='all-movies'>
                    <Spacer/>
                    <h2>All Movies</h2>
                    <br/>
                    {isLoading ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className="text-white">{errorMessage}</p>
                    ) : (
                        <ul className="text-white space-y-2">
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default App;