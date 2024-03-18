import React, { useEffect, useState } from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import { AxiosError } from 'axios';
import './PostPushingStyle.scss';

import { NavigationBackButton } from '../../components/NavigationBackButton';
import { useNavigate } from 'react-router-dom';
import url from '../../config/RouteConfig';
import upload from '../../middlewares/uploadImage';
import apiClient from '../../middlewares/axiosInterceptors';
import imageCompression from 'browser-image-compression';

interface FileItem {
    // 当前文件名称
    fileName: string,
        // 用户设置的props.data
    data: object,
    // FileItem，具体结构参考下面的文档
    file: FileItem,
    // original File Object which extends Blob, 浏览器实际获取到的文件对象(https://developer.mozilla.org/zh-CN/docs/Web/API/File)
    fileInstance: File,
    // 上传过程中应调用的函数，event需要包含 total、loaded属性
    onProgress: (event: { total: number, loaded: number }) => any,
    // 上传出错时应调用的函数
    onError: (userXhr: { status: number }, e: event) => any,
    // 上传成功后应调用的函数, response为上传成功后的请求结果
    onSuccess: (response: any, e?: event) => any,
    // 用户设置的props.withCredentials
    withCredentials: boolean,
    // 用户设置的props.action
    action: string,

}



const PublishPost: React.FC = () => {
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);
  const [content, setContent] = useState('');
  const [list, updateList] = useState<any[]>([]);
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
            updateList(fileList);
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
