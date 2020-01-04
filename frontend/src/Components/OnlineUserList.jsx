import React from 'react';

import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import { defaultPhoto } from '../utils';



export class OnlineUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      comment: {
        course: this.props.course,
        comment: ""
      }
    };
  }

  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  onSubmit = async(e) => {
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }
    let { comment } = this.state;
    try {
      await API.post('/courses/comments', {
            course: this.state.comment.course,
            comment: this.state.comment.comment
        },
      )
      this.props.addComment();
      this.setState({
            comment: { ...comment, comment: "" }
          });
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  isFormValid = () => {
    return this.state.comment.comment !== "";
  }

  renderError() {
    return this.state.error ? (toast.error(this.state.error)) : null;
  }

  render() {
      let defimg = "/media/avatar.png";
      let coverimg = defaultPhoto(defimg, localStorage.getItem("avatar_url"));
    return (
      <>

          <div className="comment-avatar form-group">
            <img src={coverimg} alt="avatar" style={{width:"45px",}}/>
          </div>
          <p>Name Surname</p>


      </>
    );
  }
}
