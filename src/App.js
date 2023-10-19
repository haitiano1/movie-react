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
import AdminTemplate from './Templates/AdminTemplate';
import DetailMovies from './pages/ListMovies/DetailMovies';
import Page404 from './components/Page404/Page404';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Checkout from './pages/Checkout/Checkout';
import MenuCheckout from './pages/Checkout/MenuCheckout';
import Profile from './pages/Profile/Profile';
import Admin from './components/Sider/SiderAdmin';
import MovieAdmin from './pages/Admin/MovieAdmin';
import UserAdmin from './pages/Admin/UserAdmin';
import AddMovie from './pages/Admin/AddMovie';
import EditMovie from './pages/Admin/EditMovie';
import AddUser from './pages/Admin/AddUser';
import EditUser from './pages/Admin/EditUser';
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <AdminTemplate path="/admin/movie/edit/:id" component={EditMovie} />
        <AdminTemplate path="/admin/user/edit/:id" component={EditUser} />
        <AdminTemplate path="/admin/movie" component={MovieAdmin} />
        <AdminTemplate path="/admin/add-new" component={AddMovie} />
        <AdminTemplate path="/admin/user/add-new" component={AddUser} />
        <AdminTemplate path="/admin/user" component={UserAdmin} />

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
