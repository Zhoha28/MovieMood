import React, { useState, useEffect, useRef } from 'react';
import Search from "./components/Search.jsx";
import Spacer from "./components/Spacer.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Hero from './components/Hero.jsx';
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import Navbar from "./components/Navbar.jsx";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = process.env.TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    const [movieList, setMovieList] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    const [trendingMovies, setTrendingMovies] = useState([])
    const [errorMessageTM, setErrorMessageTM] = useState('');
    const [isLoadingTM, setIsLoadingTM] = useState(true)

    const [latestMovies, setLatestMovies] = useState([])

    const trendingRef = useRef(null);
    const movieListRef = useRef(null);

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 1500, [searchTerm])

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch movies, try again later!!');
            }

            const data = await response.json();

            setMovieList(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0])
            }

        } catch (error) {
            console.error(`Error fetching movies ${error}`);
            setErrorMessage('Error fetching Movies, please try again later :)');
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        setIsLoadingTM(true);
        setErrorMessageTM("");
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        }
        catch (error) {
            console.error(`Error fetching trending movies ${error}`);
            setErrorMessageTM("No trending movies :/");
        }
        finally {
            setIsLoadingTM(false);
        }
    }

    const fetchLatestMovies = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/movie/now_playing`, API_OPTIONS);
            const data = await response.json();
            return data.results.slice(0, 3);
        } catch (e) {
            console.log(e)
            return [];
        }
    }

    // Staggered scroll animation for trending movies list
    useEffect(() => {
        if (trendingRef.current && trendingMovies.length > 0) {
            gsap.fromTo(
                trendingRef.current.children,
                { autoAlpha: 0, y: 40 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: trendingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }
    }, [trendingMovies]);

    // Staggered scroll animation for movie list on search results
    useEffect(() => {
        if (movieListRef.current && movieList.length > 0) {
            gsap.fromTo(
                movieListRef.current.children,
                { autoAlpha: 0, y: 20 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: movieListRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }
    }, [movieList]);

    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    useEffect(() => {
        const loadLatestMovies = async () => {
            const movies = await fetchLatestMovies();
            setLatestMovies(movies);
        };
        loadLatestMovies();
    }, []);

    return (
        <main>
            <Navbar/>

            {latestMovies.length > 0 && <Hero movies={latestMovies.slice(0, 5)} />}

            <div className="wrapper">



                {trendingMovies.length > 0 && (
                    <section className='trending'>
                        <h2>Trending Movies</h2>
                        <ul ref={trendingRef}>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title} />
                                    <h2>{movie.title}</h2>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <header>
                    <div className="text-white text-center">
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                </header>
                <section className='all-movies'>
                    <Spacer />
                    <h2>All Movies</h2>
                    <br />
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-white">{errorMessage}</p>
                    ) : (
                        <ul className="text-white space-y-2" ref={movieListRef}>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            <Footer />
        </main>
    );
};

export default App;
