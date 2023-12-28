import React, {useEffect, useRef, useState} from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import {IconChevronLeft, IconPlus} from '@douyinfe/semi-icons';
import axios from "axios";



const PublishPost = () => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [post,setPost] =useState(false)
    const [title, setTitle] = useState('未命名');
    const [content, setContent] = useState('');
    const [list, updateList] = useState();
    const [imagesObject, setImagesObject] = useState(undefined);
    const uploadRef = useRef();
    const [shouldCallEffect, setShouldCallEffect] = useState(false);


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

    const manulUpload = () => {
        uploadRef.current.upload();
    };

    useEffect(() => {
        if (shouldCallEffect){

            console.log(imagesObject)
            handlePublish()
        }else {
            setShouldCallEffect(true)
        }

    }, [imagesObject]);

    const action = 'https://api.semi.design/upload';


    async function putPost(postData){
        try {
            const instance = axios.create({
                baseURL: 'http://localhost:8085/post',
                timeout: 1000,

            });

            const response = await instance.post('/add/test', postData);

            console.log(response.data);

            Toast.success('帖子发布成功！');

        } catch (error) {

            console.error(error);

            Toast.error('帖子发布失败！');
        }

        setSaveLoading(false);
    }

    const handleTitleChange = (value) => {
        if (value.length>20||value.length===0){
            setPost(true)

        }else {
            setPost(false)
        }
        setTitle(value);
    };

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handlePublish = async () => {


        const postData = {
            title: title,
            content: content,
            images:imagesObject.map(items => items.url)

        };

        await putPost(postData);



    };


    return (
        <div className="mx-auto">

            <div className="flex flex-col justify-between container  mx-auto">
                <header className=" flex flex-row justify-between my-3  px-2.5">
                    <Button
                        className="order-last"
                        loading={saveLoading}

                        onClick={()=>{manulUpload();setSaveLoading(true)}}
                        disabled={post}

                    >
                        发布
                    </Button>

                    <Button icon={<IconChevronLeft />} theme="borderless" />

                </header>


                <TextArea
                    className="my-3"
                    maxCount={20}
                    rows={1}
                    placeholder='标题'
                    size='large'
                    showClear
                    value={title}
                    borderless={true}
                    onChange={handleTitleChange}
                />

                <Upload
                    className="order-last"
                    accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
                    action={action}
                    uploadTrigger="custom"
                    ref={uploadRef}
                    onSuccess={(...v) => {
                        if (JSON.stringify(v[2]) !== JSON.stringify(imagesObject)) {
                            setImagesObject(v[2]);
                        }
                    }}
                    onError={(...v) => {setSaveLoading(false);Toast.error("图片上传失败");console.log(...v)}}
                    listType="picture"
                    draggable={true}
                    multiple
                    limit={9}
                >
                    <IconPlus size="large" />
                </Upload>

                <TextArea
                    className="mb-3"
                    autosize
                    maxLength={1000}
                    placeholder={'记录美好生活'}
                    borderless={true}
                    value={content}
                    onChange={handleContentChange}
                />


            </div>
        </div>
    );
};
export default PublishPost;


