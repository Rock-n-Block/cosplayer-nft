import { FC, SyntheticEvent, useMemo } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import uiSelector from 'store/ui/selectors';
import { patchUserInfo } from 'store/user/actions';
import actionTypes from 'store/user/actionTypes';
import userSelector from 'store/user/selectors';

import { Field, FieldProps, Form, FormikProps } from 'formik';

import { Button, FormInput, Spinner, TextArea, Uploader } from 'components';
import { logger } from 'utils';

import { useShallowSelector } from 'hooks';
import { RequestStatus } from 'types';

import { EditProfileFormProps } from '../container';

import EditAvatarImg from 'assets/img/icons/edit-avatar.svg';

import s from './EditProfileForm.module.scss';

export const EditProfileFormComponent: FC<FormikProps<EditProfileFormProps>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
}) => {
  const { avatar } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.PATCH_USER_INFO]: patchUserInfoRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );
  const dispatch = useDispatch();

  const isPatchUserInfoLoading = useMemo(
    () => patchUserInfoRequestStatus === RequestStatus.REQUEST,
    [patchUserInfoRequestStatus],
  );

  const handleUploadAvatar = () => {
    try {
      const formData = new FormData();
      formData.append('avatar', values.avatar);
      dispatch(patchUserInfo(formData));
    } catch (e) {
      logger('uploadAvatar', e);
      toast.error('Something went wrong');
    }
  };

  return (
    <Form name="edit-profile-form" className={s.edit_profile}>
      <div className={s.upload_avatar}>
        <Uploader
          isLoading={isPatchUserInfoLoading}
          className={s.uploader}
          isImgOnly
          formikValue="avatar"
        >
          <img src={values.preview || EditAvatarImg} alt="avatar" />
        </Uploader>
        <div>
          {avatar ? (
            <Button color="blue" className={s.upload_btn} onClick={handleUploadAvatar}>
              {isPatchUserInfoLoading ? <Spinner color="white" size="sm" /> : 'Change image'}
            </Button>
          ) : (
            <Button color="blue" className={s.upload_btn} onClick={handleUploadAvatar}>
              {isPatchUserInfoLoading ? <Spinner color="white" size="sm" /> : 'Save'}
            </Button>
          )}
          <span className={s.recommend_text}>Recommended 500x500. GIFs Allowed.</span>
        </div>
      </div>
      <Field
        id="displayName"
        name="displayName"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="displayName"
            type="text"
            color="grey"
            label="First name"
            error={(touched.displayName && errors.displayName) || ''}
            placeholder="Enter your full name"
            value={values.displayName || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
            description="You can enter your full name, business name, or brand name (maximum 20 characters)."
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
            error={(touched.customUrl && errors.customUrl) || ''}
            placeholder="Enter your username"
            value={values.customUrl || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
            description="Choose a username for your profile (maximum 20 characters)."
          />
        )}
      />
      <Field
        id="bio"
        name="bio"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <TextArea
            name="bio"
            label="Account Bio"
            error={touched.bio ? errors.bio : ''}
            placeholder="Enter your bio"
            value={values.bio || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
          />
        )}
      />
      <Field
        id="address"
        name="address"
        render={() => (
          <FormInput
            name="address"
            type="text"
            color="grey"
            label="Wallet Address"
            placeholder="Enter your username"
            value={values.address || ''}
            disabled
            description="Our account ownership is controlled by your wallet. The above wallet address currently controls access to your account."
          />
        )}
      />
      <Field
        id="email"
        name="email"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="email"
            type="email"
            color="grey"
            label="Private Email"
            error={touched.email ? errors.email : ''}
            placeholder="Enter your private email"
            value={values.email || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
            description="This is where push notifications and account updates will be sent."
          />
        )}
      />
      <Field
        id="site"
        name="site"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="site"
            type="text"
            color="bordered"
            label="Website"
            note="Add your website"
            error={touched.site ? errors.site : ''}
            placeholder="Enter your website"
            value={values.site || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
          />
        )}
      />
      <Field
        id="twitter"
        name="twitter"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="twitter"
            type="text"
            color="bordered"
            label="Twitter Username"
            note="Add your Twitter Username"
            error={touched.twitter ? errors.twitter : ''}
            value={values.twitter || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
            prefix="@"
            suffix={
              <a
                href={`https://twitter.com/${values.twitter}`}
                target="_blank"
                rel="noreferrer"
                className={s.link}
              >
                Link
              </a>
            }
          />
        )}
      />
      <Field
        id="instagram"
        name="instagram"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="instagram"
            type="text"
            color="bordered"
            label="Instagram Username"
            note="Add your Instagram Username"
            error={touched.instagram ? errors.instagram : ''}
            value={values.instagram || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
            prefix="@"
            suffix={
              <a
                href={`https://instagram.com/${values.instagram}`}
                target="_blank"
                rel="noreferrer"
                className={s.link}
              >
                Link
              </a>
            }
          />
        )}
      />
      <Button
        type="submit"
        color="blue"
        className={s.submit}
        disabled={isPatchUserInfoLoading}
        onClick={handleSubmit}
      >
        {isPatchUserInfoLoading ? <Spinner color="blue" size="sm" /> : 'Save'}
      </Button>
    </Form>
  );
};
