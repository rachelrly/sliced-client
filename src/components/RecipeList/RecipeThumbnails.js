import React from 'react';
import { Link } from 'react-router-dom'
import { useFormatRecipeTitle } from '../../hooks/capitalize-recipe-title-service'



function RecipeThumbnails(props) {
    return (
        <Link to={`/recipe/${props.id}`}>
            <div className='recipe_thumb'>
                <h3 className='recipe_title'>{useFormatRecipeTitle(props.title)}</h3>
            </div>
        </Link>
    )
}

export default RecipeThumbnails
