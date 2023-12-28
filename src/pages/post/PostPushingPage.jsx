import React, {useEffect, useRef, useState} from 'react';
import { Button, TextArea, Toast, Upload } from '@douyinfe/semi-ui';
import {IconChevronLeft, IconPlus} from '@douyinfe/semi-icons';
import axios from "axios";
import './PostPushingStyle.scss'


const PublishPost = () => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [post,setPost] =useState(false)
    const [readyPublish,setReadyPublish] = useState(false)
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


/*    async function putPost(postData){
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
    }*/



    const handleContentChange = (value) => {
        setContent(value);
    };

    const handlePublish = async () => {


        const postData = {
            content: content,
            images:imagesObject.map(items => items.url)

        };

        // await putPost(postData);



    };


    return (
        <div>

            <div className={"bg"}>
                <div className={"head"}>
                    <Button iconSize={"large"} icon={<IconChevronLeft />} theme="borderless" disabled={readyPublish}/>

                    <Button
                        size='small'
                        theme={"solid"}
                        type={"primary"}
                        loading={saveLoading}

                        onClick={()=>{manulUpload();setSaveLoading(true)}}
                        disabled={post}

                    >
                        发布
                    </Button>



                </div>
                <div className={"mainContent"}>
                    <TextArea

                        className={'input'}
                        rows={1}
                        autosize
                        maxLength={1000}
                        placeholder={'记录美好生活'}
                        borderless={true}
                        value={content}


                        onChange={handleContentChange}
                    />


                    <Upload
                        className="imageUpload"
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
                        <IconPlus size="default" />
                    </Upload>
                </div>



            </div>
        </div>
    );
};
export default PublishPost;


