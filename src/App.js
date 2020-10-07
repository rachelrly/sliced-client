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

import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    UserRecipesApiService.getRecipes()
      .then(res => {
        this.setState({
          recipes: res
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

    return UserRecipesApiService.createRecipe(recipe)
      .then(() => UserRecipesApiService.getRecipes())
      .then(res => {
        this.setState({
          recipes: res
        })

      })
      .catch(err => console.log(err.message));
  }

  deleteRecipe(id) {
    let newRecipes = this.state.recipes.filter(rec => rec.id !== id)
    this.setState({
      recipes: newRecipes
    })

    return UserRecipesApiService.deleteRecipe(id)
      .then(() => UserRecipesApiService.getRecipes())
      .then(res => {
        this.setState({
          recipes: res
        })
      })

      .catch(err => console.log(err.message))

  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              component={LandingPage}
            />
            <Route
              path='/login'
              component={Login}
            />
            <Route
              exact
              path='/recipe'
              render={props => <RecipeList recipes={this.state.recipes} />}
            />
            <Route
              path='/add-recipe'
              render={props =>
                <AddRecipe {...props}
                  addRecipe={rec => this.addRecipe(rec)} />}
            />
            <Route
              path='/recipe/:id'
              render={props =>
                <RecipePage {...props}
                  deleteRecipe={(id) => this.deleteRecipe(id)} />}
            />
            <Route
              path='/404'
              component={PageNotFound}
            />
            <Redirect to='/404' />
          </Switch>

        </main>
      </div>
    )
  }
}

export default App;
