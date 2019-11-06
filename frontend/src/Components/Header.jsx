import React from 'react';

import { Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Row,
    Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils';
import logo from '../img/static/whitelogo.svg'
import '../api/search-bar'

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <>
            <header className='header'>
            <div className="container-fluid">
            <Row>
            <Col className='d-flex header-content justify-content-between'>
                <Link to='/'><img src={logo} className="logo" alt="Dzen"/></Link>
                <Navbar dark expand="md" className="header-menu">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link href="/about" className="nav-link" activeClass="active" to="home-about" spy={true} smooth={true} duration={500}>
                                    library
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/events" className="nav-link" activeClass="active" to="home-event" spy={true} smooth={true} duration={500}>
                                    Events
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/trainers" className="nav-link" activeClass="active" to="home-trainer" spy={true} smooth={true} duration={500}>
                                    Charity
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/courses" className="nav-link" activeClass="active" to="home-course" spy={true} smooth={true} duration={500}>
                                    contact
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <form className="search">
                    <input className="search-input" id="input" type="text" autocomplete="off"/>
                    <label className="search-label" for="input"></label>
                    <button className="search-button" type="reset"></button>
                    <div className="search-border"></div>
                    <div className="search-close">x</div>
                </form>
            </Col>
            </Row>
            </div>
            </header>
            </>
    );
  }
};
