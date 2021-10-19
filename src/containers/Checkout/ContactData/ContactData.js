import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import Input from '../../../components/UI/Input/Input';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import classes from './ContactData.css';

import { checkValidity } from '../../../store/utility';



class ContactData extends Component {

    state = {

        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation : { 
                    required:true
                },
                valid:false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation : { 
                    required:true
                },
                valid:false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip code'
                },
                value: '',
                validation : { 
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail address'
                },
                value: '',
                validation : { 
                    required:true
                },
                valid:false,
                touched: false
            },
            Delivery_Method: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid: true
            }
        },
        formValidity: false
    }


   
        
    orderHandler = (event) => {
        
        event.preventDefault();
        
        let formData = {};

        for (let elementIdentifer in this.state.orderForm){

            formData[elementIdentifer] = this.state.orderForm[elementIdentifer];
        }


          const orders = {
  
              ingredients: this.props.ings,
              totalPrice: this.props.price,
              orderData: formData,
              userId:this.props.userId
              
              
          }
  
         this.props.onOrderBurger(orders, this.props.token);
      }
  

      orderChangeHandler = (event, elementIdentifier) => {

        const orderFormClone = {
            ...this.state.orderForm
        };

        const elementIdentifiedClone = {
            ...this.state.orderForm[elementIdentifier]
        };

        elementIdentifiedClone.value = event.target.value;
        
        elementIdentifiedClone.valid = checkValidity(elementIdentifiedClone.value, elementIdentifiedClone.validation );

        elementIdentifiedClone.touched = true;

        orderFormClone[elementIdentifier] = elementIdentifiedClone;

        

        let formIsValid = true;

        for(let formIdentifier in orderFormClone){

            formIsValid = orderFormClone[formIdentifier].valid && formIsValid; 
        }


        this.setState({orderForm: orderFormClone, formValidity: formIsValid});

      }
    

    render(){

        const formElementsArray = [];

        for( let key in this.state.orderForm)
        {
              formElementsArray.push({

                id: key , 
                config: this.state.orderForm[key]
              }) 
        }


        let form = 
        <form onSubmit={this.orderHandler} >
            {
                formElementsArray.map( element => (
                    <Input 
                    key= {element.id}
                    elementType={element.config.elementType} 
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid = {!element.config.valid}
                    touched = {element.config.touched}
                    shouldValidate = {element.config.validation}
                    changed={ (event) => {this.orderChangeHandler(event, element.id)} }
                    />
                ))
            }
            
            <Button btnType="Success" disabled ={!this.state.formValidity}>Order</Button>
        </form>;


if(this.props.load){

    form = <Spinner/>;
}
 return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {

    return {
        ings: state.burgers.Ingredients,
        price: state.burgers.Total_price,
        load: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {

    return {
       onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));