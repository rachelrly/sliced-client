import React, { useState, useEffect, Fragment } from 'react'
import { useScale } from '../../hooks/scale-service'

/*This component renders each ingredient in a recipe and controls the 
state that stores the current measurement amount and units, communicating with 
parseAmount*/

function Ingredient(props) {

    const { num, unit } = useScale(props.amount, props.unit, props.multiplyBy)
    return (
        <Fragment>
            <span className='ing_amount'>{props.amount ? num : null}</span>
            <span className='ing_unit'>{props.unit ? unit : null}</span>
            <span className='ing_title'>{props.ingredient_name}</span>
        </Fragment>

    )
}


export default Ingredient;

//convert to lower case
//neuturalize 

//have aliases for ingredients
//have sample recipes