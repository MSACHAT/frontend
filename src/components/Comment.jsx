import React, { useState } from "react";
import { TextArea, Toast } from "@douyinfe/semi-ui";
import './CommentStyle.scss'
import Comments from "./Comments";




const Comment = () => {

    const [value, setValue] = useState('');
    const [Size,setSize] = useState(62)
    const [Comment,SetComment]=useState('')


    const handleChange = (event) => {

        setValue(event);
    };

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 100,
            smooth: 'easeInOutQuart'
        });
    }


    const handlePublish = async (event) => {
        event.preventDefault()
        if (value.length===0){
            Toast.error('必须要有内容哦')
            return
        }
        scrollToTop()
        await setValue('');
    };
    function handleResize(height) {
        console.log(height)
        const newHeight = height+12;
        setSize(newHeight)

    }
    return (
        <div className={'root'}>
            <Comments/>
            <div style={{ height: `${Size}px`, position: "fixed", bottom: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: "end", paddingBottom:"36px",backgroundColor:"white" }}>
                <TextArea
                    style={{ width: '90%' ,borderRadius:'12px',backgroundColor:'#F4F4F4'}}
                    autosize={true}
                    onResize={handleResize}
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
