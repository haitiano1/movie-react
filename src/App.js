import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Carousels from './pages/Carousels/Carousels';
import ListMovies from './pages/ListMovies/ListMovies';
import Loading from './components/Loading/Loading';
import MoviesShowTime from './pages/MoviesShowTime/MoviesShowTime';
import LogoCinema from './pages/MoviesShowTime/Cinema/LogoCinema';
import Footer from './components/Footer/Footer';
import { Router, Switch, BrowserRouter } from 'react-router-dom';
import CustomTemplate from './Templates/CustomTemplate';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <CustomTemplate path="/home"/>
        <CustomTemplate path="/"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
