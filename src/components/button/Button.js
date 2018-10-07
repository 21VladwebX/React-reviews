import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';



// import './Button.css';



function Button (props){
  let cssclasses = classNames('Button', props.className);
  return  props.href ?
        <a  {...props} className={cssclasses}>
          {props.children}
        </a>
    :
        <button {...props} className={cssclasses}/>


}

Button.propTypes = {
  href: PropTypes.string,
}
export default Button;
