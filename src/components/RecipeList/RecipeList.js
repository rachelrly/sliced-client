import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeThumbnails from './RecipeThumbnails'
import UserContext from '../../user-context'
import './RecipeList.css'


class RecipeList extends Component {

    static contextType = UserContext;




    render() {

        console.log(this.context)
        const recipeList = !this.context.recipes
            ? <h2>There are no recipes</h2>
            : <RecipeThumbnails user={this.context.user_id} recipes={this.context.recipes} />
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
