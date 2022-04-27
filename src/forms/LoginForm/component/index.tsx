import { FC, SyntheticEvent } from 'react';

import uiSelector from 'store/ui/selectors';
import actionTypes from 'store/user/actionTypes';

import { Field, FieldProps, Form, FormikProps } from 'formik';

import { Button, Checkbox, FormInput, Spinner } from 'components';

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
  const { [actionTypes.PATCH_USER_INFO]: patchUserInfoRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

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
              error={(touched.customUrl && errors.customUrl) || ''}
            />
          )}
        />
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
      </div>
      <Button
        type="submit"
        disabled={
          !values.isAgeEnough ||
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
