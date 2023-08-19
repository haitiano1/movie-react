import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Carousels from './pages/Carousels/Carousels';
import ListMovies from './pages/ListMovies/ListMovies';
import Loading from './components/Loading/Loading';
import MoviesShowTime from './pages/MoviesShowTime/MoviesShowTime';
import LogoCinema from './pages/MoviesShowTime/Cinema/LogoCinema';
// import Pagination from './pages/Pagination/Pagination';


function App() {
  return (
    <>
      <Header />
      {/* <Carousels/> */}
      <ListMovies />
      {/* <Pagination/> */}
      {/* <MoviesShowTime/> */}
      {/* <Loading/> */}
      <LogoCinema/>
    </>


  );
}

export default App;
