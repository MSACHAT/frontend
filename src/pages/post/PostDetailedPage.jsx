import React, { useEffect, useMemo, useState } from "react";
import {ImagePreview, Image, Typography, Avatar, Button} from '@douyinfe/semi-ui';
import axios from "axios";
import {IconChevronLeft, } from "@douyinfe/semi-icons";

import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import {FormattedTime} from "../../components/formateDate";

const DetailedPost = () => {

  const { Title, Paragraph,Text} = Typography;
  const [id, setId] = useState(999)

  const [paragraphPost, setParagraphPost] = useState('')
  const [imagesPost, setImagesPost] = useState()
  const [authorPost, setAuthorPost] = useState('')

  const [likesPost, setLikesPost] = useState(0)

  const [TimePost,setTimePost] = useState()
  const [preIsLike,setPreIsLike] =useState(false)
  const [isLiked, setIsLiked] = useState(false);

  const [commentsNum,setCommentsNum]=useState(0)
  const [photo,setPhoto] = useState('')

  /* useEffect(() => {
       setTitlePost(mockData.title);
       setLikesPost(mockData.likes);

       setAuthorPost(mockData.author);
       setImagesPost(mockData.images);
       setParagraphPost(mockData.content);
       setCommentsNum(mockData.comments);
       setPreIsLike(mockData.preIsLike);
       setIsLiked(mockData.preIsLike);
       setPhoto(mockData.src)


       // 返回清理函数
       return () => {
           // 在清理函数中使用函数参数获取卸载时的isLiked值
           Toast.success("isLike: " + mockData.preIsLike);
       };
       }, []);*/
  const srcList = useMemo(() => (mockData.images), []);
  const {postId } = useParams();
  console.log(postId)

  const instance = axios.create({
    baseURL: 'http://localhost:8085/post',
    timeout: 1000,
  });
  const fetchData = async (postId) => {
    try {
      console.log(1, postId)
      const response = await instance.get(`/${postId}/get/test`);

      const { id, userName,content, images,timeStamp,likeCount, isLiked } = response.data;
      console.log(2, response.data)
      setPreIsLike(isLiked);

      setParagraphPost(content);
      setImagesPost(images);
      setAuthorPost(userName);
      setTimePost(timeStamp);
      setLikesPost(likeCount);
      setIsLiked(isLiked);
      setId(id);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {

    fetchData(postId);
  }, [postId]);

  /*const postIsLike = async (isLiked) => {
      if (isLiked === preIsLike) {
          setFinalIsLiked(0);
      } else if (isLiked === false && preIsLike === true) {
          setFinalIsLiked(-1);
      } else if (isLiked === true && preIsLike === false) {
          setFinalIsLiked(1);
      }

      try {
          await axios.post('/post/isLike', { postId: id, isLiked: finalIsLiked });
      } catch (error) {
          console.error('Error post', error);
      }
  }*/

  return (
      <div className="flex-col flex container mx-auto justify-items-start gap-5 py-3">
        <div className="px-5 flex items-center">
          <Button className="text-left" icon={<IconChevronLeft />} theme="borderless" />
          <Title className="ml-auto" heading={5}>帖子详情</Title>
        </div>
        <div className="flex flex-wrap flex-row px-5 gap-2">
          <Avatar className="m-1" size="default" alt={authorPost} src={photo}/>
          <div>
            <Text>{authorPost}</Text>
            <FormattedTime num={TimePost}/>
          </div>
        </div>
        <div className="flex pl-5 flex-col items-start gap-6">

          <Paragraph spacing='extended'>{paragraphPost}</Paragraph>
        </div>


        <div
            id="container"
            style={{
              height: 400,
              position: "relative"
            }}>
          <ImagePreview
              getPopupContainer={() => {
                const node = document.getElementById("container");
                return node;
              }}
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
          >
            {srcList.map((src, index) => {
              return (
                  <Image
                      key={index}
                      src={src}
                      width={200}
                      alt={`lamp${index + 1}`}
                      style={{ marginRight: 5 }}
                  />
              );
            })}
          </ImagePreview>
        </div>
      </div>
  )
}

export default DetailedPost;
