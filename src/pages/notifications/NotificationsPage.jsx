import React from 'react';
import { Layout, Typography, List, Toast } from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import { GetData } from './HookToGetData.jsx';
import { useState, useEffect } from 'react';
import { Notif } from './NotifComponent.jsx';
import './notifStyle.scss';
import apiClient from '../../middlewares/axiosInterceptors';
import InfiniteScroll from 'react-infinite-scroller';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import { timeAgo } from '../../components/CalculateTimeAgo';
export function Notifications() {
  const pageSize = 12; //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { Header, Content, Footer } = Layout;
  const [notifs, setNotifs] = useState({ data: [] });
  const { Text } = Typography;
  const [notifTag, setNotifTag] = useState(null);
  let notifNums = 0;

  function loadMoreData() {
    GetData(pageNum, pageSize).then(result => {
      result.data = [...notifs.data, ...result.data];
      setNotifs(result);
      setTotalPages(result.totalPages);
      console.log(result.data);
    });
    setPageNum(pageNum + 1);
  }

  useEffect(() => {
    GetData(pageNum, pageSize).then(result => {
      setNotifs(result);
      setTotalPages(result.totalPages);
      notifNums = result.totalNotifs;
      console.log('GetFirstNotifNums' + result.totalNotifs);
    });
    setPageNum(pageNum + 1);
    apiClient.get('/notifications/newMessage').then(result => {
      console.log(result);
      setNotifTag(new Date(result.data.notifTag).getTime());
      console.log('NotifTag' + notifTag);
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      apiClient
        .get('/notifications/newMessage')
        .then(res => {
          console.log(res.data);
          console.log('notifnums' + notifNums);
          if (res.data.newNotifCounts > 0) {
            const notifyNewNotifs = {
              content: '有新通知,请下拉刷新',
              duration: 3,
              icon: null,
            };
            Toast.info(notifyNewNotifs);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000 * 20);

    return () => clearInterval(interval);
  }, []);
  const calculateIsRead: boolean = timeStamp => {
    let isRead = true;
    if (notifTag == null || notifTag < timeStamp) {
      isRead = false;
    }
    return isRead;
  };

  return (
    <div className={'notif-page'}>
      <Header className={'notif-header'}>
        <IconChevronLeft
          className={'notif-iconchevronleft'}
          onClick={() => {
            window.history.go(-1);
          }}
        />
        <Text className={'notif-title'}>消息中心</Text>
        <span className={'notif-placeholder'}></span>
      </Header>
      <div className={'notif-content'}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          threshold={20}
          loadMore={loadMoreData}
          hasMore={pageNum <= totalPages}
          useWindow={false}
        >
          <List
            dataSource={notifs.data}
            renderItem={record => (
              <Notif
                previewType={record.previewType}
                previewString={record.previewString}
                isRead={calculateIsRead(record.timeStamp)}
                messageType={
                  record.commentContent == undefined ? 'Like' : 'Comment'
                }
                userIcon={record.userAvatar}
                userName={record.userName}
                sendTime={timeAgo(record.timeStamp)}
                timeStamp={new Date(record.timeStamp).getTime()}
                commentContent={record.commentContent}
              ></Notif>
            )}
          />
        </InfiniteScroll>
      </div>
      <BottomNavigationBar></BottomNavigationBar>
    </div>
  );
}
