import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    index: PropTypes.number.isRequired,
    onRemoveFile: PropTypes.func.isRequired,
    previewUrl: PropTypes.string.isRequired
}

const Item = ({
    index,
    onRemoveFile,
    previewUrl
}) =>
<li className="mpi-item">
    <img src={previewUrl} alt={`Upload ${index + 1}`}/>
    <a onClick={() => onRemoveFile(index)} className="mpi-remove-btn">
        Remove
    </a>
</li>

Item.propTypes = propTypes;

export default Item;