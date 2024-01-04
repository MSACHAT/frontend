import React, { useState, useEffect } from 'react';
import './profileStyle.scss';
import fakeData from '../../mockdata/ProfileMockData.json';
import { Post } from '../../components/PostComponentNew.jsx';
import { List, Button, Image, Spin,ImagePreview } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';
import { IconCamera } from "@douyinfe/semi-icons";
export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const [postData, setPostData] = useState([]);
  const fetchData = () => {
    setLoading(true);
    return new Promise(res => {
      //TODO 这里替换为真实的请求
      res(fakeData.data);
    }).then(newDataSource => {
      const newData = [...dataSource, ...newDataSource].map((x, index) => {
        return { ...x, likeCount: index };
      });
      setDataCount(prevCount => prevCount + 1);
      setLoading(false);
      setDataSource(newData);
      setHasMore(newDataSource.length !== 0);
    });
  };

  useEffect(() => {
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
        <Button onClick={fetchData}>显示更多</Button>
      </div>
    ) : null;

  return (
    <div className="profile-page">
      <div className="empty-space"></div>
      <div className="headtab">
          <ImagePreview
              renderPreviewMenu={()=><Button icon={<IconCamera size="large" />}/>}
              type="tertiary"
              className={'avatar-preview'}
          >
            <Image
              shape="circul"
              style={{ margin: 8, width: 80, height: 80 }}
              alt="User"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"
            />
          </ImagePreview>
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
          loadMore={fetchData}
          hasMore={!loading && hasMore && !showLoadMore}
          useWindow={true}
        >
          <List
            loadMore={loadMore}
            dataSource={dataSource}
            renderItem={item => <Post {...item} />}
          />
          {loading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
