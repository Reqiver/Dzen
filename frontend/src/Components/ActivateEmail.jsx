import React from 'react';

import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Load from '../Components/spiner';

import LoadingOverlay from 'react-loading-overlay';

import { axiosPost } from '../api/axiosPost'

const UIDPOS = 3;
const TOKENPOS = 4;

export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={
            redirect: false,
            loading: false
        };
	}


    extractToken (idx) {
        return window.location.pathname.split("/")[idx]
    }

    handleSubmitActivation = async (event) => {
        console.log(this.props)
        const URLPATH = 'auth/users/activation/';
        const USERDATA={
            "uid": this.extractToken(UIDPOS),
            "token": this.extractToken(TOKENPOS),
            }
        this.setState({ loading:true })
            try {
                await axiosPost(URLPATH, USERDATA);
                this.setState({ redirect: true });
                toast.success('Thank you, now you can Sign In');
            } catch (error){
                toast.error('Activation was failed. Please, contact administrator or support system ;)');
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
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Load/>}
          text='Loading...'
          >
        <section className="header-img ">
        <div className="bg-yoda">
        <div className="user_options-forms forgot-pass" id="user_options-forms">

           <div className="user_forms-signup">
               <h2 className = "forms_title">Push, if You want activate your account:</h2>

               <form className="forms_form">
                   <fieldset className = "forms_fieldset">
                        <div className="forms_buttons signup-btn">

               				<button type="button"
                                    className="forms_buttons-action"
                                    onClick={this.handleSubmitActivation}>
                                    Activate
                            </button>

                        </div>
                    </fieldset>
                   </form>
                </div>
                </div>
            </div>
        </section>
        </LoadingOverlay>
        </>
        )
    }
}
