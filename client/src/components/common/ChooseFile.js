//-- This component contains our forgroups

import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ChooseFile = ({
    name,
    label,
    placeholder,
    value,
    error,
    info,
    type,
    onChange
}) => {
    return (
        <div className="form-group">
            <label for="exampleInputFile">Upload File</label>
            <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
            <small id="fileHelp" className="form-text text-muted">Upload you CV by clicking the Upload File button</small>
        </div>
    )
}

ChooseFile.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default ChooseFile