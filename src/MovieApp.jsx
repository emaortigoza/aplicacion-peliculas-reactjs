import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [moviesList, setMoviesList] = useState(null)

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '69d05fd008cc8a0c45be2eb0fdf49064'

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
        console.log(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?api_key=${API_KEY}&query=${search}&api_key=${API_KEY}&language=es-ES`)
            const data = await response.json()
            setMoviesList(data.results)
        }
        catch (error) {
            console.error('Ha ocurrido el siguiente error: ', error)
        }
    }

    return (
        <>
        <div className="container_top">
            <video autoPlay loop muted playsInline className='background-clip' >
                <source src='./assets/video.mp4' type="video/mp4" />
            </video>
            <div className='content'>
                <h1 className="title">CINEMATE</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Buscar Pelicula"
                        value={search}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className='search-button'>Buscar</button>
                </form>
            </div>
        </div>
        {
            moviesList &&
            <div className="movieList">
                {moviesList.map(movie => (
                    <div key={movie.id} className='movieCard'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        }
        </>
        
    )
}
