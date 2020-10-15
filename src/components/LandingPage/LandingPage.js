import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import TokenService from '../../services/token-service';



function LandingPage() {

    return (

        <>
            <article className='img_wrapper'>
                <h2 className='landing_title'>Welcome to Sliced!</h2>
                <h4>Scale down your recipes</h4>
                <>
                    {TokenService.hasAuthToken()
                        ? <div className='button_wrapper'><Link to='/recipe' tabIndex='-1'><button>View Recipes</button></Link></div>
                        : <div className='button_wrapper'><a href='#login' tabIndex='-1'><button>Get Started</button></a></div>

                    }
                </>
            </article>

            <section className='landing_page_wrapper'>
                <article id='login'>
                    {!TokenService.hasAuthToken()

                        ? <>
                            <h3>Log in to Sliced</h3>
                            <div className='p_wrapper'>
                                <p>Please log in with these credentials:</p>
                                <p>Email: <code>test@gmail.com</code></p>
                                <p>Password: <code>test-password</code></p></div></>

                        : null}
                </article>



                <article>
                    <h3>What is Sliced?</h3>
                    <div className='p_wrapper'>
                        <p>Sliced is an app that allows you to input your recipes and scale the ingredients down by x3/4, x1/2 or x1/4, or up by x1 1/4, x1 1/2, x1 3/4, and x2 </p>
                    </div>
                </article>
                <article>

                    <h3>How to Slice your recipes</h3>
                    <div className='p_wrapper'>
                        <p>Sliced works by parsing each line of a recipe's ingredient list to find the unit and amount and title.
                </p>

                        <p>For best results, please follow these guidelines when adding a new recipe.</p>

                        <p>
                            List each ingredient is on its own line
                </p>
                        <div className='example good'>
                            <code>
                                1 cup
                        <br />2 tsp salt
                        <br />1 tsp dried ginger
</code></div>
                        <p>Not many ingredients on one line</p>
                        <div className='example bad'>

                            <code><br />1 cup 2 tsp salt 1 tsp dried ginger</code>
                        </div>


                        <p>Enter ingredient fraction with numbers and slashes
                </p>
                        <div className='example good'>
                            <code>
                                1/2 cup chicken broth
                        <br />1/4 tsp salt
                        <br />1/2 tsp dried ginger
</code></div>
                        <p>Not formatted fractions</p>
                        <div className='example bad'>
                            <code>
                                ½ cup chicken broth
                        <br />¼ tsp salt
                        <br /> ½, tsp dried ginger
                        </code>
                        </div>


                        <p>Keep a space between the ingredient amount and the measurement unit
                </p>
                        <div className='example good'>
                            <code>
                                16 oz. chicken broth
                        <br />1/4 tsp salt
                        <br />1/2 tsp dried ginger
</code></div>
                        <p>Don't keep them as one word</p>
                        <div className='example bad'>
                            <code>
                                1/2cup chicken broth
                        <br />1tsp salt
                        <br /> 1/4tsp dried ginger
                        </code>
                        </div>


                    </div>
                </article>


                {/* <article>

                    <h3>About the Creator</h3>
                    <div className='p_wrapper'>
                        <p></p>
                    </div>

                </article>
 */}

            </section ></>
    )
}

export default LandingPage
