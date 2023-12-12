//思路:IF ELSE判断传入的Comment Type,根据不同的Comment Type返回不同的样式
import {Avatar, Collapse,Typography,Image,Space } from '@douyinfe/semi-ui';
import {IconChevronDown,IconChevronUp,IconLikeHeart,IconComment } from "@douyinfe/semi-icons"
export const Notif=(props)=>{
    const {Text}=Typography
    const{MessageType,UserIcon,UserName,SendTime,PostIMG}=props;
    if(MessageType=="Comment"){
    const{Comment}=props;
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
                        <Avatar src={UserIcon} />
                        <Text>{UserName}</Text>
                        <Text type="quaternary" size={"small"}>{SendTime}</Text>
                    </Space>
                </div>
            } itemKey="1" >
                <Text type={"secondary"} strong={true}>{Comment}</Text>
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
                        <Avatar src={UserIcon} />
                        <Text size={"normal"}>{UserName}</Text>
                        <Text type={"quaternary"} size={"small"}>{SendTime}</Text>
                        </Space>
                    </div>
                } itemKey="1" extra={PostIMG}>
                </Collapse.Panel>
            </Collapse>
        )
    }
}