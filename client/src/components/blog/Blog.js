import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBlog } from '../../actions/blogAction'
import Spinner from '../common/spinner'

class Blog extends Component {
    componentDidMount() {
        this.props.getBlog(this.props.match.params.id)
    }

    render() {
        const { blog, loading } = this.props
        let blogContent

        if (blog === null || loading || Object.keys(blog).length === 0) {
            blogContent = <Spinner />
        } else {
            blogContent = (
                <div className="col-md-8 offset-lg-2">
                    <h1>{blog.blogs.title}</h1>
                    <small className="text-muted font-italic">Author: {blog.blogs.name}</small>
                    <p className="text-justify">{blog.blogs.text}</p>
                </div>
            )
        }
        return (
            <div className="blog">
                <div className="container">
                    <div className="row">
                        {blogContent}
                    </div>
                </div>
            </div>
        )
    }
}

Blog.propTypes = {
    getBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    blog: state.blog
})



export default connect(mapStateToProps, { getBlog })(Blog)
