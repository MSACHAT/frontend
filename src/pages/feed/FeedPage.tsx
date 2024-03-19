import React from 'react';
import { Layout, List, Badge } from '@douyinfe/semi-ui';
import { Post } from '../../components/PostComponent.jsx';
import { IconBellStroked } from '@douyinfe/semi-icons';
import './FeedStyle.scss';
import { GetData } from './HookToGetData';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import { Link } from 'react-router-dom';
import { PostModel } from '../../../types/post';
const { Header } = Layout;
export function NewNotif({ newNotifNums }: { newNotifNums: number }) {
  if (newNotifNums > 0) {
    return (
      <Link to={'/notifications'} className={'feed-link'}>
        <Badge
          count={newNotifNums}
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
  const pageSize = 3; //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [newNotifNums, setNewNotifNums] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  function loadMoreData() {
    setLoading(true);
    GetData(pageNum, pageSize).then(result => {
      setPosts([...posts, ...result.data]);
      setTotalPages(result.totalPages);
      setPageNum(pageNum + 1);
      setLoading(false);
    });
  }

  useEffect(() => {
    setPageNum(0);
    setLoading(true);
    GetData(pageNum, pageSize).then(result => {
      setPosts(result.data);
      setTotalPages(result.totalPages);
      setNewNotifNums(result.newNotifCounts);
      setLoading(false);
    });
    setPageNum(pageNum + 1);
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
        <NewNotif newNotifNums={newNotifNums}></NewNotif>
      </Header>
      <div className={'feed-content'}>
        <InfiniteScroll
          initialLoad={false}
          useWindow={false}
          loadMore={loadMoreData}
          hasMore={pageNum <= totalPages}
          pageStart={0}
          threshold={100}
        >
          <List
            className={'feed-posts'}
            dataSource={posts}
            renderItem={record => <Post {...record}></Post>}
            loading={loading}
          />
        </InfiniteScroll>
      </div>
      <BottomNavigationBar></BottomNavigationBar>
    </div>
  );
}
