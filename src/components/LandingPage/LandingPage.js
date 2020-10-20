import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import TokenService from '../../services/token-service';
import recipeList from '../../screenshots/recipe-list.png';
import newRecipe from '../../screenshots/new-recipe.png';
import scaleDown from '../../screenshots/recipe-scale-down.png';
import scaleUp from '../../screenshots/recipe-scale-up.png';



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

                    <p>Sliced is an app that allows you to input your recipes and 'half', 'quarter', or 'double' the amount of ingredients.</p>
                    <div className='screenshot_wrapper'>
                        <img className='screenshot' src={scaleDown} alt="screenshot of the Sliced scaling down feature " />
                        <img className='screenshot' src={scaleUp} alt="screenshot of the Sliced scaling up feature " />
                    </div>
                </article>
                <article>

                    <h3>How to Slice your recipes</h3>

                    <p>Sliced works by parsing each line of a recipe's ingredient list to find the unit, amount and title.
                </p>

                    <p>When adding a new recipe, scroll down to preview how the recipe's ingredients will be parsed by Sliced.</p>

                    <p>Please follow these guidelines to help Sliced accurately find ingredients and amounts:</p>

                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> put each ingredient is on its own line.
                </p>
                    <div className='example good'>
                        <code>
                            1 cup chicken broth
                        <br />2 tsp salt
                        <br />1 tsp dried ginger
</code></div>
                    <p><span className='dont'>Don't</span> put many ingredients on one line.</p>
                    <div className='example bad'>

                        <code>1 cup chicken broth 2 tsp salt 1 tsp dried ginger</code>
                    </div>

                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> include at least one scalable value in a recipe.
                </p>
                    <div className='example good'>
                        <code>
                            2 c chicken broth
                        <br />salt
                        <br />dried ginger
</code></div>
                    <p><span className='dont'>Don't</span> submit recipes with no scalable values.</p>
                    <div className='example bad'>
                        <code>
                            chicken broth
                        <br />salt
                        <br />dried ginger
                        </code>
                    </div>


                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> enter fractions with numbers and slashes.
                </p>
                    <div className='example good'>
                        <code>
                            1/2 cup chicken broth
                        <br />1/4 tsp salt
                        <br />1/2 tsp dried ginger
</code></div>
                    <p><span className='dont'>Don't</span> use pre-formatted fractions. Scaled does not register these fractions as scalable numbers at this time. </p>
                    <div className='example bad'>
                        <code>
                            ½ cup chicken broth
                        <br />¼ tsp salt
                        <br />½ tsp dried ginger
                        </code>
                    </div>

                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> start each line with a numeric value. If a line does not start with a number, the whole line is considered the ingredient's name.
                </p>
                    <div className='example good'>
                        <code>
                            2 cup chicken broth
                        <br />1 tsp salt
                        <br />1/2 onion
</code></div>
                    <p><span className='dont'>Don't</span> start a line with a word. Numbers in the middle of lines will not be scaled.</p>
                    <div className='example bad'>
                        <code>
                            chicken broth - 2 cup
                        <br />one tsp salt
                        <br />half an onion
                        </code>
                    </div>

                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> keep a space or hyphen between the ingredient amount and the measurement unit.
                </p>
                    <div className='example good'>
                        <code>
                            16-oz. chicken broth
                        <br />1/4 tsp salt
                        <br />1-1/2 tsp dried ginger
</code></div>
                    <p><span className='dont'>Don't</span> keep them as one word. When parsing input, Sliced does not split any words at this time.</p>
                    <div className='example bad'>
                        <code>
                            1/2cup chicken broth
                        <br />1tsp salt
                        <br />1and1/4tsp dried ginger
                        </code>
                    </div>





                </article>
                <article id='login'>
                    {!TokenService.hasAuthToken()

                        ? <>
                            <h3>Log in to Sliced</h3>

                            <p>Log in with these credentials:</p>
                            <p>Email: <code>test@gmail.com</code></p>
                            <p>Password: <code>test-password</code></p>
                            <Link to='/login' tabIndex='-1'><button className='landing_main'>Log in</button></Link>
                        </>

                        : null}
                </article>

                <article>

                    <h3>Add a Recipe</h3>


                    <p>Click on the '+' at the top of your recipe list to add your own recipe or copy and paste the one below. Scroll down to preview how Sliced will split the input. </p>
                    <div className='screenshot_wrapper'>
                        <img className='screenshot' src={recipeList} alt="screenshot of the Sliced scaling down feature " />
                        <img className='screenshot' src={newRecipe} alt="screenshot of the Sliced scaling up feature " />
                    </div>
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

                </article>


            </section ></>
    )
}

export default LandingPage;
