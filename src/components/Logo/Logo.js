import React from 'react';

import BurgerLogo from '../../assets/Images/BurgerLogo/logo.png';
import classes from './Logo.css';


const logo = (props)=> (

    <div className = {classes.Logo}>
        <img src = {BurgerLogo} alt = "Burger Logo"/>
    </div>
)

export default logo;