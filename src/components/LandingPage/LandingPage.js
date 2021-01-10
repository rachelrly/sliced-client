import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../css/LandingPage.css';
import TokenService from '../../services/token-service';
import scaleDown from '../../screenshots/recipe-scale-down.png';
import scaleUp from '../../screenshots/recipe-scale-up.png';



function LandingPage() {

    return (
        <Fragment>
            <article className='img_wrapper'>
                <h2 className='landing_title'>Welcome to Sliced!</h2>
                <span>Scale your recipes</span>
                <Fragment>
                    {TokenService.hasAuthToken()
                        ? <div className='button_wrapper'>
                            <Link to='/recipe' tabIndex='-1'>
                                <button>Get Started</button>
                            </Link>
                        </div>
                        : <div className='button_wrapper'>
                            <a href='#login' tabIndex='-1'>
                                <button>Get Started</button>
                            </a>
                        </div>
                    }
                </Fragment>
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

                <article id='login'>
                    {!TokenService.hasAuthToken()

                        ? <>
                            <h3>Log in to Sliced</h3>

                            <p>Log in with these credentials:</p>
                            <p>Email: <code>test@gmail.com</code></p>
                            <p>Password: <code>test-password</code></p>
                            <Link to='/login' tabIndex='-1' className='article-login-button-wrapper'><button>Log in</button></Link>
                        </>

                        : null}
                </article>
                <article className='how-to-wrapper'>

                    <h3>How to Slice your recipes</h3>

                    <p>Sliced works by parsing each line of a recipe's ingredient list to find the unit, amount and title.
                </p>

                    <p>When adding a new recipe, scroll down to preview how the recipe's ingredients will be parsed by Sliced.</p>

                    <p>Please follow these guidelines to help Sliced accurately find ingredients and amounts:</p>

                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> enter fractions with numbers and slashes.
                </p>
                    <div className='example good'>
                        <code>
                            1/2 cup chicken broth
                        <br />1/4 tsp salt
                        <br />1/2 tsp dried ginger
</code></div>
                    <p><span className='dont'>Don't</span> use pre-formatted fractions. Scaled does not register these characters as numbers at this time. </p>
                    <div className='example bad'>
                        <code>
                            ½ cup chicken broth
                        <br />¼ tsp salt
                        <br />½ tsp dried ginger
                        </code>
                    </div>

                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> use numeric values to represent ingredient amounts.
                </p>
                    <div className='example good'>
                        <code>
                            2 cup chicken broth
                        <br />1 tsp salt
                        <br />1/2 onion
</code></div>
                    <p><span className='dont'>Don't</span> use numeric values in ingredient names or spell out numbers.</p>
                    <div className='example bad'>
                        <code>
                            2 cups 8oz cans chicken broth
                        <br />1/3 cup 1% milk
                        <br />half an onion
                        </code>
                    </div>

                    <p className='dodont_wrapper'>
                        <span className='do'>Do</span> keep a space between the ingredient amount and the measurement unit.
                </p>
                    <div className='example good'>
                        <code>
                            16 oz. chicken broth
                        <br />1/4 tsp salt
                        <br />1 1/2 tsp dried ginger
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

            </section>
        </Fragment>
    )
}

export default LandingPage;
