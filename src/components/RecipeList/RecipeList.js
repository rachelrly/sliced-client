import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeThumbnails from './RecipeThumbnails'
import { UserContext } from '../../contexts/user-context'
import { gql, useQuery } from '@apollo/client';
import '../../css/RecipeList.css'
import { VscAdd } from 'react-icons/vsc'
import { Fragment } from 'react';
import Loading from '../Loading/Loading';


function RecipeList() {
    const { update } = useContext(UserContext);
    const recQuery = gql`{
            recipes{
                id,
                recipe_title
            }
    }`

    const { loading, data, refetch } = useQuery(recQuery)
    useEffect(() => { refetch() }, [update])

    return (
        <Fragment>{
            loading
                ? <Loading />
                : <section className='recipe_list'>
                    <Link to='/add-recipe' tabIndex='-1'>
                        <button className='add_recipe' aria-label="Add New Recipe">
                            <VscAdd className='plus' />
                        </button>
                    </Link>
                    {data && data.recipes
                        ? <div className='recipe-list-wrapper'>
                            {data.recipes.map(r => <RecipeThumbnails id={r.id} key={r.id} title={r.recipe_title} />)}
                        </div>
                        : <h2 className='no-recipes'>There are no recipes</h2>}
                </section>
        }</Fragment>

    )
}


export default RecipeList;
