import { FC } from 'react';
import { useImage } from 'react-image';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export type ImgLoaderProps = {
  className?: string;
  width?: number;
  height?: number;
  borderRadius?: string;
  url: string;
  alt: string;
};

const ImgLoader: FC<ImgLoaderProps> = ({ className, width, height, borderRadius, url, alt }) => {
  const { src, isLoading } = useImage({
    srcList: url,
    useSuspense: false,
  });

  return isLoading ? (
    <Skeleton
      width={width || '100%'}
      height={height || '100%'}
      borderRadius={borderRadius || 0}
      className={className}
    />
  ) : (
    <img src={src} className={className} alt={alt} />
  );
};

export default ImgLoader;
