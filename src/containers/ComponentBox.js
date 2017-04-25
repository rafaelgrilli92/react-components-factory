import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string.isRequired
}

const ComponentBox = ({title, children}) => 
<div className="box box-primary">
    <div className="box-header with-border">
        <h3 className="box-title">{ title }</h3>
    </div>
    <div className="box-body">
        { children }
    </div>
</div>

ComponentBox.propTypes = propTypes;

export default ComponentBox;
