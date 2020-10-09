import React from 'react'
import { Link } from 'react-router-dom';

function LoginButton() {
    return (
        <div className='login-wrapper'>
            <Link to='/login'>
                <button>Log In</button>
            </Link>
        </div>
    )
}

export default LoginButton
