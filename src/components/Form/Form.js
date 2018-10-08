import React, { Component } from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';

import Rating from  './comp/Rating/Rating';
// import Suggest from './comp/Suggest/Suggest';
import FormInput from './comp/FormInput/FormInput';

// import './Button.css';


class Form extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    initialData : PropTypes.object,
    readOnly: PropTypes.bool,
  };

  // constructor(props){
  //   super(props);
  // }
  //
  getData(){
    let data = {};
    this.props.fields.forEach(field => {
      data[field.id] = this.refs[field.id].getValue()
    });
    return data;
  }

  render(){
      return(
        <div>
          <form className="Form">
            {this.props.fields.map(field => {
              const prefield = this.props.initialData[field.id];
                // &&  this.props.initial;
                // Data[field.id];

              // console.log(prefield);
              if(!this.props.readOnly){

                return(
                  <div className="FormRow" key={field.id}>
                    <label className="FormLabel" htmlFor={field.id}>
                      {field.label}:
                    </label>
                    <FormInput {...field} ref={field.id}
                                defaultValue={prefield} />
                  </div>
                );
              }
              if(!prefield){
                return null;
              }
              console.log(this.props);
              return(
                <div className="FormRow" key={field.id} >
                  <span className="FormLabel">{field.label}:</span>
                  {
                    field.type === 'rating'
                      ? <Rating readonly={true}
                        defaultValue={parseInt(prefield,10)} />
                      : <div> {prefield}</div>
                  }
                </div>
              );
            }, this)}
          </form>

        </div>
      )
  }
}

export default Form;
