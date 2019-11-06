import React from 'react';

import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { axiosPost } from '../api/axiosPost';
import { FormErrors } from '../api/FormError';
import { toast } from 'react-toastify';


const UIDPOS = 4;
const TOKENPOS = 5;


export default class NewPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={new_password:'',
                    re_new_password:'',
                    formErrors: {re_new_password: '', new_password: ''},
                    rePasswordValid: false,
                    passwordValid: false,
                    formValid: false,
                    redirect: false,
                };
	}


    handlChangePassword = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value},
                        () => { this.validateField(name, value) }
                    );
    }

    validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let {passwordValid, rePasswordValid, new_password, re_new_password} = this.state;
          let passregex = RegExp(/^([\w+!@#$%^&*]){6,80}$/g);

          passwordValid = passregex.test(value);
          fieldValidationErrors.fieldName = passwordValid ? '': 'Password must to contain 6-80 characters and can contain A-Z a-z 0-9 !@#$%^&*';
          (new_password !== re_new_password) ?
              fieldValidationErrors.fieldName= "Password and password confirm do not match" :
              rePasswordValid = true;

          this.setState({formErrors: fieldValidationErrors,
                        passwordValid: passwordValid,
                        rePasswordValid: rePasswordValid,
                        }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.rePasswordValid &&
                                this.state.passwordValid});
    }

    extractToken (idx) {
        return window.location.pathname.split("/")[idx]
    }

    handleSubmitNewPassword = async (event) => {
        const URLPATH = 'auth/users/reset_password_confirm/';
        const USERDATA={
            "uid": this.extractToken(UIDPOS),
            "token": this.extractToken(TOKENPOS),
            "new_password":this.state.new_password
            }
        try {
            await axiosPost(URLPATH, USERDATA);
            this.setState({ redirect: true });
            toast.success('Password was changed');
        } catch (error){
            toast.error('Changing password failed. Please, contact administrator or support system ;)');
            console.log(error.message)
        }
    }

    render () {
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to='/'/>;
        }
        return (
        <>
        <section className="header-img ">
        <div className="bg-yoda">
        <div className="user_options-forms forgot-pass" id="user_options-forms">

           <div className="user_forms-signup">
               <h2 className = "forms_title">Enter new password:</h2>
               <div className="form-error">
                    <FormErrors formErrors={this.state.formErrors} />
               </div>

               <form className="forms_form">
                   <fieldset className = "forms_fieldset">
                       <div className = "forms_field">
               				<input type="password"
                                    name="new_password"
                                    className = "forms_field-input"
        							placeholder="New Password"
                                    value={this.state.new_password}
        							onChange = {this.handlChangePassword}
        							required
                               />
                        </div>
                        <div className = "forms_field">
                				<input type="password"
                                     className = "forms_field-input"
                                     name="re_new_password"
         							 placeholder="Retype New Password"
                                     value={this.state.re_new_password}
         							 onChange = {this.handlChangePassword}
         							 required
                                />
                         </div>
                        <div className="forms_buttons signup-btn">
               				<button type="button"
                                    className="forms_buttons-action"
                                    onClick={this.handleSubmitNewPassword}
                                    disabled={!this.state.formValid}>Change password
                            </button>
                        </div>
                    </fieldset>
                   </form>
                </div>
                </div>
            </div>
        </section>
        </>
        )
    }
}
