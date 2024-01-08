import React, {useCallback, useState} from "react";
import {Button, Modal} from "@douyinfe/semi-ui";
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
const NavigationBar = () => {
    const [visible, setVisible] = useState(false);

    const showDialog = useCallback(() => {
        setVisible(true);
    }, []);

    const handleOk = useCallback(() => {
        setVisible(false);
    }, []);

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    return(
        <div className={'root'}>
            <div style={{display:"flex",justifyContent:"start",width:'100%',alignItems:"center",paddingTop:'12px',height:'56px',position:"fixed",top:0,backgroundColor:"white",color:"white",zIndex:1000}}>
                <Button color={"black"} icon={<IconChevronLeft />} size={"large"} iconSize={"large"}  theme={"borderless"}/>
                <Title style={{marginLeft:"auto",marginRight:"auto"} } heading={3}>帖子详情</Title>
                <Button onClick={showDialog} icon={<IconDeleteStroked />} size={"large"} iconSize={"large"}  theme={"borderless"}/>
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