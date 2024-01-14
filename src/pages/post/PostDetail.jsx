import React, { Suspense, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import { Post } from '../../components/PostComponent';
import '../../components/postStyle.scss';
import { useParams } from 'react-router-dom';
import CommentList from '../../components/CommentList';
import apiClient from '../../middlewares/axiosInterceptors';
import { Toast } from '@douyinfe/semi-ui';
import { useRecoilState } from 'recoil';
import { CommentCount } from '../../store';

const PostDetail = () => {
  const postId = useParams().postId;
  const [Data, setData] = React.useState(null);
  const [commentCount, setCommentCount] = useRecoilState(CommentCount);
  async function getPostDetail(postId) {
    try {
      console.log(123456789012345678901234567890);
      return apiClient.get(`/posts/1/get`).catch(err => {
        console.log(err);
      });
    } catch (error) {
      Toast.error('获取数据失败');
    }
  }

  useEffect(() => {
    getPostDetail(postId).then(res => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    getPostDetail(postId).then(res => {
      setData(res.data);
    });
  }, [commentCount]);

  return (
    <div>
      <NavigationBar />
      <div className={'content'}>
        <Post {...Data} />
      </div>
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetail;
