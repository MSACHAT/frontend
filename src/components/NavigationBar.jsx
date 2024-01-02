import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconAlignLeft, IconArrowLeft, IconChevronLeft} from "@douyinfe/semi-icons";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
const navigationBar = () => {

    return(
        <div style={{display:"flex",justifyContent:"start",width:'100%',alignItems:"center",marginTop:'12px'}}>
            <Button color={"black"} icon={<IconChevronLeft />} size={"large"} iconSize={"large"}  theme={"borderless"}/>
            <Title style={{marginLeft:"auto",marginRight:"auto"} } heading={6}>帖子详情</Title>
            <Button style={{visibility:"hidden"}} icon={<IconChevronLeft />} size={"large"} iconSize={"large"}  theme={"borderless"}/>
        </div>
    )

}

export default navigationBar;