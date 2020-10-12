import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import UserContext from '../../user-context';
import '../Form.css';

class Login extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { error: null }
    }

    //const { onLogin } = useUserDataContext()
    //const[error, setError] = useState(null)
    //const emailInput = useRef()
    //const passwordInput = useRef()
    //handlesubmit
    //email: emailInput.current.value
    //password: pswInput.current.value

    handleSubmitAuth = e => {
        e.preventDefault();
        this.setState({ error: null });
        const { email, password } = e.target

        AuthApiService.postLogin({
            email: email.value,
            password: password.value
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.context.onLogin(res.user_id);
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }




    render() {

        return (
            <section className='Login_section'>
                <form
                    className='Login_form'
                    onSubmit={this.handleSubmitAuth}>

                    <label htmlFor='email'></label>
                    <input name='email' type='text' />

                    <label htmlFor='password'></label>
                    <input name='password' type='password' />

                    <button type='submit' className='form_button'>Log In</button>
                </form>
            </section>
        )
    }
}

export default Login
