import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'
import { Link } from 'react-router-dom'

class PortfolioHeader extends Component {
    render() {
        // destructure
        const { profile } = this.props
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img className="rounded-circle" src={profile.user.avatar} alt="" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">{profile.user.name}</h1>
                            <p className="lead text-center">{profile.status} | {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                            <Link>
                                {isEmpty(profile.social && profile.social.twitter) ? null : (
                                    <a className="text-white p-2"
                                        href="{profile.social.twitter}">
                                        <i className="fab fa-twitter fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.facebook) ? null : (
                                    <a className="text-white p-2"
                                        href="{profile.social.facebook}">
                                        <i className="fab fa-facebook fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                                    <a className="text-white p-2"
                                        href="{profile.social.linkedin}">
                                        <i className="fab fa-linkedin fa-2x"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.instagram) ? null : (
                                    <a className="text-white p-2"
                                        href="{profile.social.instagram}">
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PortfolioHeader