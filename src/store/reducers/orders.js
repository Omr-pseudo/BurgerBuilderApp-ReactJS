import * as actionsTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';



const initialState = {
    orders: [],
    loading: false,
    purchased: false
};


const purchaseBurgerStart = (state, action) => {

    return updateObject(state, {loading: true});
}

const purchaseBurgerSuccess = (state, action) => {
    
    const newOrders = updateObject(action.orderData, {id: action.orderID});

            return updateObject( state, {
                loading: false,
                purchased: true,
                orders : state.orders.concate(newOrders)})
}

const purchaseBurgerFail = (state, action) => {
    
    return updateObject(state, {loading: false});
}

const purchaseBurgerInIt = (state, action) => {
    
    return updateObject(state, { purchased: false});
}

const fetchOrdersStart = (state, action) => {
    
    return updateObject(state, {loading: true});
}

const fetchOrdersSuccess = (state, action) => {
    
    return updateObject( state, {loading: false, orders: action.orders});
}

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, {loading: false})
}



const reducer = (state = initialState, action) => {


    switch (action.type) {

        case actionsTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionsTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionsTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionsTypes.INIT_PURCHASE: return purchaseBurgerInIt(state, action);
        case actionsTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionsTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionsTypes.FETCH_ORDERS_FAIL: return fetchOrdersFailed(state, action);
                
        default:
            return state;
    }
}

export default reducer;