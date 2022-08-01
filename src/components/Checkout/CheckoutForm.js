import { useContext, useState } from 'react';
import classes from './CheckoutForm.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import useAJAX from '../../hooks/useAJAX';
import useInput from '../../hooks/useInput';
import { FIREBASE_URL } from '../../helpers/config';
import {
  validateName,
  validatePhoneNumber,
  validateAddress,
} from '../../helpers/helpers';

const CheckoutForm = props => {
  const cartContext = useContext(CartContext);
  const { error, sendRequest: sendOrder } = useAJAX();
  const [wasSuccessfullySubmitted, setWasSuccessfullySubmitted] =
    useState(false);

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

  const {
    enteredValue: enteredPhone,
    valueIsValid: phoneIsValid,
    inputIsInvalid: phoneInputIsInvalid,
    changeHandler: changePhoneHandler,
    blurHandler: blurPhoneHandler,
    resetInput: resetPhone,
  } = useInput(validatePhoneNumber);

  const {
    enteredValue: enteredAddress,
    valueIsValid: addressIsValid,
    inputIsInvalid: addressInputIsInvalid,
    changeHandler: changeAddressHandler,
    blurHandler: blurAddressHandler,
    resetInput: resetAddress,
  } = useInput(validateAddress);

  const finishSubmission = () => {
    setWasSuccessfullySubmitted(true);
    cartContext.clearCart();
    resetFirstName();
    resetLastName();
    resetPhone();
    resetAddress();
  };

  const submitOrderHandler = async event => {
    event.preventDefault();
    const order = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      address: enteredAddress,
      phoneNumber: enteredPhone,
      items: cartContext.items,
      totalAmount: cartContext.totalAmount,
    };
    const configObj = {
      url: `${FIREBASE_URL}/orders.json`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    };

    sendOrder(configObj, finishSubmission);
  };
  const formIsValid =
    firstNameIsValid && lastNameIsValid && phoneIsValid && addressIsValid;
  const firstNameClasses = !firstNameInputIsInvalid
    ? classes.form__group
    : `${classes.form__group} ${classes.invalid}`;
  const lastNameClasses = !lastNameInputIsInvalid
    ? classes.form__group
    : `${classes.form__group} ${classes.invalid}`;
  const phoneClasses = !phoneInputIsInvalid
    ? classes.form__group
    : `${classes.form__group} ${classes.invalid}`;
  const addressClasses = !addressInputIsInvalid
    ? classes.form__group
    : `${classes.form__group} ${classes.invalid}`;

  if (wasSuccessfullySubmitted)
    return (
      <Modal onClose={props.onClose}>
        <p>Your order was successfully submitted! Thank you!</p>
        <div className={classes.form__buttons}>
          <button
            type="button"
            className={classes.button}
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </Modal>
    );
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
        <div className={phoneClasses}>
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="tel"
            id="phone-number"
            onChange={changePhoneHandler}
            onBlur={blurPhoneHandler}
            value={enteredPhone}
          />
          {phoneInputIsInvalid && (
            <p className={classes.form__error}>
              Please enter a valid phone number (xxx-xxx-xxxx)
            </p>
          )}
        </div>
        <div className={addressClasses}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            onChange={changeAddressHandler}
            onBlur={blurAddressHandler}
            value={enteredAddress}
          />
          {addressInputIsInvalid && (
            <p className={classes.form__error}>
              Please enter a valid address (non-empty value)
            </p>
          )}
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
            type="button"
            className={classes['button-alt']}
            onClick={props.onBackToCart}
          >
            Back
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
