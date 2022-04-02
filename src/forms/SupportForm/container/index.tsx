import { FC, memo } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { patchUserInfo } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { logger } from 'utils';

import { editProfileValidator } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { UserSlim } from 'types';

import SupportFormComponent from '../component';

export type SupportFormProps = UserSlim & {
  isLoading: boolean;
  email: string;
  message: string;
  transaction: string;
  attachment: string;
};

const SupportForm: FC = () => {
  const { customUrl } = useShallowSelector(userSelector.getUser);
  const props: SupportFormProps = {
    email: '',
    customUrl,
    message: '',
    transaction: '',
    attachment: '',
    isLoading: false,
  };

  const dispatch = useDispatch();

  const FormWithFormik = withFormik<any, SupportFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .matches(editProfileValidator.socials.email.reg, 'Is not correct email')
        .required(),
      customUrl: Yup.string().min(3, 'Too short!').max(20, 'Too long!'),
    }),

    handleSubmit: async (values, { setFieldValue }) => {
      try {
        setFieldValue('isLoading', true);
        const formData = new FormData();
        formData.append('display_name', values.displayName || '');
        formData.append('custom_url', values.customUrl || '');
        dispatch(patchUserInfo(formData));
        setFieldValue('isLoading', false);
      } catch (e) {
        logger('submit login form', e);
        toast.loading('Something went wrong');
      }
    },

    displayName: 'SupportForm',
  })(SupportFormComponent);
  return <FormWithFormik />;
};

export default memo(SupportForm);
