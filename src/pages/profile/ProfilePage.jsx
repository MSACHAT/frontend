import React, { useState, useEffect } from 'react';
import fakeData from '../../mockdata/ProfileMockData.json';
import { Post } from '../../components/PostComponentNew.jsx';
import { List, Button, Avatar, Spin } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';

export const Profile = () => {
  const count = 5;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const [postData, setPostData] = useState([]);
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      color: 'grey',
      title: `Semi Design Title ${i}`,
      loading: false,
    });
  }

  const fetchData = () => {
    setLoading(true);
    return new Promise(res => {
      setTimeout(() => {
        let newDataSource = data.slice(
          dataCount * count,
          dataCount * count + count
        );
        res(fakeData.data);
      }, 10);
    }).then(newDataSource => {
      const newData = [...dataSource, ...newDataSource];
      setDataCount(prevCount => prevCount + 1);
      setLoading(false);
      setDataSource(newData);
      setHasMore(newDataSource.length !== 0);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showLoadMore = dataCount % 4 === 0;
  const loadMore =
    !loading && hasMore && showLoadMore ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={fetchData}>显示更多</Button>
      </div>
    ) : null;

  return (
    <div>
      <div>
        <Avatar size="default" style={{ margin: 4 }} alt="User">
          <img src={postData.protrait} alt="User" />
        </Avatar>
      </div>
      <div>
        <h1>个人页面</h1>
      </div>
      <div
        className="light-scrollbar"
        style={{
          overflow: 'auto',
          border: '1px solid var(--semi-color-border)',
          padding: 10,
        }}
      >
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          threshold={20}
          loadMore={fetchData}
          hasMore={!loading && hasMore && !showLoadMore}
          useWindow={false}
        >
          <List
            loadMore={loadMore}
            dataSource={dataSource}
            renderItem={item => (
              <Post
                userName={item.userName}
                timeStamp={item.timeStamp}
                images={item.images} // 选择一个帖子的图像数组
                content={item.content} // 选择一个帖子的内容
                likeCount={item.likeCount} // 选择一个帖子的点赞数
                commentCount={item.commentCount} // 选择一个帖子的评论数
                liked={item.isLiked} // 选择一个帖子的是否点赞
                title={item.title} // 选择一个帖子的标题
                postId={item.postId} // 选择一个帖子的 ID
              />
            )}
          />
          {loading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
