import React, { useEffect, useState } from 'react';
import { Avatar, List, Spin, TextArea, Toast, Typography } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';
import './CommentListStyle.scss';
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
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = async (url) => {
    try {
      const response = await apiClient.get(url);
      if (response && response.data) {
        setHasMore(response.data.comments && response.data.comments.length > 0);  // 确保 response.data 和 response.data.comments 都存在
        return response.data;
      } else {
        setHasMore(false);
        return { comments: [] }; // 在没有数据的情况下返回空数组，避免其他地方出错
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setHasMore(false);
      return { comments: [] }; // 错误处理，返回空数组
    }
  };


  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.comments.length) return null;
    return `/comments/get/${postId}?pageNum=${pageIndex + 1}&pageSize=15`;
  };

  const { data, error, mutate, size, setSize: setSizeSWR, isLoading } = useSWRInfinite(getKey, fetchComments);

  const comments = data ? data.reduce((acc, page) => acc.concat(page.comments), []) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

  async function sendComment(content, postId) {
    const data = { content: content };
    try {
      const response = await apiClient.put(`/posts/${postId}/comment`, data);
      return response.data;  // Return the new comment data
    } catch (e) {
      console.error('Error sending data:', e);
      throw e;  // Re-throw the error to handle it in the calling function
    }
  }

  const handlePublish = async () => {
    if (value.trim() === '') {
      Toast.warning('评论内容不能为空');
      return;
    }

    try {
      const newComment = await sendComment(value, postId);
      await mutate((pages) => {
        const nonEmptyPage = pages.find((page) => page.comments && page.comments.length > 0);
        if (nonEmptyPage) {
          nonEmptyPage.comments.unshift(newComment);  // Prepend new comment
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
    setValue(event);  // Corrected to handle event target
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
              <div className={'comment'} key={index}>
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
        {!hasMore && data && data.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Text
              style={{ color: 'var(--semi-color-text-40)', fontWeight: 400 }}
            >
              没有更多了...
            </Text>
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
          onResize={() => setInputSize(inputSize + 10)}
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
