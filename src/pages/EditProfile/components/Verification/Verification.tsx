import { FC } from 'react';

import s from './Verification.module.scss';

export const Verification: FC = () => (
  <div className={s.verification}>
    <h1 className={s.verification_title}>Apply for CosplayerNFT Verification Badge</h1>
    <p className={s.grey_text}>
      The CosplayerNFT Verification Badge is a blue checkmark icon that appears next to a username
      to indicate that the account represents a well-known creator, influencer, public figure,
      celebrity, or brand.
      <br />
      <br />
      All verification badges are reviewed and approved by CosplayerNFT’s Management Team on a
      case-by-case basis in order to preserve the authenticity of our community and to promote
      confidence in the transactions made on our platform.
      <br />
      <br />
      To apply for a verification badge, please send an email to support@cosplayernft.io with
      “Verification” in the subject line and include the following information:
    </p>
    <ul className={s.black_text}>
      Eligibility Requirements:
      <li>Your CosplayerNft username</li>
      <li>Your first and last name (or company name)</li>
      <li>A copy of your government-issued photo ID (or official business documents)</li>
      <li>Links to at least 2 of your social media profiles that you own and have control over</li>
    </ul>
    <p className={s.grey_text}>
      Please allow up to 60 days for us to review your application. We will notify you via email on
      the status of your request. Thank you for your patience!
    </p>
  </div>
);
