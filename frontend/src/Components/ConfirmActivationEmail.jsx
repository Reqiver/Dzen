import React from 'react';

import { Container } from 'reactstrap';
import { toast } from 'react-toastify';

import { axiosPost } from '../api/axiosPost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ConfirmActivationEmail extends React.Component{
  constructor(props){
    super(props);

    this.state={redirect: false,};
  }

  handleSubmitReSendActivation = async (event) => {
        const URLPATH = 'auth/users/resend_activation/';
        const USERDATA = {"email":this.props.email}
        try {
            await axiosPost(URLPATH, USERDATA);
            toast.success('Email was sended');
        } catch (error){
            toast.error('Please, check entered email. Contact administrator or support system ;)');
            console.log(error.message)
        }
  }
    render () {
        return (
        <>
        <section className="header-img ">
        <div className="bg-yoda">
        <div className="user_options-forms forgot-pass" id="user_options-forms">

           <div className="user_forms-signup">
               <h2 className = "forms_title paper-plane"><FontAwesomeIcon icon="paper-plane"/></h2>
               <p style={{fontSize:'1.25rem'}}>Email with activation confirmation has been sent to your email.</p>
               <p style={{fontSize:'1.25rem'}}>If you didn't receive the email, check Spam or: </p>

               <form className="forms_form">
                   <fieldset className = "forms_fieldset">
                        <div className="forms_buttons signup-btn">
               				<button type="button"
                                    className="forms_buttons-action"
                                    onClick={this.handleSubmitReSendActivation}>
                                    ReSend activation
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
