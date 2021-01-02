import React, { useState, useContext, Fragment } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import { UserContext } from '../../contexts/user-context';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { handleLogin } = useContext(UserContext);

    const handleSubmitAuth = e => {
        e.preventDefault();
        setError(null);
        setLoading(true)
        const { email, password } = e.target

        handleLogin(email.value.toLowerCase(), password.value);

        email.value = '';
        password.value = '';
    }


    return (
        <Fragment>
            {loading
                ? <Loading />
                : <section className='Login_section'>
                    <form
                        autoComplete='off'
                        className='Login_form'
                        onSubmit={handleSubmitAuth}>
                        <fieldset>
                            <label className='hidden' htmlFor='email'></label>
                            <input name='email' type='text' placeholder='test@gmail.com' />
                        </fieldset>
                        <fieldset>
                            <label className='hidden' htmlFor='password'></label>
                            <input name='password' type='password' placeholder='test-password' />
                        </fieldset>
                        {error ? <span>Invalid username or password</span> : null}
                        <div className='form-login-button-wrapper'>
                            <button type='submit' className='form_button' >Log In</button>
                            <Link to='/register'>
                                <span>Create an account</span>
                            </Link>
                        </div>
                    </form>
                </section>}

        </Fragment>

    )
}


export default Login
