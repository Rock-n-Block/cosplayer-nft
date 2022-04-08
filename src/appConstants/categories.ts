import { IDropdownItem } from 'types';

import {
  AnimeIllustrationImg,
  AnotherImg,
  ArtImg,
  CosplayerImg,
  KidsArtImg,
  MovieImg,
  MusicImg,
  PhotoImg,
  PictureImg,
} from 'assets/img/icons/navbar';

export const categories: IDropdownItem[] = [
  {
    value: 'anime-illustration',
    label: 'Anime Illustration',
    icon: AnimeIllustrationImg,
  },
  {
    value: 'cosplayer',
    label: 'Cosplayer',
    icon: CosplayerImg,
  },
  {
    value: 'photo',
    label: 'Photo',
    icon: PhotoImg,
  },
  {
    value: 'art',
    label: 'Art',
    icon: ArtImg,
  },
  {
    value: 'kids-art',
    label: 'Kids Art',
    icon: KidsArtImg,
  },
  {
    value: 'music',
    label: 'Music',
    icon: MusicImg,
  },
  {
    value: 'picture',
    label: 'Picture',
    icon: PictureImg,
  },
  {
    value: 'movie',
    label: 'Movie',
    icon: MovieImg,
  },
  {
    value: 'another',
    label: 'Another',
    icon: AnotherImg,
  },
];
