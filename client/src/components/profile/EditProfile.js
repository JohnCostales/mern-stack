import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileAction'
import isEmpty from 'lodash.isempty'



class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            bio: '',
            location: '',
            status: '',
            skills: '',
            github: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps(nextProps) {
        // Set state if props is an error
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        // Next prop profilp.profile object
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile

            // Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',')

            //Check for user's empty datas
            profile.location = !isEmpty(profile.location) ? profile.location : ''
            profile.github = !isEmpty(profile.github) ? profile.github : ''
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
            profile.social = !isEmpty(profile.social) ? profile.social : {}
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''

            //Set component field state
            this.setState({
                handle: profile.handle,
                location: profile.location,
                bio: profile.bio,
                status: profile.status,
                skills: skillsCSV,
                github: profile.github,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                instagram: profile.instagram
            })
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        // combine the data properties of the state
        const profileData = {
            ...this.state
        }

        // Avoid sending these
        delete profileData["displaySocialInputs"]
        delete profileData["errors"]

        this.props.createProfile(profileData, this.props.history)
    }

    render() {
        const { errors, displaySocialInputs } = this.state;

        // local variable to distructure displaySocialInputs
        let socialInputs

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="LinkedIn Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>)
        }

        // Create an array of options for status list
        const options = [
            { label: 'Select Career Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student', value: 'Student' },
            { label: 'Instructor', value: 'Instructor' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-link">Go Back</Link>
                            <h1 className="display-4 text-center">Edit your profile</h1>
                            <small className="d-block pb-3 text-danger">* = required</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Username"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="This must be a unique username for your profile URL"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="This does not have to be an exact address"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Write something about yourself"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="This is where you can write a short discription about yourself"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Seperate each skill with a `,` (eg. HTML,CSS,JavaScript)"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Select a career status from the list"
                                />
                                <TextFieldGroup
                                    placeholder="Enter your github username"
                                    name="github"
                                    value={this.state.github}
                                    onChange={this.onChange}
                                    error={errors.github}
                                    info="If you want to link your latest github repo, include your username"
                                />
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-secondary"
                                    >
                                        Social Networks</button>
                                    <span className="text-muted"> Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Map all of the prop types
EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

// Put the authState inside property called auth
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
