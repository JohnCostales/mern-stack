// Library
const express = require("express")
const router = express.Router()
const mognoose = require("mongoose")
const passport = require("passport")

const Blog = require('../model/Blog')
const Profile = require('../model/Profile')

// Validation
const validateBlogPost = require('../validation/blog')
const validateComments = require('../validation/comment')

// @route GET api/blogs/test
// @desc Tests thread routes
// @access Public
router.get('/test', (req, res) =>
    res.json({
        msg: "This blog post works"
    })) //Get json response

// @route GET api/blogs
// @desc Show blogs
// @access Public
router.get('/', (req, res) => {
    Blog.find()
        .sort({ date: -1 })
        .then(blogs => res.json(blogs))
        .catch(err => res.status(404).json({ noblogsfound: 'No blogs found' }))
})

// @route GET api/blogs:id
// @desc Show blogs by id
// @access Public
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blogs => res.json(blogs))
        .catch(err => res.status(404).json({ noblogfound: 'Blog not found' }))
})

// @route POST api/blog
// @desc Create a blog post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBlogPost(req.body)

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newBlog = new Blog({
        title: req.body.title,
        image: req.body.image,
        link: req.body.link,
        text: req.body.text,
        preview: req.body.preview,
        name: req.body.name,
        avatar: req.body.avatar,
    })

    newBlog.save().then(blog => res.json(blog))
})

// @route Delete api/blogs/:id
// @desc delete blogs by id
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Blog.findById(req.params.id)
                    .then(blog => {
                        // Check for blog owner
                        // Only accepts strings
                        if (blog.user.toString() !== req.user.id) {
                            return res.status(401).json({ notauthorized: 'User is not authorized' })
                        }

                        //Delete
                        blog.remove().then(() => res.json({ success: true }))
                    })
                    .catch(err => res.status(404).json({ blognotfound: 'No blog found' }))
            })
    })

// @route Get api/blogs/like/:id
// @desc Like
// @access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Blog.findById(req.params.id)
                    .then(blog => {
                        // Check if liked
                        if (blog.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                            return res.status(400).json({ alreadyliked: 'User already liked this blog' })
                        }

                        // Add user to likes array
                        blog.likes.push({ user: req.user.id })

                        blog.save().then(blog => res.json(blog))
                    })
                    .catch(err => res.status(404).json({ blognotfound: 'No blog found' }))
            })
    })

// @route Get api/blogs/dislike/:id
// @desc dislike
// @access private
router.post('/dislike/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Blog.findById(req.params.id)
                    .then(blog => {
                        // Check if liked
                        if (blog.likes.filter(like => like.user.toString() === req.user.id)
                            .length === 0) {
                            return res.status(400).json({ notliked: 'User have not liked this blog' })
                        }

                        // Get remove index
                        const removeIndex = blog.likes
                            .map(item => item.user.toString())
                            .indexOf(req.user.id)

                        //Splice out of array
                        blog.likes.splice(removeIndex, 1)

                        //Save
                        blog.save().then(blog => res.json(blog))
                    })
                    .catch(err => res.status(404).json({ blognotfound: 'No blog found' }))
            })
    })

// @route Get api/blogs/comment/:id
// @desc Add comment to blog post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateComments(req.body)
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        Blog.findById(req.params.id)
            .then(blog => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                }

                // Add to comments array
                blog.comments.push(newComment)

                //Save 
                blog.save().then(blog => res.json(blog))
            })
            .catch(err => res.status(404).json({ blognotfound: 'No blog found' }))
    })

// @route Delete api/blogs/comment/:id/:comment_id
// @desc Remove comment from post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Blog.findById(req.params.id)
            .then(blog => {
                // Check if comment exist
                if (blog.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({ commentnotexists: 'Comment does not exist' })
                }

                // Get remove index
                const removeIndex = blog.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id)

                //Splice comment out of array
                blog.comments.splice(removeIndex, 1)

                blog.save().then(blog => res.json(blog))
            })
        // .catch(err => res.status(404).json({ blognotfound: 'No blog found' }))
    })
module.exports = router