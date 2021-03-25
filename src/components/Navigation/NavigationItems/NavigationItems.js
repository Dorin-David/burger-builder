import React, { Fragment } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {

    let authInterface = <NavigationItem link="/user">User</NavigationItem>;

    if (props.isAuth) {
        authInterface = <Fragment>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
        </Fragment>
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {authInterface}
        </ul>
    )
}



export default navigationItems;