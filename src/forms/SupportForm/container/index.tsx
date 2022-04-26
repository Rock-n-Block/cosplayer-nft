import { FC } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { support } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { logger } from 'utils';

import { editProfileValidator } from 'appConstants';
import { useShallowSelector } from 'hooks';

import SupportFormComponent from '../component';

export type SupportFormProps = {
  email: string;
  message: string;
  transaction: string;
  userId: string;
  token: string;
};

const SupportForm: FC = () => {
  const { customUrl, email } = useShallowSelector(userSelector.getUser);
  const props: SupportFormProps = {
    email: email || '',
    message: '',
    transaction: '',
    userId: customUrl || '',
    token: '',
  };

  const dispatch = useDispatch();

  const FormWithFormik = withFormik<any, SupportFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .matches(editProfileValidator.socials.email.reg, 'Not valid email address')
        .required('Email is required'),
      transaction: Yup.string().min(10, 'Too short').max(50, 'Too long').notRequired(),
      message: Yup.string()
        .min(3, 'Too short!')
        .max(100, 'Too long!')
        .required('Message is required'),
    }),

    handleSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('message', values.message);
        formData.append('user_id', values.userId);
        formData.append('tx', values.transaction);
        dispatch(support(formData));
      } catch (e) {
        logger('submit login form', e);
        toast.loading('Something went wrong');
      }
    },

    displayName: 'SupportForm',
  })(SupportFormComponent);
  return <FormWithFormik />;
};

export default SupportForm;
