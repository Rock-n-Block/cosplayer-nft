import { FileError } from 'react-dropzone';

export const isValidFileSize = (fileSize: number, maxSize: number): boolean => {
  const maxFileSizeInBytes = maxSize * 1024 * 1024;

  return fileSize <= maxFileSizeInBytes;
};

export const fileValidation = (file: File, maxSizeInMb: number): FileError | FileError[] | null => {
  if (!isValidFileSize(file.size, maxSizeInMb)) {
    return {
      code: 'file-size-too-large',
      message: `File size is larger than ${maxSizeInMb} mb`,
    };
  }
  return null;
};
