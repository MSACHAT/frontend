import { Avatar, Space } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import { IconLikeHeart, IconHeartStroked } from '@douyinfe/semi-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import React, { useEffect, useState } from 'react';
import { PostImgs } from './PostImgs';
import './postStyle.scss';
import { timeAgo } from './CalculateTimeAgo';
import apiClient from '../middlewares/axiosInterceptors';
import commentIcon from './ic_comment.svg';
const Comment = () => <img src={commentIcon} />;

export const Post = props => {
  const navigator = useNavigate();
  const [like, setLike] = useState();
  const [likeCount, setLikeCount] = useState();
  if (!props) {
    return null;
  }
  useEffect(() => {
    setLike(props.isLiked);
    setLikeCount(props.likeCount);
  }, [props.isLiked, props.likeCount]); // 仅当 props.isLiked 或 props.likeCount 变化时执行

  function handleLike() {
    apiClient
      .patch(`/posts/${props.id}/like`, {
        isLiked: !like,
      })
      .then(res => {
        if (like) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
        setLike(!like);
      });
  }
  const handleParentClick = event => {
    if (isPostPage()) {
      return;
    }
    // 检查点击事件是否直接发生在父元素上
    if (
      !event.target.closest('.like') &&
      !event.target.closest('.avatar-space')
    ) {
      console.log('父元素被点击');
      console.log(props, 22222222);
      navigator(`/post/${props.id}`);
      // return <Navigate to={`post/1`} />;
    } else if (event.target.closest('.avatar-space')) {
      console.log('跳转个人页面'); //TODO:改成他人页
      console.log(1111111111);
      console.log(props, 1111111111);
      navigator(`/profile/${props.userId}`);
    }
    // else if (event.target.classList.contains('interact')) {
    //   handleLike();
    // } else {
    //   // 其他子元素的点击行为
    //   // navigator(`/post/${props.postId}`);
    //   console.log('其他子元素的点击，但父元素响应');
    //   event.stopPropagation();
    // }
  };
  const location = useLocation();
  const isPostPage = () => {
    // 检查当前路径是否符合特定模式
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
          <Text size={'small'}>{likeCount}</Text>
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
