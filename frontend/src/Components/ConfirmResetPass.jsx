import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ConfirmResetPass extends React.Component{
    render () {
        return (
            <>
            <section className="header-img ">
            <div className="bg-yoda">
            <div className="user_options-forms forgot-pass" id="user_options-forms">

               <div className="user_forms-signup">
                   <h2 className = "forms_title paper-plane"><FontAwesomeIcon icon="paper-plane"/></h2>
                           <p className = "paper-plane">Email whith password confirmation has been sent to your email.</p>
                    </div>
                    </div>

                </div>
            </section>
            </>
        )
    }
}
