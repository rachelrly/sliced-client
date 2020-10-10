import React from 'react'
import { Link } from 'react-router-dom'
function LandingPage() {
    return (
        <section>
            <Link to='/recipe'><h2>View my recipes</h2></Link>
        </section>
    )
}

export default LandingPage
