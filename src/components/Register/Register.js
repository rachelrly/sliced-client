import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    return;
  }


  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor='register-name'>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} id='register-name' name='register-name' placeholder='Your name' />
        </fieldset>
        <fieldset>
          <label htmlFor='register-email'>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} id='register-email' name='register-email' placeholder='test@test.com' />
        </fieldset>
        <fieldset>
          <label htmlFor='register-password'>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} id='register-password' name='register-password' placeholder='test-password!' />
        </fieldset>
        <fieldset>
          <label htmlFor='register-repeat-password'>Repeat password</label>
          <input value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} id='register-repeat-password' name='register-repeat-password' placeholder='test-password!' />
        </fieldset>
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
