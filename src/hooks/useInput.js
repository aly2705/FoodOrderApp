import { useState } from 'react';

const useInput = validateData => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateData(enteredValue);
  const inputIsInvalid = isTouched && !valueIsValid;

  const changeHandler = event => {
    setEnteredValue(event.target.value);
  };
  const blurHandler = () => {
    setIsTouched(true);
  };
  const resetInput = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    enteredValue,
    valueIsValid,
    inputIsInvalid,
    changeHandler,
    blurHandler,
    resetInput,
  };
};

export default useInput;
