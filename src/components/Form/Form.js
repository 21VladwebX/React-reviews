import React, { Component } from 'react';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';

import Rating from  '../Form/comp/Rating/Rating';
import Suggest from '../Form/comp/Suggest/Suggest';

// import './Button.css';

let suggest = ['xxx', 'pxp', 'asx'];

class  Form extends Component {
  // static.propTypes{
  //
  // }

  // constructor(props){
  //   super(props);
  // }

  render(){



    return(
      <div className="Form">
        <Suggest options={suggest} />
        <div>
          <span> There are no stars</span><Rating/>
        </div>
        <div>
          <span> This is 4 stars</span><Rating max={10} defaultValue={4}/>
        </div>
        <div>
          <span> This is 1 stars</span><Rating defaultValue={1}/>
        </div>
      </div>
    )
  }

}

export default Form;
