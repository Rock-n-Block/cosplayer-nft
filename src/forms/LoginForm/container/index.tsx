import { FC } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { patchUserInfo } from 'store/user/actions';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { logger } from 'utils';

import { editProfileValidator } from 'appConstants';
import { getIpData } from 'services/api/getIpData';
import { UserSlim } from 'types';

import Login from '../component';

export type UserFormProps = UserSlim & {
  isLoading: boolean;
  isAgeEnough: boolean;
};

const LoginForm: FC = () => {
  const props: UserFormProps = {
    displayName: '',
    customUrl: '',
    country: '',
    isLoading: false,
    isAgeEnough: false,
  };

  const dispatch = useDispatch();

  const FormWithFormik = withFormik<any, UserFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      displayName: Yup.string()
        .min(editProfileValidator.name.min, 'Too short!')
        .max(editProfileValidator.name.max, 'Too long!')
        .required('First name is required!'),
      customUrl: Yup.string()
        .min(editProfileValidator.name.min, 'Too short!')
        .max(editProfileValidator.name.max, 'Too long!')
        .matches(editProfileValidator.name.reg, 'Incorrect username')
        .required('Username is required!'),
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

export default LoginForm;
