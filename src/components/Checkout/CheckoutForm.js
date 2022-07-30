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

    props.onClose();
    cartContext.clearCart();
  };
  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={submitOrderHandler}>
        <div className={classes.form__group}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="phone-number">Phone Number</label>
          <input type="tel" id="phone-number" />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" />
        </div>
        <div className={classes.form__buttons}>
          <button
            type="button"
            className={classes['button-alt']}
            onClick={props.onClose}
          >
            Close
          </button>
          <button type="submit" className={classes.button}>
            Send order
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
