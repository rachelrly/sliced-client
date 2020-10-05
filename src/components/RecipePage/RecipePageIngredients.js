import React from 'react'

function RecipePageIngredients(props) {
    console.log(props.ingredients)
    return (
        <>
            {props.ingredients.map(ing => {
                console.log(ing)

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
