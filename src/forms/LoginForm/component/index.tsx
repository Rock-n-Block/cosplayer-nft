import { FC, memo, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { Field, FieldProps, Form, FormikProps } from 'formik';

import { Button, Checkbox, FormInput, Spinner } from 'components';

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
              label="Name"
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
        <Link className="text-blue" to="/">
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
        {values.isLoading ? <Spinner color="blue" size="sm" /> : 'Create account'}
      </Button>
    </Form>
  );
};

export default memo(Login);
