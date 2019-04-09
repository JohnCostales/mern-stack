import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Landing extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Welcome to myPortfolio</h1>
                            <p className="lead"></p>
                            <hr />
                            <Link to="profile/user/SET-THIS-TO-MY-ID" className="btn btn-lg btn-info mr-2">My Portfolio</Link>
                            <Link to="/blog" className="btn btn-lg btn-light">Blog post</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Landing