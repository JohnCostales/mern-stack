import React, { Component } from 'react'

class Card extends Component {
    render() {
        const { profile } = this.props
        return (
            <div className="span3 well">
                <a
                    href="#aboutModal"
                    data-toggle="modal"
                    data-target="#myModal">
                    <img
                        src={profile.user.avatar}
                        name="aboutme"
                        className="img-circle profile-img" />
                </a>
                <h3>{profile.user.name}</h3>
                <em>click my face for more</em>
            </div>
        )
    }
}

export default Card