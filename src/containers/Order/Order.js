import React, {Component} from 'react';

import Orders from '../../components/Orders/Orders';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';

import * as  actions from '../../store/actions/index'

import Spinner from '../../components/UI/Spinner/Spinner';


class Order extends Component {

    componentDidMount(){

        this.props.onFetchingOrders(this.props.token,this.props.userId);
    }


    render(){

        let orders = <Spinner/>
    if (!this.props.load) {

        orders = this.props.orders.map( order => (
            <Orders 
            key ={order.id}
            ingredients ={order.ingredients}
            price ={order.totalPrice}

            />
        ));
    }
        return(
            <div>
            {   orders    }
            
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        load: state.orders.loading,
        orders: state.orders.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}


const mapDispatchToProps = dispatch => {

    return{
        onFetchingOrders: (token,userId) => {dispatch(actions.fetchOrders(token,userId))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Order,axios));