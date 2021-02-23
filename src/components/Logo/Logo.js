import React from 'react';
import Logo from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.css'

const logo = props => (
    <div className={classes.Logo}>
        <img src={Logo} alt='burger-logo' />
    </div>
)

export default logo 