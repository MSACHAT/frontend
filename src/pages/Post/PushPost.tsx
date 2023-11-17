import React, { useEffect, useRef, useState } from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import axios from "axios";


interface PublishPostProps {}

const PublishPost: React.FC<PublishPostProps> = () => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [post, setPost] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('未命名');
    const [content, setContent] = useState<string>('');
    const [list, updateList] = useState<any[]>();
    const [imagesObject, setImagesObject] = useState<any>(undefined);
    const uploadRef = useRef<any>();
    const [shouldCallEffect, setShouldCallEffect] = useState<boolean>(false);


    // Mock代码

    const [isSuccess, setIsSuccess] = useState<string | undefined>(undefined);

    const handleSubmit = async () => {
        const requestLogin = new Promise<void>((resolve, reject) => {
            let isSuccessful = Math.random() >= 0.5; // 随机成功或失败
            console.log(isSuccessful);
            if (isSuccessful) {
                resolve();
                setSaveLoading(false);
            } else {
                resolve({ msg: '错误', code: 1001 });
                setSaveLoading(false);
            }
        });

        await requestLogin.then(() => {
            if (isSuccess) {
                Toast.error('失败')
            } else {
                Toast.success('成功');
            }
        });
    };

    // Mock结束
    const manulUpload = () => {
        uploadRef.current.upload();
    };

    useEffect(() => {
        if (shouldCallEffect) {
            console.log(imagesObject);
            handlePublish();
        } else {
            setShouldCallEffect(true);
        }
    }, [imagesObject]);

    const action = 'https://api.semi.design/upload';

    async function putPost(postData: any) {
        try {
            const response = await axios.post('/post', postData);
            console.log(response.data);
            Toast.success('帖子发布成功！');
        } catch (error) {
            console.error(error);
            Toast.error('帖子发布失败！');
        }
        setSaveLoading(false);
    }

    const handleTitleChange = (value: string) => {
        if (value.length > 20 || value.length === 0) {
            setPost(true);
        } else {
            setPost(false);
        }
        setTitle(value);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handlePublish = async () => {
        const postData = {
            title: title,
            content: content,
            images: list,
        };
        handleSubmit();
    };

    return (
        <div className="bg-white flex">
            <div className="flex-auto">
                <TextArea
                    maxCount={20}
                    rows={1}
                    placeholder='标题'
                    size='large'
                    showClear
                    value={title}
                    onChange={handleTitleChange}
                    aria-readonly={saveLoading}
                />
                <br /><br />
                <Upload
                    accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
                    action={action}
                    uploadTrigger="custom"
                    ref={uploadRef}
                    showRetry = {false}
                    onSuccess={(...v) => {
                        if (JSON.stringify(v[2]) !== JSON.stringify(imagesObject)) {
                            setImagesObject(v[2]);
                        }
                    }}
                    onError={(...v) =>{setSaveLoading(false);Toast.error("图片上传失败");console.log(...v)}}
                    listType="picture"
                    draggable={true}
                    multiple
                    limit={9}
                    disable={saveLoading}
                >
                    <IconPlus size="large" />
                </Upload>

                <TextArea
                    aria-readonly={saveLoading}
                    autosize
                    maxLength={1000}
                    placeholder={'记录美好生活'}
                    borderless={true}
                    value={content}
                    onChange={handleContentChange}

                />

                <Button
                    loading={saveLoading}
                    onClick={() => {
                        manulUpload();
                        setSaveLoading(true);
                    }}
                    disabled={post}
                >
                    发布
                </Button>
            </div>
        </div>
    );
};

export default PublishPost;
