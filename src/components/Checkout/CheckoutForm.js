import { useContext } from 'react';
import classes from './CheckoutForm.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';

const CheckoutForm = props => {
  const cartContext = useContext(CartContext);

  const submitOrderHandler = event => {
    event.preventDefault();
    console.log('Submitted');
    console.log(cartContext.items, cartContext.totalAmount);
  };
  return (
    <Modal onClose={props.onClose}>
      <form className={classes.checkout__form} onSubmit={submitOrderHandler}>
        <div>
          <button type="submit">Send order</button>
        </div>
      </form>
      <p>Checking out... </p>
      <p>Your order has a price of ${cartContext.totalAmount.toFixed(2)}</p>
    </Modal>
  );
};

export default CheckoutForm;
