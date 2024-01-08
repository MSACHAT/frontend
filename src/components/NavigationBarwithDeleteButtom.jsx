import React, {useCallback, useState} from "react";
import {Button, Modal, Toast} from "@douyinfe/semi-ui";
import {
    IconAlertTriangle,
    IconAlignLeft,
    IconArrowLeft,
    IconChevronLeft,
    IconDelete,
    IconDeleteStroked
} from "@douyinfe/semi-icons";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import './NavigationBarWithDeleteButtom.scss'
import apiClient from "../middlewares/axiosInterceptors";
import {useNavigate} from "react-router-dom";
const NavigationBar = ({postId}) => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const showDialog = useCallback(() => {
        setVisible(true);
    }, []);

    const handleOk = useCallback(() => {
        setVisible(false);
        console.log("delete post");
        sendRequest();
        navigate("/post");

    }, []);
    async function sendRequest() {
        console.log("delete post");
        try {
            const res = await apiClient.delete(`/post/${postId}/delete`)
        } catch (e) {
            Toast.error('删除失败')
        }


    }

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    return(
        <div className={'root'}>
            <div style={{display:"flex",justifyContent:"start",width:'100%',alignItems:"center",paddingTop:'12px',height:'56px',position:"fixed",top:0,backgroundColor:"white",color:"white",zIndex:1000}}>
                <Button color={"black"} icon={<IconChevronLeft />} size={"large"} iconSize={"large"}  theme={"borderless"}/>
                <Title style={{marginLeft:"auto",marginRight:"auto"} } heading={3}>帖子详情</Title>
                <Button onClick={showDialog} icon={<IconDeleteStroked />} size={"large"} style={{color:"gray"}} iconSize={"large"}  theme={"borderless"}/>
                <Modal
                    className={'modal'}
                    icon={<IconAlertTriangle />}
                    title={'删除个人发帖'}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    closeOnEsc={true}
                    okText={'确认删除'}
                    cancelText={'取消'}

                >
                    <div>帖子删除之后将无法恢复，请确认是否要删除本帖子！</div>
                </Modal>

            </div>
            <div style={{height:'100px'}}></div>
        </div>
    )

}

export default NavigationBar;