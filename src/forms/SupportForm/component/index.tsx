import { FC, SyntheticEvent } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';

import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { Field, FieldProps, Form, FormikProps } from 'formik';
import { SupportFormProps } from 'forms/SupportForm/container';

import { Button, FormInput, Spinner, TextArea } from 'components';
import { logger } from 'utils';

import { useShallowSelector } from 'hooks';
import { RequestStatus } from 'types';

import s from './SupportForm.module.scss';

const SupportFormComponent: FC<FormikProps<SupportFormProps>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  setFieldValue,
}) => {
  const { [actionTypes.SUPPORT]: supportRequestStatus } = useShallowSelector(uiSelector.getUI);
  const userAddress = useShallowSelector(userSelector.getProp('address'));
  const { executeRecaptcha } = useGoogleReCaptcha();

  logger('verified token:', values.token);

  const handleCompleteRecaptcha = async () => {
    if (!executeRecaptcha) {
      toast.error('Execute recaptcha not yet available');
      return;
    }
    const token = await executeRecaptcha('submit');
    setFieldValue('token', token);
  };

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
            error={(touched.email && errors.email) || ''}
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
            error={(touched.transaction && errors.transaction) || ''}
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
            error={(touched.message && errors.message) || ''}
            disabled={isSubmitting}
            onChange={handleChange}
            placeholder="Type your issue"
          />
        )}
      />
      {!values.token ? (
        <Button
          className="modal-box-button"
          color="blue"
          disabled={
            supportRequestStatus === RequestStatus.REQUEST ||
            Object.keys(errors).filter((key) => key !== 'token').length !== 0
          }
          onClick={handleCompleteRecaptcha}
        >
          Verify
        </Button>
      ) : (
        <Button
          disabled={
            !userAddress ||
            supportRequestStatus === RequestStatus.REQUEST ||
            Object.keys(errors).length !== 0
          }
          className="modal-box-button"
          color="blue"
          onClick={handleSubmit}
        >
          {supportRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Send ticket'
          )}
        </Button>
      )}
    </Form>
  );
};

export default SupportFormComponent;
