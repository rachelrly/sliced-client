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




                <article>
                    <h3>What is Sliced?</h3>
                    <div className='p_wrapper'>
                        <p>Sliced is an app that allows you to input your recipes and scale the ingredients down by 3/4, 1/2 or 1/4, or up by 1-1/4, 1-1/2, 1-3/4 and 2</p>
                    </div>
                </article>
                <article>

                    <h3>How to Slice your recipes</h3>
                    <div className='p_wrapper'>
                        <p>Sliced works by parsing each line of a recipe's ingredient list to find the unit and amount and title.
                </p>

                        <p>For best results, please follow these guidelines when adding a new recipe:</p>

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

                            <code>1 cup 2 tsp salt 1 tsp dried ginger</code>
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
                        <br />½ tsp dried ginger
                        </code>
                        </div>


                        <p>Keep a space or hyphen between the ingredient amount and the measurement unit
                </p>
                        <div className='example good'>
                            <code>
                                16-oz. chicken broth
                        <br />1/4 tsp salt
                        <br />1-1/2 tsp dried ginger
</code></div>
                        <p>Don't keep them as one word</p>
                        <div className='example bad'>
                            <code>
                                1/2cup chicken broth
                        <br />1tsp salt
                        <br />1and1/4tsp dried ginger
                        </code>
                        </div>


                    </div>
                </article>
                <article id='login'>
                    {!TokenService.hasAuthToken()

                        ? <>
                            <h3>Log in to Sliced</h3>
                            <div className='p_wrapper'>
                                <p>Log in with these credentials:</p>
                                <p>Email: <code>test@gmail.com</code></p>
                                <p>Password: <code>test-password</code></p></div>
                            <Link to='/login' tabIndex='-1'><button className='landing_main'>Log in</button></Link>
                        </>

                        : null}
                </article>

                <article>

                    <h3>Sample Recipe</h3>
                    <div className='p_wrapper'>

                        <p>Add your own recipes or copy and paste the title, url, and ingredients below: </p>
                        <div className='example sample_rec'>
                            <code>Crispy chocolate chip cookies</code> <br /><br />
                            <code>sallysbakingaddiction.com/crispy-chocolate-chip-cookies/</code><br /><br />
                            <code>
                                1 1/2 cups all-purpose flour (spoon and leveled)
<br />1/2 teaspoon baking soda
<br />1/2 teaspoon salt
<br />10 Tablespoons unsalted butter, melted + slightly cooled
<br />1/2 cup granulated sugar
<br />1/4 cup packed light or dark brown sugar
<br />2 Tablespoons honey or light corn syrup
<br />1 large egg yolk
<br />2 Tablespoons milk
<br />2 teaspoons pure vanilla extract
<br />1 1/4 cups semi-sweet chocolate chips
                            </code>
                        </div>
                        {!TokenService.hasAuthToken()

                            ? null

                            : <Link to={'/add-recipe'}><button className='landing_main add_rec'>Add recipe</button></Link>
                        }
                    </div>

                </article>


            </section ></>
    )
}

export default LandingPage
