import React, { useEffect, useState } from 'react';
import { Avatar, List, Spin, TextArea, Toast } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';
import './CommentListStyle.scss';
import { Typography } from '@douyinfe/semi-ui';
import { animateScroll as scroll } from 'react-scroll';
import apiClient from '../../../middlewares/axiosInterceptors';
import { useRecoilState } from 'recoil';
import { CommentCount } from '../../../store';
import { useNavigate } from 'react-router-dom';
import FormattedTime from '../../../components/formatDate';

interface Comment {
  userAvatar: string;
  userName: string;
  content: string;
  timeStamp: number;
  userId: string;
}
interface CommentListProps {
  postId: number;
}
const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const dataList:Comment[] = [];
  const [commentCount, setCommentCount] = useRecoilState(CommentCount);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState(dataList);
  const [countState, setCountState] = useState(0);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await apiClient.get(`/comments/get/${postId}`, {
        params: {
          pageNum: countState,
          pageSize: 15,
        },
      });
      const result = await response.data;
      setData([...data, ...result.comments]);
      setCountState(countState + 1);
      const hasMore = result.totalPages >= countState;
      setHasMore(hasMore);
    } catch (error) {
      console.error('Fetching data failed', error);
    } finally {
      setLoading(false);
    }
  };

  async function handleScroll() {
    setLoading(true);

    try {
      const response = await apiClient.get(`/comments/get/${postId}`, {
        params: {
          pageNum: 0,
          pageSize: 15,
        },
      });

      const result = await response.data;
      setCountState(0);
      console.log(result);

      setData([...result.comments]);
      setCountState(countState + 1);
      const hasMore = result.totalPages >= countState;
      console.log(hasMore);
      setHasMore(hasMore);
    } catch (error) {
      console.error('Fetching data failed', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  const [value, setValue] = useState('');
  const [Size, setSize] = useState(62);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 200,
      smooth: 'easeInOutQuart',
    });
  };

  async function sendData(value:string, postId:number) {
    const data = {
      content: value,
    };
    try {
      const response = await apiClient.put(`/posts/${postId}/comment`, data);

      const responseData = await response.data;
      console.log('Response Data:', responseData);
    } catch (e) {
      console.error('Error sending data:', e);
    }
  }

  const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.length === 0) {
      Toast.error('必须要有内容哦');
      return;
    }
    await sendData(value, postId);
    await setCommentCount(commentCount + 1);
    scrollToTop();
    await handleScroll();
    await setValue('');
  };
  function handleResize(height: number) {
    console.log(height);
    const newHeight = height + 12;
    setSize(newHeight);
  }
  function route(userId:string) {
    navigate(`/profile/${userId}`);
  }

  return (
    <div className={'commentList'}>
      <div className={'comments'}>
        <div className={'text'}>
          <Text className={'content'}>评论</Text>
        </div>
        <InfiniteScroll
          style={{ width: '100%' }}
          initialLoad={false}
          pageStart={0}
          threshold={100}
          loadMore={fetchData}
          hasMore={hasMore}
        >
          <List
            emptyContent={'目前还没有评论哦，来做第一个评论的人吧！！'}
            split={false}
            dataSource={data}
            renderItem={(item, index) => (
              <div className={'comment'} id={index}>
                <Avatar
                  className={'comment-avatar'}
                  src={item.userAvatar}
                  onClick={() => {
                    route(item.userId);
                  }}
                />

                <div className={'detail'}>
                  <div className={'userName'}>
                    <Text className={'comment-user'}>{item.userName}</Text>
                  </div>
                  <Text className={'comment-content'}>{item.content}</Text>
                  <FormattedTime
                    className={'comment-time'}
                    TimeStamp={item.timeStamp}
                  />
                </div>
              </div>
            )}
          />
          {loading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
        {!hasMore && data.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <text
              style={{ color: 'var(--semi-color-text-40)', fontWeight: 400 }}
            >
              没有更多了...
            </text>
          </div>
        )}
        <div style={{ height: '100px' }} />
      </div>
      <div
        className={'textarea-bg'}
        style={{
          height: `${Size}px`,
        }}
      >
        <TextArea
          style={{
            width: '90%',
            borderRadius: '12px',
            backgroundColor: '#F4F4F4',
            zIndex: 1000,
          }}
          autosize={{ minRows: 1 }}
          onResize={handleResize}
          rows={1}
          maxLength={200}
          minLength={1}
          maxCount={200}
          onChange={handleChange}
          value={value}
          placeholder={'评论'}
          onEnterPress={handlePublish}
        />
      </div>
    </div>
  );
};
export default CommentList;
