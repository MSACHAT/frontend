import React, { useEffect, useState } from 'react';
import { Avatar, List, Spin, TextArea, Toast } from '@douyinfe/semi-ui';

import InfiniteScroll from 'react-infinite-scroller';
import './postStyle.scss';
import './CommentStyle.scss';
import { Typography } from '@douyinfe/semi-ui';
import { animateScroll as scroll } from 'react-scroll';

const CommentListWithMockData = () => {
  const { Text } = Typography;
  const count = 5;
  const dataList = [];
  for (let i = 0; i < 10; i++) {
    dataList.push({
      avatar:
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png',
      name: 'asdsdasd',
      text: `Semi Design Title ${i}`,
      time: 'ddcdcdcdc',
    });
  }
  const [Refresh, setRefresh] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState(dataList);
  const [countState, setCountState] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      let dataSource = data.slice(
        countState * count,
        countState * count + count
      );
      setCountState(countState + 1);
      setData([...data, ...dataSource]);
      setLoading(false);
      setHasMore(hasMore);
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let dataSource = data.slice(
        countState * count,
        countState * count + count
      );
      setCountState(countState + 1);
      setData([...dataSource, ...data]);
      setLoading(false);
      setHasMore(hasMore);
    }, 1000);
  }, [Refresh]);

  useEffect(() => {
    fetchData();
  }, []);
  const [value, setValue] = useState('');
  const [Size, setSize] = useState(62);

  const handleChange = event => {
    setValue(event);
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 200,
      smooth: 'easeInOutQuart',
    });
  };

  const handlePublish = async event => {
    event.preventDefault();
    if (value.length === 0) {
      Toast.error('必须要有内容哦');
      return;
    }
    setRefresh(Refresh + 1);
    setValue('');
    scrollToTop();
  };
  function handleResize(height) {
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
          style={{ width: '100%', height: 200 }}
          initialLoad={false}
          pageStart={0}
          threshold={10}
          loadMore={fetchData}
          hasMore={hasMore}
          useWindow={false}
        >
          <List
            split={false}
            dataSource={data}
            renderItem={(item, index) => (
              <div className={'comment'} id={index}>
                <Avatar className={'comment-avatar'} src={item.avatar} />
                <div className={'name'}>
                  <Text className={'comment-user'}>{item.name}</Text>
                </div>
                <div className={'detail'}>
                  <Text className={'comment-content'}>
                    {' '}
                    Semi Design
                    设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                    Web 应用。
                  </Text>
                  <Text className={'comment-time'}>时间</Text>
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
        {!hasMore && data.length && (
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
          height: `${Size}px`,
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
export default CommentListWithMockData;
