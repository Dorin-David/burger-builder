import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
     
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children
    }
    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.showModal} clicked={this.props.closeModal} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.showModal ? 1 : 0
                    }}
                >
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal;