import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import TokenService from '../../services/token-service';
function LandingPage() {

    return (
        <section className='landing_page_wrapper'>
            <h2 className='landing_title'>Welcome to Sliced!</h2>
            <h4>An app that allows you to scale down your recipes</h4>

            {   !TokenService.hasAuthToken()

                ? <div>
                    <h3>Log in to Sliced</h3>
                    <p>To use Sliced, please log in with the following credentials:</p>
                    <p>Email: ' test@gmail.com '</p>
                    <p>Password: ' test-password '</p></div>

                : <Link to='/recipe'><button>View Recipes</button></Link>}

            <div>
                <h3>What is Sliced?</h3>
                <p>Sliced is an app that allows you to copy and paste your recipe ingredients and scale them down by 3/4, 1/2 or 1/4.</p>
            </div>

            <div className='instructions_wrapper'>
                <h3>How to use Sliced</h3>
                <p>To make a new recipe, click the '+' icon at the top of the list of recipes.
                This will take you to a form where you can add the title and the url where you got the recipe. You can copy and paste the list of ingredients in the third box.
                </p>

                <p>
                    For the best results, please make sure each ingredient is on its own line. Please keep a space between a the amount and unit.
                </p>
                <p>For example, ' 1/2 cup ' would work with slice, but ' 1/2cup ' would not.</p>



                <p>Sliced does not pick up measurements inside an ingredients title :</p>
                <p>Please use unformatted fractions.
                </p>
                <p>For example, input ' 1/4 ', not ' ¼ '</p>

            </div>



            <div>
                <h3>About the Creator</h3>
                <p></p>
            </div>
        </section>
    )
}

export default LandingPage
