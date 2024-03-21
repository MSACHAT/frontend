import { Avatar, ImagePreview, Toast } from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React, { useEffect, useRef, useState } from 'react';
import './profileStyle.scss';
import apiClient from '../../middlewares/axiosInterceptors';
import upload from '../../middlewares/uploadImage';
import imageCompression from 'browser-image-compression';
export const UserAvatar = ({ disableEdit, imageUrl }) => {
  const [avtarUrl, setAvatarUrl] = useState(
    imageUrl || process.env.PUBLIC_URL + 'ProfilePhoto.png'
  );
  const [visible, setVisible] = useState(false);
  const fetchData = () => {
    apiClient
      .get('/users/avatar')
      .then(res => {
        setAvatarUrl(res.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    !disableEdit && fetchData();
  }, []);
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    // 触发 file input 的点击事件
    fileInputRef.current.click();
  };

  const handleFileChange = async event => {
    if (event.target.files && event.target.files[0]) {
      const options = {
        maxSizeMB: 0.5, // 最大文件大小（单位：MB）
        maxWidthOrHeight: 1920, // 图片最大宽度或高度
        useWebWorker: true, // 使用Web Worker以避免UI线程阻塞
      };
      const compressedFile = await imageCompression(
        event.target.files[0],
        options
      );

      // 创建 FormData 并将文件加入
      const formData = new FormData();
      formData.append('file', compressedFile);
      console.log('FormDataUploading');
      console.log(formData);
      upload
        .post('/users/avatar', formData)
        .then(response => {
          setAvatarUrl(response.data);
        })
        .then(data => console.log(data, '11'))
        .catch(error => Toast.error('上传失败'));
      setVisible(false);
      Toast.success('更换成功');
    }
  };
  return (
    <div
      id="avatar-container"
      onClick={() => {
        setVisible(false);
      }}
    >
      <div
        className={'image-item'}
        style={{ '--custom-image-width': disableEdit ? '40px' : '80px' }}
      >
        <Avatar
          src={avtarUrl}
          className={'image'}
          onClick={event => {
            setVisible(true);
            event.stopPropagation();
          }}
        />
      </div>
      {!disableEdit && (
        <ImagePreview
          visible={visible}
          src={avtarUrl}
          closable={false}
          renderHeader={() => (
            <div className={'avartar-preview-top'}>
              <IconChevronLeft
                onClick={event => {
                  event.stopPropagation();
                }}
              />
            </div>
          )}
          renderPreviewMenu={() => (
            <div
              onClick={event => {
                event.stopPropagation();
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }} // 隐藏原生文件输入框
              />
              <Title heading={3} onClick={handleButtonClick}>
                修改个人头像
              </Title>
            </div>
          )}
          type="tertiary"
          className={'avatar-preview'}
          getPopupContainer={() => {
            const node = document.getElementById('avatar-container');
            return node;
          }}
        />
      )}
    </div>
  );
};
