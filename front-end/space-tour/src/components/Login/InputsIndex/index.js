/**
 *
 * InputsIndex references all the input with errors available
 */

import React from 'react';
import PropTypes from 'prop-types';

// Design
import InputCheckboxWithErrors from '../InputCheckboxWithErrors';
import InputEmailWithErrors from '../InputEmailWithErrors';
import InputFileWithErrors from '../InputFileWithErrors';
import InputPasswordWithErrors from '../InputPasswordWithErrors';
import InputTextWithErrors from '../InputTextWithErrors';

const DefaultInputError = ({ type }) => (
  <div>
    Your input type: <b>{type}</b> does not exist
  </div>
);

const inputs = {
  checkbox: InputCheckboxWithErrors,
  email: InputEmailWithErrors,
  file: InputFileWithErrors,
  password: InputPasswordWithErrors,
  string: InputTextWithErrors,
  text: InputTextWithErrors,
};

function InputsIndex(props) {
  const inputValue =
    props.type === 'checkbox' || props.type === 'toggle'
      ? props.value || false
      : props.value || '';
      
  const Input = inputs[props.type] ? inputs[props.type] : DefaultInputError;

  return <Input {...props} value={inputValue} />;
}

InputsIndex.defaultProps = {};

InputsIndex.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InputsIndex;
