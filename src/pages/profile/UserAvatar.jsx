import { ImagePreview, Toast } from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React, { useEffect, useRef, useState } from 'react';
import './profileStyle.scss';
import axios from 'axios';
import apiClient from '../../middlewares/axiosInterceptors';
import uploadImage from '../../middlewares/uploadImage';
export const UserAvatar = ({ enableEdit, imageUrl }) => {
  const [avtarUrl, setAvatarUrl] = useState(imageUrl || '');
  const [visible, setVisible] = useState(false);
  const fetchData = () => {
    apiClient.get('/images/getavatar').then(res => {
      setAvatarUrl(res.data);
      return res.data;
    });
  };

  useEffect(() => {
    enableEdit && fetchData();
  }, []);
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    // 触发 file input 的点击事件
    fileInputRef.current.click();
  };

  const handleFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      // 创建 FormData 并将文件加入
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log('FormDataUploading');
      console.log(formData);
      uploadImage
        .post('/images/uploadavatar', formData)
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
        style={{ '--custom-image-width': enableEdit ? '80px' : '40px' }}
      >
        <img
          alt={'图片未加载'}
          className={'image'}
          src={avtarUrl}
          onClick={event => {
            setVisible(true);
            event.stopPropagation();
          }}
        />
      </div>
      <ImagePreview
        visible={enableEdit && visible}
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
    </div>
  );
};
