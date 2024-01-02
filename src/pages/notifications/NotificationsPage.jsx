import React from 'react';
import { Layout, Typography, Table, Toast } from '@douyinfe/semi-ui';
// @ts-ignore
import { Post } from '../../components/PostComponent.jsx';
import { IconChevronLeft } from '@douyinfe/semi-icons';
// @ts-ignore
import { GetData } from './HookToGetData.jsx';
import { useState, useEffect } from 'react';
// @ts-ignore
import { Notif } from '../../components/NotifComponent.jsx';
import axios from 'axios';
import './notifStyle.scss';

export function Notifications() {
  const [pageSize, setPageSize] = useState(10); //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { Header, Content, Footer } = Layout;
  const { Column } = Table;
  const [notifs, setNotifs] = useState({ data: [] });
  const { Text } = Typography;
  const [newestNotifId, setNewestNotifId] = useState(null);
  let notifNums = 0;
  window.onscroll = function () {
    //变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    //变量windowHeight是可视区的高度
    var windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    //变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
    var scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    //滚动条到底部
    if (scrollTop + windowHeight >= scrollHeight) {
      //对于手机端来说，中间的符号可能用===比较好
      loadMoreData();
    }
  };

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
    if (pageNum > totalPages) {
      return;
    }
    GetData(pageNum, pageSize).then(result => {
      const header = { 'Content-Type': 'application/json' };
      result.data = [...notifs.data, ...result.data];
      setNotifs(result);
      setTotalPages(result.totalPages);
      console.log(result.data);
    });
    setPageNum(pageNum + 1);
  }

  useEffect(() => {
    if (newestNotifId != null) {
      const header = { 'Content-Type': 'application/json' };
      axios.post('http://localhost:8085/notif/isread', newestNotifId, {
        headers: header,
      });
    }
  }, [newestNotifId]); // 依赖于 newestNotif 的变化

  useEffect(() => {
    GetData(pageNum, pageSize).then(result => {
      setNotifs(result);
      setTotalPages(result.totalPages);
      notifNums = result.totalNotifs;
      setNewestNotifId(result.data[0].id);
    });
    setPageNum(pageNum + 1);
  }, []);
  useEffect(() => {
    const header = { 'Content-Type': 'application/json' };
    const interval = setInterval(() => {
      axios
        .get('http://localhost:8085/notif/getbypagenumandpagesize/test', {
          params: {
            pageNum: pageNum,
            pageSize: pageSize,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log('resdtttfnotis' + res.data.totalNotifs);
          if (res.data.totalNotifs > notifNums) {
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
    console.log(notifNums, '22222');

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
      <Content className={'notif-content'}>
        <Table
          dataSource={notifs.data}
          pagination={false}
          style={{ height: '80%' }}
        >
          <Column
            dataIndex="MessageType"
            key="key"
            className={'notif-column'}
            render={(text, record) => (
              <Notif
                previewType={record.previewType}
                previewString={record.previewString}
                isRead={record.isRead}
                messageType={
                  record.commentContent == undefined ? 'Like' : 'Comment'
                }
                userIcon={
                  'https://th.bing.com/th/id/OIP.M3gZXiFf0RuvTbbZn8SI8AHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.1&pid=1.7'
                } //由于后端没有传头像，暂时先用网上的url凑合一下
                userName={record.userName}
                sendTime={timeAgo(record.timeStamp)}
                // postIMG={record.postIMG} 暂无
                commentContent={record.commentContent}
              ></Notif>
            )}
          />
        </Table>
      </Content>
      {/*<Footer style={{...commonStyle,display: "flex", textAlign: "center"}} className="Align-Bottom" >*/}
      {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>首页</Button>*/}
      {/*    <Button icon={<IconPlus/>} aria-label="截屏"/>*/}
      {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>我的</Button>*/}
      {/*</Footer>*/}
    </div>
  );
}
