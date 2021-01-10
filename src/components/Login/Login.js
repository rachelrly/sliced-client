import React, { useState, useContext, Fragment } from 'react';
import { UserContext } from '../../contexts/user-context';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import ErrorText from '../ErrorText/ErrorText';

function Login() {
    const [loading, setLoading] = useState(false);

    const { handleLogin, setError } = useContext(UserContext);

    const handleSubmitAuth = e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const { email, password } = e.target;

        if (!email || !password) {
            setError('Please enter valid login credentials.');
            setLoading(false);
            return null;
        }
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
                        onSubmit={(e) => handleSubmitAuth(e)}>
                        <fieldset>
                            <label className='hidden' htmlFor='email'></label>
                            <input name='email' type='text' placeholder='test@gmail.com' />
                        </fieldset>
                        <fieldset>
                            <label className='hidden' htmlFor='password'></label>
                            <input name='password' type='password' placeholder='test-password' />
                        </fieldset>
                        <ErrorText />
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
