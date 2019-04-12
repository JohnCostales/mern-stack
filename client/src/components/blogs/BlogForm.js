import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import TextFieldGroup from '../common/TextFieldGroup'
import { addBlog } from '../../actions/blogAction'

export class BlogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      text: '',
      preview: '',
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
  }


  componentWillReceiveProps(newProps) {
    if (newProps.errors) this.setState({ errors: newProps.errors })
  }

  onSubmit(e) {
    e.preventDefault()
    const { user } = this.props.auth
    const newBlog = {
      title: this.state.title,
      text: this.state.text,
      preview: this.state.preview,
      name: user.name,
      avatar: user.avatar,
    }

    this.props.addBlog(newBlog, this.props.history)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state
    return (
      <div className="container">
        <div className="row">

          <div className="col-md-8 m-auto">
            <Link to="/posts" className="btn btn-link"><i className="fas fa-chevron-left"></i> Go Back</Link>
            <h1 className="display-4 text-center">Create a blog post</h1>
            <p className="lead text-center">
              Create a new blog post
              </p>
            <small className="d-block pb-3">* = required</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Title"
                name="title"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.title}
                info="Add a title to your blog"
              />
              <TextAreaFieldGroup
                placeholder="Write your blog post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
                info="This is where you can write a blog post"
              />
              <TextFieldGroup
                placeholder="Preview"
                name="preview"
                value={this.state.preview}
                onChange={this.onChange}
                error={errors.preview}
                info="Write a short preview about your blog or add the first couple sentences"
              />
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { addBlog })(withRouter(BlogForm))