import React from 'react';

import { Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { isAuthenticated, defaultPhoto } from '../utils';
import SideBar from './SideBar';
import { API } from '../api/axiosConf'

export default class HomeBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            booksListPop: [],
            booksListNew: [],
        };
    }

    async componentDidMount() {
        let path = 'api/books/top'
        let response = await API.get(path);
        this.setState({
                booksListPop: response.data.popular,
                booksListNew: response.data.newest,
            });
    }

    handleClick = (book) => {
       this.setState({ redirect: true });
       this.setState({ book });
    };
    renderBooks(book) {
        let defImg = "/media/car-racing-4394450_1920.jpg";
        let coverImg = defaultPhoto(defImg, book.cover_url);

        return (
            <Col
                xl="2" lg="3" md="4" sm="6"
                id={`book_${book.id}`}
                key={book.id}
                onClick={() => this.handleClick(book)}
                style={{cursor:'pointer'}}
                className="top-book"
            >
                    <div className="book-cover-photo">
                        <img src={coverImg} alt={book.bookname} />
                    </div>
                    <h5>
                        {book.bookname}
                    </h5>


            </Col>
        )
    }

    render() {
        return (
            <section className="home-books">
                <div className="container-fluid">
                    <Row className="book-header popularbooks">
                        <Col className="d-flex align-items-center">
                            <h2>Most Popular Book</h2>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Link to="/courses/search">
                                <div className="more-courses-events">
                                    <button className="learn-more">
                                        <div className="circle">
                                        <span className="icon arrow"></span>
                                        </div>
                                        <p className="button-text">More...</p>
                                    </button>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.booksListPop.map( book => this.renderBooks(book) )}
                    </Row>
                    <Row className="book-header newest-books">
                        <Col className="d-flex align-items-center">
                            <h2>Newest Books</h2>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Link to="/courses/search">
                                <div className="more-courses-events">
                                    <button className="learn-more">
                                        <div className="circle">
                                        <span className="icon arrow"></span>
                                        </div>
                                        <p className="button-text">More...</p>
                                    </button>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.booksListNew.map( book => this.renderBooks(book) )}
                    </Row>
                </div>
            </section>
    );
  }
};
