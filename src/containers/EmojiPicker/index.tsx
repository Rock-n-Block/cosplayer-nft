import React, { FC, memo, useState } from 'react';

import Picker, { IEmojiData } from 'emoji-picker-react';

import { Button } from 'components';

import { useClickOutside } from 'hooks';

import { SmileImg } from 'assets/img/icons';

import s from './EmojiPicker.module.scss';

export interface EmojiPickerProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ setState }) => {
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { ref } = useClickOutside(isEmojiPickerOpen, setEmojiPickerOpen);

  const handleOpenEmojiPicker = () => {
    setEmojiPickerOpen(true);
  };

  const handleCloseEmojiPicker = () => {
    setEmojiPickerOpen(false);
  };

  const handlePickEmoji = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData,
  ) => {
    setState((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className={s.emoji_root} ref={ref}>
      <Button onClick={isEmojiPickerOpen ? handleCloseEmojiPicker : handleOpenEmojiPicker}>
        <SmileImg className={s.emoji_icon} />
      </Button>
      {isEmojiPickerOpen && (
        <div className={s.emoji_picker}>
          <Picker onEmojiClick={handlePickEmoji} />
        </div>
      )}
    </div>
  );
};

export default memo(EmojiPicker);
