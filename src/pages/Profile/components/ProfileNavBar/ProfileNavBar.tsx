import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Button } from 'components';

import { routes } from 'appConstants';

import { BidImg, CreatedImg, ForSaleImg, MoneyBagImg, OwnedImg } from 'assets/img/icons/profile';

import s from './ProfileNavBar.module.scss';

export const ProfileNavBar: FC = () => {
  const { userId } = useParams();
  const activeTab = useLocation().search.replace('?tab=', '');

  return (
    <div className={s.navbar}>
      <div className={s.tabs}>
        <Button
          className={activeTab === 'for-sale' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'for-sale')}
        >
          <ForSaleImg className={s.tab_img} />
          <span>
            For Sale <span className={s.grey}>88</span>
          </span>
        </Button>
        <Button
          className={activeTab === 'created' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'created')}
        >
          <CreatedImg className={s.tab_img} />
          <span>
            Created <span className={s.grey}>113</span>
          </span>
        </Button>
        <Button
          className={activeTab === 'owned' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'owned')}
        >
          <OwnedImg className={s.tab_img} />
          <span>
            Owned <span className={s.grey}>113</span>
          </span>
        </Button>
        <Button
          className={activeTab === 'sold' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'sold')}
        >
          <MoneyBagImg className={s.tab_img} />
          <span>
            Sold <span className={s.grey}>2</span>
          </span>
        </Button>
        <Button
          className={activeTab === 'bidded' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'bidded')}
        >
          <BidImg className={s.tab_img} />
          <span>
            Bidded <span className={s.grey}>0</span>
          </span>
        </Button>
      </div>
    </div>
  );
};
