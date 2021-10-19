import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {

   orderCancelHandler = () => {

        this.props.history.goBack();
    }

    orderContinueHandler = () => {

        this.props.history.replace('/checkout/contact-data');
    }




    render(){

        let summary = <Redirect to ='/'/>;

        if (this.props.ings){
            const purchaseRedirect = this.props.purchased? <Redirect to = '/' />: null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings} 
            
                    orderCancelHandler = {this.orderCancelHandler}
                    orderContinueHandler = {this.orderContinueHandler}

                    />
                    <Route path={this.props.match.path + '/contact-data'} component = {ContactData}/>
                </div>
            )
        }

        return summary
            
        
    }

}

const mapStateToProps = state => {
   return {
       ings: state.burgers.Ingredients,
       purchased: state.orders.purchased
   };
}

export default connect(mapStateToProps)(Checkout);