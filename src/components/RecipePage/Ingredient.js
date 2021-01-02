import React, { useState, useEffect, Fragment } from 'react'
import { parseAmount } from '../../services/parse-amount-service'
import { scale } from '../../services/scale-service'

/*This component renders each ingredient in a recipe and controls the 
state that stores the current measurement amount and units, communicating with 
parseAmount*/

function Ingredient(props) {
    const [number, setNumber] = useState(null);
    const [units, setUnits] = useState(null)

    useEffect(() => {
        // const { num, unit } = parseAmount(this.props.amount)

        setNumber(props.amount);
        //setUnits(unit);
    }, [])

    const num = scale(number, units, props.multiplyBy)
    const amount = props.amount
        ? <span className='ing_amount'>{number}</span>
        : null

    return (
        <Fragment>
            {amount}
            <span className='ing_title'>{props.ingredient_name}</span>
        </Fragment>

    )
}


export default Ingredient;

//convert to lower case
//neuturalize 

//have aliases for ingredients
//have sample recipes