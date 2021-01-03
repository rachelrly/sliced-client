import React from 'react'

function Preview(props) {
  return (
    <ul className='ingredients_wrapper'>
      {props.ingredients.map((ing, index) =>
        <li key={index} className=' preview_item'>
          <p className='ing_amount'>{ing.amount}</p>
          <p className='imt_unit'>{ing.unit}</p>
          <p className='ing_title'>{ing.ingredient_name}</p>
        </li>
      )}

    </ul>

  )
}

export default Preview
