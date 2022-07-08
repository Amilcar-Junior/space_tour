/* eslint-disable no-useless-escape */
import { includes, mapKeys, reject } from 'lodash';
/**
 * [validateInput description]
 * @param  {String || Number} value  Input's value
 * @param  {Object} inputValidations
 * @param  {String} [type='text']    Optionnal: the input's type only for email
 * @return {Array}                  Array of errors to be displayed
 */
const validateInput = (value, inputValidations = {}, type = 'text') => {
  let errors = [];

  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  // handle i18n
  const requiredError = { id: 'components.Input.error.validation.required' };

  mapKeys(inputValidations, (validationValue, validationKey) => {
    switch (validationKey) {
      case 'max':
        if (parseInt(value, 10) > validationValue) {
          errors.push("Não pode ser superior");
        }
        break;
      case 'maxLength':
        if (value.length > validationValue) {
          errors.push('Muito grande');
        }
        break;
      case 'min':
        if (parseInt(value, 10) < validationValue) {
          errors.push("Não pode ser inferior");
        }
        break;
      case 'minLength':
        if (value.length < validationValue) {
          errors.push('muito pequeno');
        }
        break;
      case 'required':
        if (value.length === 0) {
          errors.push('Este campo não pode ser vazio');
        }
        break;
      case 'regex':
        if (!new RegExp(validationValue).test(value)) {
          errors.push('Não compativel');
        }
        break;
      default:
        errors = [];
    }
  });

  if (type === 'email' && !emailRegex.test(value)) {
    errors.push('Não é um email');
  }

  if (includes(errors, requiredError)) {
    errors = reject(errors, error => error !== requiredError);
  }

  return errors;
};

export default validateInput;
