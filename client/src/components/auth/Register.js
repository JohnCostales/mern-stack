import React, { Component } from 'react'
// import axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authAction'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            confPass: '',
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    // LifeCycle Method. if authenticated push to /dashboard component
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    //If nextProps contains errors. setState for errors
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    //Change component state (This is an alternative to binding)
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //Submit Evenet
    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confPass: this.state.confPass
        }
        // console.log(newUser)

        // redirect from within registerUser action
        this.props.registerUser(newUser, this.props.history)

        // Send data to server
        // axios.post('/api/authentication/register', newUser)
        //     .then(res => console.log(res.data))
        //     .catch(err => this.setState({ errors: err.response.data }))
    }

    render() {
        // errors are inside this state
        // if errors exist 'is-invalid' will be included 
        const { errors } = this.state

        // const { user } = this.props.auth

        return (
            <div>
                <div className="register">
                    {/* {user ? user.name : null} /---Test state from redux ---/ */}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your myProfile Account</p>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextFieldGroup
                                        placeholder="Email"
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                        info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                    />
                                    <TextFieldGroup
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <TextFieldGroup
                                        placeholder="Confirm Password"
                                        name="confPass"
                                        type="Password"
                                        value={this.state.confPass}
                                        onChange={this.onChange}
                                        error={errors.confPass}
                                    />
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


// Map all of the prop types. Use PropTypes through redux
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

// Put the authState inside property call auth
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})

// export connect(,{object to map actions}) and component
export default connect(mapStateToProps, { registerUser })(withRouter(Register))