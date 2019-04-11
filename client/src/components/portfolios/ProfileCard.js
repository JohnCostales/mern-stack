import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'

class ProfileCard extends Component {
    render() {
        const { profile } = this.props

        return (
            <div className="card bg-transparent border-0 text-light col-md-4 mo">
                <Link to={`/profile/${profile.handle}`}>
                    <img src={profile.user.avatar} alt="Pink Flamingo" className="card-img-top rounded-circle" />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{profile.user.name}</h5>
                    <p className="card-text">
                        {profile.status} | {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                    </p>
                </div>
            </div>
        )
    }
}

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired
}
export default ProfileCard

