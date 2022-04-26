import { ICategory, IDropdownItem } from 'types';

import {
  AllImg,
  AnimeIllustrationImg,
  AnotherImg,
  ArtImg,
  CosplayerImg,
  EarliestImg,
  HighestPriceImg,
  KidsArtImg,
  LatestImg,
  LowestPriceImg,
  MovieImg,
  MusicImg,
  PhotoImg,
  PictureImg,
  RecentlySoldImg,
  TrendingImg,
} from 'assets/img/icons/navbar';

export const sorts: IDropdownItem[] = [
  {
    value: '-likes',
    label: 'Trending',
    icon: TrendingImg,
  },
  {
    value: '-date',
    label: 'Latest',
    icon: LatestImg,
  },
  {
    value: '+date',
    label: 'Earliest',
    icon: EarliestImg,
  },
  {
    value: 'recently_sold',
    label: 'Recently Sold',
    icon: RecentlySoldImg,
  },
  {
    value: '-price',
    label: 'Highest Price',
    icon: HighestPriceImg,
  },
  {
    value: '+price',
    label: 'Lowest Price',
    icon: LowestPriceImg,
  },
];

export const categoriesList: ICategory[] = [
  {
    name: 'All',
    logo: AllImg,
    isActive: true,
  },
  {
    name: 'Anime Illustration',
    logo: AnimeIllustrationImg,
    isActive: false,
  },
  {
    name: 'Cosplayer',
    logo: CosplayerImg,
    isActive: false,
  },
  {
    name: 'Photo',
    logo: PhotoImg,
    isActive: false,
  },
  {
    name: 'Art',
    logo: ArtImg,
    isActive: false,
  },
  {
    name: 'Kids Art',
    logo: KidsArtImg,
    isActive: false,
  },
  {
    name: 'Music',
    logo: MusicImg,
    isActive: false,
  },
  {
    name: 'Picture',
    logo: PictureImg,
    isActive: false,
  },
  {
    name: 'Movie',
    logo: MovieImg,
    isActive: false,
  },
  {
    name: 'Another',
    logo: AnotherImg,
    isActive: false,
  },
];
