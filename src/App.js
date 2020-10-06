import React, { Component } from 'react';
import Header from './components/Header/Header'
import { Route, Switch } from 'react-router-dom'

import UserRecipesApiService from './services/user-recipes-api-service'

import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/Login/Login'
import AddRecipe from './components/AddRecipe/AddRecipe'
import RecipeList from './components/RecipeList/RecipeList'
import RecipePage from './components/RecipePage/RecipePage'

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
              component={AddRecipe}
            />
            <Route
              path='/recipe/:id'
              component={RecipePage}
            />





          </Switch>

        </main>
      </div>
    )
  }
}

export default App;
