import React from 'react';
import { FormInputLabel, Input, Group } from './form-input.styles';

type Props = {};

const FormInput = ({ label, ...otherProps }: any) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
