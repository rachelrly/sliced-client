import React from 'react';
import { Link } from 'react-router-dom'
function RecipeThumbnails(props) {

    return (
        <>
            {props.recipes.map(rec => {
                return (
                    <Link key={rec.id} to={`/recipe/${rec.id}`}>
                        <div className='recipe_thumb'>
                            <h3>{rec.title}</h3>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}

export default RecipeThumbnails
