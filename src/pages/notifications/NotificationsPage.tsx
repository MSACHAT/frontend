import React from 'react';
import { NotifDataResponse, NotifModel, NotifSwrResponse } from "../../../types/notif";
import {Layout, Typography, List, Toast} from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
// import { GetData } from './HookToGetData';
import { useState, useEffect } from 'react';
import { Notif } from './NotifComponent';
import './notifStyle.scss';
import apiClient from '../../middlewares/axiosInterceptors';
import InfiniteScroll from 'react-infinite-scroller';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import { timeAgo } from '../../components/CalculateTimeAgo';
import useSWR from "swr";

export function Notifications() {
  const pageSize = 12; //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { Header} = Layout;
  const [notifs, setNotifs] = useState<NotifModel[]>([]);
  const { Text } = Typography;
  const [notifTag, setNotifTag] = useState<number>();
  const [wrongTimes,setWrongTimes] = useState<number>(0)
  const [loadError, setLoadError] = useState<boolean>(false)
  const [loading,setLoading]=useState(false)
  const fetcher=(url:string)=>apiClient
    .get(url, {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },

  })
  const {data,error}=useSWR<NotifDataResponse<NotifSwrResponse<NotifModel>>>('/notifications/',fetcher)
  let notifNums = 0;
  function loadMoreData() {
    setLoading(true)
    setPageNum(pageNum + 1);
    if (data) {
      setNotifs([...notifs, ...data.data.notifs]);
      setTotalPages(data.data.totalPages)
      setWrongTimes(0)
    }
    if(error){
      setWrongTimes(t=>t+1)
      setLoadError(true)
    }
    setLoading(false)
    // GetData(pageNum, pageSize).then((result) =>{
    //   if (result&&result.data) {
    //     setNotifs([...notifs, ...result.data]);
    //     setTotalPages(result.totalPages);
    //     console.log(result.data);
    //     setWrongTimes(0); // 如果成功加载，重置wrongTimes
    //   }
    //   setLoading(false)
    // }).catch(()=>{
    //   setLoadError(true)
    //   setWrongTimes(t=>t+1)
    // });
  }

  useEffect(() => {
    // setLoading(true)
    // GetData(pageNum, pageSize).then(result => {
    //   if(result&&result.data) {
    //     setNotifs([...result.data]);
    //     setTotalPages(result.totalPages);
    //     notifNums = result.totalNotifs;
    //     console.log('GetFirstNotifNums' + result.totalNotifs);
    //     setWrongTimes(0); // 如果成功加载，重置wrongTimes
    //     // setPageNum(pageNum + 1);
    //   }
    //   setLoading(false)
    // }).catch(()=>{
    //   setWrongTimes(t=>t+1)
    //   setLoadError(true)
    // });
    setLoading(true)
    if (data) {
      setNotifs([...notifs, ...data.data.notifs]);
      setTotalPages(data.data.totalPages)
      setWrongTimes(0)
    }
    if(error){
      setWrongTimes(t=>t+1)
      setLoadError(true)
    }
    setLoading(false)
    apiClient.get('/notifications/newMessage').then(result => {
      console.log(result);
      setNotifTag(new Date(result.data.notifTag).getTime());
      console.log('NotifTag' + notifTag);
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if(!loadError) {
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
      }
    }, 1000 * 20 * 60);

    return () => clearInterval(interval);
  }, []);
  const calculateIsRead = (timeStamp:number) => {
    let isRead = true;
    if (notifTag == null || notifTag < timeStamp) {
      isRead = false;
    }
    return isRead;
  };

  return (
      <div className={"notif-outer-layer"} style={{backgroundColor:!loadError?"rgb(0,0,0,0)":"rgb(0,0,0,0.2)"}}>
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
            dataSource={notifs}
            loading={loading}
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
                // timeStamp={new Date(record.timeStamp).getTime()}
                commentContent={record.commentContent}
              ></Notif>
            )}
          />
        </InfiniteScroll>
      </div>
      {/*{!loadError && (*/}
      {/*    <button onClick={loadMoreData} disabled={isLoading}>*/}
      {/*      {isLoading ? '加载中...' : '加载更多'}*/}
      {/*    </button>*/}
      {/*)}*/}
      <BottomNavigationBar></BottomNavigationBar>
    </div>
  {loadError && (
      <div className={"notif-load-err"}>
        {wrongTimes === 1 ? (
            <div>加载页面时出错,是不是网络不好?请刷新重试</div>
        ) : (
            <div className={"notif-load-err"}>
              加载更多内容失败，请<button onClick={loadMoreData}>重试</button>
            </div>
        )}
      </div>
  )}
  </div>
  );
}
