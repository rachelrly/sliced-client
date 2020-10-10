import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import './Header.css'

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

class Header extends Component {

    render() {

        const toggleButtons = TokenService.hasAuthToken()
            ? <LogoutButton />
            : <LoginButton />
        return (
            <header>
                <Link to='/'>
                    <h1>Sliced</h1>
                </Link>
                <div className='header-link-wrapper'>
                    {toggleButtons}
                </div>
            </header >
        )
    }
}

export default Header;
