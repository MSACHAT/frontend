import { Typography, TextArea, Image, Space } from '@douyinfe/semi-ui';
import {
  IconHeartStroked,
  IconCommentStroked,
  IconLikeHeart,
} from '@douyinfe/semi-icons';
import React, { useEffect, useState } from 'react';
import { PostImgs } from '../components/PostImgs';
import './postStyle.scss';
export const PostStatsBar = props => {
  const { likeCount, commentCount, postId, time } = props;
  const [color, setColor] = useState('gray');
  const [likeLocalCount, setLikeLocalCount] = useState();
  const { Text } = Typography;
  useEffect(() => {
    setLikeLocalCount(likeCount); //这个不能放外面，不然会循环渲染
  }, []);
  const handleClickOnLike = (color, postId) => {
    if (color === 'gray') {
      setColor('red');
      setLikeLocalCount(likeLocalCount + 1);
      if (localStorage.getItem('postsLiked') == null) {
        localStorage.setItem('postsLiked', JSON.stringify({}));
      }
      let obj = JSON.parse(localStorage.getItem('postsLiked'));
      obj[postId] = true;
      localStorage.setItem('postsLiked', JSON.stringify(obj));
      console.log(
        'LocalStorage(postsLiked): ' + localStorage.getItem('postsLiked')
      );
    } else {
      setColor('gray');
      setLikeLocalCount(likeLocalCount - 1);
      if (localStorage.getItem('postsLiked') == null) {
        localStorage.setItem('postsLiked', JSON.stringify({}));
      }
      let obj = JSON.parse(localStorage.getItem('postsLiked'));
      obj[postId] = false;
      localStorage.setItem('postsLiked', JSON.stringify(obj));
      console.log(
        'LocalStorage(postsLiked): ' + localStorage.getItem('postsLiked')
      );
    }

    const currentTime = new Date();
    const backendTime = new Date(time);
    const timeDiffInSeconds = Math.floor((currentTime - backendTime) / 1000);

    if (timeDiffInSeconds < 60) {
      setTimeDifference(`${timeDiffInSeconds} 秒前`);
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      setTimeDifference(`${minutes} 分钟前`);
    } else {
      const formattedDate = backendTime.toLocaleDateString();
      setTimeDifference(`${formattedDate}`);
    }
  };
  
  return (
    <>

      <Space className={'alternation'} align={'center'}>
     
        <div className='alternation'>
          <div className='icon'>
          <IconHeartStroked
            style={{ color, marginRight: 5 }}
            size="default"
            onClick={() => handleClickOnLike(color, postId)}
          />
          <Text size="small" color="#180001" style={{ marginRight: 12 }}>
            {likeLocalCount}
          </Text>
          <IconCommentStroked style={{ marginRight: 6 }} size={'default'} />
          <Text size="small">{commentCount}</Text>
          </div>

          <div className='feed-time'>
          <TimeDisplay className={'feed-time'} timeStamp={time} />
          </div>
          
        </div>

        
      </Space>
    </>
  );
};

const TimeDisplay = ({ timeStamp }) => {
  const [timeDifference, setTimeDifference] = useState('');
  const { Text } = Typography;

  useEffect(() => {
    const backendTime = new Date(timeStamp);
    const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    const formattedDate = backendTime.toLocaleDateString('en-US', options);

    const currentTime = new Date();
    const timeDiffInSeconds = Math.floor((currentTime - backendTime) / 1000);

    if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      setTimeDifference(`${minutes} 分钟前`);
    } else {
      setTimeDifference(formattedDate);
    }
  }, [timeStamp]);

  return (
    <Text size="small" type="quaternary">
      {timeDifference}
    </Text>
  );
};

export const Post = props => {
  const {
    userName,
    timeStamp,
    images,
    content,
    likeCount,
    commentCount,
    title,
    isLiked,
    postId,
  } = props;
  const { Paragraph, Text, Title } = Typography;

  console.log(images);

  return (
    <div className={'post-detail'}>
      <Text type={'secondary'} strong={true}>
        {content}
      </Text>
      <PostImgs imgUrls={images} />
      <PostStatsBar
        likeCount={likeCount}
        commentCount={commentCount}
        postId={postId}
        time={timeStamp}
      />
    </div>
  );
};
