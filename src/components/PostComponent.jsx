import { Avatar, Space } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import { IconLikeHeart, IconHeartStroked } from '@douyinfe/semi-icons';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import React, { useState } from 'react';
import { PostImgs } from './PostImgs';
import './postStyle.scss';
import { timeAgo } from './CalculateTimeAgo';
const Comment = () => <img src={process.env.PUBLIC_URL + '/ic_comment.svg'} />;
export const Post = props => {
  const navigator = useNavigate();
  const [like, setLike] = useState(props.isLiked);
  if (!props) {
    return null;
  }

  const handleLike = async () => {
    const requestLike = new Promise((resolve, reject) => {
      //TODO 换成真实的点赞请求
      let isSuccessful = Math.random() >= 0.5; // 随机成功或失败
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
  const handleParentClick = event => {
    if (isPostPage()) {
      return;
    }
    // 检查点击事件是否直接发生在父元素上
    if (
      !event.target.closest('.interact') &&
      !event.target.closest('.avatar-space')
    ) {
      console.log('父元素被点击');
      console.log(props,11111111111111111);
      navigator(`/post/${props.postId}`);
      // return <Navigate to={`post/1`} />;
    } else if (event.target.closest('.avatar-space')) {
      console.log('跳转个人页面'); //TODO:改成他人页
      navigator(`/profile/${props.id}`);
    }
 
  };
  const location = useLocation();

  const isPostPage = () => {
    const pathRegex = /^\/post\/[^\/]+$/; // 正则表达式匹配 /post/:postId 模式
    return pathRegex.test(location.pathname);
  };

  return (
    <div className={'post'} onClick={handleParentClick}>
      {!props?.hideUser ? (
        <Space className={'avatar-space'}>
          <Avatar src={props.avatar} className={'avatar'} />
          <Title heading={5}>{props.userName}</Title>
        </Space>
      ) : null}
      <Title heading={5} className={'content'}>
        {props.content}
      </Title>
      <PostImgs imgUrls={props.images} />
      <div className={'interact'}>
        <Space className={'like'}>
          {like ? (
            <IconLikeHeart onClick={handleLike} />
          ) : (
            <IconHeartStroked onClick={handleLike} />
          )}
          <Text size={'small'}>{props.likeCount}</Text>
        </Space>
        <Space>
          <Comment />
          <Text size={'small'}>{props.commentCount}</Text>
        </Space>
        <Text className={'time'} size={'small'}>
          {timeAgo(props.timeStamp)}
        </Text>
      </div>
    </div>
  );
};
