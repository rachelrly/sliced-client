import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import UserContext from '../../user-context';
import '../Form.css';
import Loading from '../Loading/Loading'

class Login extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false
        }
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
        this.setState({ error: null, loading: true });
        const { email, password } = e.target

        AuthApiService.postLogin({
            email: email.value.toLowerCase(),
            password: password.value
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.context.onLogin(res.user_id)


            })
            .catch(res => {
                this.setState({ error: true, loading: false })
            })
    }




    render() {
        let err = this.state.error ? <span className='error_text'>Invalid email or password</span> : null;
        let errClass = this.state.error ? 'err' : null
        const renderPage = this.state.loading ? <Loading /> : <section className='Login_section'>
            <form
                className='Login_form'
                onSubmit={this.handleSubmitAuth}>

                <label htmlFor='email'></label>
                <input name='email' type='text' className={errClass} placeholder='test@gmail.com' />

                <label htmlFor='password'></label>
                <input name='password' type='password' className={errClass} placeholder='test-password' />
                {err}
                <button type='submit' className='form_button' >Log In</button>
            </form>
        </section>
        return (
            <>{renderPage}</>

        )
    }
}

export default Login
