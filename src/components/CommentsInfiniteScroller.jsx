import React, { useState, useEffect } from 'react';
import { Avatar, List } from '@douyinfe/semi-ui';
import FormattedTime from 'src/components/formatDate.jsx';
import InfiniteScroll from 'react-infinite-scroller';

export const Comment = ({ data }) => {
  const [comments, setComments] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const count = 5;
  const dataList = [];
  for (let i = 0; i < 100; i++) {
    dataList.push({
      title: `Semi Design Title ${i}`,
      time: 'bhbhbhb',
      loading: false,
    });
  }
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
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: 12,
        border: '1px solid var(--semi-color-border)',
        margin: 12,
      }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchData}
        hasMore={hasMore}
        loader={
          <div key={0} style={{ textAlign: 'center', margin: '12px 0' }}>
            Loading...
          </div>
        }
      >
        <List
          dataSource={comments}
          renderItem={item => (
            <List.Item
              header={<Avatar color="blue">{item.name}</Avatar>}
              main={
                <div>
                  <span
                    style={{
                      color: 'var(--semi-color-text-0)',
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </span>
                  {item.text}
                  <FormattedTime num={item.time} />
                </div>
              }
            />
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
