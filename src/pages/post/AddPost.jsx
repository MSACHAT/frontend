import React, { useEffect, useState } from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import axios from 'axios';
import './PostPushingStyle.scss';
import config from '../../config/config';
import { NavigationBackButton } from '../../components/NavigationBackButton';
import { useNavigate } from 'react-router-dom';
import url from '../../config/RouteConfig';
import upload from '../../middlewares/uploadImage';
import apiClient from '../../middlewares/axiosInterceptors';
import imageCompression from 'browser-image-compression';
const PublishPost = () => {
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);
  const [content, setContent] = useState('');
  const [list, updateList] = useState([]);
  const isPublishDisabled = !(content.length > 0 || list.length > 0);

  useEffect(() => {
    setSaveLoading(false);
  }, [list]);

  const handleContentChange = value => {
    setContent(value);
  };

  const handlePublish = async () => {
    try {
      setSaveLoading(true);
      let postData = {
        content: content,
        image: list.map(x => x.response),
      };

      if (list.length === 0) {
        postData.image = [];
      }

      const response = await apiClient.post('/posts/add', postData);

      console.log(response.data);

      Toast.success('帖子发布成功！');
      navigate(url.feed);
    } catch (error) {
      console.error(error);

      Toast.error('帖子发布失败！');
      setSaveLoading(false);
    }
  };

  async function uploadFileToImage(data) {
    const formData = new FormData();
    formData.append('file', data.fileInstance);

    const options = {
      maxSizeMB: 0.5, // 最大文件大小（单位：MB）
      maxWidthOrHeight: 1920, // 图片最大宽度或高度
      useWebWorker: true, // 使用Web Worker以避免UI线程阻塞
    };

    try {
      // 图片压缩
      const compressedFile = await imageCompression(data.fileInstance, options);
      const formData = new FormData();
      formData.append('file', compressedFile);

      const response = await upload.post('/images/uploadimage', formData, {
        onUploadProgress: progressEvent => {
          const total = progressEvent.total;
          const loaded = progressEvent.loaded;
          data.onProgress({ total, loaded });
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      data.onSuccess(response.data);
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      data.onError({ status }, error);
    }
  }

  return (
    <div className={'AddPostContainer'}>
      <div className={'head'}>
        <NavigationBackButton />

        <Button
          size="small"
          theme={'solid'}
          type={'primary'}
          loading={saveLoading}
          onClick={handlePublish}
          disabled={isPublishDisabled}
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
          placeholder={'分享你的生活'}
          borderless={true}
          value={content}
          onChange={handleContentChange}
        />

        <Upload
          className="imageUpload"
          accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
          uploadTrigger="auto"
          customRequest={uploadFileToImage}
          onError={(...v) => {
            setSaveLoading(false);
            Toast.error('图片上传失败');
          }}
          listType="picture"
          draggable={true}
          multiple={true}
          onChange={({ fileList }) => {
            updateList([...fileList]);
          }}
          fileList={list}
          limit={9}
        >
          <IconPlus size="extra-large" />
        </Upload>
      </div>
    </div>
  );
};

export default PublishPost;
