import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconAlignLeft, IconArrowLeft, IconChevronLeft} from "@douyinfe/semi-icons";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import {NavigationBackButton} from "../../../components/NavigationBackButton";
const DeprecatedNavigationBar = () => {

    return(
        <div>
            <div style={{display:"flex",justifyContent:"start",width:'100%',alignItems:"center",paddingTop:'12px',height:'56px',position:"fixed",top:0,backgroundColor:"white",color:"white",zIndex:1000}}>
               <NavigationBackButton/>
                <Title style={{marginLeft:"auto",marginRight:"auto"} } heading={3}>帖子详情</Title>
                <Button style={{visibility:"hidden"}} icon={<IconChevronLeft />} size={"large"} iconSize={"large"}  theme={"borderless"}/>
            </div>
            <div style={{height:'100px'}}></div>
        </div>
    )

}

export default DeprecatedNavigationBar;