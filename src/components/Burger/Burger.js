import React from 'react';
import { withRouter } from 'react-router-dom'; 

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {


    let transformedIngredients = Object.keys(props.Ingredients).map(igKey =>{

            return [...Array(props.Ingredients[igKey])].map((_,i)=>{
                return <BurgerIngredient key={igKey +i } type = {igKey} />
            });
    }).reduce((array, element)=>{

        return array.concat(element);
    },[]);

   
    if(transformedIngredients.length === 0){

        transformedIngredients = <p>Please Enter some Ingredients</p>;
    }



    return (
        <div className= {classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
            
        </div>
    );
};

export default withRouter(burger);