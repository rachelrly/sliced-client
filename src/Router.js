import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddRecipe from './components/AddRecipe/AddRecipe'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/Login/Login'
import PublicRoute from './components/Routes/PublicRoute'
import PrivateRoute from './components/Routes/PrivateRoute'
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
        <PrivateRoute
            exact
            path='/recipe'
            component={RecipeList}
        />
        <PrivateRoute
            path='/add-recipe'
            component={AddRecipe}
        />
        <PrivateRoute
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
