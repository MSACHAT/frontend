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
  console.log('dsiauhxgciosdhcuidhciusdhicuohsdiuchsdc');
  console.log(props.avatar);
  const navigator = useNavigate();
  const [like, setLike] = useState(props.isLiked);
  if (!props) {
    return null;
  }
  const handleLike = async () => {
    const requestLike = new Promise((resolve, reject) => {
      //TODO 换成真实的点赞请求
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
  const handleParentClick = event => {
    if (isPostPage()) {
      return;
    }
    // 检查点击事件是否直接发生在父元素上
    if (event.target === event.currentTarget) {
      console.log('父元素被点击');
      navigator(`/post/${props.postId}`);
      // return <Navigate to={`post/1`} />;

      //TODO to post detail
    } else if (event.target.classList.contains('like')) {
      handleLike();
    } else {
      // 其他子元素的点击行为
      console.log('其他子元素的点击，但父元素响应');
      event.stopPropagation();
    }
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
