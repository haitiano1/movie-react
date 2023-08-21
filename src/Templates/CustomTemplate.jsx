import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header/Header'
import Carousels from '../pages/Carousels/Carousels'
import ListMovies from '../pages/ListMovies/ListMovies'
import LogoCinema from '../pages/MoviesShowTime/Cinema/LogoCinema'
import Footer from '../components/Footer/Footer'

export default function CustomTemplate(props) {
    return (
        <Route exact path={props.path} render={(propsRoute) => {
                return <>
                    <Header {...propsRoute}/>
                    <Carousels {...propsRoute} />
                    <ListMovies {...propsRoute} />
                    <LogoCinema {...propsRoute} />
                    <Footer {...propsRoute} />
                </>
            }}
        />
    )
}
