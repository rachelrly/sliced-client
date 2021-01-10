import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import { UserContext } from '../../contexts/user-context';
import ErrorText from '../ErrorText/ErrorText';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const { setError } = useContext(UserContext);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !email || !password || !repeatPassword) {
      setError('Missing fields in registration form.')
      return;
    }
    if (password !== repeatPassword) {
      setError('Passwords do not match.')
      return;
    }
    try {
      console.log('BEFORE AWAIT RAN')
      await AuthApiService.postNewUser({ name, email, password })
      props.history.push('/')
    }
    catch (error) {
      console.log(error)
    }
  }



  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor='register-name'>Name</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} id='register-name' name='register-name' placeholder='Your name' />
        </fieldset>
        <fieldset>
          <label htmlFor='register-email'>Email</label>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} id='register-email' name='register-email' placeholder='test@test.com' />
        </fieldset>
        <fieldset>
          <label htmlFor='register-password'>Password</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} id='register-password' name='register-password' placeholder='test-password!' />
        </fieldset>
        <fieldset>
          <label htmlFor='register-repeat-password'>Repeat password</label>
          <input type='password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} id='register-repeat-password' name='register-repeat-password' placeholder='test-password!' />
        </fieldset>
        <ErrorText />
        <div className='form-login-button-wrapper'>
          <button type='submit'>Sign Up</button>
          <Link to='/login'>
            <span>Already have an account?</span>
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Register;
