import { FC, memo } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { createToken } from 'store/nfts/actions';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { Currencies } from 'types';

import { CreateFormComponent } from '../component';

export type CreateFormProps = {
  name: string;
  totalSupply: number;
  currency: Currencies;
  description: string;
  tag: string;
  hashtags: string[];
  price: number;
  minimalBid: number;
  startAuction: Date;
  endAuction: Date;
  creatorRoyalty: number;
  collection: number;
  selling: boolean;
  media: string;
  format: 'image' | 'video' | 'audio';
  preview: string;
  cover: string;
  coverPreview: string;
  isFixedPrice: boolean;
  isLoading: boolean;
};

const CreateForm: FC = () => {
  const props: CreateFormProps = {
    name: '',
    totalSupply: 1,
    currency: 'bnb',
    description: '',
    tag: '',
    hashtags: [],
    price: 0,
    minimalBid: 0,
    startAuction: null as unknown as Date,
    endAuction: null as unknown as Date,
    creatorRoyalty: 10,
    collection: 0,
    selling: true,
    media: '',
    format: 'image',
    preview: '',
    cover: '',
    coverPreview: '',
    isFixedPrice: true,
    isLoading: false,
  };

  const dispatch = useDispatch();

  const FormWithFormik = withFormik<any, CreateFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, 'Too short').max(50, 'Too long'),
      totalSupply: Yup.number().min(1, 'Minimal amount equal to 1').max(100, 'Too much'),
      description: Yup.string().max(500, 'Too long'),
      minimalBid: Yup.number().min(0.001, 'Minimal bid equal to 0.001'),
      price: Yup.number().min(0.001, 'Minimal price equal to 0.001'),
      creatorRoyalty: Yup.number().min(0.001, 'Minimal royalties equal to 0').max(50, 'Too much'),
    }),

    handleSubmit: async (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('standart', values.totalSupply === 1 ? 'ERC721' : 'ERC1155');
      formData.append('total_supply', values.totalSupply.toString());
      formData.append('currency', values.currency);
      if (values.description) {
        formData.append('description', values.description);
      }
      if (values.tag) {
        formData.append('tag', values.tag);
      }
      if (values.hashtags.length) {
        formData.append('hashtags', values.hashtags.join(' '));
      }
      if (values.isFixedPrice) {
        formData.append('price', values.price.toString());
      } else {
        formData.append('minimal_bid', values.minimalBid.toString());
      }
      formData.append('creator_royalty', values.creatorRoyalty.toString());
      formData.append('collection', values.totalSupply === 1 ? '3' : '4');
      formData.append('selling', values.selling.toString());

      formData.append('media', values.media);
      if (values.format !== 'image') {
        if (!values.cover) {
          toast.info(`Upload a preview for the ${values.format}`);
          setFieldValue('isLoading', false);
          return;
        }

        formData.append('cover', values.cover);
      }
      formData.append('format', values.format);
      dispatch(createToken(formData));
      setFieldValue('isLoading', false);
    },
  })(CreateFormComponent);
  return <FormWithFormik />;
};

export default memo(CreateForm);
