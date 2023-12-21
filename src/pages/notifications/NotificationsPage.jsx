import React from 'react';
import {Layout, Button, Table} from '@douyinfe/semi-ui';
// @ts-ignore
import {Post} from "../../components/PostComponent.jsx";
import {IconChevronLeft} from "@douyinfe/semi-icons"
// @ts-ignore
import {GetData} from "./HookToGetData.jsx";
import {useState, useEffect} from "react";
// @ts-ignore
import {Notif} from "../../components/NotifComponent.jsx";
import axios from "axios";

export function Notifications() {
    const [pageSize, setPageSize] = useState(10)//修改这个值来调整一次获取的数据量
    const [pageNum, setpageNum] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    window.onscroll = function () {
        //变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

        //变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        //滚动条到底部
        if (scrollTop + windowHeight >= scrollHeight) {//对于手机端来说，中间的符号可能用===比较好
            loadMoreData()
        }
    }

    function loadMoreData() {
        // 请求API加载数据
        // @ts-ignore
        console.log(pageNum)
        console.log(totalPages)
        if (pageNum > totalPages) {
            return;
        }
        GetData(pageNum, pageSize).then(result => {
            result.data = [...notifs.data,...result.data]
            setNotifs(result)
            setTotalPages(result.totalPages)
            axios.post('http://localhost:8085/notif/isread',result.data)
        });
        setpageNum(pageNum + 1)
    }

    const {Header, Content, Footer} = Layout;
    const {Column} = Table;
    const [notifs, setNotifs] = useState({data: []});
    useEffect(() => {
        GetData(pageNum, pageSize).then(result => {
            setNotifs(result)
            setTotalPages(result.totalPages)
            const header={"Content-Type":"application/json"}
            axios.post('http://localhost:8085/notif/isread',result.data,{
                headers:header
            })
        });
        setpageNum(pageNum + 1);
        // @ts-ignore
    }, []);
    console.log(notifs.data)
    return (
        <Layout>
            <Header style={{position: "fixed", zIndex: 999, backgroundColor: "#9C9EA1", width: "100%"}}><Button
                theme={"borderless"} icon={<IconChevronLeft/>} onClick={() => {
                window.history.go(-1)
            }}></Button></Header>
            <Content style={{height: 300, lineHeight: '300px'}}>
                <Table dataSource={notifs.data} pagination={false}>
                    <Column dataIndex="MessageType" key="key"
                            render={(text, record) => (
                                <Notif
                                    messageType={
                                        (record.commentContent == undefined ? "Like" : "Comment")
                                    }
                                    userIcon={"https://th.bing.com/th/id/OIP.M3gZXiFf0RuvTbbZn8SI8AHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.1&pid=1.7"}//由于后端没有传头像，暂时先用网上的url凑合一下
                                    userName={record.userName}
                                    sendTime={record.timeStamp}
                                    // postIMG={record.postIMG} 暂无
                                    commentContent={record.commentContent}
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
