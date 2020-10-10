import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddRecipe from './components/AddRecipe/AddRecipe'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/Login/Login'
import PublicRoute from './components/Routes/PublicRoute'
import PageNotFound from './components/PageNotFound/PageNotFound'
import RecipeList from './components/RecipeList/RecipeList'
import RecipePage from './components/RecipePage/RecipePage'



const Router = () => (

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
            component={AddRecipe}
        />
        <Route
            path='/recipe/:id'
            component={RecipePage}
        />

        <Route
            path='/404'
            component={PageNotFound}
        />
    </Switch>
)


export default Router;
