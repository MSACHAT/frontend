import { Space } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import {
  IconComment,
  IconLikeHeart,
  IconLikeThumb,
} from '@douyinfe/semi-icons';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import React, { useState } from 'react';
import { PostImgs } from './PostImgs';
import { UserAvatar } from '../pages/profile/UserAvatar';

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
        <Space>
          <UserAvatar disableEdit={true} imageUrl={props.avatar} />
          <Title heading={5}>{props.userName}</Title>
        </Space>
      ) : null}
      <Title heading={5}>{props.content}</Title>
      <PostImgs imgUrls={props.images} />
      <div>
        <Space>
          {like ? (
            <IconLikeHeart onClick={handleLike} />
          ) : (
            <IconLikeThumb onClick={handleLike} />
          )}
          <Text>{props.likeCount}</Text>
        </Space>
        <Space>
          <IconComment />
          <Text>{props.commentCount}</Text>
        </Space>
        <Text>{props.timeStamp}</Text>
      </div>
    </div>
  );
};
