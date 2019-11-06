import React from 'react';

import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { API } from '../api/axiosConf';

import SearchForm from '../Components/SearchForm';


export default class Footer extends React.Component{
  sendStatusOnline = async() => {
      let timestamp =  moment().unix();
      await API.patch('last/seen', {last_seen:timestamp})
      console.log("Sending online status")
  }
    setIntervalSending = () => {
        if(localStorage.getItem('token')){
            this.sendStatusOnline()
            setInterval(()=>{
                this.sendStatusOnline()
            }, 1000*60)
        }
    }
    componentDidMount () {
        this.setIntervalSending()
    }
  render(){
    return (
      <>
      <footer className="footer">
        <section>
          <div className="container-fluid">
            <Row>
              <Col md="5">
                <ul className="footer-nav">
                  <li>
                    <Link to="/about" >
                        library
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/search" >
                        Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/trainers" >
                        charity
                    </Link>
                  </li>
                  <li>
                    <Link to="/events/search" >
                        contact
                    </Link>
                  </li>
                </ul>
                <SearchForm />
              </Col>
              <Col>
                  <ul className="soc">
                   <li className="facebook">
                      <a href="/">
                        <FontAwesomeIcon icon={['fab', 'facebook']}/>
                      </a>
                    </li>
                    <li className="twitter">
                      <a href="/">
                        <FontAwesomeIcon icon={['fab', 'twitter']}/>
                      </a>
                    </li>
                    <li className="instagram">
                      <a href="/">
                        <FontAwesomeIcon icon={['fab', 'instagram']}/>
                      </a>
                    </li>
                    <li className="whatsapp">
                      <a href="/">
                        <FontAwesomeIcon icon={['fab', 'whatsapp']}/>
                      </a>
                    </li>
                  </ul>
                  <span>©Dzen 2019 All rights reserved</span>
              </Col>
            </Row>
          </div>
        </section>
        </footer>
      </>
      )
  }
};
