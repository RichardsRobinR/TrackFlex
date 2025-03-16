import Search from "./Components/Search.jsx";
import {useState , useEffect} from "react";
import MovieCard from "./Components/MovieCard.jsx";
import {useDebounce} from "react-use";

const API_URL = "https://api.themoviedb.org/3"
const API_KEY_ = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
    method : 'GET',
    headers: {
        accept : 'application/json',
        Authorization: `Bearer ${API_KEY_}`
    },

}

const App = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500 ,[searchTerm]);

    const fetchMovies = async (query = "") => {

        try {
            const endpoint = query ? `${API_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`  : `${API_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            const data = await response.json();
            console.log(data);

            if(data.Response === "False") {
                setErrorMessage(data.Error);
                setLoading(false);
                return;
            }

            setMovies(data.results);

        }
        catch (error) {
            console.log(error);
            setErrorMessage(error);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchMovies(debounceSearchTerm);


    },[debounceSearchTerm])

    return (
        <main>
            <div  className="pattern" />

            <div className="wrapper">
                <header>
                    <img src="/hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy without the
                        Hassle</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <section className="all-movies mt-10">
                    <h2>All Movies</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        <ul>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        )
                        )}
                        </ul>
                    )}

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </section>

            </div>

        </main>
    )
}

export default App