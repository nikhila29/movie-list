import React, {useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import { Header } from './components/Header';
import Search from './components/Search';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';



const App = () => {
  const [movies,setMovies] = useState([]);
  const [favourites,setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1fdca8af`;

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson)
    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-list-favourites')
    );
    if(movieFavourites) {
      setFavourites(movieFavourites);
    }
  },[]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-list-favourites',JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };


    
    


  return (
  <div className='container-fluid movie-app'>

    <div className='row d-flex align-items-center mt-4 mb-4' style={{width:"100%"}}>
      <Header heading='List of Movies'/>
      <Search searchValue={searchValue} 
      setSearchValue={setSearchValue}/>
    </div>

    <div className='row'>
      <MovieList 
      movies={movies} 
      handleFavouritesClick = {addFavouriteMovie}
      favouriteComponent={AddFavourites}/>
    </div>

    <div className='row d-flex align-items-center mt-4 mb-4'>
      <Header heading='Favourite Movies'/> 
    </div>

    <div className='row'>
      <MovieList 
      movies={favourites} 
      handleFavouritesClick = {removeFavouriteMovie}
      favouriteComponent={RemoveFavourites}/>
    </div>



  </div>
  )
};

export default App;
