import React, { Component } from 'react';





class Example extends Component {
  constructor(props){
    super(props);


  }

  render() {
    // console.log(`this.props children`);
    // console.log(this.props.children);
    // console.log(`this.props`);
    // console.log(this.props);
    // switch (this.props.size) {
    //   case 'medium':
    //     console.log(`ada`);
    //     break;
    // }
    let attributes = Object.assign({},this.props);
    delete attributes.size;
    console.log(`this.props children`);
    console.log(this.props.children);
    console.log(`this.props`);
    console.log(this.props);
    let {size, ...atr} = this.props;
    return (
      <a {...atr}>
        {this.props.children}
      </a>
    );
  }
}

export default Example;
