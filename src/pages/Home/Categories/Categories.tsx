import { FC, useState } from 'react';

import cn from 'classnames';

import { Button } from 'components';

import { ICategory } from 'types';

import ArrowDown from 'assets/img/icons/arrow-down-blue.svg';
import {
  AllImg,
  AnimeIllustrationImg,
  AnotherImg,
  ArtImg,
  CosplayerImg,
  KidsArtImg,
  MovieImg,
  MusicImg,
  PhotoImg,
  PictureImg,
  TrendingImg,
} from 'assets/img/icons/navbar';

import s from './Categories.module.scss';

export const Categories: FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([
    {
      name: 'Trending',
      logo: TrendingImg,
      isActive: true,
    },
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
  ]);

  const handleOpenSort = () => {
    return 0;
  };

  const handleSetCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((category, idx) => {
        return idx === index
          ? {
              ...category,
              isActive: !category.isActive,
            }
          : {
              ...category,
            };
      }),
    );
  };

  return (
    <div className={s.categories}>
      {categories.map((category, index) => {
        return index === 0 ? (
          <Button onClick={() => handleOpenSort} className={s.sort}>
            <img className={s.sort_icon} src={category.logo} alt={category.name} />
            <div className={s.category_name}>{category.name}</div>
            <img className={s.sort_arrow} src={ArrowDown} alt="arrow down icon" />
          </Button>
        ) : (
          <Button
            onClick={() => handleSetCategory(index)}
            className={cn(s.category, category.isActive && s.active)}
          >
            {category.isActive ? (
              <div className={s.active_content}>
                <img src={category.logo} alt={category.name} />
                <div className={s.category_name}>{category.name}</div>
              </div>
            ) : (
              <>
                <img src={category.logo} alt={category.name} />
                <div className={s.category_name}>{category.name}</div>
              </>
            )}
          </Button>
        );
      })}
    </div>
  );
};
