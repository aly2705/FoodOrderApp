import { NAME_REGEX, PHONE_NUMBER_REGEX } from './config';

export const validateName = name => {
  const regexp = new RegExp(NAME_REGEX);
  if (!regexp.test(name)) return false;
  else return true;
};
export const validatePhoneNumber = phoneNum => {
  const regexp = new RegExp(PHONE_NUMBER_REGEX);
  if (!regexp.test(phoneNum)) return false;
  else return true;
};
export const validateAddress = address => {
  if (address.trim().length === 0) return false;
  else return true;
};
