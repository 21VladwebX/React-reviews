import React, { Component } from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from '../button/Button';
// import Rating from  './comp/Rating/Rating';
// // import Suggest from './comp/Suggest/Suggest';
// import FormInput from './comp/FormInput/FormInput';

// import './Button.css';


class Dialog extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        confirmLabel: PropTypes.string,
        modal: PropTypes.bool,
        onAction: PropTypes.func,
        hasCancel: PropTypes.bool,
    };

    componentwillUnmount(){
        document.body.classList.remove('DialogModalOpen')
    }

    comonentDidMount(){
        if(this.props.modal){
            document.body.classList.add('DialogModalOpen')
        }
    }

    render(){

        return(
            <div className={this.props.modal ?
                'Dialog Dialogmodal' : 'Dialog'}>
                <div className={this.props.modal ?
                    'DialogModalWrap' : null}>
                    <div className="DialogHeader">{this.props.header}</div>
                    <div className="DialogBody">{this.props.children}</div>
                    <div className="DialogFooter">
                        {
                            this.props.hasCancel
                                ? <span
                                    className="DialogDismiss"
                                    onClick={this.props.onAction.bind(this,'dismiss')}>
                                    Cancel
                                </span>
                                : null
                        }
                        <Button
                            onClick={this.props.onAction.bind(this, this.props.hasCancel
                                ? 'confirm'
                                : 'dismiss'
                            )}
                        >
                            {this.props.confirmLabel}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dialog;

Dialog.defaultProps = {
    header: 'ok',
    modal: PropTypes.bool,
    onAction: () => {},
    hasCancel: true,
};