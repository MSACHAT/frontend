import React, { useState } from "react";
import { TextArea, Toast } from "@douyinfe/semi-ui";
import './CommentStyle.scss'

const Comment = () => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {

        setValue(event);
    };

    const handlePublish = async (event) => {
        event.preventDefault()
        if (value.length===0){
            Toast.error('必须要有内容哦')
            return
        }

        Toast.success('发布成功');
        await setValue('');
    };

    return (
        <div className={'root'}>
            <div style={{ height: '20%', position: "fixed", bottom: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: "end", paddingBottom:"10px" }}>
                <TextArea
                    style={{ width: '90%' ,borderRadius:'12px'}}
                    autosize={true}
                    rows={1}
                    maxLength={200}
                    minLength={1}
                    maxCount={200}
                    onChange={handleChange}
                    value={value}
                    placeholder={"评论"}
                    onEnterPress={handlePublish}
                />
            </div>
        </div>

    );
};

export default Comment;
