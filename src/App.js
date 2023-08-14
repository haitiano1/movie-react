import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Carousels from './pages/Carousels/Carousels';
import ListMovies from './pages/ListMovies/ListMovies';
import Loading from './components/Loading/Loading';
import Pagination from './pages/Pagination/Pagination';
function App() {
  return (
    <>
    <Header/>
    {/* <Carousels/> */}
    <ListMovies/>
    <Pagination/>
    {/* <Loading/> */}
    </>
    
    
  );
}

export default App;
