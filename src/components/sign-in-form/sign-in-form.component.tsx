import React from 'react';
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
import { useDispatch } from 'react-redux';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';
googleSignInStart;

const defaultFormFields = {
  email: '',
  password: '',
};

type Props = {};

const SignInForm = (props: any) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Email'}
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label={'Password'}
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>

          <Button
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
