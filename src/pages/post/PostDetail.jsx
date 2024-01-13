import React, { Suspense, useEffect } from 'react';
import DeprecatedNavigationBar from './components/(Deprecated)NavigationBar';
import { Post } from '../../components/PostComponentNew';

import { useParams } from 'react-router-dom';
import CommentList from './components/CommentList';
import apiClient from '../../middlewares/axiosInterceptors';
import { Divider, Toast } from '@douyinfe/semi-ui';
import { useRecoilState } from 'recoil';
import { CommentCount } from '../../store';
import NavigationBar from './components/NavigationBar';

const PostDetail = () => {
  const postId = useParams().postId;
  // const [Data, setData] = React.useState(null);
  const [commentCount, setCommentCount] = useRecoilState(CommentCount);
  /* async function getPostDetail(postId) {
        try {

            return apiClient.get(`/posts/1/get`).catch(err => {
                console.log(err);
            });
        } catch (error) {
            Toast.error('获取数据失败');
        }
    }*/

  /*useEffect(() => {
        getPostDetail(postId).then(res => {
            console.log(res.data);
            setData(res.data);
        });
    }, []);

    useEffect(() => {
        getPostDetail(postId).then(res => {
            console.log(res.data);
            setData(res.data);
        });
    }, [commentCount]);*/

  const Data = {
    id: 1,
    userName: 'zdfdfd',
    title: 'dsdsd',
    content: 'dsdsjdsj',
    commentCount: 'sefseeeeeee',
    likeCount: 'sdffffff',
    timeStamp: 'post.timeStamp',
    images: 'post.images',
    isLiked: 'post.isLiked',
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ height: '100px' }}></div>

      <div style={{ padding: '20px' }}>
        <Post {...Data} />
      </div>
      <Divider />
      {/*<CommentList postId={postId} />*/}
    </div>
  );
};

export default PostDetail;
