import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileAction'
import Spinner from '../common/spinner'
import ProfileActions from './ProfileActions.js'


class Dashboard extends Component {
  //  Lifecycle
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    // variables from profileAction
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Check if user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome&nbsp;
            <Link to={`/profile/${profile.handle}`} >
                {user.name}
              </Link>
            </p>
            <ProfileActions />
            {/* EXP AND EDUCATION */}
            
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.name}
            </p>
            <p>You have not yet set up a profile, please add some info </p>
            <Link to="create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Account</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propType = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
