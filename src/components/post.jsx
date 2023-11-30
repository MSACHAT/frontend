import {Typography, TextArea, Image,Space} from '@douyinfe/semi-ui';
import { Avatar } from '@douyinfe/semi-ui';
import Icon, { IconLikeHeart,IconComment } from '@douyinfe/semi-icons';
import React, {useState} from "react";
import axios from "axios";
export const Post=(props)=>{
    const {UserIcon,UserName,SendTime,ImgURL,Content,LikesCount,CommentsCount}=props
    const { Paragraph,Text } = Typography;
    const [color, setColor] = useState('gray')
    const handleClickOnLike=(color)=>{
        if(color=="gray")
        {
            setColor("red")
            //axios.patch('abc.d')//等有后端了再补全url,这边应该是点赞数+1,注释掉是为了防止报错
        }
        else{
            setColor("gray")
            //axios.patch('abc.d')//等有后端了再补全url,这边应该是后端点赞数-1,注释掉是为了防止报错
        }
    }
    return(
        <>
            <Paragraph>
            <Avatar size="small" alt='User' src={UserIcon} style={{marginRight:5}}></Avatar>
                <Space align={"center"}>
            <Text strong>{UserName}</Text><Text size={"small"} type="quaternary">{SendTime}</Text>
                </Space>
                    <br/>
                <Text type={"secondary"} strong={true}>{Content}</Text>
                <br/>
                <Image

                    width={300}
                    height={300}
                    src={ImgURL}/>
                <br/>
                <Space align={"center"}>
                <IconLikeHeart
                    style={{color}}
                    size="extra-large"
                    onClick={()=>handleClickOnLike(color)}
                />
                <Text style={{marginRight:5}}>{LikesCount}</Text>
               <IconComment size={"extra-large"} />
                <Text>{CommentsCount}</Text>
                <TextArea style={{width:"40%",display:"inline-block",position:"absolute",right:"10%"}} placeholder={"请输入评论"} autosize rows={1} />
                </Space>
            </Paragraph>
        </>

    )
}