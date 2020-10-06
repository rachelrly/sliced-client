import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserRecipesApiService from '../../services/user-recipes-api-service'
import RecipeThumbnails from './RecipeThumbnails'

import './RecipeList.css'


class RecipeList extends Component {

    render() {

        return (
            <section className='recipe_list'>
                <RecipeThumbnails recipes={this.props.recipes} />

                <Link to='/add-recipe'>
                    <button className='add_recipe'>Add Recipe</button>
                </Link>
            </section>
        )
    }
}

export default RecipeList
