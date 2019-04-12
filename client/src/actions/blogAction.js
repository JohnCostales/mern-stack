import axios from 'axios'

import {
    GET_ERRORS,
    GET_BLOGS,
    BLOG_LOADING,
    DELETE_BLOG,
    GET_BLOG
} from './types'

//Add a blog
export const addBlog = (newBlog, history) => dispatch => {
    axios
        .post('/api/blogs', newBlog)
        .then(res => history.push('/posts'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Add a blog
export const deleteBlog = id => dispatch => {
    axios
        .delete(`/api/blog/${id}`)
        .then(res => dispatch({
            type: DELETE_BLOG,
            payload: id
        })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Get blogs
export const getBlogs = () => dispatch => {
    dispatch(setBlogLoading())
    axios
        .get('/api/blogs')
        .then(res =>
            dispatch({
                type: GET_BLOGS,
                payload: res.data
            })
        ).catch(err =>
            dispatch({
                type: GET_BLOGS,
                payload: null
            })
        )
}

//Set loading state
export const setBlogLoading = () => {
    return {
        type: BLOG_LOADING
    }
}

//Get blogs
export const getBlog = (id) => dispatch => {
    dispatch(setBlogLoading())
    axios
        .get(`/api/blogs/${id}`)
        .then(res =>
            dispatch({
                type: GET_BLOG,
                payload: res.data
            })
        ).catch(err =>
            dispatch({
                type: GET_BLOG,
                payload: null
            })
        )
}