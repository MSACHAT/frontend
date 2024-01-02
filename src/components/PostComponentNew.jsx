import { Typography, TextArea, Image, Space } from '@douyinfe/semi-ui';
import { Avatar } from '@douyinfe/semi-ui';
import Icon, { IconLikeHeart, IconComment } from '@douyinfe/semi-icons';
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
        <Space align={'center'}>

        
          <IconLikeHeart
            style={{ color }}
            size="default"
            onClick={() => handleClickOnLike(color, postId)}
          />
          <Text size="small" style={{ marginRight: 5 }}>{likeLocalCount}</Text>
          <IconComment size={'default'} />
          <Text size='small' >{commentCount}</Text>
          </Space>


        <TimeDisplay className={'feed-time'} timeStamp={time} />

      </Space>
    </>
  );
};

const TimeDisplay = ({ timeStamp }) => {
  const [timeDifference, setTimeDifference] = useState('');
  const { Text } = Typography;

  useEffect(() => {
    // 在组件挂载时执行一次
    const currentTime = new Date();
    const backendTime = new Date(timeStamp);
    const timeDiffInSeconds = Math.floor((currentTime - backendTime) / 1000);

    if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      setTimeDifference(`${minutes} 分钟前`);
    } else {
      const formattedDate = backendTime.toLocaleDateString();
      setTimeDifference(`${formattedDate}`);
    }
  }, []); // 空数组表示只在组件挂载时执行一次

  return (
    <Text size="default" type="quaternary">
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
  const { Paragraph, Text } = Typography;
  const inputList = [
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg',
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg"
  ];
  console.log(images);

  return (
    <>

      <Paragraph>

        <Text type={'secondary'} strong={true}>
          {content}
        </Text>

        <br />
        <PostImgs imgUrls={images} />
        <br />

        <PostStatsBar
          likeCount={likeCount}
          commentCount={commentCount}
          postId={postId}
          time={timeStamp}
        />

      </Paragraph>
    </>
  );
};
