import { Typography, TextArea, Image, Space } from '@douyinfe/semi-ui';
import { Avatar } from '@douyinfe/semi-ui';
import Icon, { IconLikeHeart, IconComment } from '@douyinfe/semi-icons';
import React, { useEffect, useState } from 'react';
import { PostImgs  } from '../components/PostImgs';


export const PostStatsBar = props => {
  const { likeCount, commentCount, postId } = props;
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
  };
  
  return (
    <>
      <Space align={'center'}>
        <IconLikeHeart
          style={{ color }}
          size="extra-large"
          onClick={() => handleClickOnLike(color, postId)}
        />
        <Text style={{ marginRight: 5 }}>{likeLocalCount}</Text>
        <IconComment size={'extra-large'} />
        <Text>{commentCount}</Text>
        <TextArea
          style={{
            width: '40%',
            display: 'inline-block',
            position: 'absolute',
            right: '10%',
          }}
          placeholder={'请输入评论'}
          autosize
          rows={1}
        />
      </Space>
    </>
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
        <Avatar
          size="small"
          alt="User"
          style={{ marginRight: 5, color: 'red' }}
        ></Avatar>
        <Space align={'center'}>
          <Text strong>{userName}</Text>
          <Text size={'small'} type="quaternary">
            {timeStamp}
          </Text>
        </Space>
        <br />

        <Text type={'secondary'} strong={true}>
          {content}
        </Text>
        <br />
        <PostImgs imgUrls={images} />;
        <br />
        <PostStatsBar
          likeCount={likeCount}
          commentCount={commentCount}
          postId={postId}
        />
      </Paragraph>
    </>
  );
};
