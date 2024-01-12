import React, { useState, useEffect, useRef } from 'react';
import './profileStyle.scss';
import fakeData from '../../mockdata/ProfileMockData.json';
import { Post } from '../../components/PostComponentNew.jsx';
import { List, Button, Image, Spin, ImagePreview } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';
import { IconCamera, IconChevronLeft } from '@douyinfe/semi-icons';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import BottomBar from '../../components/BottomNavigationBar.jsx';
import { GetData } from './HookToGetData.jsx';
import { UserAvatar } from './UserAvatar';
export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const [postData, setPostData] = useState([]);
  

  // const fetchData = () => {
  //   setLoading(true);
  //   return new Promise(res => {
  //     //TODO 这里替换为真实的请求
  //     res(fakeData.data);
  //   }).then(newDataSource => {
  //     const newData = [...dataSource, ...newDataSource].map((x, index) => {
  //       return { ...x, likeCount: index };
  //     });
  //     setDataCount(prevCount => prevCount + 1);
  //     setLoading(false);
  //     setDataSource(newData);
  //     setHasMore(newDataSource.length !== 0);
  //   });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const [pageSize, setPageSize] = useState(5); //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState();

  function loadMoreData() {
    // @ts-ignore
    if (pageNum > totalPages) {
      //没有更多的分页请求了，就不要再请求了
      return;
    }
    setPageNum(pageNum + 1);
    GetData(pageNum, pageSize).then(result => {
      result.data = [...posts.data, ...result.data];
      console.log(result.data);
      setPosts(result);
      setTotalPages(result.totalPages);
    });
  }


  const [posts, setPosts] = useState({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetData(pageNum, pageSize);
      setPosts(prevPosts => ({ data: [...prevPosts.data, ...result.data] }));
      setPageNum(prevPageNum => prevPageNum + 1);
      setTotalPages(result.totalPages);
    };
  
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
        <Button onClick={posts.data}>显示更多</Button>
      </div>
    ) : null;



  return (
    <div className="profile-page">
      <div className="empty-space"></div>
      <div className="headtab">
        <UserAvatar />
        <div>Haha ha</div>
      </div>
      <div
        className="light-scrollbar"
        style={{
          overflow: 'auto',
          padding: 10,
        }}
      >
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          threshold={40}
          loadMore={posts.data}
          hasMore={!loading && hasMore && !showLoadMore}
          useWindow={true}
        >

          <List
            loadMore={loadMore}
            dataSource={posts.data}
            renderItem={item => <Post hideUser {...item} />}
          />
          {loading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
            <BottomBar></BottomBar>
    </div>
  );
};
