import { Image, ImagePreview, Toast } from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React, { useEffect, useRef, useState } from 'react';
import './profileStyle.scss';
import fakeData from '../../mockdata/ProfileMockData.json';
import axios from 'axios';
export const UserAvatar = () => {
  const [avtarUrl, setAvatarUrl] = useState('');
  const [visible, setVisible] = useState(false);
  const fetchData = () => {
    return new Promise(res => {
      res(
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg'
      );
    })
      .then(r => {
        setAvatarUrl(r);
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

      // 发送请求到服务器 (示例 URL)
      // axios
      //   .post(
      //     'https://bytedance.larkoffice.com/docx/SPILdDbBioK4t7xpb2kcQB0unqd',
      //     {
      //       method: 'POST',
      //       body: formData,
      //     }
      //   )
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error('上传失败');
      //     }
      //     return response.json();
      //   })
      //   .then(data => console.log(data, '11'))
      //   .catch(error => Toast.error('上传失败'));
      setAvatarUrl(
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg'
      );
    }
  };
  return (
    <div id="avatar-container">
      <ImagePreview
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
        // visible={visible}
        renderPreviewMenu={() => (
          <div>
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
      >
        <div className={'image-item'}>
          <Image className={'image'} src={avtarUrl} />
        </div>
      </ImagePreview>
    </div>
  );
};
