import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogFeed from './BlogFeed'

import { getBlogs } from '../../actions/blogAction'
import Spinner from '../common/spinner'


class Blogs extends Component {
    componentDidMount() {
        this.props.getBlogs()
    }

    render() {
        const { blogs, loading } = this.props.blog
        let blogContent

        if (blogs === null || loading) {
            blogContent = <Spinner />
        } else {
            blogContent = <BlogFeed blogs={blogs} />
        }
        return (
            <div className="feed">
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-group mb-4" role="group">
                            <Link to="/create-blog" className="btn btn-info">
                                Create New blogpost <i className="fas fa-plus mr-1"></i>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className="row">
                    {blogContent}
                </div>
            </div>
        )
    }
}

Blogs.propTypes = {
    getBlogs: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    blog: state.blog
})


export default connect(mapStateToProps, { getBlogs })(Blogs)
