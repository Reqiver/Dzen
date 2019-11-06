import React from 'react';

import { Button, Col, Modal, Row } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormErrors } from '../api/FormError';
import { registration, socialRegistration } from '../api/registration';
import google from '../img/static/google.svg';


class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmpass: '',
            first_name: '',
            last_name: '',
            picture: {},
            reg_event: {},
            isagreed: false,
            formErrors: {email: '', password: '', confirmpass: '', isAgreed: ''},
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            isAgreedValid: false,
            formValid: false,
            showErrors: false,
            redirect: false,
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let isAgreedValid = this.state.isAgreedValid;

        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
              let passregex = RegExp(/^([\w+!@#$%^&*]){6,80}$/g);
              passwordValid = passregex.test(value);
              fieldValidationErrors.password = passwordValid ? '': 'Password must to contain 6-80 characters and can contain A-Z a-z 0-9 !@#$%^&*';
              break;
          case 'confirmpass':
            let password = this.state.password;
            confirmPasswordValid = value === this.state.password;
            fieldValidationErrors.confirmpass = confirmPasswordValid ? '': 'Passwords are different';
            break;
          case 'isagreed':
            isAgreedValid = this.state.isagreed;
            fieldValidationErrors.isAgreed = isAgreedValid ? '': 'Is Agreed is not checked';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        confirmPasswordValid: confirmPasswordValid,
                        isAgreedValid: isAgreedValid
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
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid && this.state.isAgreedValid});
        var show = this.errorShowBlock(this.state.formErrors);
        this.setState({
            showErrors: show
        });
    }

    onChangeInputs = (event) => {
        const fieldname = event.target.name;
        const valueParam = event.target.value;
        if( fieldname === 'isagreed'){
            this.setState({[fieldname]:!this.state.isagreed},
                          () => { this.validateField(fieldname, this.state.isagreed) });
        } else {
            this.setState({[fieldname]:valueParam},
                          () => { this.validateField(fieldname, valueParam) });
        }
    }


    async handleClick(){
        this.props.onAddEmail(this.state.email)

        await registration(this.state)
            .then(
                result => {
                    if(result === 201)
                        this.props.onAddEmail(this.state.email)
                        this.setState({ redirect: true })
                }
            );
    }

    async handleClickSocial(event){
        event.preventDefault();
        await socialRegistration(this.state)
            .then(() => this.setState({ redirect: true }));
        return false;
    }

    registerFacebook = (response) => {
      console.log(response);
      this.setState({
        email:response.email,
        first_name:response.first_name,
        last_name:response.last_name,
        picture:response.picture.url,
      })
      this.props.onAddEmail(response.email)
      this.handleClickSocial(this.state.reg_event)
    }

    registerGoogle = (response) => {
      this.setState({
        email: response.profileObj.email,
        last_name: response.profileObj.familyName,
        first_name: response.profileObj.givenName,
        picture: response.profileObj.imageUrl,
      })
      this.props.onAddEmail(response.profileObj.email)
      this.handleClickSocial(this.state.reg_event)
    }

    registerGoogleFail = () => {
        toast.error('You cannot sing up with Google, please try to clean your browser cache or contact support.');
    }

    setEvent = (event) => {
      this.setState({
        reg_event: event
      })
    }

    render () {
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to={{
               pathname: '/activation/send/email',
               state: {email:this.state.email},
            }}/>;
        }
        return (
        <div>
        <section className="header-img ">
        <div className="bg-yoda">
        <div className="user_options-forms signup" id="user_options-forms">

           <div className="user_forms-signup">
                   <h2 className = "forms_title">Sign Up</h2>
                   <div className="form-error">
                        <FormErrors formErrors={this.state.formErrors} />
                   </div>
                   <form className = "forms_form">
                     <fieldset className = "forms_fieldset">
                         <div className = "forms_field">
                            <input type = "email"
                                    id = "signup-email"
                                    name = "email"
                                    placeholder = "Email"
                                    className = "forms_field-input"
                                    onChange = {(event) => {this.onChangeInputs(event)}}
                                    required
                            />
                         </div>
                         <div className = "forms_field">
                            <input type = "password"
                                    id = "signup-password"
                                    name = "password"
                                    placeholder = "Password"
                                    className = "forms_field-input"
                                    onChange = {(event) => {this.onChangeInputs(event)}}
                                    required
                            />
                         </div>
                         <div className="forms_field">
                            <input type="password"
                                    id="signup-confirmpass"
                                    name="confirmpass"
                                    placeholder="Confirm Password"
                                    className="forms_field-input"
                                    onChange = {(event) => {this.onChangeInputs(event)}}
                                    required
                            />
                         </div>
                     </fieldset>
                     <div className={this.state.formErrors.isAgreed ? 'form-group is-error': 'form-group'}>
                         <div className="privacy-policy">
                            <div className="cbx">
                                <input type="checkbox" id="cbx-privacy-policy" style={{display:'none'}}
                                        value=""
                                        name="isagreed"
                                        onChange = {(event) => {this.onChangeInputs(event)}}
                                        required
                                />
                                <label for="cbx-privacy-policy" className="check">
                                  <svg width="18px" height="18px" viewBox="0 0 18 18">
                                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                    <polyline points="1 9 7 14 15 4"></polyline>
                                  </svg>
                                </label>
                            </div>
                             <label className="i-accept" htmlFor="isagreed">I Accept <a href="/terms-and-conditions">terms and conditions & privacy policy</a></label>
                         </div>
                     </div>
                     <div className='soc-or-signup'>
                         <div className='signup-soc'>
                             <GoogleLogin  clientId="187643090418-afug7rt484echgi3muun7m2umaebcik4.apps.googleusercontent.com"
                                           render={renderProps => (
                                               <button onClick={renderProps.onClick}
                                                        disabled={renderProps.disabled}
                                                        className="btnSocial"
                                                >
                                                    <img onClick={this.setEvent} src={google} alt="GoogleLogo"/>
                                                </button>
                                           )}
                                           onSuccess={this.registerGoogle}
                                           onFailure={this.registerGoogleFail}
                                           cookiePolicy={'single_host_origin'}
                               />
                             <FacebookLogin    appId="702565746901914"
                                               autoLoad={false}
                                               fields="first_name, last_name, email, picture"
                                               callback={this.registerFacebook}
                                               onClick={this.setEvent}
                                               cssClass="btnSocial"
                                               textButton = "&nbsp;&nbsp;"
                                               icon={<i className="fab fa-facebook-f"></i>}
                               />
                         </div>
                         <div><h4>OR</h4></div>
                         <div className="forms_buttons signup-btn">
                            <button value="Sign up"
                                    className="forms_buttons-action"
                                    onClick={() => this.handleClick()}
                                    disabled={!this.state.formValid}
                            >Sign up</button>
                         </div>
                     </div>
                   </form>
                   <div className="login-signup">
                        <h6>If you have an account: <Link to='/'><span>LOGIN</span></Link></h6>
                   </div>
                 </div>
                </div>
            </div>
        </section>
        </div>
        )
    }

}

export default connect(
    state => ({
        user:state.user
    }),
    dispatch => ({
        onAddEmail: (useremail) => {
            dispatch({type: 'ADD_EMAIL', payload: {email:useremail}})
        }
    })
)(Signup);
