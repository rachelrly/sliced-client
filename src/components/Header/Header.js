import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import '../../css/Header.css'
import { UserContext } from '../../contexts/user-context'
import { RiKnifeLine } from 'react-icons/ri'

function Header() {
    const { onLogout } = useContext(UserContext);

    return (
        <header>
            <Link to='/' className='title_link'>
                <h1>
                    <div aria-label='Sliced'>
                        <span>S</span><RiKnifeLine /><span>iced</span>
                    </div>
                </h1>
            </Link>
            <div className='header-link-wrapper'>
                {TokenService.hasAuthToken()
                    ? <button onClick={() => onLogout()}>Log out</button>
                    : <Link to='/login' tabIndex='-1'><button>Log in</button></Link>}
            </div>
        </header >
    )

}

export default Header;
