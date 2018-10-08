import React, { Component } from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';


class Suggest extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
  };
  constructor(props){
    super(props);
    this.state = {
      value : props.defaultValue
    }
  }
  getValue(){
    // return this.refs.lowlevelinput.value;
    return this.state.value;
  }

  render(){
    const randomid = Math.random().toString(16).substr(2);
    // console.log(`randomidnd is ${randomid}`);

    return(
      <div>
        <input
          list = {randomid}
          defaultValue = {this.props.defaultValue}
          // ref = "lowlevelinput"
          id = {this.props.id}
          onChange = {e=>{
            this.setState({
              value: e.target.value
            })
          }}
        />
        <datalist id={randomid}>{
          this.props.options.map((item, idx)=>{
            return (<option value={item} key={idx}>{item}</option>)
          })
        }
        </datalist>
      </div>
    )
  }
}

export default Suggest;
