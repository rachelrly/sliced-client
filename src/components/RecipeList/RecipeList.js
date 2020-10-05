import React, { Component } from 'react';
import UserRecipesApiService from '../../services/user-recipes-api-service'
import RecipeThumbnails from './RecipeThumbnails'

import './RecipeList.css'


class RecipeList extends Component {
    constructor(props) {
        super(props);
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


    }

    render() {

        return (
            <section>
                <RecipeThumbnails recipes={this.state.recipes} />
            </section>
        )
    }
}

export default RecipeList
