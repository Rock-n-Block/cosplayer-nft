import { FC, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { patchUserInfo } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { Field, FieldProps, Form, FormikProps } from 'formik';

import { Button, FormInput, Spinner, TextArea, Uploader } from 'components';
import { logger } from 'utils';

import { useShallowSelector } from 'hooks';

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
  setFieldValue,
}) => {
  const { avatar } = useShallowSelector(userSelector.getUser);
  const dispatch = useDispatch();

  const handleUploadAvatar = () => {
    try {
      setFieldValue('isUploadLoading', true);
      const formData = new FormData();
      formData.append('avatar', values.avatar);
      dispatch(patchUserInfo(formData));
      setFieldValue('isUploadLoading', false);
    } catch (e) {
      logger('uploadAvatar', e);
      toast.error('Something went wrong');
      setFieldValue('isUploadLoading', false);
    }
  };

  const handleDeleteAvatar = () => {
    try {
      setFieldValue('isDeleteLoading', true);
      const formData = new FormData();
      formData.append('avatar', '');
      dispatch(patchUserInfo(formData));
      setFieldValue('isDeleteLoading', false);
    } catch (e) {
      logger('deleteAvatar', e);
      toast.error('Something went wrong');
      setFieldValue('isDeleteLoading', false);
    }
  };

  return (
    <Form name="edit-profile-form" className={s.edit_profile}>
      <Field
        id="avatar"
        name="avatar"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <div className={s.upload_avatar}>
            <Uploader isLoading={isSubmitting} className={s.uploader} formikValue="avatar">
              <img src={values.preview || EditAvatarImg} alt="avatar" />
            </Uploader>
            <div>
              {avatar ? (
                <div className={s.btns}>
                  <Button color="blue" className={s.upload_btn} onClick={handleUploadAvatar}>
                    {values.isUploadLoading ? <Spinner color="white" size="md" /> : 'Change image'}
                  </Button>
                  <Button color="red" className={s.delete_btn} onClick={handleDeleteAvatar}>
                    {values.isDeleteLoading ? <Spinner color="white" size="md" /> : 'Delete'}
                  </Button>
                </div>
              ) : (
                <Button color="blue" className={s.upload_btn} onClick={handleUploadAvatar}>
                  {values.isUploadLoading ? <Spinner color="white" size="md" /> : 'Save'}
                </Button>
              )}
              <span className={s.recommend_text}>Recommended 500x500. GIFs Allowed.</span>
            </div>
          </div>
        )}
      />
      <Field
        id="displayName"
        name="displayName"
        render={({ form: { isSubmitting } }: FieldProps) => (
          <FormInput
            name="displayName"
            type="text"
            color="grey"
            label="First name"
            error={touched.displayName ? errors.displayName : ''}
            placeholder="Enter your full name"
            value={values.displayName || ''}
            onChange={handleChange}
            onBlur={(e: SyntheticEvent) => handleBlur(e)}
            disabled={isSubmitting}
            description="You can enter your full name, business name, or brand name."
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
            error={touched.customUrl ? errors.customUrl : ''}
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
      <Button type="submit" color="blue" className={s.submit} onClick={handleSubmit}>
        {values.isLoading ? <Spinner color="white" size="md" /> : 'Save'}
      </Button>
    </Form>
  );
};
