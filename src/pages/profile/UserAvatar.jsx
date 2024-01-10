import { ImagePreview, Toast } from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React, { useEffect, useRef, useState } from 'react';
import './profileStyle.scss';
import axios from 'axios';

export const UserAvatar = () => {
  const [avtarUrl, setAvatarUrl] = useState('');
  const [visible, setVisible] = useState(false);
  const fetchData = () => {
    return new Promise(res => {
      //TODO 换成获取头像链接
      res(axios.get('http://localhost:8085/images/getavatar/test'));
    })
      .then(r => {
          console.log(r.data)
        setAvatarUrl(r.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
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
      axios
        .post('http://localhost:8085/images/uploadavatar/test', formData, {
          headers: {
            enctype: 'multipart/form-data',
          },
        })
        .then(response => {
          setAvatarUrl(response.data)
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
      <div className={'image-item'}>
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
    </div>
  );
};
