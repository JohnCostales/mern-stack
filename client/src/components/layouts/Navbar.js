import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">

        </li>
        <li className="nav-item">

        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="dropdown04" href="http://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img
              className="avatar-img rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravatar connected to your email to display an image"
            />
          </a>
          <div className="dropdown-menu" aria-labelledby="dropdown04">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-user"></i>
              {' '}Profile
              </Link>
            <a
              href="/"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
              {' '}Logout
            </a>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md navbar navbar-light bg-lightblue mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MyPorfolio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
            controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Portfolios
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
