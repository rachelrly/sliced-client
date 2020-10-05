import React, { Component } from 'react'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import RecipePageIngredients from './RecipePageIngredients'
import './RecipePage.css'

class RecipePage extends Component {

    constructor() {
        super();
        this.state = {
            recipe_id: null,
            title: null,
            date_created: null,
            url: null,
            ingredients: []
        }
    }

    componentDidMount() {
        UserRecipesApiService.getFullRecipeById(1)
            .then(rec => {
                this.setState({
                    recipe_id: rec.id,
                    title: rec.title,
                    date_created: rec.created.toString().slice(0, 10),
                    url: rec.original_url,
                    ingredients: rec.ingredients
                })


            })




    }

    render() {
        console.log(this.state)
        return (
            <section className='recipe_full'>
                <h2>{this.state.title}</h2>
                <p className='date'>Added {this.state.date_created}</p>
                <h3>Ingredients</h3>
                <ul>
                    <RecipePageIngredients ingredients={this.state.ingredients} />
                </ul>






                <a target='_blank' href={this.state.url} rel="noopener noreferrer"><p className='url'>Original recipe</p></a>
            </section>
        )
    }
}

export default RecipePage
