import React from 'react'


/*This component takes in an array of ingredients and renders them as list items*/

function RecipePageIngredients(props) {
    console.log(props.ingredients)
    return (
        <>
            {props.ingredients.map(ing => {
                return (
                    <li key={ing.id} className='ing_item'>
                        <span className='amount'>{ing.amount_str}</span> <span>{ing.title}</span>
                    </li>
                )
            })}
        </>
    )
}

export default RecipePageIngredients
