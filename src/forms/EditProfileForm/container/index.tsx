import { FC, memo } from 'react';

import { useDispatch } from 'react-redux';
import { patchUserInfo } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { logger } from 'utils';

import { editProfileValidator } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { UserSlim } from 'types';

import { EditProfileFormComponent } from '../component';

export type EditProfileFormProps = UserSlim & {
  isLoading: boolean;
  isUploadLoading: boolean;
  isDeleteLoading: boolean;
  avatar: Blob | string;
  preview: string;
  email: string;
};

const EditProfileForm: FC = () => {
  const { address, avatar, displayName, bio, customUrl, site, twitter, instagram } =
    useShallowSelector(userSelector.getUser);

  const props: EditProfileFormProps = {
    avatar: '',
    preview: avatar || '',
    displayName,
    customUrl,
    bio,
    address,
    email: '',
    twitter,
    instagram,
    site,
    isLoading: false,
    isUploadLoading: false,
    isDeleteLoading: false,
  };

  const dispatch = useDispatch();

  const FormWithFormik = withFormik<any, EditProfileFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      displayName: Yup.string().min(3, 'Too short!').max(20, 'Too long!'),
      customUrl: Yup.string().min(3, 'Too short!').max(20, 'Too long!'),
      bio: Yup.string().max(editProfileValidator.bio.max, 'Too long!'),
      email: Yup.string()
        .trim()
        .matches(editProfileValidator.socials.email.reg, 'Is not correct email'),
      site: Yup.string()
        .trim()
        .matches(editProfileValidator.socials.site.reg, 'Is not correct website URL'),
      twitter: Yup.string()
        .trim()
        .matches(editProfileValidator.socials.twitter.reg, 'Is not correct Twitter Username'),
      instagram: Yup.string()
        .trim()
        .matches(editProfileValidator.socials.instagram.reg, 'Is not correct Instagram Username'),
    }),

    handleSubmit: async (values, { setFieldValue }) => {
      try {
        setFieldValue('isLoading', true);
        const formData = new FormData();
        formData.append('display_name', values.displayName || '');
        formData.append('custom_url', values.customUrl || '');
        formData.append('bio', values.bio || '');
        formData.append('site', values.site || '');
        formData.append('email', values.email || '');
        formData.append('twitter', values.twitter || '');
        formData.append('instagram', values.instagram || '');
        dispatch(patchUserInfo(formData));
        setFieldValue('isLoading', false);
      } catch (e) {
        logger('submit login form', e);
        setFieldValue('isLoading', false);
      }
    },
  })(EditProfileFormComponent);
  return <FormWithFormik />;
};

export default memo(EditProfileForm);
