import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addExperience } from '../../actions/profileAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AddExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // Set state if props is an error
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onSubmit(e) {
        e.preventDefault()
        // console.log('submit')

        // combine the data properties of the state
        const expData = {
            ...this.state
        }
        // Bug fix when the endDate is filled then current is checked
        // this will empty the endDate into a blank
        if (expData.endDate !== "" && expData.disabled) {
            expData.endDate = ""
        }
        // Avoid sending these
        delete expData["disabled"]
        delete expData["errors"]

        this.props.addExperience(expData, this.props.history)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current,
        })
    }

    render() {
        const { errors } = this.state

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-link">Go Back</Link>
                            <h1 className="display-4 text-center header">Add your experiences</h1>
                            <p className="lead text-center">Add any relevant current or past jobs</p>
                            <small className="d-block pb-03 text-danger">*= required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="* company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    placeholder="location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From: </h6>
                                <TextFieldGroup
                                    placeholder="* Date started.."
                                    name="startDate"
                                    type="date"
                                    value={this.state.startDate}
                                    onChange={this.onChange}
                                    error={errors.startDate}
                                />
                                <h6>To: </h6>
                                <TextFieldGroup
                                    placeholder="Date finished"
                                    name="endDate"
                                    type={this.state.disabled ? 'hidden' : "date"}
                                    value={this.state.endDate}
                                    onChange={this.onChange}
                                    error={errors.endDate}
                                // disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Describe your work and also any additional information about your position"
                                />
                                <input type="submit" value="submit" className="btn btn-info btn-block-mt-4" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
AddExperience.prototypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience))