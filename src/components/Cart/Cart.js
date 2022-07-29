import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
const Cart = props => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const clearCartHandler = () => {
    cartContext.clearCart();
  };

  const cartItems = cartContext.items.map(item => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    >
      {item.name}
    </CartItem>
  ));
  return (
    <Modal onClose={props.onClose}>
      <ul className={classes['cart-items']}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button-alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes['button-alt']} onClick={clearCartHandler}>
            Clear cart
          </button>
        )}
        {hasItems && (
          <button className={classes.button} onClick={props.onCheckout}>
            Next Step &rarr;
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
