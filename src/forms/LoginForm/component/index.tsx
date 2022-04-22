import { FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { closeModal } from 'store/modals/reducer';
import uiSelector from 'store/ui/selectors';
import actionTypes from 'store/user/actionTypes';
import { disconnectWalletState } from 'store/user/reducer';

import { Field, FieldProps, Form, FormikProps } from 'formik';

import { Button, Checkbox, FormInput, Spinner } from 'components';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { RequestStatus } from 'types';

import { UserFormProps } from '../container';

import s from './LoginForm.module.scss';

const Login: FC<FormikProps<UserFormProps>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
}) => {
  const dispatch = useDispatch();
  const { [actionTypes.PATCH_USER_INFO]: patchUserInfoRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const handleNavigate = () => {
    dispatch(closeModal());
    dispatch(disconnectWalletState());
  };

  return (
    <Form name="form-login" className={s.login_form}>
      <div className={s.inputs}>
        <Field
          id="displayName"
          name="displayName"
          render={({ form: { isSubmitting } }: FieldProps) => (
            <FormInput
              name="displayName"
              type="text"
              color="grey"
              label="First name"
              note="Enter your full name"
              placeholder="e. g. “Jhon Doe”"
              disabled={isSubmitting}
              value={values.displayName}
              onChange={handleChange}
              onBlur={(e: SyntheticEvent) => handleBlur(e)}
              error={
                touched.displayName && errors.displayName
                  ? 'Name should be more than 3 and less than 20 symbols'
                  : ''
              }
            />
          )}
        />
        <Field
          id="customUrl"
          name="customUrl"
          render={({ form: { isSubmitting } }: FieldProps) => (
            <FormInput
              name="customUrl"
              type="text"
              color="grey"
              label="Username"
              note="Enter your username"
              placeholder="e. g. “jhondoe”"
              disabled={isSubmitting}
              value={values.customUrl}
              onChange={handleChange}
              onBlur={(e: SyntheticEvent) => handleBlur(e)}
              error={
                touched.customUrl && errors.customUrl
                  ? 'Username should be more than 3 and less than 20 symbols'
                  : ''
              }
            />
          )}
        />
      </div>
      <div className={s.terms}>
        Please take a few minutes to read and understand CosplayerNFT&nbsp;
        <Link className="text-blue" to={routes.privacy.root} onClick={handleNavigate}>
          Terms of Service
        </Link>
        . To continue, you’ll need to accept the Terms of Service by checking the box.
      </div>
      <div className={s.checkers}>
        <Field
          id="isAgeEnough"
          name="isAgeEnough"
          render={({ form: { isSubmitting } }: FieldProps) => (
            <Checkbox
              id="isAgeEnough"
              name="isAgeEnough"
              className={s.checkbox}
              disabled={isSubmitting}
              checked={values.isAgeEnough}
              onChange={handleChange}
              onBlur={(e: SyntheticEvent) => handleBlur(e)}
              text="I am at least 13 years old"
            />
          )}
        />
        <Field
          id="termsAccepted"
          name="termsAccepted"
          render={({ form: { isSubmitting } }: FieldProps) => (
            <Checkbox
              id="termsAccepted"
              name="termsAccepted"
              className={s.checkbox}
              disabled={isSubmitting}
              checked={values.termsAccepted}
              onChange={handleChange}
              onBlur={(e: SyntheticEvent) => handleBlur(e)}
              text="I accept the CosplayerNFT Terms of Service"
            />
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={
          !values.isAgeEnough ||
          !values.termsAccepted ||
          values.isLoading ||
          !values.displayName ||
          !values.customUrl ||
          !!errors.displayName ||
          !!errors.customUrl
        }
        className={s.submit_btn}
        color="blue"
        onClick={handleSubmit}
      >
        {patchUserInfoRequestStatus === RequestStatus.REQUEST ? (
          <Spinner color="blue" size="sm" />
        ) : (
          'Create account'
        )}
      </Button>
    </Form>
  );
};

export default Login;
