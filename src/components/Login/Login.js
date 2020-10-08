import React, { Component } from 'react';
import tokenService from '../../services/token-service'
import '../Form.css'


export class Login extends Component {



    render() {
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
}

export default Login
