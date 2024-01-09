import React, { useRef } from 'react';
import { Layout, Typography, List, Toast } from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import { GetData } from './HookToGetData.jsx';
import { useState, useEffect } from 'react';
import { Notif } from '../../components/NotifComponent.jsx';
import './notifStyle.scss';
import apiClient from '../../middlewares/axiosInterceptors';
import InfiniteScroll from 'react-infinite-scroller';

export function Notifications() {
  const [pageSize, setPageSize] = useState(12); //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { Header, Content, Footer } = Layout;
  const [notifs, setNotifs] = useState({ data: [] });
  const { Text } = Typography;
  const contentRef = useRef(null);
  const [notifTag, setNotifTag] = useState(null);
  let notifNums = 0;

  function timeAgo(isoString) {
    const pastTime = new Date(isoString);
    const now = new Date();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerYear = msPerDay * 365;

    const elapsed = now - pastTime;

    if (elapsed < msPerHour) {
      return (
        pastTime.getHours() +
        ':' +
        pastTime.getMinutes().toString().padStart(2, '0')
      );
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' 小时前';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerDay) + ' 天前';
    } else {
      return Math.round(elapsed / msPerYear) + ' 年前';
    }
  }

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
    apiClient.get('http://localhost:8085/notif/countnewnotifs').then(result => {
      console.log(result);
      setNotifTag(new Date(result.data.notifTag).getTime());
      console.log('NotifTag' + notifTag);
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      apiClient
        .get('http://localhost:8085/notif/countnewnotifs')
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
        <span style={{ width: '16px', marginRight: '16px' }}></span>
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
                notifTag={notifTag}
                messageType={
                  record.commentContent == undefined ? 'Like' : 'Comment'
                }
                userIcon={
                  'https://th.bing.com/th/id/OIP.M3gZXiFf0RuvTbbZn8SI8AHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.1&pid=1.7'
                } //由于后端没有传头像，暂时先用网上的url凑合一下
                userName={record.userName}
                sendTime={timeAgo(record.timeStamp)}
                timeStamp={new Date(record.timeStamp).getTime()}
                commentContent={record.commentContent}
              ></Notif>
            )}
          />
        </InfiniteScroll>
      </div>
      {/*<Footer style={{...commonStyle,display: "flex", textAlign: "center"}} className="Align-Bottom" >*/}
      {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>首页</Button>*/}
      {/*    <Button icon={<IconPlus/>} aria-label="截屏"/>*/}
      {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>我的</Button>*/}
      {/*</Footer>*/}
    </div>
  );
}
