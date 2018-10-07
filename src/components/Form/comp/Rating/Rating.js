import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Star from '../../../img/star.svg';


import './Rating.css';



class Rating extends Component {
  static propTypes = {
    defaultValue: PropTypes.number,
    readOnly: PropTypes.bool,
    max: PropTypes.number,
  };
  constructor(props){
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    }
  }

  getValue(){
    return this.state.rating;
  }

  setTemp(rating){
    console.log(rating);
    this.setState({
      tmpRating: rating
    });
  }
  setRating(rating){
    this.setRating({
      tmpRating: rating,
      rating: rating,
    })
  }
  reset(){
    this.setTemp(this.state.rating);
  };

  componentWillReceiveProps(nextProps){
    //реагирование на внешние изменения
    this.setRating(nextProps.defaultValue);
  }

  render(){
    const stars = [];
    for(let i = 1; i < this.props.max; i++){
      stars.push(
        <span
          className={i <= this.props.tmpRating
                      ? 'RatingOn'
                      : null}
          key={i}
          onClick={!this.props.readOnly && this.setRating.bind(this,i)}
          onMouseOver={!this.props.readOnly && this.setTemp.bind(this,i)}
        >
          <img src={Star} alt="stars"/>
        </span>
      )
    }
    // console.log(stars);
    return(
      <div className={classNames({
        Rating : true,
        RatingReadOnly : this.props.readOnly
      })}>
        {stars}
        {this.props.readOnly || !this.props.id
          ? null
          : <input type="hidden"
            id={this.props.id}
             value={this.state.rating}
            />


        }


      </div>
    )
  }
}



export default Rating;
