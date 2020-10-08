import React, { Component } from 'react'
import './RecipePageIngredient.css'

/*This component takes in an array of ingredients and renders them as list items*/

//this component will need to call helper function that 
//multiplies everything by multiplyBy
class RecipePageIngredients extends Component {





    render() {
        const ingredientsMap = this.props.ingredients.map(ing => {
            let amount = ing.amount_str;

            //call conversion function here
            //redefine amount 
            //scaleFunction(ing, props.multiply)

            return (
                <li key={ing.id} className='ing_item'>
                    <span className='ing_amount'>{amount}</span>
                    <span className='ing_title'>{ing.title}</span>
                </li>
            )
        })
        //change this into a class
        //store amount for each ingredient here

        //check against number regex
        //parseInt = true
        return (
            <ul className='ingredients_wrapper'>
                {ingredientsMap}
            </ul>
        )
    }
}

export default RecipePageIngredients
