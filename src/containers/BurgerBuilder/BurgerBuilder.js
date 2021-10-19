import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index';




class BurgerBuilder extends Component {

    state = {
        
        purchasing: false

    }

    componentDidMount(){

        this.props.onInItIngredients();
    }


    updatePurchasble(ingredients){


        const sum = Object.keys(ingredients)
        .map(igKeys => {
            return ingredients[igKeys]
        })
        .reduce((sum, el)=> {
            return sum + el;
        },0);

        return sum > 0;

    }

    purchaseHandler = () => {

        if(!this.props.isAuth){

            this.setState({purchasing: true});
        }

        else {

            this.props.onAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
         
        
    }

    purchaseCloseHandler = () => {

        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        this.props.onInItPurchase();

        this.props.history.push('/checkout');                                                
    }

    render(){

        const disabledInfo = {
            ...this.props.ings
        };

        for( let key in disabledInfo){

            disabledInfo[key] = disabledInfo[key] <=0;
        }


        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients can't be loaded</p>:<Spinner/>;
        
        if(this.props.ings){
            
            burger = (<Auxiliary>
                <Burger Ingredients = {this.props.ings}/>
                <BuildControls 
                addedIngredients = {this.props.onIngredientsAdded} 
                removedIngredients = {this.props.onIngredientsRemoved}
                disabled = {disabledInfo}
                price = {this.props.price}
                purchasable = {this.updatePurchasble(this.props.ings)}
                order = {this.purchaseHandler}
                isAuth = {this.props.auth}
                />          
                </Auxiliary>
                )

                orderSummary = <OrderSummary 
                ingredients = {this.props.ings}
                purchaseCanceled = {this.purchaseCloseHandler}
                purchaseContinued = {this.purchaseContinueHandler} 
                price = {this.props.price} />;
        }

        return(
            <Auxiliary>
                <Modal show = {this.state.purchasing} modalClose = {this.purchaseCloseHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}


const mapStateToProps = state => {

    return {
        ings: state.burgers.Ingredients,
        price: state.burgers.Total_price,
        error: state.burgers.error,
        auth: state.auth.token != null
    };

}

const mapDispatchToProps = dispatch => {

    return {

        onIngredientsAdded: (ings) => dispatch(burgerBuilderActions.addIngredients(ings)),
        onIngredientsRemoved: (ings) => dispatch(burgerBuilderActions.removeIngredients(ings)),
        onInItIngredients : () => {dispatch(burgerBuilderActions.initIngredients())},
        onInItPurchase : () => {dispatch(burgerBuilderActions.purchaseInIt())},
        onAuthRedirectPath: (path) => {dispatch(burgerBuilderActions.onAuthRedirectPath(path))}
        
    };

}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));