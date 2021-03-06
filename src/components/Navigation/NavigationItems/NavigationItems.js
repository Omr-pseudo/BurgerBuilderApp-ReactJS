import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationitems = (props) => (

    <ul className = {classes.NavigationItems}>
        <NavigationItem link = "/" exact>Burger-Builder</NavigationItem>
        {props.isAuth? <NavigationItem link = "/orders">Orders</NavigationItem>: null}
        {
            !props.isAuth?
            <NavigationItem link = '/auth'>Authentication</NavigationItem>:
            <NavigationItem link = '/logout'>LOG OUT</NavigationItem>
        }
    </ul>
)

export default navigationitems;