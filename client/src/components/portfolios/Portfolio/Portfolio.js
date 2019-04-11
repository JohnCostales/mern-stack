import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PortfolioHeader from './PortfolioHeader'
import PortfolioAbout from './PortfolioAbout'
import PortfolioCreds from './PortfolioCreds'
import Spinner from '../../common/spinner'
import { getProfileByHandle } from '../../../actions/profileAction'

class Portfolio extends Component {

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }
    render() {
        const { profile, loading } = this.props.profile
        let profileContent

        if (profile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-link mb-3 float-left">
                                Back to Profiles
                            </Link>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                    <PortfolioHeader profile={profile} />
                    <PortfolioAbout profile={profile} />
                    <PortfolioCreds
                        education={profile.education}
                        experience={profile.experience} />
                </div>
            )
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Portfolio.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Portfolio)