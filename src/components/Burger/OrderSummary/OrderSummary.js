import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';



class OrderSummary extends Component {

    
   


    render(){
    
    
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map( (igkeys) => {
    
            return (<li key = {igkeys}>
                    <span style = {{textTransform: 'capitalize'}}>{igkeys}</span>: {this.props.ingredients[igkeys]}
                    </li>
                    );
        
        
        });
    
    
    
        return(
            <Auxiliary>
            <h3>Your Order Summary !</h3>
            <p>A delicious Burger with the following Ingredients:</p>
            <ul>
            {ingredientsSummary}
            </ul>
    
            <p>Continue to checkout !!</p>
    
            <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
    
            <Button btnType = "Danger" clicked = {this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType = "Success" clicked = {this.props.purchaseContinued}>CONTNUE</Button>
    
        </Auxiliary>
        );
    }

} 

export default OrderSummary;