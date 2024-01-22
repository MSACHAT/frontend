import React, { Suspense, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import { Post } from '../../components/PostComponent';
import { useParams } from 'react-router-dom';
import './PostDetailStyle.scss';
import CommentList from './components/CommentList';
import apiClient from '../../middlewares/axiosInterceptors';
import { Divider, Toast } from '@douyinfe/semi-ui';
import { useRecoilState } from 'recoil';
import { CommentCount } from '../../store';

const PostDetail = () => {
  const postId = useParams().postId;
  const [Data, setData] = React.useState(null);
  const [commentCount, setCommentCount] = useRecoilState(CommentCount);
  async function getPostDetail(postId) {
    try {
      return apiClient.get(`/posts/${postId}/get`).catch(err => {
        console.log(err);
      });
    } catch (error) {
      Toast.error('获取数据失败');
    }
  }

  useEffect(() => {
    getPostDetail(postId).then(res => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    getPostDetail(postId).then(res => {
      setData(res.data);
    });
  }, [commentCount]);

  return (
    <div className={'postDetail'}>
      <NavigationBar />
      <div className={'content'}>
        <Post {...Data} />
      </div>
      <Divider />
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetail;
