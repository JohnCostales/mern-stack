import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment' // Date formatting
import { deleteEducation } from '../../actions/profileAction'


class Education extends Component {

    onDelete(id) {
        this.props.deleteEducation(id)
    }
    render() {
        // map through array
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldOfStudy}</td>
                <td>{edu.location}</td>
                <td>
                    <Moment format="DD-MMM-YYYY">
                        {edu.startDate}
                    </Moment> -{' '}
                    {edu.endDate === null ? ('Present') :
                        <Moment format="DD-MMM-YYYY">
                            {edu.endDate}
                        </Moment>
                    }
                </td>
                <td><button className="btn btn-danger" onClick={this.onDelete.bind(this, edu._id)}>Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4">Educations</h4>
                <table className="table text-light">
                    <thead>
                        <tr>
                            <th>Institution</th>
                            <th>Degree</th>
                            <th>Course</th>
                            <th>Location</th>
                            <th>From - To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)