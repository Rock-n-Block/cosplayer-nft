import { FC, memo } from 'react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import Login from '../component';

type TLoginFormProps = {
  name: string;
  userName: string;
  isLoading: boolean;
};

const LoginForm: FC = () => {
  const props: TLoginFormProps = {
    name: '',
    userName: '',
    isLoading: false,
  };

  const FormWithFormik = withFormik<any, TLoginFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3, 'Too short!').max(20, 'Too long!'),
      userName: Yup.string().min(2, 'Too short!').max(20, 'Too long!'),
    }),

    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);
      const formData = new FormData();
      formData.append('display_name', values.name || '');
      formData.append('custom_url', values.userName || '');
    },

    displayName: 'LoginForm',
  })(Login);
  return <FormWithFormik />;
};

export default memo(LoginForm);
