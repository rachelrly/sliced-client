import React from 'react'
import TokenService from '../../services/token-service'

function LogoutButton() {

    const handleLogout = () => {
        TokenService.clearAuthToken()
    }

    return (
        <div className='logout-wrapper'>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default LogoutButton
