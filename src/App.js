import React, { Component } from 'react';
import Header from './components/Header/Header'
import { Redirect, Route, Switch } from 'react-router-dom'
import UserRecipesApiService from './services/user-recipes-api-service'
import cuid from 'cuid'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/Login/Login'
import PageNotFound from './components/PageNotFound/PageNotFound'
import AddRecipe from './components/AddRecipe/AddRecipe'
import RecipeList from './components/RecipeList/RecipeList'
import RecipePage from './components/RecipePage/RecipePage'
import PrivateRoute from './components/Routes/PrivateRoute'
import PublicRoute from './components/Routes/PublicRoute'
import UserContext from './user-context'
import TokenService from './services/token-service'

import './App.css'
import AuthApiService from './services/auth-api-service';

class App extends Component {

  state = {
    currentAuthToken: null,
    user_id: null,
    recipes: []
  }

  componentDidMount = () => {
    this.getRecipes(this.state.user_id)
  }


  onLogin = (user_id) => {

    let currentAuthToken = TokenService.getAuthToken()
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


  getRecipes(user) {
    UserRecipesApiService.getRecipes(user)
      .then(rec => this.setState({ recipes: rec }))
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
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route
                exact
                path="/"
                component={LandingPage}
              />
              <PublicRoute
                path='/login'
                component={Login}
              />
              <Route
                exact
                path='/recipe'
                component={RecipeList}
              />
              <Route
                path='/add-recipe'
                render={props =>
                  <AddRecipe {...props}
                    addRecipe={rec => this.addRecipe(rec)} />}
              />
              <Route
                path='/recipe/:id'
                component={RecipePage}
              />

              <Route
                path='/404'
                component={PageNotFound}
              />
              <Redirect to={'/404'} />
            </Switch>

          </main>
        </div>
      </UserContext.Provider>
    )
  }
}

export default App;
