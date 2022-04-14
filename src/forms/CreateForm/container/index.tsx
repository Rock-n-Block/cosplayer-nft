import { FC } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { createToken } from 'store/nfts/actions';

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
  const { walletService } = useWalletConnectorContext();

  const FormWithFormik = withFormik<any, CreateFormProps>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(createValidator.name.min, 'Too short')
        .max(createValidator.name.max, 'Too long')
        .required(),
      totalSupply: Yup.number()
        .min(createValidator.totalSupply.min, 'Minimal amount equal to 1')
        .max(createValidator.totalSupply.max, 'Too much')
        .required(),
      description: Yup.string().max(createValidator.description.max, 'Too long'),
      price: Yup.number()
        .min(createValidator.minPrice, 'Minimal value equal to 0.001')
        .notRequired(),
      creatorRoyalty: Yup.number()
        .min(createValidator.royalty.min, 'Minimal royalties equal to 0')
        .max(createValidator.royalty.max, 'Too much')
        .required(),
    }),
    handleSubmit: (values, { setFieldValue }) => {
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
      if (values.selling) {
        if (values.isFixedPrice) {
          if (!values.price) {
            toast.error('Enter price of NFT for sale');
            return;
          }
          formData.append('price', values.price.toString());
        } else {
          if (!values.minimalBid) {
            toast.error('Enter minimal bid of NFT for auction');
            return;
          }
          formData.append('minimal_bid', values.minimalBid.toString());
          formData.append('start_auction', values.startAuction.getTime().toString());
          formData.append('end_auction', values.endAuction.getTime().toString());
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
      setFieldValue('isLoading', false);
    },
    displayName: 'create-nft',
  })(CreateFormComponent);
  return <FormWithFormik />;
};

export default CreateForm;
