import React, { Component } from 'react';

import PropTypes from 'prop-types';




import './Actions.css';



function Actions(props) {
  return(
    <div className="Actions">
      <span
        tabIndex = "0"
        className = "ActionsInfo"
        title = "MoreInfo"
        onClick={props.onAction.bind(null,'info')}
      >
        &#8505;
      </span>
      <span
        tabIndex = "0"
        className = "ActionsEdit"
        title = "Edit"
        onClick={props.onAction.bind(null,'edit')}
      >
        &#10000;
      </span>
      <span
        tabIndex = "0"
        className = "ActionsDelete"
        title = "Delete"
        onClick={props.onAction.bind(null,'delete')}
      >
        x
      </span>
    </div>
  )
}
Actions.propTypes = {
  defaultValue: PropTypes.number,
  readOnly: PropTypes.bool,
  max: PropTypes.number,
};

Actions.defaultProps = {
  onAction: () => {}
};


export default Actions;
