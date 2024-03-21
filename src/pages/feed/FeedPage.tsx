import React, { useRef } from 'react';
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
  const feedContentRef: any = useRef(null);
  function loadMoreData() {
    setLoading(true);
    GetData(pageNum, pageSize).then(result => {
      const newPosts = [...posts, ...result.data];
      setPosts(newPosts);
      setTotalPages(result.totalPages);
      setPageNum(prevPageNum => prevPageNum + 1);
      setLoading(false);
      // 保存新状态到 sessionStorage
      sessionStorage.setItem(
        'feedState',
        JSON.stringify({
          posts: newPosts,
          totalPages: result.totalPages,
          pageNum: pageNum + 1,
          newNotifNums: result.newNotifCounts,
        })
      );
    });
  }

  // 组件加载时的副作用
  useEffect(() => {
    // 尝试从 sessionStorage 恢复状态
    const savedState = sessionStorage.getItem('feedState');
    if (savedState) {
      console.log('restore');
      const { posts, totalPages, pageNum, newNotifNums } =
        JSON.parse(savedState);
      setPosts(posts);
      setTotalPages(totalPages);
      setPageNum(pageNum);
      setNewNotifNums(newNotifNums);
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      if (savedScrollPosition && feedContentRef.current) {
        setTimeout(() => {
          feedContentRef.current!.scrollTop = parseInt(savedScrollPosition);
        }, 10);
      }
    } else {
      // 如果没有保存的状态，就获取数据
      setLoading(true);
      GetData(pageNum, pageSize).then(result => {
        setPosts(result.data);
        setTotalPages(result.totalPages);
        setNewNotifNums(result.newNotifCounts);
        setLoading(false);
        // 保存新状态到 sessionStorage
        sessionStorage.setItem(
          'feedState',
          JSON.stringify({
            posts: result.data,
            totalPages: result.totalPages,
            pageNum: pageNum + 1,
            newNotifNums: result.newNotifCounts,
          })
        );
      });
      setPageNum(prevPageNum => prevPageNum + 1);
    }
    const handleScroll = () => {
      if (feedContentRef.current) {
        // 记录当前滚动位置
        const scrollPosition = feedContentRef.current!.scrollTop;
        console.log(scrollPosition);
        sessionStorage.setItem('scrollPosition', scrollPosition.toString());
      }
    };

    // 如果feedContentRef.current存在，则添加事件监听器
    const feedContentElement = feedContentRef.current;
    if (feedContentElement) {
      feedContentElement.addEventListener('scroll', handleScroll);
    }

    // 组件卸载时移除监听器
    return () => {
      if (feedContentElement) {
        feedContentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={'feed-page'}>
      <Header className={'feed-header'}>
        <span></span>
        <NewNotif newNotifNums={newNotifNums}></NewNotif>
      </Header>
      <div className={'feed-content'} ref={feedContentRef}>
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
