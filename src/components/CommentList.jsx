import React, { useEffect, useState } from 'react';
import { Avatar, List, Spin, TextArea, Toast } from '@douyinfe/semi-ui';

import InfiniteScroll from 'react-infinite-scroller';
import './postStyle.scss';
import './CommentStyle.scss';
import { Typography } from '@douyinfe/semi-ui';
import { animateScroll as scroll } from 'react-scroll';
import apiClient from '../middlewares/axiosInterceptors';

const CommentList = () => {
  const { Text } = Typography;
  const postId = 2;
  const dataList = [];

  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState(dataList);
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [size, setSize] = useState(62);
  const fetchData = async (num, refresh = false) => {
    // 获取数据
    // setLoading(true);
    try {
      const response = await apiClient.get(
        `/comments/${postId}?pageNum=` + num
      );

      const result = await response.data;
      setData(refresh ? result.comments : [...data, ...result.comments]);
      setPageNum(num + 1);
      setHasMore(result.hasMore);
    } catch (error) {
      console.log(response);
      console.error('Fetching data failed', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageNum);
  }, []);

  const handleChange = event => {
    setValue(event);
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 200,
      smooth: 'easeInOutQuart',
    });
  };

  async function sendData(value, postId) {
    const data = {
      content: value,
    };
    try {
      const response = await apiClient.put(`/post/2/comment/test`, data);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response Data:', responseData);
      // 这里可以根据响应数据进行更多处理
    } catch (e) {
      console.error('Error sending data:', e);
      // 根据错误类型进行更多的错误处理
    }
  }

  const handlePublish = async event => {
    event.preventDefault();
    if (value.length === 0) {
      Toast.error('必须要有内容哦');
      return;
    }
    await apiClient
      .put(`/post/${postId}/comment/test`, {
        content: value,
      })
      .then(() => {
        fetchData(0, true);
        scrollToTop();
        setValue('');
      })
      .catch(() => {});
  };
  function handleResize(height) {
    console.log(height);
    const newHeight = height + 12;
    setSize(newHeight);
  }
  return (
    <div className={'root'}>
      <div className="comments">
        {' '}
        <div className={'text'}>
          <Text className={'content'}>评论</Text>
        </div>
        <InfiniteScroll
          style={{ width: '100%' }}
          initialLoad={false}
          pageStart={0}
          threshold={100}
          loadMore={fetchData}
          hasMore={hasMore}
        >
          <List
            split={false}
            dataSource={data}
            renderItem={(item, index) => (
              <div className={'comment'} id={index}>
                <Avatar className={'comment-avatar'} src={item.avatar} />
                <div className={'name'}>
                  <Text className={'comment-user'}>{item.userId}</Text>
                </div>
                <div className={'detail'}>
                  <Text className={'comment-content'}>{item.content}</Text>
                  <Text className={'comment-time'}>{item.timeStamp}</Text>
                </div>
              </div>
            )}
          />
          {loading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
        {!hasMore && (
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
        style={{
          height: `${size}px`,
          position: 'fixed',
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          paddingBottom: '36px',
          backgroundColor: 'white',
        }}
      >
        <TextArea
          style={{
            width: '90%',
            borderRadius: '12px',
            backgroundColor: '#F4F4F4',
            zIndex: 1000,
          }}
          autosize={true}
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
