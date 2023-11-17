import React from 'react';
import { Layout,Button,Table } from '@douyinfe/semi-ui';
// @ts-ignore
import {Post} from "../../components/post.tsx";
import {IconChevronLeft} from "@douyinfe/semi-icons"
// @ts-ignore
import {GetData} from "./hookToGetData.tsx";
import {useState,useEffect} from "react";
// @ts-ignore
import {Notif} from "../../components/notif.tsx";
export function Notifications(){
    const [pageSize,setPageSize]=useState(10)//修改这个值来调整一次获取的数据量
    const [currentData,setCurrentData]=useState(0)
    const [likesCount,setLikesCount]=useState(0)
    window.onscroll=function(){
        //变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;

        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

        //变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;

        //滚动条到底部
        if(scrollTop+windowHeight>=scrollHeight){//对于手机端来说，中间的符号可能用===比较好
            loadMoreData()
        }
    }

    function loadMoreData() {
        // 请求API加载数据
        // @ts-ignore
        const newData = GetData(currentData, pageSize);
        setCurrentData(currentData+pageSize)
        setNotifs(prevNotifs => {
            return {
                ...prevNotifs,
                data: prevNotifs.data.concat(newData.data)
            }
        });
    }
    const handleClickOnLike=(color)=>{
        if(color=="gray")
        {
            setColor("red")
            setLikesCount(likesCount+1)
            //axios.patch('abc.d')//等有后端了再补全url,这边应该是点赞数+1,注释掉是为了防止报错
        }
        else{
            setColor("gray")
            setLikesCount(likesCount-1)
            //axios.patch('abc.d')//等有后端了再补全url,这边应该是后端点赞数-1,注释掉是为了防止报错
        }
    }
    const [color, setColor] = useState('gray')
    const { Header,Content, Footer } = Layout;
    const {Column}=Table;
    const commonStyle = {
        height: 64,
        lineHeight: '64px',
        background: 'var(--semi-color-fill-0)'
    };
    const [notifs,setNotifs]=useState({data:[]});
    useEffect(() => {
        const data = GetData(currentData,pageSize);
        setCurrentData(currentData+pageSize);
        // @ts-ignore
        setNotifs(data);
    }, []);
    console.log(notifs.data)
    return (
        <Layout>
            <Header style={commonStyle}><Button theme={"borderless"} icon={<IconChevronLeft/>} onClick={()=>window.history.back()}></Button></Header>
            <Content style={{height: 300, lineHeight: '300px'}}>
                <Table dataSource={notifs.data} pagination={false}>
                    <Column dataIndex="MessageType" key="key"
                            render={(text, record) => (
                                <Notif
                                MessageType={record.MessageType}
                                UserIcon={record.UserIcon}
                                UserName={record.UserName}
                                SendTime={record.SendTime}
                                PostIMG={record.PostIMG}
                                Comment={record.Comment}
                                ></Notif>
                            )}/>
                </Table>
            </Content>
            {/*<Footer style={{...commonStyle,display: "flex", textAlign: "center"}} className="Align-Bottom" >*/}
            {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>首页</Button>*/}
            {/*    <Button icon={<IconPlus/>} aria-label="截屏"/>*/}
            {/*    <Button theme='borderless' type='primary' style={{marginRight: 8}}>我的</Button>*/}
            {/*</Footer>*/}
        </Layout>
    );
};
