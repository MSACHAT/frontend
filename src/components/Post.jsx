import { Avatar } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import {
  IconComment,
  IconLikeHeart,
  IconLikeThumb,
} from '@douyinfe/semi-icons';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import React, { useState } from 'react';
import { PostImgs } from './PostImgs';

export const Post = props => {
  const [like, setLike] = useState(props.isLiked);
  if (!props) {
    return null;
  }
  const handleLike = async () => {
    const requestLike = new Promise((resolve, reject) => {
      let isSuccessful = Math.random() >= 0.5; // 随机成功或失败
      console.log(isSuccessful);
      if (isSuccessful) {
        resolve({ success: true });
        setSaveLoading(false);
      } else {
        resolve({ msg: '错误', code: 1001 });
        setSaveLoading(false);
      }
    });
    await requestLike
      .then(() => {
        setLike(!like);
      })
      .catch(() => {});
  };
  return (
    <div>
      {!props?.hideUser ? (
        <div>
          <Avatar src={props.avatar} />
          <Title>{props.userName}</Title>
        </div>
      ) : null}
      <Title>{props.content}</Title>
      <PostImgs imgUrls={props.images} />
      <div>
        <div>
          {like ? (
            <IconLikeHeart onClick={handleLike} />
          ) : (
            <IconLikeThumb onClick={handleLike} />
          )}
          <Text>{props.likeCount}</Text>
        </div>
        <div>
          <IconComment />
          <Text>{props.commentCount}</Text>
        </div>
        <Text>{props.timeStamp}</Text>
      </div>
    </div>
  );
};
