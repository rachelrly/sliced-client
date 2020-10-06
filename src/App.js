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



  addRecipe(recipe) {
    let newReicpe = [...this.state.recipes, recipe]
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
              render={props => <AddRecipe addRecipe={(rec) => this.addRecipe(rec)} />}
            />
            <Route
              path='/recipe/:id'
              render={props =>
                <RecipePage {...props}
                  deleteRecipe={(id) => this.deleteRecipe(id)} />}
            />





          </Switch>

        </main>
      </div>
    )
  }
}

export default App;
