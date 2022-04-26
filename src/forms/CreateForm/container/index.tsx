import { FC } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { createToken } from 'store/nfts/actions';

import BigNumber from 'bignumber.js';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { createValidator } from 'appConstants';
import { useWalletConnectorContext } from 'services';
import { Currencies } from 'types';

import { CreateFormComponent } from '../component';

export type CreateFormProps = {
  name: string;
  totalSupply: number;
  currency: Currencies;
  description: string;
  tag: string;
  hashtags: string[];
  price: string;
  minimalBid: string;
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
    price: '',
    minimalBid: '',
    startAuction: new Date(),
    endAuction: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
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
  const { walletService } = useWalletConnectorContext();

  const FormWithFormik = withFormik<any, CreateFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      media: Yup.mixed().required('Media is required'),
      name: Yup.string()
        .min(createValidator.name.min, 'Too short')
        .max(createValidator.name.max, 'Too long')
        .required('Title is required'),
      totalSupply: Yup.number()
        .min(createValidator.totalSupply.min, 'Minimal amount equals to 1')
        .max(createValidator.totalSupply.max, 'Too much')
        .required('Number of copies is required'),
      description: Yup.string().max(createValidator.description.max, 'Too long'),
      price: props.selling
        ? Yup.number()
            .min(createValidator.minPrice, 'Minimal value equals to 0.001')
            .required(props.isFixedPrice ? 'Price is required' : 'Minimal bid is required')
        : Yup.number().notRequired(),
      creatorRoyalty: props.selling
        ? Yup.number()
            .min(createValidator.royalty.min, 'Minimal royalties equal to 0')
            .max(createValidator.royalty.max, 'Too much')
            .required('Royalties are required')
        : Yup.number().notRequired(),
      startAuction: props.isFixedPrice ? Yup.date().notRequired() : Yup.date().required(),
      endAuction: props.isFixedPrice ? Yup.date().notRequired() : Yup.date().required(),
      tag: Yup.string().required('Category is required'),
      hashtags: Yup.array().min(1, 'Hashtags are required').required(),
    }),
    handleSubmit: (values) => {
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
      if (values.selling) {
        if (values.isFixedPrice) {
          if (!values.price) {
            toast.error('Enter price of NFT for sale');
            return;
          }
          formData.append('price', values.price.toString());
        } else {
          if (!values.price) {
            toast.error('Enter minimal bid of NFT for auction');
            return;
          }
          formData.append('minimal_bid', values.price.toString());
          formData.append(
            'start_auction',
            new BigNumber(values.startAuction.getTime()).div(1000).toFixed(0, 1),
          );
          formData.append(
            'end_auction',
            new BigNumber(values.endAuction.getTime()).div(1000).toFixed(0, 1),
          );
        }
      }
      formData.append('creator_royalty', values.creatorRoyalty.toString());
      formData.append('collection', values.totalSupply === 1 ? '3' : '4');
      formData.append('selling', values.selling.toString());
      formData.append('media', values.media);
      if (values.format !== 'image') {
        if (!values.cover) {
          toast.info(`Upload a preview for the ${values.format}`);
          return;
        }
        formData.append('cover', values.cover);
      }
      formData.append('format', values.format);
      dispatch(createToken({ formData, web3Provider: walletService.Web3() }));
    },
    displayName: 'create-nft',
  })(CreateFormComponent);
  return <FormWithFormik />;
};

export default CreateForm;
