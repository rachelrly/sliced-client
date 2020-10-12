import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
function LandingPage() {
    // if user is logged in, view my recipes at bottom of page

    return (
        <section className='landing_page_wrapper'>
            <h2>Welcome to Sliced!</h2>
            <p>An app that allows you to scale down your recipes</p>
            <p>To log in, please use these credentials:</p>
            <div>
                <span>email: test@gmail.com</span>
                <span>password: test-password</span></div>

            <Link to='/recipe'><button>View User Recipes</button></Link>
        </section>
    )
}

export default LandingPage
