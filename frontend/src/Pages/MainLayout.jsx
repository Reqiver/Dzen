import React from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';


export default class MainLayout extends React.Component{

    render(){
        return(
            <>
            <Header/>
                <main>{this.props.children}</main>
            <Footer/>

            </>
        )
    }
}
