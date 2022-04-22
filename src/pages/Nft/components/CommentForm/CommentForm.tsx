import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { comment } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';

import { EmojiPicker } from 'containers';

import { Button, Spinner } from 'components';

import { useShallowSelector } from 'hooks';
import { RequestStatus } from 'types';

import s from './CommentForm.module.scss';

export const CommentForm: FC = () => {
  const [value, setValue] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const { [actionTypes.COMMENT]: commentRequestStatus } = useShallowSelector(uiSelector.getUI);

  const handleComment = () => {
    if (id) {
      dispatch(comment({ text: value, token_id: id }));
    }
  };

  return (
    <div className={s.form}>
      <EmojiPicker setState={setValue} />
      <input
        type="text"
        className={s.form_input}
        placeholder="Add comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        color="orange"
        className={s.form_submit}
        disabled={commentRequestStatus === RequestStatus.REQUEST || !value}
        onClick={handleComment}
      >
        {commentRequestStatus === RequestStatus.REQUEST ? (
          <Spinner color="blue" size="sm" />
        ) : (
          'Post'
        )}
      </Button>
    </div>
  );
};
