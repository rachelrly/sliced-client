import React from 'react';
import '../Form.css'

function Login() {
    return (
        <section className='Login_section'>
            <form className='Login_form'>
                <label htmlFor='email'></label>
                <input name='email' type='text' />

                <label htmlFor='password'></label>
                <input name='password' type='text' />

                <button type='submit' className='form_button'>Log In</button>
            </form>
        </section>
    )
}

export default Login
