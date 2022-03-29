import { FC, memo, SyntheticEvent } from 'react';

import { Field, FieldProps, Form, FormikProps } from 'formik';

import { Button, FormInput, Spinner, TextArea, Uploader } from '@/components';
import { SupportFormProps } from '@/forms/SupportForm/container';

import s from './SupportForm.module.scss';

const SupportFormComponent: FC<FormikProps<SupportFormProps>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
}) => {
  return (
    <Form name="support-form" className={s.support_form}>
      <Field
        id="email"
        name="email"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="email"
            type="email"
            color="grey"
            label="Email"
            placeholder="mail@mail.com"
            disabled={isSubmitting}
            value={values.email}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            error={touched.email && errors.email ? 'Not valid email address' : ''}
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
            placeholder="username"
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
      <Field
        id="transaction"
        name="transaction"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="transaction"
            type="text"
            color="grey"
            label="Transaction hash"
            placeholder="Paste txn hash"
            disabled={isSubmitting}
            value={values.transaction}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
          />
        )}
      />
      <Field
        id="message"
        name="message"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <TextArea
            label="Message"
            name="message"
            disabled={isSubmitting}
            onChange={handleChange}
            placeholder="Type your issue"
          />
        )}
      />
      <Field
        id="attachment"
        name="attachment"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <Uploader
            isLoading={isSubmitting}
            formikValue="attachment"
            className={s.uploader}
            colorButton="default"
          />
        )}
      />
      <Button
        disabled={
          values.isLoading ||
          !values.email ||
          !values.customUrl ||
          !values.message ||
          !!errors.email ||
          !!errors.customUrl ||
          !!errors.message
        }
        className="modal-box-button"
        color="blue"
        onClick={handleSubmit}
      >
        {values.isLoading ? <Spinner color="blue" size="sm" /> : 'Create account'}
      </Button>
    </Form>
  );
};

export default memo(SupportFormComponent);
