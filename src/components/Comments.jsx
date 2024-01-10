import React, { useState, useEffect } from 'react';
import { List, Button, Avatar, Spin, Typography } from '@douyinfe/semi-ui';

import InfiniteScroll from 'react-infinite-scroller';
import './postStyle.scss';

const { Text } = Typography;

const ScrollLoad = () => {
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
    fetchData();
  }, []);

  return (
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
                <Text className={'comment-user'}>{item.name}</Text>
              </div>
              <div className={'detail'}>
                <Text className={'comment-content'}>
                  {' '}
                  Semi Design 。
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
      {!hasMore && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <text style={{ color: 'var(--semi-color-text-40)', fontWeight: 400 }}>
            没有更多了...
          </text>
        </div>
      )}
      <div style={{ height: '100px' }} />
    </div>
  );
};

export default ScrollLoad;
