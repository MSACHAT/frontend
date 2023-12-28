import React from 'react';
import { Layout, Button, Table } from '@douyinfe/semi-ui';
import { Post } from '../../components/PostComponent.jsx';
import { IconChevronLeft, IconPlus } from '@douyinfe/semi-icons';
import { GetData } from './HookToGetData.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { handleError } from '../../middlewares/errorHandlingMiddleWare';
export function Feed() {
  const [pageSize, setPageSize] = useState(5); //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
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
      loadMoreData();
    }
  };

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

  const { Header, Content, Footer } = Layout;
  const { Column } = Table;
  const commonStyle = {
    height: 64,
    lineHeight: '64px',
    background: 'var(--semi-color-fill-0)',
  };
  const [posts, setPosts] = useState({ data: [] });
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    handleError("Error Test")
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
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 999,
          backgroundColor: '#9C9EA1',
          width: '100%',
        }}
      >
        <Button
          theme={'borderless'}
          icon={<IconChevronLeft />}
          onClick={() => {
            window.history.go(-1);
          }}
        ></Button>
      </Header>
      <Content style={{ height: 300, lineHeight: '300px' }}>
        <Table dataSource={posts.data} pagination={false}>
          <Column
            dataIndex="id"
            key="id"
            render={(text, record) => (
              <Post
                userName={record.userName}
                // userIcon={record.userIcon}
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
          />
        </Table>
      </Content>
      {/*以下的代码是用来做footer的navigation的*/}
      {/*<Footer style={{...commonStyle,display: "flex", textAlign: "center"}} className="Align-Bottom" >*/}
      {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>首页</Button>*/}
      {/*    <Button icon={<IconPlus/>} aria-label="截屏"/>*/}
      {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>我的</Button>*/}
      {/*</Footer>*/}
    </Layout>
  );
}
