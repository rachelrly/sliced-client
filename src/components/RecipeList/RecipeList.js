import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeThumbnails from './RecipeThumbnails'
import './RecipeList.css'


class RecipeList extends Component {

    componentDidMount() {
        this.props.fetchRecipes()
    }

    render() {
        const recipeList = !this.props.recipes.length
            ? <h2>There are no recipes</h2>
            : <RecipeThumbnails recipes={this.props.recipes} />
        return (
            <section className='recipe_list'>


                <Link to='/add-recipe'>
                    <button className='add_recipe'>Add Recipe</button>
                </Link>

                {recipeList}
            </section>
        )
    }
}

export default RecipeList
