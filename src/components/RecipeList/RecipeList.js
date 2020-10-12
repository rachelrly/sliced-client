import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeThumbnails from './RecipeThumbnails'
import UserContext from '../../user-context'
import './RecipeList.css'
import { VscAdd } from 'react-icons/vsc'


class RecipeList extends Component {

    static contextType = UserContext;

    render() {

        const recipeList = !this.context.recipes.length
            ? <h2>There are no recipes</h2>
            : <RecipeThumbnails user={this.context.user_id} recipes={this.context.recipes} />
        return (
            <section className='recipe_list'>


                <Link to='/add-recipe'>
                    <button className='add_recipe' aria-label="Add New Recipe">
                        <VscAdd className='plus' />
                    </button>
                </Link>

                {recipeList}
            </section>
        )
    }
}

export default RecipeList
