import React, { useEffect, Fragment, useContext } from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import jwt_decode from "jwt-decode";
import { UserContext } from './contexts/user-context'
import TokenService from './services/token-service'

import Router from './components/Router';
import './css/variables.css';
import './css/main.css';
import './css/form.css';




function App() {
  const { userId } = useContext(UserContext);

  //triggers rerender on login or logout
  useEffect(() => { }, [userId])

  return (
    <div className='App'>
      <main>
        <Header />
        <Router />
      </main>
      <Footer />
    </div>

  )
}


export default App;
