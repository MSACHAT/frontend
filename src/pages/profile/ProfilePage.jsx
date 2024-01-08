import React, { useState, useEffect, useRef } from 'react';
import './profileStyle.scss';
import fakeData from '../../mockdata/ProfileMockData.json';
import { Post } from '../../components/PostComponentNew.jsx';
import { List, Button, Image, Spin, ImagePreview } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';
import { IconCamera, IconChevronLeft } from '@douyinfe/semi-icons';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import BottomBar from '../../components/BottomBarComponent.jsx';
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
  function loadMoreData() {
    // @ts-ignore
    if (pageNum > totalPages) {
      //没有更多的分页请求了，就不要再请求了
      return;
    }
    setPageNum(pageNum + 1);
    GetData(header,pageNum, pageSize).then(result => {
      result.data = [...posts.data, ...result.data];
      console.log(result.data);
      setPosts(result);
      setTotalPages(result.totalPages);
    });
  }


  const [posts, setPosts] = useState({ data: [] });
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    //用于往后端发送前端本地保存的点赞
    const header = { 'Content-Type': 'application/json' };
    const interval = setInterval(() => {
      console.log('Start Backend' + localStorage.getItem('postsLiked'));
      if (localStorage.getItem('postsLiked') != null) {
        axios
          .patch(
            'http://localhost:8085/post/like/test',
            localStorage.getItem('postsLiked'),
            {
              headers: header,
            }
          )
          .then(res => {
            localStorage.clear();
          });
      }
    }, 1000 * 10 * 60); // 10分钟间隔,单位毫秒

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    GetData(pageNum, pageSize).then(result => {
      setPosts(result);
      setTotalPages(result.totalPages);
      
    });
    setPageNum(pageNum + 1);
    // setPosts(data);
  }, []);
  useEffect(() => {
    // 注意：这里没有在挂载时执行的代码，只有在卸载时执行的代码
    return () => {
      setPageNum(0)
      setTotalPages(0)
    };
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
            renderItem={item => <Post {...item} />}
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
