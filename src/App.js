import React, { Component } from 'react';
import Header from './components/Header/Header'
import UserRecipesApiService from './services/user-recipes-api-service'
import jwt_decode from "jwt-decode";
import UserContext from './user-context'
import TokenService from './services/token-service'
import Loading from './components/Loading/Loading'
import Router from './Router'
import './App.css'


class App extends Component {

  state = {
    currentAuthToken: null,
    user_id: null,
    recipes: [],
    loading: false
  }

  componentDidMount = () => {
    if (TokenService.hasAuthToken()) {
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
  }



  onLogin = (user_id) => {
    const currentAuthToken = TokenService.getAuthToken()
    return UserRecipesApiService.getRecipes(user_id)
      .then(rec => this.setState({
        currentAuthToken: currentAuthToken,
        user_id: user_id,
        recipes: rec,
        loading: false
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

  getRecipesAfterDelete = (user_id, recipe_id) => {
    UserRecipesApiService.getRecipes(user_id)
      .then(rec => rec.filter(r => r.id !== recipe_id))
      .then(filtered => {
        this.setState({
          recipes: filtered
        })
      })
      .catch(err => console.log(err.message))
  }


  addRecipe = (recipe) => {

    let newReicpe = [recipe, ...this.state.recipes]
    this.setState({
      recipes: newReicpe
    })

  }
  //check to see if this function does anythign
  deleteRecipe(recipes, recipe_id) {
    const filtered = recipes.filter(rec => rec.id !== recipe_id)

    this.setState({
      recipes: filtered
    })

  }

  toggleLoading = () => {
    let toggle = this.state.loading;
    toggle = !toggle;
    this.setState({
      loading: toggle
    })
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
      getRecipes: this.getRecipes,
      getRecipesAfterDelete: this.getRecipesAfterDelete,
      loading: this.toggleLoading,
    }

    return (
      <UserContext.Provider value={value}>
        <Router />
      </UserContext.Provider>
    )
  }
}

export default App;
