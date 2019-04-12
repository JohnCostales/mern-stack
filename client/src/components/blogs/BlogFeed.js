import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlogItem from './BlogItem'

class BlogFeed extends Component {
    render() {
        const { blogs } = this.props
        return blogs.map(blog => <BlogItem key={blog._id} blog={blog} />)
    }
}

BlogFeed.propTypes = {
    blogs: PropTypes.array.isRequired
}

export default BlogFeed
