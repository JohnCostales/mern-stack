import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addEducation } from '../../actions/profileAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AddEducation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            school: '',
            degree: '',
            fieldOfStudy: '',
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
        // combine the data properties of the state
        const eduData = {
            ...this.state
        }
        // Avoid sending these
        delete eduData["disabled"]
        delete eduData["errors"]

        this.props.addEducation(eduData, this.props.history)
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
                            <h1 className="display-4 text-center header">Add your education</h1>
                            <p className="lead text-center">Add any relevant current or past educations</p>
                            <small className="d-block pb-03 text-danger">*= required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* institution"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    placeholder="* degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    placeholder="Field of study if applicable"
                                    name="fieldOfStudy"
                                    value={this.state.fieldOfStudy}
                                    onChange={this.onChange}
                                    error={errors.fieldOfStudy}
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
                                        Currently Studying
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Description of your studies"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Describe your work and also any additional information about your education"
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
AddEducation.prototypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))