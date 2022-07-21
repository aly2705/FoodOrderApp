import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import classes from './MealItem.module.css';

import MealItemForm from './MealItemForm';

const MealItem = props => {
  const cartContext = useContext(CartContext);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(props.price.toFixed(2));

  const addToCartHandler = amount => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>

        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
