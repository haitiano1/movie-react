import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";
import Header from './components/Header/Header';
import Carousels from './pages/Carousels/Carousels';
import ListMovies from './pages/ListMovies/ListMovies';
import Loading from './components/Loading/Loading';
import LogoCinema from './pages/MoviesShowTime/Cinema/LogoCinema';
import Footer from './components/Footer/Footer';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import CustomTemplate from './Templates/CustomTemplate';
import HomeTemplate from './Templates/HomeTemplate';
import DetailMovies from './pages/ListMovies/DetailMovies';
import Page404 from './components/Page404/Page404';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Checkout from './pages/Checkout/Checkout';
import MenuCheckout from './pages/Checkout/MenuCheckout';
import Profile from './pages/Profile/Profile';
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
    <Loading/>
      <Switch>
        <HomeTemplate path="/detail/:id" component={DetailMovies} />
        <HomeTemplate path="/profile" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/checkout/:id" component={MenuCheckout} />
    

        <CustomTemplate path="/home" />
        <CustomTemplate path="/" />

        {/* <Route path="*" component={<Page404/>} /> */}
      </Switch>
    </Router>
  );
}

export default App;
