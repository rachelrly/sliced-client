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

import './App.css'

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentAuthToken: null,
      user_id: 1,
      recipes: []
    }
  }

  onLogin = () => {
    console.log('logged in')
  }

  onLogout = () => {
    console.log('logged out')
  }

  componentDidMount() {
    this.getRecipes(this.state.user_id)
  }

  getRecipes(user) {
    if (user) {
      UserRecipesApiService.getRecipes(user)
        .then(res => {
          return this.setState({
            recipes: res
          })

        })
        .catch(err => console.log(err.message))
    }
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
      getRecipes: this.getRecipes,
    }
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
