//思路:IF ELSE判断传入的Comment Type,根据不同的Comment Type返回不同的样式
import {Avatar, Collapse,Typography,Image,Space } from '@douyinfe/semi-ui';
import {IconChevronDown,IconChevronUp,IconLikeHeart,IconComment } from "@douyinfe/semi-icons"
export const Notif=(props)=>{
    const {Text}=Typography
    const{messageType,userIcon,userName,sendTime,commentContent}=props;
    if(messageType==="Comment"){
    const expandIconForComments=(
        <Space style={{height:"100%",display:"inline-flex",float:"right"}}>
            <IconChevronDown style={{float:"right",marginRight:20}} />
            <Image
                style={{}}
                width={40}
                height={40}
                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"/>
        </Space>
    )
        const collapseIconForComments=(
            <Space style={{height:"100%",display:"inline-flex",float:"right"}}>
                <IconChevronUp style={{float:"right",marginRight:20}} />
                <Image
                    style={{}}
                    width={40}
                    height={40}
                    src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"/>
            </Space>
        )
    return(
        <Collapse expandIcon={expandIconForComments}
        collapseIcon={collapseIconForComments}>
            <Collapse.Panel style={{border:"none"}} header={
                <div>
                    <Space align='center'>
                        <IconComment size={"extra-large"}></IconComment>
                        <Avatar src={userIcon} />
                        <Text>{userName}</Text>
                        <Text type="quaternary" size={"small"}>{sendTime}</Text>
                    </Space>
                </div>
            } itemKey="1" >
                <Text type={"secondary"} strong={true}>{commentContent}</Text>
            </Collapse.Panel>
        </Collapse>
    )
    }else{
        const expandIconForLikes=(
            <Space style={{height:"100%",float:"right"}}>
            <Image
                width={40}
                height={40}
                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"/>
                </Space>
        )
        return(
            <Collapse expandIcon={expandIconForLikes}>
                <Collapse.Panel style={{border:"none"}} header={
                    <div>
                        <Space align={"center"}>
                        <IconLikeHeart size={"extra-large"} style={{color:"red"}}></IconLikeHeart>
                        <Avatar src={userIcon} />
                        <Text size={"normal"}>{userName}</Text>
                        <Text type={"quaternary"} size={"small"}>{sendTime}</Text>
                        </Space>
                    </div>
                } itemKey="1">
                </Collapse.Panel>
            </Collapse>
        )
    }
}