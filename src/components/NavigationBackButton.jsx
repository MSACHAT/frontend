import {IconChevronLeft} from "@douyinfe/semi-icons";
import {Button} from "@douyinfe/semi-ui";
import React from "react";
import { useNavigate } from 'react-router-dom';
export function NavigationBackButton(){
    const history = useNavigate();
    function onBackClick() {
        history(-1);

    }
    return (
        <Button color={"black"} style={{color:"gray"}} iconStyle={{color:"black"}} icon={<IconChevronLeft />} size={"large"} iconSize={"large"}  theme={"borderless"} onClick={onBackClick}/>
    )
}