import React, { useEffect, useRef, useState } from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import axios from 'axios';

const PublishPost = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [post, setPost] = useState(false);
  const [title, setTitle] = useState('未命名');
  const [content, setContent] = useState('');

  const [imagesObject, setImagesObject] = useState();
  const uploadRef = useRef();

  const [isSuccess, setIsSuccess] = useState();

  const handleSubmit = async () => {
    // 请求逻辑
  };

  const manulUpload = () => {
    uploadRef.current.upload();
  };

  useEffect(() => {
    if (imagesObject) {
      handlePublish();
    }
  }, [imagesObject]);

  const action = 'https://api.semi.design/upload';

  const handleTitleChange = value => {
    // 标题change逻辑
  };

  const handleContentChange = value => {
    setContent(value);
  };

  const handlePublish = async () => {
    // 发布逻辑
  };

  return (
    <div className="bg-white flex">
      <TextArea value={title} onChange={handleTitleChange} />

      <Upload
        ref={uploadRef}
        onSuccess={v => {
          setImagesObject(v[2]);
        }}
      >
        <IconPlus size="large" />
      </Upload>

      <TextArea value={content} onChange={handleContentChange} />

      <Button
        onClick={() => {
          manulUpload();
          setSaveLoading(true);
        }}
      >
        发布
      </Button>
    </div>
  );
};

export default PublishPost;
