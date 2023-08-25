import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export default function HomeTemplate(props) {
  return (
    <Route exact path={props.path} render={(propsRoute) => {
      return <>
          <Header {...propsRoute}/>
          <props.component {...propsRoute}/>
          <Footer {...propsRoute} />
      </>
  }}
/>
  )
}
