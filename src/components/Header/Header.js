import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <header>
            <Link to='/recipe'>
                <h1>Sliced</h1>
            </Link>
        </header>
    )
}

export default Header;
