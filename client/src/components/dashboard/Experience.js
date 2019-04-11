import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment' // Date formatting
import { deleteExperience } from '../../actions/profileAction'


class Experience extends Component {

    onDelete(id) {
        this.props.deleteExperience(id)
    }
    render() {
        // map through array
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.title}</td>
                <td>{exp.company}</td>
                <td>{exp.location}</td>
                <td>
                    <Moment format="DD-MMM-YYYY">
                        {exp.startDate}
                    </Moment> -{' '}
                    {exp.endDate === null ? ('Present') :
                        <Moment format="DD-MMM-YYYY">
                            {exp.endDate}
                        </Moment>
                    }
                </td>
                <td><button className="btn btn-danger" onClick={this.onDelete.bind(this, exp._id)}>Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4">Experiences</h4>
                <table className="table text-light">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>From - To</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {experience}
                    </tbody>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)