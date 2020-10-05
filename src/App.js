import React, { Component } from 'react';
import Header from './components/Header/Header'
import { Route, Switch } from 'react-router-dom'

import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/Login/Login'
import AddRecipe from './components/AddRecipe/AddRecipe'
import RecipeList from './components/RecipeList/RecipeList'
import RecipePage from './components/RecipePage/RecipePage'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
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
              path='/recipes'
              component={RecipeList}
            />
            <Route
              path='/add-recipe'
              component={AddRecipe}
            />
            <Route
              path='/recipe'
              component={RecipePage}
            />





          </Switch>

        </main>
      </div>
    )
  }
}

export default App;
