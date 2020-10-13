import React from 'react';
import { Link } from 'react-router-dom'
import formatRecipeTitle from '../../services/capitalize-recipe-title-service'
function RecipeThumbnails(props) {


    return (
        <div className='recipe_thumb_wrapper'>
            {props.recipes.map(rec => {
                const formatTitle = rec.title ? formatRecipeTitle(rec.title) : rec.title
                return (
                    <Link key={rec.id} to={`/recipe/${rec.id}`}>
                        <div className='recipe_thumb'>
                            <h3 className='recipe_title'>{formatTitle}</h3>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default RecipeThumbnails
