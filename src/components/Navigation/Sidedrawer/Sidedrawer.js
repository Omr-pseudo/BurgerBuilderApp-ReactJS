import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';


import classes from './Sidedrawer.css';


const sidedrawer = (props)=> {

    let attachedClasses = [classes.Sidedrawer, classes.Close];

    if(props.open){

        attachedClasses = [classes.Sidedrawer, classes.Open];
    }

    return(
        <Auxiliary>
            <Backdrop show = {props.open} clicked = {props.closed} />
        <div className = {attachedClasses.join(' ') } onClick = {props.closed}>
            <div className = {classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>

        </div>
        </Auxiliary>

    );
}

export default sidedrawer;