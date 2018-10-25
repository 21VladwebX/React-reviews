import React, { Component } from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from '../../../button/Button';
import Rating from  '../Rating/Rating';
import Suggest from '../Suggest/Suggest';


// import './Button.css';


class FormInput extends Component {
    static propTypes = {
        type: PropTypes.oneOf([
            'year',
            'suggest',
            'rating',
            'text',
            'input'
        ]),
        id: PropTypes.string,
        options: PropTypes.array,
        defaultValue: PropTypes.any,
    };

    getVelue(){
        return 'value' in this.refs.input
            ? this.refs.input.value
            : this.refs.input.getVelue();
    }

    render(){
        const common = {
            id: this.props.id,
            ref: 'input',
            defaultValue: this.props.defaultValue
        };

        switch (this.props.type) {
            case 'year':
                return(
                    <input
                        {...common}
                        type='number'
                        defaultValue={this.props.defaultValue || new Date().getFullYear()}
                    />
                );
            case 'suggest':
                return(
                    <Suggest
                        {...common}
                        options={this.props.options}
                    />
                );
            case 'rating':
                return(
                  <Rating
                      {...common}
                      defaultValue={parseInt(this.props.defaultValue,10)}
                  />
                );
            case 'text':
                return(
                    <textarea {...common}></textarea>
                );
            default:
                return(
                    <input {...common} type="text"/>
                )
        }
    }
}

export default FormInput;

