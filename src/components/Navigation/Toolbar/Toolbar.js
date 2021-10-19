import React from 'react';

import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';

import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';



const toolbar = (props)=> (
    <header className = {classes.Toolbar}>
        <DrawerToggle  clicked = {props.toggleSideDrawer}/>
        <div className = {classes.Logo}>
        <Logo/>
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems isAuth = {props.isAuthenticated} />
        </nav>
    </header>
)

export default toolbar;