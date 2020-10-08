import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import './Header.css'

function Header() {
    const handleLogout = () => {
        TokenService.clearAuthToken()
    }
    return (
        <header>
            <Link to='/recipe'>
                <h1>Sliced</h1>
            </Link>
            <div className='header-link-wrapper'>
                {TokenService.hasAuthToken()
                    ? <div className='logout-wrapper'>
                        <Link>
                            <button>Log Out</button>
                        </Link>
                    </div>
                    : <div className='login-wrapper'>
                        <button>Create Accout</button>
                        <Link to='/login'>
                            <button>Log In</button>
                        </Link>
                    </div>}
            </div>
        </header >
    )
}

export default Header;
