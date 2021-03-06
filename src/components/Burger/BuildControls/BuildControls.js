import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];



const buildControls = (props) => (


    <div className = {classes.BuildControls} >

    <p> Current Price: <strong>$ {props.price.toFixed(2)}</strong></p>

    {controls.map((ctrl)=> (
        <BuildControl  key = {ctrl.label} 
        label = {ctrl.label} 
        added = {()=>{props.addedIngredients(ctrl.type)}}
         removed = {()=> {props.removedIngredients(ctrl.type)}}
         disabled = {props.disabled[ctrl.type]}
         
         />
    ))}

    <button className = {classes.OrderButton} disabled = {!props.purchasable} onClick = {props.order}>{props.isAuth? "ORDER NOW":"Signup to Order"}</button>
    </div>

);


export default buildControls;