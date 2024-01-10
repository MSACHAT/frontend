import React from 'react';
import { Layout, List, Badge } from '@douyinfe/semi-ui';
import { Post } from '../../components/PostComponent.jsx';
import { IconBellStroked } from '@douyinfe/semi-icons';
import './FeedStyle.scss';
import { GetData } from './HookToGetData.jsx';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import apiClient from '../../middlewares/axiosInterceptors';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import { Link } from 'react-router-dom';
export function NewNotif() {
  const [newNotifCount, setNewNotifCount] = useState(0);
  apiClient.get('/notif/countnewnotifs').then(res => {
    setNewNotifCount(res.data.newNotifCounts);
  });
  if (newNotifCount > 0) {
    return (
      <Link to={'/notifications'} className={'feed-link'}>
        <Badge
          count={newNotifCount}
          className={'feed-badge'}
          position={'rightTop'}
        >
          <IconBellStroked className={'feed-iconbellstroked'}></IconBellStroked>
        </Badge>
      </Link>
    );
  } else {
    return (
      <Link to={'/notifications'} className={'feed-link'}>
        <IconBellStroked className={'feed-iconbellstroked'}></IconBellStroked>
      </Link>
    );
  }
}
export function Feed() {
  const pageSize = 5; //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  function loadMoreData() {
    // @ts-ignore
    if (pageNum > totalPages) {
      //没有更多的分页请求了，就不要再请求了
      return;
    }
    setPageNum(pageNum + 1);
    GetData(pageNum, pageSize).then(result => {
      result.data = [...posts.data, ...result.data];
      setPosts(result);
      setTotalPages(result.totalPages);
    });
  }

  const { Header, Content, Footer } = Layout;
  const [posts, setPosts] = useState({ data: [] });
  const [totalPages, setTotalPages] = useState();
  // useEffect(() => {
  //用于往后端发送前端本地保存的点赞
  // const header = { 'Content-Type': 'application/json' };
  // const interval = setInterval(() => {
  //   console.log('Start Backend' + localStorage.getItem('postsLiked'));
  //   if (localStorage.getItem('postsLiked') != null) {
  //     apiClient
  //       .patch(
  //         'http://localhost:8085/post/like/test',
  //         localStorage.getItem('postsLiked'),
  //         {
  //           headers: header,
  //         }
  //       )
  //       .then(res => {
  //         localStorage.clear();
  //       });
  //   }
  // }, 1000 * 10 * 60); // 10分钟间隔,单位毫秒
  //
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    console.log('Getting Data');
    GetData(pageNum, pageSize).then(result => {
      console.log(result);
      setPosts(result);
      setTotalPages(result.totalPages);
    });
    setPageNum(pageNum + 1);
    // setPosts(data);
  }, []);
  useEffect(() => {
    // 注意：这里没有在挂载时执行的代码，只有在卸载时执行的代码
    return () => {
      setPageNum(0);
      setTotalPages(0);
    };
  }, []);
  return (
    <div className={'feed-page'}>
      <Header className={'feed-header'}>
        <span></span>
        <NewNotif></NewNotif>
      </Header>
      <div className={'feed-content'}>
        <InfiniteScroll
          loadMore={loadMoreData}
          hasMore={pageNum <= totalPages}
          pageStart={0}
          threshold={20}
        >
          <List
            dataSource={posts.data}
            renderItem={record => (
              <Post
                userName={record.userName}
                timeStamp={record.timeStamp}
                images={record.images}
                content={record.content}
                likeCount={record.likeCount}
                commentCount={record.commentCount}
                liked={record.isLiked}
                title={record.title}
                postId={record.id}
              ></Post>
            )}
          ></List>
        </InfiniteScroll>
      </div>
      <BottomNavigationBar></BottomNavigationBar>
    </div>
  );
}
