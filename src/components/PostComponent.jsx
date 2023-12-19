import {Typography, TextArea, Image,Space} from '@douyinfe/semi-ui';
import { Avatar } from '@douyinfe/semi-ui';
import Icon, { IconLikeHeart,IconComment } from '@douyinfe/semi-icons';
import React, {useEffect, useState} from "react";
export const PostStatsBar=(props)=>{
    const {likeCount,commentCount}=props;
    const [color, setColor] = useState('gray')
    const [likeLocalCount,setLikeLocalCount]=useState()
    const { Text } = Typography;
    useEffect(()=>{
        setLikeLocalCount(likeCount+1);
    },[]);
    const handleClickOnLike=(color)=>{
        if(color==="gray")
        {
            setColor("red")
            setLikeLocalCount(likeLocalCount+1)
            //axios.patch('abc.d')//等有后端了再补全url,这边应该是点赞数+1,注释掉是为了防止报错
        }
        else{
            setColor("gray")
            setLikeLocalCount(likeLocalCount-1)
            //axios.patch('abc.d')//等有后端了再补全url,这边应该是后端点赞数-1,注释掉是为了防止报错
        }
    }
    return(
        <>
            <Space align={"center"}>
                <IconLikeHeart
                    style={{color}}
                    size="extra-large"
                    onClick={()=>handleClickOnLike(color)}
                />
                <Text style={{marginRight:5}}>{likeLocalCount}</Text>
                <IconComment size={"extra-large"} />
                <Text>{commentCount}</Text>
                <TextArea style={{width:"40%",display:"inline-block",position:"absolute",right:"10%"}} placeholder={"请输入评论"} autosize rows={1} />
            </Space>
        </>
    )
}
export const Post=(props)=>{
    const {userName,timeStamp,images,content,likeCount,commentCount,title,isLiked,postId}=props
    const { Paragraph,Text } = Typography;
    return(
        <>
            <Paragraph>
            <Avatar size="small" alt='User' style={{marginRight:5,color:"red"}}></Avatar>
                <Space align={"center"}>
            <Text strong>{userName}</Text><Text size={"small"} type="quaternary">{timeStamp}</Text>
                </Space>
                    <br/>
                <Text type={"secondary"} strong={true}>{content}</Text>
                <br/>
                <Image

                    width={300}
                    height={300}
                    src={images}/>
                <br/>
                <PostStatsBar
                    likeCount={likeCount}
                    commentCount={commentCount}
                />
            </Paragraph>
        </>

    )
}