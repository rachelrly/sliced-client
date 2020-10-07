import React from 'react'
import './RecipePageIngredient.css'

/*This component takes in an array of ingredients and renders them as list items*/

function RecipePageIngredients(props) {
    return (
        <>
            {props.ingredients.map(ing => {
                return (
                    <li key={ing.id} className='ing_item'>
                        <span className='ing_amount'>{ing.amount_str}</span> <span className='ing_title'>{ing.title}</span>
                    </li>
                )
            })}
        </>
    )
}

export default RecipePageIngredients
