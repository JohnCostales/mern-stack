import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlog } from '../../actions/blogAction'

export class BlogItem extends Component {

    onDelete(id) {
        // console.log(id);
        this.props.deleteBlog(id)
    }

    render() {
        const { blog, auth } = this.props
        console.log(blog.title);
        return (
            <div className="card bg-transparent card-body mb-3 col-md-12">
                <div className="row">
                    <div className="col-md-2">

                        <img
                            className="rounded-circle d-none d-md-block"
                            src={blog.avatar}
                            alt="" />
                        <br />
                        <p className="text-center">{blog.name}</p>
                    </div>
                    <div className="col-md-10">
                        <h5>{blog.title}</h5>
                        <p className="lead">{blog.preview}{' '}
                            <Link to={`/blog/${blog._id}`} className="btn btn-link mr-1" >
                                Read more..
                        </Link>
                        </p>
                        <button type="button" className="btn btn-light mr-1" disabled>
                            <i className="text-info fas fa-thumbs-up" ></i>
                            <span className="badge badge-light">{blog.likes.length}</span>
                        </button>
                        <button type="button" className="btn btn-light mr-1" disabled>
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        {blog.user === auth.user ? (
                            <button
                                onClick={this.onDelete.bind(this, blog._id)}
                                type="button"
                                className="btn btn-danger mr-1"
                            >
                                <i className="fas fa-times" />
                            </button>
                        ) : null}
                        {/* 
                            Couldn't get auth from state so this is just to test delete blogs post
                            Ideally we only want the user who owns the blog post to delete the blog
                        */}
                        <button
                            onClick={this.onDelete.bind(this, blog._id)}
                            type="button"
                            className="btn btn-link mr-1"
                            disabled>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


BlogItem.propTypes = {
    deleteBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteBlog })(BlogItem)
