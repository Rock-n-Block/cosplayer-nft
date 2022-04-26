import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';
import { CategorySelector, PriceSelector } from 'containers';
import { Field, FieldProps, Form, FormikProps } from 'formik';

import {
  Button,
  Calendar,
  Checker,
  FormInput,
  Spinner,
  Switcher,
  TextArea,
  Uploader,
} from 'components';
import { logger } from 'utils';

import { categories } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { Currencies, RequestStatus } from 'types';

import { CreateFormProps } from '../container';

import { CloseImg } from 'assets/img/icons';

import s from './CreateForm.module.scss';

export const CreateFormComponent: FC<FormikProps<CreateFormProps>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  setFieldValue,
  handleSubmit,
  validateForm,
}) => {
  const [isPriceSelectorOpen, setIsPriceSelectorOpen] = useState(false);
  const [hashtag, setHashtag] = useState('');
  const { rates, fee } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.CREATE_TOKEN]: createTokenRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const handleClearMedia = () => {
    setFieldValue('media', '');
    setFieldValue('preview', '');
    setFieldValue('format', 'image');
  };

  const handleClearCover = () => {
    setFieldValue('cover', '');
    setFieldValue('coverPreview', '');
  };

  const handleCheck = () => {
    setFieldValue('selling', !values.selling);
  };

  const handleSwitch = () => {
    setFieldValue('isFixedPrice', !values.isFixedPrice);
  };

  const handleBlockedSwitcher = () => {
    if (values.totalSupply > 1) {
      toast.info('Time Auction is available only for single NFT');
    }
  };

  const handleSelectCurrency = (currency: Currencies) => {
    setFieldValue('currency', currency);
  };

  const handleSetCategory = (index: number) => {
    setFieldValue('tag', categories[index].label);
  };

  const handleAddHashtag = () => {
    if (
      hashtag.includes(' ') ||
      hashtag.trim() === '#' ||
      hashtag.trim() === '' ||
      /#/.test(hashtag[0] === '#' ? hashtag.slice(1) : hashtag)
    ) {
      toast.error('Incorrect hashtag');
    } else if (values.hashtags.includes(hashtag[0] === '#' ? hashtag : `#${hashtag}`)) {
      toast.info('This hashtag has already been added');
    } else if (hashtag[0] !== '#') {
      setFieldValue('hashtags', [...values.hashtags, `#${hashtag}`]);
    } else setFieldValue('hashtags', [...values.hashtags, hashtag]);
    setHashtag('');
  };

  const handleRemoveHashtag = (name: string) => {
    return () => {
      setFieldValue(
        'hashtags',
        values.hashtags.filter((item) => item !== name),
      );
    };
  };

  useEffect(() => {
    if (!values.selling) setFieldValue('price', 0.001);
    validateForm(values).then((data) => logger('validateForm res:', data));
  }, [setFieldValue, validateForm, values]);

  return (
    <Form name="create-form" className={s.create_form}>
      <div className={s.column_grey}>
        <Field
          id="media"
          name="media"
          required
          render={({ form: { isSubmitting } }: FieldProps) => {
            return values.preview ? (
              <div className={s.preview}>
                <Button color="blue" className={s.delete_btn} onClick={handleClearMedia}>
                  <div className={s.delete_btn_content}>
                    <span>Delete</span>
                    <CloseImg />
                  </div>
                </Button>
                <div className={s.preview_container}>
                  {values.format === 'image' && <img src={values.preview} alt="preview" />}
                  {values.format === 'audio' && (
                    <audio controls>
                      <source src={values.preview} />
                      <track kind="captions" />
                    </audio>
                  )}
                  {values.format === 'video' && (
                    <video controls>
                      <source
                        src={values.preview}
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                      />
                      <track kind="captions" />
                    </video>
                  )}
                </div>
              </div>
            ) : (
              <Uploader
                setFormat={(format) => setFieldValue('format', format)}
                isLoading={isSubmitting}
                className={s.uploader}
                formikValue="media"
              >
                <span className={s.title}>Upload File</span>
                <span className={s.grey_text}>
                  Accepted file types (JPG, PNG, MOV, MP4, GIF, MP3)
                  <br />
                  Max upload size 100MB
                </span>
                <div className={s.uploader_btn}>+ Add File</div>
              </Uploader>
            );
          }}
        />
        {values.format !== 'image' && (
          <Field
            id="cover"
            name="cover"
            required
            render={({ form: { isSubmitting } }: FieldProps) => {
              return values.coverPreview ? (
                <div className={s.preview}>
                  <Button color="blue" className={s.delete_btn_cover} onClick={handleClearCover}>
                    <div className={s.delete_btn_content}>
                      <span>Delete Cover</span>
                      <CloseImg />
                    </div>
                  </Button>
                  <div className={s.preview_container}>
                    <img src={values.coverPreview} alt="cover preview" />
                  </div>
                </div>
              ) : (
                <Uploader
                  isImgOnly
                  isLoading={isSubmitting}
                  className={s.uploader}
                  formikValue="cover"
                >
                  <span className={s.title}>Upload Cover</span>
                  <span className={s.grey_text}>
                    Accepted file types (JPG, PNG, GIF)
                    <br />
                    Max upload size 30MB
                  </span>
                  <Button color="blue" className={s.uploader_btn}>
                    + Add Cover
                  </Button>
                </Uploader>
              );
            }}
          />
        )}
        <Field
          id="selling"
          name="selling"
          render={({ form: { isSubmitting } }: FieldProps) => (
            <div className={s.selling}>
              <div className={s.selling_text}>
                <span className={s.title}>List post on marketplace</span>
                <span className={s.grey_text}>
                  List NFT sale at a fixed price or a timed auction
                </span>
              </div>
              <Checker
                isChecked={values.selling}
                disabled={isSubmitting}
                handleClick={handleCheck}
              />
            </div>
          )}
        />
        <Field
          id="totalSupply"
          name="totalSupply"
          required
          render={({ form: { isSubmitting } }: FieldProps) => (
            <FormInput
              name="totalSupply"
              type="number"
              label="Number of copies"
              color="white"
              placeholder="Enter number of copies you want to create"
              positiveOnly
              integer
              value={values.totalSupply.toString()}
              onChange={handleChange}
              disabled={isSubmitting}
              error={(touched.totalSupply && errors.totalSupply) || ''}
              onBlur={(e: SyntheticEvent) => handleBlur(e)}
            />
          )}
        />
        {values.selling && (
          <>
            <Field
              id="isFixedPrice"
              name="isFixedPrice"
              required
              render={({ form: { isSubmitting } }: FieldProps) => (
                <Switcher
                  firstTab="$ Fixed Price"
                  secondTab="Time Auction"
                  activeTab={values.isFixedPrice ? '$ Fixed Price' : 'Time Auction'}
                  setActiveTab={
                    isSubmitting || +values.totalSupply > 1 ? handleBlockedSwitcher : handleSwitch
                  }
                />
              )}
            />
            {values.isFixedPrice ? (
              <div className={s.price}>
                <Field
                  id="price"
                  name="price"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <FormInput
                      name="price"
                      type="number"
                      label="Price"
                      color="white"
                      placeholder="Enter price for one piece"
                      value={values.price}
                      suffix={
                        <div className="modal-suffix">
                          <PriceSelector
                            isOpen={isPriceSelectorOpen}
                            setOpen={setIsPriceSelectorOpen}
                            setCurrentCurrency={handleSelectCurrency}
                            currentCurrency={values.currency}
                          />
                          <span>
                            {new BigNumber(rates[values.currency])
                              .times(values.price || 0)
                              .toFixed(3, 1)}
                            &nbsp;$
                          </span>
                        </div>
                      }
                      onChange={handleChange}
                      disabled={isSubmitting}
                      error={(touched.price && errors.price) || ''}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                    />
                  )}
                />
                <div className="modal-box-option">
                  <span className="modal-box-option-name">Service fee:</span>
                  <span className="modal-box-option-value">{fee}%</span>
                </div>
                <div className="modal-box-option">
                  <span className="modal-box-option-name">You will receive:</span>
                  <span className="modal-box-option-value">
                    {new BigNumber(values.price || 0).times(1 - fee / 100).toString(10)}&nbsp;
                    {values.currency.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <Field
                  id="price"
                  name="price"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <FormInput
                      name="price"
                      type="number"
                      label="Minimum Bid"
                      description="Bids below this amount won’t be allowed."
                      color="white"
                      placeholder="Enter Minimum Bid"
                      value={values.price}
                      suffix={
                        <div className="modal-suffix">
                          <PriceSelector
                            isOpen={isPriceSelectorOpen}
                            setOpen={() => {}}
                            isStatic
                            setCurrentCurrency={handleSelectCurrency}
                            currentCurrency="rec"
                          />
                          <span>
                            {new BigNumber(rates[values.currency])
                              .times(values.price || 0)
                              .toFixed(3, 1)}
                            &nbsp;$
                          </span>
                        </div>
                      }
                      onChange={handleChange}
                      disabled={isSubmitting}
                      error={(touched.price && errors.price) || ''}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                    />
                  )}
                />
                <div className={s.row}>
                  <Field
                    id="startAuction"
                    name="startAuction"
                    required
                    render={({ form: { isSubmitting } }: FieldProps) => (
                      <Calendar
                        name="startAuction"
                        date={values.startAuction}
                        minDate={new Date()}
                        handleChange={(date) => setFieldValue('startAuction', date)}
                        label="Starting date"
                        placeholder="Enter Date"
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <Field
                    id="endAuction"
                    name="endAuction"
                    required
                    render={({ form: { isSubmitting } }: FieldProps) => (
                      <Calendar
                        name="endAuction"
                        date={values.endAuction}
                        minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                        allowSameDay={false}
                        handleChange={(date) => setFieldValue('endAuction', date)}
                        label="Expiration date"
                        placeholder="Enter Date"
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </div>
              </>
            )}
            <Field
              id="creatorRoyalty"
              name="creatorRoyalty"
              required
              render={({ form: { isSubmitting } }: FieldProps) => (
                <FormInput
                  name="creatorRoyalty"
                  type="number"
                  label="Royalties"
                  color="white"
                  placeholder="Enter Royalties"
                  positiveOnly
                  integer
                  value={values.creatorRoyalty.toString()}
                  max={100}
                  suffix="%"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={(touched.creatorRoyalty && errors.creatorRoyalty) || ''}
                  onBlur={(e: SyntheticEvent) => handleBlur(e)}
                />
              )}
            />
          </>
        )}
      </div>
      <div className={s.column_white}>
        <span className={s.title}>NFT Details</span>
        <span className={s.grey_text}>
          Complete the following details before your post is listed on the marketplace.
        </span>
        <div className={s.column_white_block}>
          <Field
            id="name"
            name="name"
            required
            render={({ form: { isSubmitting } }: FieldProps) => (
              <FormInput
                name="name"
                type="text"
                label="Title"
                color="grey"
                placeholder="Enter title about your art..."
                value={values.name}
                onChange={handleChange}
                disabled={isSubmitting}
                error={(touched.name && errors.name) || ''}
                onBlur={(e: SyntheticEvent) => handleBlur(e)}
              />
            )}
          />
          <Field
            id="tag"
            name="tag"
            required
            render={() => (
              <CategorySelector
                handleChooseCategory={handleSetCategory}
                name="tag"
                value={values.tag}
                error={(touched.tag && errors.tag) || ''}
                onChange={handleChange}
                disabled
                onBlur={(e: SyntheticEvent) => handleBlur(e)}
              />
            )}
          />
          <Field
            id="description"
            name="description"
            required
            render={({ form: { isSubmitting } }: FieldProps) => (
              <TextArea
                name="description"
                label="Caption"
                placeholder="Enter description about your art..."
                value={values.description}
                onChange={handleChange}
                disabled={isSubmitting}
                error={(touched.description && errors.description) || ''}
                onBlur={(e: SyntheticEvent) => handleBlur(e)}
              />
            )}
          />
          <Field
            id="hashtags"
            name="hashtags"
            render={({ form: { isSubmitting } }: FieldProps) => (
              <FormInput
                name="hashtags"
                type="text"
                label="Add hashtags"
                description="To add hashtag on hashtags list click '+' button"
                color="grey"
                placeholder="Add #hastag about your art..."
                suffix={
                  hashtag && (
                    <Button className={s.add_hashtag} onClick={handleAddHashtag}>
                      +
                    </Button>
                  )
                }
                error={
                  touched.hashtags && typeof errors.hashtags === 'string' ? errors.hashtags : ''
                }
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                disabled={isSubmitting}
                onBlur={(e: SyntheticEvent) => handleBlur(e)}
              />
            )}
          />
          {values.hashtags.length ? (
            <div className={s.hashtags}>
              {values.hashtags.map((item) => (
                <Button
                  key={item}
                  color="bordered"
                  className={s.hashtags_btn}
                  onClick={handleRemoveHashtag(item)}
                >
                  <span>{item}</span>
                  <CloseImg />
                </Button>
              ))}
            </div>
          ) : (
            React.Fragment
          )}
          <Button
            color="blue"
            disabled={
              createTokenRequestStatus === RequestStatus.REQUEST ||
              Object.keys(errors).length !== 0 ||
              !values.media ||
              (values.format !== 'image' && !values.cover)
            }
            className={s.submit}
            onClick={handleSubmit}
          >
            {createTokenRequestStatus === RequestStatus.REQUEST ? (
              <Spinner color="blue" size="sm" />
            ) : (
              'Create Item'
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
};
