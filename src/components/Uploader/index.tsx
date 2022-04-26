import { FC } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import cn from 'classnames';
import { useFormikContext } from 'formik';

import { Button } from 'components';
import { fileValidation } from 'utils';

import { ButtonColors } from 'types';

import s from './Uploader.module.scss';

interface IProps {
  isLoading?: boolean;
  handleUpload?: (value: File) => void;
  className?: string;
  colorButton?: ButtonColors;
  formikValue?: string | 'cover'; // cover for video/audio
  setFormat?: (format: string) => void;
  maxSizeInMb?: number;
  isImgOnly?: boolean;
}

type TImage =
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/svg'
  | 'image/svg+xml'
  | 'image/png'
  | 'image/webp'
  | 'image/gif';
type TOtherMedia = 'video/mp4' | 'audio/mpeg';
export type TFile = TImage | TOtherMedia;

const Uploader: FC<IProps> = ({
  className,
  formikValue,
  isLoading,
  colorButton = 'default',
  handleUpload,
  setFormat,
  maxSizeInMb = 100,
  children,
  isImgOnly = false,
}) => {
  const formik = useFormikContext();

  const handleChange = <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[]) => {
    if (!acceptedFiles.length) {
      toast.error(
        fileRejections[0].errors[0].message === 'File type must be image/*'
          ? 'File type must be image or GIF'
          : 'File type must be image, GIF, audio or video',
      );
      return;
    }
    const currentFile = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(currentFile);
    if (handleUpload) {
      handleUpload(currentFile);
    }
    if (!formikValue) {
      return;
    }
    if (formikValue === 'cover') {
      formik.setFieldValue('coverPreview', fileUrl);
    } else {
      formik.setFieldValue('preview', fileUrl);
    }
    formik.setFieldValue(formikValue, currentFile);
    if (setFormat && formikValue !== 'cover') {
      setFormat(currentFile.type.slice(0, currentFile.type.indexOf('/')));
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: isImgOnly ? 'image/*' : ['image/*', 'video/*', 'audio/mpeg'],
    validator: (file) => fileValidation(file, maxSizeInMb),
    onDrop: handleChange,
  });

  return (
    <div className={cn(formikValue && s[formikValue])}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button className={className} color={colorButton} disabled={isLoading}>
          {children || 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default Uploader;
