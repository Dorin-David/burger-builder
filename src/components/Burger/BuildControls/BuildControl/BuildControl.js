import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = props => (
    <div className={classes.BuildControl}>
        <div style={{width: '70px'}}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disableRemoving}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
)

export default buildControl