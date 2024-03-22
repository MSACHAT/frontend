import React, { useEffect, useState} from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import type { FileItem} from '@douyinfe/semi-ui/lib/es/upload';
import { IconPlus } from '@douyinfe/semi-icons';
import { AxiosError } from 'axios';
import './PostPushingStyle.scss';

import { NavigationBackButton } from '../../components/NavigationBackButton';
import { useNavigate } from 'react-router-dom';
import url from '../../config/RouteConfig';
import upload from '../../middlewares/uploadImage';
import apiClient from '../../middlewares/axiosInterceptors';
import imageCompression from 'browser-image-compression';


const PublishPost: React.FC = () => {
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);
  const [content, setContent] = useState('');
  const [list, setList] = useState<FileItem[]>([]);
  const isPublishDisabled = content.length === 0 && list.length === 0;

  useEffect(() => {
    setSaveLoading(false);
  }, [list]);

  const handleContentChange = (value: string): void => {
    setContent(value);
  };

  const handlePublish = async (): Promise<void> => {
    try {
      setSaveLoading(true);
      const postData = {
        content,
        image: list.map(item => item.response),
      };

      if (list.length === 0) {
        postData.image = [];
      }

      await apiClient.post('/posts/add', postData);



      Toast.success('帖子发布成功！');
      navigate(url.feed);
    } catch (error) {


      Toast.error('帖子发布失败！');
      setSaveLoading(false);
    }
  };

  const uploadFileToImage = async (data: any): Promise<void> => {
    const formData = new FormData();
    formData.append('file', data.fileInstance);

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(data.fileInstance, options);
      formData.append('file', compressedFile);

      const response = await upload.post('/images/uploadimage', formData, {
        onUploadProgress: progressEvent => {
          const total = progressEvent.total || 0;
          const loaded = progressEvent.loaded;
          data.onProgress({ total, loaded });
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      data.onSuccess(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response ? axiosError.response.status : 500;
      data.onError({ status }, axiosError);
      setSaveLoading(false);
      Toast.error('图片上传失败');
    }
  };

  return (
    <div className="AddPostContainer">
      <div className={'head'}>
        <NavigationBackButton />

        <Button
          size="small"
          theme="solid"
          type="primary"
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
          listType="picture"
          draggable={true}
          multiple={true}
          onChange={({ fileList }) => {
            setList(fileList);
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
