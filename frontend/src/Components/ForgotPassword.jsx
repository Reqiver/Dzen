import React from 'react';

import { Button, Col, Modal, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { axiosPost } from '../api/axiosPost'
import svg from "../img/static/book.svg"

export default class ForgotPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={email:'',
                    redirect: false,};
	}

    handlChangeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlPasswordReset = async (event) => {
        let urlpath = 'auth/users/reset_password/';
        let userdata = {"email":this.state.email}
        try {
            await axiosPost(urlpath, userdata)
            this.setState({ redirect: true });
            toast.success('Email was sended');
        } catch (error){
            toast.error('Please, check entered email.');
        }
	}

    render () {
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to='/reset/password/confirm'/>;
        }
        return (
        <div>
        <section className="header-img ">
        <div className="bg-yoda">
        <div className="user_options-forms forgot-pass" id="user_options-forms">

           <div className="user_forms-signup">
               <h2 className = "forms_title">Forgot your password?</h2>
               <p>Enter your email address below, and we'll email instructions for setting a new one.</p>

               <form className="forms_form">
                   <fieldset className = "forms_fieldset">
                       <div className = "forms_field">
               				<input type="email"
               						className = "forms_field-input"
               						placeholder="Enter Email"
                                       value={this.state.email}
                                       onChange = {this.handlChangeEmail}
               						required
                               />
                        </div>
                        <div className="forms_buttons signup-btn">
               				<button type="submit"
                                    className="forms_buttons-action"
               						onClick={this.handlPasswordReset}>Send me instructions!
                            </button>
                        </div>
                    </fieldset>
                    <img src={svg} alt=""/>
                   </form>
                </div>
                </div>

            </div>
        </section>
        </div>
        )
    }
}
