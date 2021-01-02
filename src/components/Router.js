import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddRecipe from './AddRecipe/AddRecipe'
import LandingPage from './LandingPage/LandingPage'
import Login from './Login/Login'
import PublicRoute from './Routes/PublicRoute'
import PrivateRoute from './Routes/PrivateRoute'
import PageNotFound from './PageNotFound/PageNotFound'
import RecipeList from './RecipeList/RecipeList'
import RecipePage from './RecipePage/RecipePage'



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
