import React, { Component } from 'react'
import Moment from 'react-moment'

class PortfolioCreds extends Component {
    render() {
        // Destructure
        const { experience, education } = this.props

        const expItems = experience.map(exp =>
            <li key={exp._id} className="list-group-item bg-transparent ">
                <h4>{exp.company}</h4>
                <p>
                    <Moment format="YYYY/MMM/DD">{exp.startDate}</Moment> -
                    {exp.endDate === null ? (' Present') :
                        (<Moment format="YYYY/MMM/DD">{exp.startDate}</Moment>)}
                </p>
                <p>
                    <strong>Position: </strong> {exp.title}
                </p>
                <p>
                    {exp.location === '' ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
                </p>
                <p>
                    {exp.description === '' ? (null) : (<span><strong>Description: </strong>{exp.description}</span>)}
                </p>
            </li>
        )
        const eduItems = education.map(edu =>
            <li key={edu._id} className="list-group-item bg-transparent">
                <h4>{edu.school}</h4>
                <p>
                    <Moment format="YYYY/MMM/DD">{edu.startDate}</Moment> -
                    {edu.endDate === null ? (' Present') :
                        (<Moment format="YYYY/MMM/DD">{edu.startDate}</Moment>)}
                </p>
                <p>
                    <strong>Degree: </strong> {edu.degree}
                </p>
                <p>
                    {edu.fieldOfStudy === '' ? null : (<span><strong>Study Field: </strong>{edu.fieldOfStudy}</span>)}
                </p>
                <p>
                    {edu.location === '' ? null : (<span><strong>Location: </strong>{edu.location}</span>)}
                </p>
                <p>
                    {edu.description === '' ? (null) : (<span><strong>Description: </strong>{edu.description}</span>)}
                </p>
            </li>
        )
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-secondary">Education</h3>
                    {eduItems.length > 0 ? (
                        <ul className="list-group">{eduItems}</ul>
                    ) : (
                            <p className="text-center">No Experiences Available</p>
                        )}
                </div>
                <div className="col-md-6">
                    <h3 className="text-secondary">Experience</h3>
                    {expItems.length > 0 ? (
                        <ul className="list-group">{expItems}</ul>
                    ) : (
                            <p className="text-center">No Experiences Available</p>
                        )}
                </div>
            </div>
        )
    }
}

export default PortfolioCreds