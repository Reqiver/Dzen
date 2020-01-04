import React from 'react';

import { Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { isAuthenticated, defaultPhoto } from '../utils';
import SideBar from './SideBar';
import { API } from '../api/axiosConf';
import { CommentList, CommentForm } from './CommentList';
import { OnlineUserList } from "./OnlineUserList";


export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <section className="home-chat">
                <h1>Chat</h1>
                <Row>
                  <Col className = "pt-3 bg-white">
                      <CommentList
                         comments = {this.state.comments}
                         loading = {this.state.loading}
                        />
                  </Col>
                  <Col md="3"  className = {`pt-3 border-right`}>
                    <h4>Online:</h4>
                    <OnlineUserList

                    />
                  </Col>
                </Row>
                <Row>
                    <Col md="12"  className = {`pt-3 border-right`}>
                      <CommentForm
                          addComment = {this.addComment}
                          comments = {this.state.comments}
                      />
                    </Col>
                </Row>
            </section>
    );
  }
};
