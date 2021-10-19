import React, {Component} from 'react';

import Auxiliary from '../hoc/Auxiliary';

import classes from './Layout.css';
import Sidedrawer from './Navigation/Sidedrawer/Sidedrawer';

import Toolbar from './Navigation/Toolbar/Toolbar';

import {connect} from 'react-redux';


class Layout extends Component {

    state = 
    {
        showSideDrawer : false
    }

    closeSideDrawerHandler = ()=> 
    {
        this.setState({showSideDrawer: false});
    }


    SideDrawerToggleHandler = () => {
        this.setState((prevState)=>{ return { showSideDrawer: !prevState.showSideDrawer}})
    }




    render(){


        return (
        
        <Auxiliary>
            <Toolbar toggleSideDrawer = {this.SideDrawerToggleHandler} isAuthenticated = {this.props.isAuthenticated}/>
            <Sidedrawer open = {this.state.showSideDrawer} closed = {this.closeSideDrawerHandler}/>
            
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        )
    }
}


const mapStateToProps = state => {

    return {

        isAuthenticated: state.auth.token != null
    };
} 

export default connect(mapStateToProps)(Layout);