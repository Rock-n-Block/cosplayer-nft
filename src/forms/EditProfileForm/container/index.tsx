import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { patchUserInfo } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { logger } from 'utils';

import { editProfileValidator } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { User } from 'types';

import { EditProfileFormComponent } from '../component';

export type EditProfileFormProps = User & {
  isLoading: boolean;
  isUploadLoading: boolean;
  isDeleteLoading: boolean;
  avatar: Blob | string;
  preview: string;
};

const EditProfileForm: FC = () => {
  const { address, avatar, displayName, bio, customUrl, site, twitter, instagram, email } =
    useShallowSelector(userSelector.getUser);

  const props: EditProfileFormProps = {
    avatar: '',
    preview: avatar || '',
    displayName,
    customUrl,
    bio,
    address,
    email,
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
      displayName: Yup.string()
        .min(editProfileValidator.name.min, 'Too short!')
        .max(editProfileValidator.name.max, 'Too long!')
        .required('First name is required!'),
      customUrl: Yup.string()
        .min(editProfileValidator.name.min, 'Too short!')
        .max(editProfileValidator.name.max, 'Too long!')
        .matches(editProfileValidator.name.reg, 'Incorrect Username')
        .required('Username is required!'),
      bio: Yup.string().max(editProfileValidator.bio.max, 'Too long!').notRequired(),
      email: Yup.string()
        .nullable()
        .trim()
        .matches(editProfileValidator.socials.email.reg, 'Is not correct email')
        .notRequired(),
      site: Yup.string()
        .nullable()
        .trim()
        .matches(editProfileValidator.socials.site.reg, 'Is not correct website URL')
        .notRequired(),
      twitter: Yup.string()
        .nullable()
        .trim()
        .matches(editProfileValidator.socials.twitter.reg, 'Is not correct Twitter Username')
        .notRequired(),
      instagram: Yup.string()
        .nullable()
        .trim()
        .matches(editProfileValidator.socials.instagram.reg, 'Is not correct Instagram Username')
        .notRequired(),
    }),

    handleSubmit: async (values) => {
      try {
        const formData = new FormData();
        if (values.displayName) formData.append('display_name', values.displayName?.trim());
        if (values.customUrl)
          formData.append('custom_url', values.customUrl.trim().replaceAll(' ', '-'));
        if (values.bio) formData.append('bio', values.bio);
        if (values.site) formData.append('site', values.site.trim());
        if (values.email) formData.append('email', values.email.trim());
        if (values.twitter) formData.append('twitter', values.twitter.trim());
        if (values.instagram) formData.append('instagram', values.instagram.trim());
        dispatch(patchUserInfo(formData));
      } catch (e) {
        logger('submit login form', e);
      }
    },
  })(EditProfileFormComponent);
  return <FormWithFormik />;
};

export default EditProfileForm;
