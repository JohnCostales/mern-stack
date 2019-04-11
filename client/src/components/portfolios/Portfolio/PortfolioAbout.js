import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'

class PortfolioAbout extends Component {
    render() {
        const { profile } = this.props

        // Map through skill list
        const skills = profile.skills.map((skill, index) => (
            <div key={index} className="p-3">
                <i className="fa fa-check"></i>{skill}
            </div>
        ))
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="mb-3">
                        <h3 className="text-secondary">About me:</h3>
                        <p className="lead">{isEmpty(profile.bio) ?
                            (<span>No bio set for this profile</span>) :
                            (<span>{profile.bio}</span>)}</p>
                        <hr />
                        <h3 className="text-center text-secondary">Skill Set</h3>
                        <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {skills}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PortfolioAbout