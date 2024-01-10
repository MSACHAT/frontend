import React, {Suspense, useEffect} from 'react';
import NavigationBar from '../../components/NavigationBar';
import { Post } from '../../components/PostComponentNew';
import './postStyle.scss';
import { useParams } from 'react-router-dom';
import CommentList from '../../components/CommentList';
import apiClient from "../../middlewares/axiosInterceptors";
import {Toast} from "@douyinfe/semi-ui";
import {useRecoilState} from "recoil";
import {CommentCount} from "../../store";
import NavigationBarwithDeleteButtom from "../../components/NavigationBarwithDeleteButtom";

const PostDetail = () => {
  const postId = useParams().postId;
  const [Data, setData] = React.useState(null);
  const [commentCount, setCommentCount] = useRecoilState(CommentCount);
  async function getPostDetail(postId) {
      try {
          const res = await apiClient.get(`/post/${postId}/get/test`)

          const result = await res.data;
          console.log(result);
          const Data = {
              userName: result.userName,
              timeStamp: result.timeStamp,
              images: result.images,
              content: result.content,
              likeCount: result.likeCount,
              commentCount: result.commentCount,
              isLiked: result.isLiked,
              postId: result.id,

          }
          console.log(Data)
          await setData(Data)
      } catch (error) {
          Toast.error('获取数据失败');
      }
  }

    useEffect(() => {
        getPostDetail(postId)
    }, []);
  useEffect(
      () => {
          getPostDetail(postId);
      },[commentCount]
  )
    if (Data === null) {
        return <div>Loading...</div>;
    }

  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
         <NavigationBarwithDeleteButtom/>
          <div className={'content'}>
            <Post {...Data} />
          </div>
          <CommentList postId={postId}/>
        </Suspense>
    </div>
  );
};

export default PostDetail;
