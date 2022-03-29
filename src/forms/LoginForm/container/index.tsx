import { FC, memo } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { patchUserInfo } from '@/store/user/actions';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { logger } from '@/utils';

import { getIpData } from '@/services/api/getIpData';
import { UserSlim } from '@/types';

import Login from '../component';

export type UserFormProps = UserSlim & {
  isLoading: boolean;
  isAgeEnough: boolean;
  termsAccepted: boolean;
};

const LoginForm: FC = () => {
  const props: UserFormProps = {
    displayName: '',
    customUrl: '',
    country: '',
    isLoading: false,
    isAgeEnough: false,
    termsAccepted: false,
  };

  const dispatch = useDispatch();

  const FormWithFormik = withFormik<any, UserFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      displayName: Yup.string().min(3, 'Too short!').max(20, 'Too long!'),
      customUrl: Yup.string().min(3, 'Too short!').max(20, 'Too long!'),
    }),

    handleSubmit: async (values, { setFieldValue }) => {
      try {
        setFieldValue('isLoading', true);
        const formData = new FormData();
        const { data } = await getIpData();
        formData.append('country', data.country_name);
        formData.append('display_name', values.displayName || '');
        formData.append('custom_url', values.customUrl || '');
        dispatch(patchUserInfo(formData));
        setFieldValue('isLoading', false);
      } catch (e) {
        logger('submit login form', e);
        toast.error('Something went wrong');
      }
    },

    displayName: 'LoginForm',
  })(Login);
  return <FormWithFormik />;
};

export default memo(LoginForm);
