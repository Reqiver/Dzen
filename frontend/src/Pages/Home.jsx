import React from 'react';

import LoadingOverlay from 'react-loading-overlay';

import HomeHeader from '../Components/HomeHeader';
import HomeBook from '../Components/HomeBook';
import Chat from '../Components/Chat';
import Load from '../Components/spiner';


export default class Home extends React.Component{
    constructor(props){
    	super(props);

    	this.state={load: false};
	}
    isLoad = (loading) => {
        this.setState({load:loading})
    }
    render(){
        return(
            <>
            <LoadingOverlay
              active={this.state.load}
              spinner={<Load/>}
              text='Loading...'
              >
                <HomeHeader />
                <HomeBook />
                <Chat />
            </LoadingOverlay>

            </>
        )
    }
}
