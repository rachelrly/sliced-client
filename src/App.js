import React, { Component } from 'react';
import Header from './components/Header/Header'
import UserRecipesApiService from './services/user-recipes-api-service'
import cuid from 'cuid'
import jwt_decode from "jwt-decode";
import UserContext from './user-context'
import TokenService from './services/token-service'
import Router from './Router'
import './App.css'


class App extends Component {

  state = {
    currentAuthToken: null,
    user_id: null,
    recipes: []
  }

  componentDidMount = () => {
    const token = TokenService.getAuthToken();
    const user_id = jwt_decode(token).user_id;

    UserRecipesApiService.getRecipes(user_id)
      .then(rec => {
        this.setState({
          currentAuthToken: token,
          user_id,
          recipes: rec
        })
      })
  }



  onLogin = (user_id) => {
    const currentAuthToken = TokenService.getAuthToken()
    return UserRecipesApiService.getRecipes(user_id)
      .then(rec => this.setState({
        currentAuthToken: currentAuthToken,
        user_id: user_id,
        recipes: rec
      }))

  }

  onLogout = () => {
    TokenService.clearAuthToken()

    this.setState({
      currentAuthToken: null,
      user_id: null,
      recipes: []
    })
  }


  getRecipes = (user_id) => {
    UserRecipesApiService.getRecipes(this.state.user_id)
      .then(rec => {
        this.setState({
          recipes: rec
        })
      })

      .catch(err => console.log(err.message))
  }


  addRecipe(recipe) {
    let withTempId = { ...recipe, id: cuid() }
    let newReicpe = [withTempId, ...this.state.recipes]
    this.setState({
      recipes: newReicpe
    })

    return UserRecipesApiService.createRecipe(recipe, this.state.user_id)
      .then(() => UserRecipesApiService.getRecipes(this.state.user_id))
      .then(res => {
        this.setState({
          recipes: res
        })

      })
      .catch(err => console.log(err.message));
  }

  deleteRecipe(id, user) {
    // let newRecipes = this.state.recipes.filter(rec => rec.id !== id)
    // this.setState({
    //   recipes: newRecipes
    // })

    return UserRecipesApiService.deleteRecipe(id, user)
      .then(() => UserRecipesApiService.getRecipes())
      .then(res => {
        this.setState({
          recipes: res
        })
      })

      .catch(err => console.log(err.message))

  }



  render() {
    const value = {
      currentAuthToken: this.state.currentAuthToken,
      user_id: this.state.user_id,
      recipes: this.state.recipes,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
      addRecipe: this.addRecipe,
      deleteRecipe: this.deleteRecipe,
      getRecipes: this.getRecipes
    }



    console.log(value)

    return (
      <UserContext.Provider value={value}>
        <Header />
        <Router />
      </UserContext.Provider>
    )
  }
}

export default App;
