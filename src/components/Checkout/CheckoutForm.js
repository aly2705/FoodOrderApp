import { useContext } from 'react';
import classes from './CheckoutForm.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import useAJAX from '../../hooks/useAJAX';
import useInput from '../../hooks/useInput';

const CheckoutForm = props => {
  const cartContext = useContext(CartContext);
  const { error, sendRequest: sendOrder } = useAJAX();

  const validateName = name => {
    const regexp = new RegExp('^[A-Za-z]+$');
    if (!regexp.test(name)) return false;
    else return true;
  };
  const {
    enteredValue: enteredFirstName,
    valueIsValid: firstNameIsValid,
    inputIsInvalid: firstNameInputIsInvalid,
    changeHandler: changeFirstNameHandler,
    blurHandler: blurFirstNameHandler,
    resetInput: resetFirstName,
  } = useInput(validateName);
  const {
    enteredValue: enteredLastName,
    valueIsValid: lastNameIsValid,
    inputIsInvalid: lastNameInputIsInvalid,
    changeHandler: changeLastNameHandler,
    blurHandler: blurLastNameHandler,
    resetInput: resetLastName,
  } = useInput(validateName);

  const finishSubmission = () => {
    props.onClose();
    cartContext.clearCart();
    resetFirstName();
    resetLastName();
  };

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
  const formIsValid = firstNameIsValid && lastNameIsValid;
  const firstNameClasses = !firstNameInputIsInvalid
    ? classes.form__group
    : `${classes.form__group} ${classes.invalid}`;
  const lastNameClasses = !lastNameInputIsInvalid
    ? classes.form__group
    : `${classes.form__group} ${classes.invalid}`;
  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={submitOrderHandler}>
        <div className={firstNameClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={changeFirstNameHandler}
            onBlur={blurFirstNameHandler}
            value={enteredFirstName}
          />
          {firstNameInputIsInvalid && (
            <p className={classes.form__error}>Please enter a valid name</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={changeLastNameHandler}
            onBlur={blurLastNameHandler}
            value={enteredLastName}
          />
          {lastNameInputIsInvalid && (
            <p className={classes.form__error}>Please enter a valid name</p>
          )}
        </div>
        <div className={classes.form__group}>
          <label htmlFor="phone-number">Phone Number</label>
          <input type="tel" id="phone-number" />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" />
        </div>
        {error && (
          <p
            className={`${classes.form__error} ${classes['form__error--fetch']}`}
          >
            ⚠️ {error}
          </p>
        )}
        <div className={classes.form__buttons}>
          <button
            type="button"
            className={classes['button-alt']}
            onClick={props.onClose}
          >
            Close
          </button>
          <button
            type="submit"
            disabled={!formIsValid}
            className={classes.button}
          >
            Send order
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
