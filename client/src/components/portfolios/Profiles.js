import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner'
import Error404 from '../common/404'
import { getProfiles } from '../../actions/profileAction'
import ProfileCard from './ProfileCard'

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles()
    }

    render() {
        // Destructuring
        const { profiles, loading } = this.props.profile
        let profileItems

        // Test if profiles has content
        if (profiles === null || loading) {
            profileItems = <Spinner />
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileCard key={profile._id} profile={profile} />
                ))
            } else {
                profileItems = <Error404 />
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Portfolio Accounts</h1>
                            <p className="lead">Browse accounts created</p>
                            <div className="card-deck">{profileItems}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Map all of the prop types
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

// Put the authState inside property called auth
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { getProfiles })(Profiles)
