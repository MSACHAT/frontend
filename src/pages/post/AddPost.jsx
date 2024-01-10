import React, { useEffect, useRef, useState } from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import { IconChevronLeft, IconPlus } from '@douyinfe/semi-icons';
import axios from 'axios';
import './PostPushingStyle.scss';
import config from '../../config/config';

import { NavigationBackButton } from '../../components/NavigationBackButton';
import { useNavigate } from 'react-router-dom';
import url from '../../config/RouteConfig';
import upload from '../../middlewares/uploadImage';
import apiClient from '../../middlewares/axiosInterceptors';


const PublishPost = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [post, setPost] = useState(false);
  const [ReadyPublish, setReadyPublish] = useState(false);
  const [ReadyPublishContent, setReadyPublishContent] = useState(false);
  const [content, setContent] = useState('');
  const [list, updateList] = useState([]);
  const uploadRef = useRef();
  const [shouldCallEffect, setShouldCallEffect] = useState(false);
  const [Ready, setReady] = useState();

  const [ImageLists, setImageLists] = useState(new Map());
  const navigate = useNavigate();
  console.log(list);
  /*    //Mock代码


        // eslint-disable-next-line no-unused-vars
        const [isSuccess, setIsSuccess] = useState(undefined);
        const handleSubmit = async () => {
            const requestLogin= new Promise((resolve, reject) => {
                let isSuccessful = Math.random() >= 0.5;  // 随机成功或失败
                console.log(isSuccessful)
                if (isSuccessful) {
                    resolve({success:true});
                    setSaveLoading(false);
                } else {
                    resolve({msg:'错误',code:1001})
                    setSaveLoading(false);
                }
            })
            await requestLogin.then((res)=>{
                if(res.msg){
                    Toast.error('失败')
                } else {
                    Toast.success('成功')
                }
            })


        };*/
  //Mock结束

  useEffect(() => {
    if (content.length > 0) {
      setReadyPublishContent(true);
    }
    if (content.length === 0) {
      setReadyPublishContent(false);
    }
  }, [content]);

  useEffect(() => {
    if (list.length > 0) {
      setReadyPublish(true);
    }
    if (list.length === 0) {
      setReadyPublish(false);
    }
  }, [list.length]);

  const action = '';

  async function putPost(postData) {
    try {
      const response = await apiClient.post('/post/add', postData);

      console.log(response.data);

      Toast.success('帖子发布成功！');
      navigate(url.feed);
    } catch (error) {
      console.error(error);

      Toast.error('帖子发布失败！');
    }

    setSaveLoading(false);
  }

  const handleContentChange = value => {
    setContent(value);
  };

  const handlePublish = async () => {
    if (list.length === 0) {
      const postData = {
        content: content,
        image: [],
      };
      await putPost(postData);
      navigate(url.feed);
    } else {
      const postData = {
        content: content,
        image: list.map(x => x.response),
      };
      console.log(postData, '2222');
      await putPost(postData);

    }
  };

  async function uploadFileToImage(data) {
    const formData = new FormData();

    formData.append('file', data.fileInstance);

    upload
      .post('/images/uploadimage', formData, {
        onUploadProgress: progressEvent => {
          const total = progressEvent.total;
          const loaded = progressEvent.loaded;
          data.onProgress({ total, loaded });
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        data.onSuccess(response.data);
      })
      .catch(error => {
        const status = error.response ? error.response.status : 500;
        data.onError({ status }, error);
      });
  }

  return (
    <div className={'root'}>
      <div className={'head'}>
        <NavigationBackButton />

        <Button
          size="small"
          theme={'solid'}
          type={'primary'}
          loading={saveLoading}
          onClick={() => {
            setSaveLoading(true);
            handlePublish();
          }}
          disabled={!(ReadyPublishContent || ReadyPublish)}
        >
          发布
        </Button>
      </div>
      <div className={'mainContent'}>
        <TextArea
          className={'input'}
          rows={1}
          autosize
          maxLength={1000}
          placeholder={'记录美好生活'}
          borderless={true}
          value={content}
          onChange={handleContentChange}
        />

        <Upload
          className="imageUpload"
          accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
          action={action}
          uploadTrigger="auto"
          customRequest={uploadFileToImage}
          onError={(...v) => {
            setSaveLoading(false);
            Toast.error('图片上传失败');
            console.log(...v);
          }}
          listType="picture"
          draggable={true}
          multiple={true}
          // onRemove={(currentFile, fileList, currentFileItem) => {
          //   ImageLists.delete(currentFileItem.name);
          //   setImageLists(new Map(ImageLists));
          //
          //   console.log(currentFileItem);
          // }}
          onChange={({ fileList, currentFile }) => {
            console.log('onChange');
            console.log(fileList);
            console.log(currentFile);
            let newFileList = [...fileList]; // spread to get new array
            updateList(newFileList);
          }}
          fileList={list}
          limit={9}
        >
          <IconPlus size="large" />
        </Upload>
      </div>
    </div>
  );
};
export default PublishPost;
