import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary';


const CheckoutSummary = (props) => (

    <div className={classes.CheckoutSummary}>
        <h1>Well, we hope it tastes Good !</h1>
        
        <div style = {{width: "100%", margin: "auto"}}>
            <Burger Ingredients={props.ingredients}/>
        </div>
        <Button btnType = 'Danger' clicked={props.orderCancelHandler} >Cancel</Button>

        <Button btnType = 'Success' clicked={props.orderContinueHandler} >Continue</Button>
        
    </div>
)

export default CheckoutSummary;