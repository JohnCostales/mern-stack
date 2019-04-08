import React, { Component } from 'react'

class Landing extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">John Costales</h1>
                            <p className="lead"></p>
                            <hr />
                            <a href="register.html" className="btn btn-lg btn-info mr-2">My Profile</a>
                            <a href="login.html" className="btn btn-lg btn-light">Blog post</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing