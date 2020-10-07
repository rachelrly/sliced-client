import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeThumbnails from './RecipeThumbnails'
import './RecipeList.css'


class RecipeList extends Component {

    render() {
        return (
            <section className='recipe_list'>


                <Link to='/add-recipe'>
                    <button className='add_recipe'>Add Recipe</button>
                </Link>

                <RecipeThumbnails recipes={this.props.recipes} />
            </section>
        )
    }
}

export default RecipeList
