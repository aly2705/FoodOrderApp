import { useContext } from 'react';
import classes from './CheckoutForm.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import useAJAX from '../../hooks/useAJAX';

const CheckoutForm = props => {
  const cartContext = useContext(CartContext);
  const { error, sendRequest: sendOrder } = useAJAX();

  const finishSubmission = () => {
    props.onClose();
    cartContext.clearCart();
  };

  const changeFirstNameHandler = () => {};
  const blurFirstNameHandler = () => {};

  const submitOrderHandler = async event => {
    event.preventDefault();
    const order = {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      items: cartContext.items,
      totalAmount: cartContext.totalAmount,
    };
    const configObj = {
      url: 'https://react-http-requests-15927-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    };

    sendOrder(configObj, finishSubmission);
  };
  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={submitOrderHandler}>
        <div className={classes.form__group}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={changeFirstNameHandler}
            onBlur={blurFirstNameHandler}
          />
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
        {error && <p className={classes.form__error}>⚠️ {error}</p>}
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
