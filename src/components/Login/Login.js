import React, { useState, useContext, Fragment } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/user-context';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const ctx = useContext(UserContext);


    const handleSubmitAuth = e => {
        e.preventDefault();
        setError(null);
        setLoading(true)
        const { email, password } = e.target

        AuthApiService.postLogin({
            email: email.value.toLowerCase(),
            password: password.value
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                ctx.onLogin(res.user_id)


            })
            .catch(res => {
                this.setState({ error: true, loading: false })
            })
    }





    let err = error ? <span className='error_text'>Invalid email or password</span> : null;
    let errClass = error ? 'err' : null

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
                            <input name='email' type='text' className={errClass} placeholder='test@gmail.com' />
                        </fieldset>
                        <fieldset>
                            <label className='hidden' htmlFor='password'></label>
                            <input name='password' type='password' className={errClass} placeholder='test-password' />
                        </fieldset>
                        {err}
                        <div className='form-login-button-wrapper'>
                            <button type='submit' className='form_button' >Log In</button>
                            <Link><span>Already have an account?</span></Link>
                        </div>
                    </form>
                </section>}

        </Fragment>

    )
}


export default Login
