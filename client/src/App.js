import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthtoken from './utils/SetAuthtoken';

// Actions
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';

import './App.css';

// Components used
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/profile/CreateProfile'
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import Profiles from './components/portfolios/Profiles';
import Portfolio from './components/portfolios/Portfolio/Portfolio';

// Check for tokens and keep authenticated
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthtoken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="background-image">
              <div className="landing-inner text-light">
                <Route exact path="/" component={Landing} />
                <div className="container">
                  <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/add-experience" component={AddExperience} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/add-education" component={AddEducation} />
                  </Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profiles" component={Profiles} />
                  <Route exact path="/profile/:handle" component={Portfolio} />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
