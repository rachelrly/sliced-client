import React, { useEffect, Fragment } from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import UserRecipesApiService from './services/user-recipes-api-service'
import jwt_decode from "jwt-decode";
import UserContext from './contexts/user-context'
import TokenService from './services/token-service'
import Router from './components/Router';
import './css/variables.css';
import './css/main.css';
import './css/form.css';

require('dotenv').config();



function App() {

  useEffect(() => {

  }, [])

  // const handleIsLoggedIn = async () => {
  //   if (TokenService.hasAuthToken()) {
  //     const token = await TokenService.getAuthToken();
  //     const user_id = jwt_decode(token).user_id;

  //     const UserRecipesApiService.getRecipes(user_id)
  //       .then(rec => {
  //         this.setState({
  //           currentAuthToken: token,
  //           user_id,
  //           recipes: rec
  //         })
  //       })
  //   }
  // }


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
