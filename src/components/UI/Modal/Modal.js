import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
    <Fragment>
        <Backdrop show={props.showModal} clicked={props.closeModal} />
        <div className={classes.Modal}
            style={{
                transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.showModal ? 1 : 0
            }}
        >
            {props.children}
        </div>
    </Fragment>
)

export default modal;