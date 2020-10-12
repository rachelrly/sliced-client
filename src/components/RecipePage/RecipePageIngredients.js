import React from 'react'
import './RecipePageIngredient.css'

import Ingredient from './Ingredient'

/*This component takes in an array of ingredients and renders them as list items*/

function RecipePageIngredients(props) {

    return (
        <ul className='ingredients_wrapper'>
            {props.ingredients.map(ing => {

                return (
                    <li key={ing.id} className='ing_item'>
                        <Ingredient multiplyBy={props.multiplyBy} {...ing} />
                    </li>
                )
            })}
        </ul>
    )

}

export default RecipePageIngredients
