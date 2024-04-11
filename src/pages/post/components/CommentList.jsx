
import React, { useEffect, useState } from 'react';
import { Avatar, List, Spin, TextArea, Toast } from '@douyinfe/semi-ui';

import InfiniteScroll from 'react-infinite-scroller';
import './CommentListStyle.scss';
import { Typography } from '@douyinfe/semi-ui';
import { animateScroll as scroll } from 'react-scroll';
import apiClient from '../../../middlewares/axiosInterceptors';
import { useRecoilState } from 'recoil';
import { CommentCount } from '../../../store';
import { useNavigate } from 'react-router-dom';
import FormattedTime from '../../../components/formatDate';
import useSWRInfinite from 'swr/infinite';


const CommentList = ({ postId }) => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const [value, setValue] = useState('');
  const [inputSize, setInputSize] = useState(62);
  const fetchComments = async (url) => {
    const response = await apiClient.get(url);
    return response.data;
  };
  const getKey = (pageIndex, previousPageData) => {

    if (previousPageData && !previousPageData.comments.length) return null;


    return `/comments/get/${postId}?pageNum=${pageIndex + 1}&pageSize=15`;
  };
  const { data, error, mutate, size, setSize: setSizeSWR ,isLoading} = useSWRInfinite(getKey, fetchComments);

  const comments = data ? data.reduce((acc, page) => acc.concat(page.comments), []) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');



  async function sendComment(value, postId) {
    const data = {
      content: value,
    };
    try {
      const response = await apiClient.put(`/posts/${postId}/comment`, data);

      const responseData = await response.data;
      console.log('Response Data:', responseData);
    } catch (e) {
      console.error('Error sending data:', e);
    }
  }
  const handlePublish = async () => {
    if (value.trim() === '') {
      Toast.warning('评论内容不能为空');
      return;
    }

    try {
      const newComment = await sendComment(value,postId);

      await mutate((pages) => {
        const nonEmptyPage = pages.find((page, index) => index > 0 && page.comments.length > 0);
        if (nonEmptyPage) {
          nonEmptyPage.comments = [newComment, ...nonEmptyPage.comments];
        } else {
          pages[0].comments = [newComment];
        }
        return pages;
      }, false);

      setValue('');
      setInputSize(62);
    } catch (error) {
      Toast.error('发送评论失败，请重试');
    }
  };

  const handleChange = event => {
    setValue(event);
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 200,
      smooth: 'easeInOutQuart',
    });
  };



  function route(userId) {
    navigate(`/profile/${userId}`);
  }

  return (
    <div className={'commentList'}>
      <div className={'comments'}>
        <div className={'text'}>
          <Text className={'content'}>评论</Text>
        </div>
        <InfiniteScroll
          style={{ width: '100%' }}
          initialLoad={false}
          pageStart={0}
          threshold={100}
          loadMore={fetchComments}
          hasMore={hasMore}
        >
          <List
            emptyContent={'目前还没有评论哦，来做第一个评论的人吧！！'}
            split={false}
            dataSource={comments}
            renderItem={(item, index) => (
              <div className={'comment'} id={index}>
                <Avatar
                  className={'comment-avatar'}
                  src={item.userAvatar}
                  onClick={() => {
                    route(item.userId);
                  }}
                />

                <div className={'detail'}>
                  <div className={'userName'}>
                    <Text className={'comment-user'}>{item.userName}</Text>
                  </div>
                  <Text className={'comment-content'}>{item.content}</Text>
                  <FormattedTime
                    className={'comment-time'}
                    TimeStamp={item.timeStamp}
                  />
                </div>
              </div>
            )}
          />
          {isLoading && isLoadingMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
        {!hasMore && data.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <text
              style={{ color: 'var(--semi-color-text-40)', fontWeight: 400 }}
            >
              没有更多了...
            </text>
          </div>
        )}
        <div style={{ height: '100px' }} />
      </div>
      <div
        className={'textarea-bg'}
        style={{
          height: `${inputSize}px`,
        }}
      >
        <TextArea
          style={{
            width: '90%',
            borderRadius: '12px',
            backgroundColor: '#F4F4F4',
            zIndex: 1000,
          }}
          autosize={{ minRows: 1 }}
          onResize={handleResize}
          rows={1}
          maxLength={200}
          minLength={1}
          maxCount={200}
          onChange={handleChange}
          value={value}
          placeholder={'评论'}
          onEnterPress={handlePublish}
        />
      </div>
    </div>
  );
};
export default CommentList;