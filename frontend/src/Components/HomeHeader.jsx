import React from 'react';

import {Container, Button, Row, Col} from 'reactstrap';
import { FormErrors } from '../api/FormError';

import { isAuthenticated } from '../utils';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import google from '../img/static/google.svg';
import { toast } from 'react-toastify';
import { userLogin, userSocialLogin } from '../api/userLogin';
import { logOut } from '../api/logOut';

export default class HomeHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            access_token: '',
            network_name: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
            redirect: false,
			showErrors: false,
        };
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                let passregex = RegExp(/^([\w+!@#$%^&*]){6,80}$/g);
                passwordValid = passregex.test(value);
                fieldValidationErrors.password = passwordValid ? '': 'Password must to contain 6-80 characters and can contain A-Z a-z 0-9 !@#$%^&*';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
	}
	errorShowBlock(formErrors) {
        for (let errorText in formErrors) {
            if(formErrors[errorText].length > 0)
                return true;
        }
        return false;
    }
    validateForm() {
        this.setState({
            formValid: this.state.emailValid &&
                       this.state.passwordValid
		});
		let show = this.errorShowBlock(this.state.formErrors);
        this.setState({
            showErrors: show
        });
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
                [name]: value },
            () => { this.validateField(name, value) });
    }

    handleClick = async(event) => {
    	event.preventDefault();
        try {
            await userLogin(this.state)
				toast.success('Login successfull');
                this.setState({ redirect: true });
       } catch (error){
           toast.error('Please, check email and password.');
       }
    }

    handleClickSocial = async(event) => {
    	event.preventDefault();
      try {
          await userSocialLogin(this.state)
          toast.success('Login successfull');
          this.setState({ redirect: true });
      } catch (error){
        toast.error('Please try later or contact administration');
      }
    }

    loginFacebook = (response) => {
      this.setState({
        access_token: response.accessToken,
        email:response.email,
        network_name: "Facebook",
      })
      this.handleClickSocial(this.state.reg_event)
    }

    loginGoogle = (response) => {
      this.setState({
        access_token: response.accessToken,
        email: response.profileObj.email,
        network_name: "Google",
      })
      this.handleClickSocial(this.state.reg_event)
    }

    loginGoogleFail = () => {
      toast.error('You can not sing in with Google, please try to clean your browser cache or contact support.');
    }

    setEvent = (event) => {
      this.setState({
        reg_event: event
      })
    }
    render(){
        return(
            <>
            <section className="header-img ">
            <div className="bg-yoda">
            <div className="container-fluid">
                <div className="col d-flex justify-content-end language">
					<ul>
						<li><a href="#">UA </a>|</li>
						<li><a href="#" className="language-active"> EN</a></li>
					</ul>
				</div>
                <Row className='header-row'>
                <Col md='6' className="d-flex align-items-center">
                    <div className="welcome-text">
                        <h1>DON'T BUY</h1>
                        <h1>BORROW</h1>
                    </div>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                    <div className={`user_options-forms ${isAuthenticated('hide')}`} id="user_options-forms">
                       <div className="user_forms-login">
                         <h2 class="forms_title">Login</h2>
                         <div className={this.state.showErrors ? 'panel-errors errors-show':'panel-errors'}>
                             <FormErrors formErrors={this.state.formErrors} />
                         </div>
                         <form className="forms_form">
                           <fieldset className="forms_fieldset">
                             <div className="forms_field">
                               <input type="email"
                                        placeholder="Email"
                                        className="forms_field-input"
                                        name="email"
                                        id="login-email"
                                        onChange = {(event) => {this.handleUserInput(event)}}
                                        required autofocus />
                             </div>
                             <div className="forms_field">
                               <input type="password"
                                        placeholder="Password"
                                        className="forms_field-input"
                                        name="password"
                                        id="login-password"
                                        onChange = {(event) => {this.handleUserInput(event)}}
                                        required />
                             </div>
                           </fieldset>
                           <div className="forms_buttons">
                            <Link to='/forgot-password'>
                             <button type="button" className="forms_buttons-forgot">
                                Forgot password?
                             </button>
                             </Link>
                             <button className="forms_buttons-action"
                                        onClick={(event) => this.handleClick(event)}
                                        disabled={!this.state.formValid}
                             >Sign in</button>
                           </div>
                         </form>
                         <div className='login-soc'>
                             <GoogleLogin
                                 clientId="187643090418-afug7rt484echgi3muun7m2umaebcik4.apps.googleusercontent.com"
                                 render={renderProps => (
                                     <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btnSocial">
                                        <img src={google} onClick={this.setEvent} alt="Google"></img>
                                     </button>
                                 )}
                                 onSuccess={this.loginGoogle}
                                 onFailure={this.loginGoogleFail}
                                 cookiePolicy={'single_host_origin'}
                             />
                             <FacebookLogin
                                 appId="702565746901914"
                                 autoLoad={false}
                                 fields="name, email, picture"
                                 callback={this.loginFacebook}
                                 onClick={this.setEvent}
                                 cssClass="btnSocial"
                                 textButton = "&nbsp;&nbsp;"
                                 icon={<i className="fab fa-facebook-f"></i>}
                             />

                         </div>
                         <div className="login-signup">
                            <h6>If you haven't an account: <Link to='/signup'><span>SIGN UP</span></Link></h6>

                        </div>
                       </div>
                       </div>

                </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='mouse'></div>
                    </Col>
                </Row>


                </div>
            </div>
            </section>

            </>
        )
    }
};
