import React, {useEffect, useState} from "react";
import {Avatar, List, Spin, TextArea, Toast,} from "@douyinfe/semi-ui";

import InfiniteScroll from "react-infinite-scroller";
import './postStyle.scss'
import './CommentStyle.scss'
import { Typography } from '@douyinfe/semi-ui';
import { animateScroll as scroll } from 'react-scroll';
import apiClient from "../middlewares/axiosInterceptors";
import {useRecoilState} from "recoil";
import {CommentCount} from "../store";
import {useNavigate} from "react-router-dom";


const CommentList = ({postId}) => {
    const navigate =useNavigate()
    const { Text } = Typography;

    const dataList = [];
    const [commentCount, setCommentCount] = useRecoilState(CommentCount);


    const [hasMore,setHasMore] = useState(true)
    const [data, setData] = useState(dataList);
    const [countState, setCountState] = useState(0);
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true);

        try {

            const response = await apiClient.get(`/comments/get/${postId}`,{
                params: {
                    pageNum: countState,
                    pageSize: 10,
                }
            });

            console.log(response);
            const result = await response.data;
            setData([...data, ...result.comments]);
            setCountState(countState + 1);
            const hasMore   = result.totalPages >= countState;

            setHasMore(hasMore);
        } catch (error) {

            console.error('Fetching data failed', error);

        } finally {
            setLoading(false);
        }
    };


    async function handeScroll() {

            setLoading(true);

            try {

                const response = await apiClient.get(`/comments/get/${postId}` ,{
                    params: {
                        pageNum: countState,
                        pageSize: 10,
                    },});
                const result = await response.data;

                console.log(result);
                setCountState(0)
                setData([ ...result.comments]);
                setCountState(countState+1)
                const hasMore   = result.totalPages >= countState;
                setHasMore(hasMore);
            } catch (error) {
                console.error('Fetching data failed', error);

            } finally {
                setLoading(false);
            }


    }

    useEffect(() => {
        fetchData();
    }, [])
    const [value, setValue] = useState('');
    const [Size,setSize] = useState(62)



    const handleChange = (event) => {

        setValue(event);
    };

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 200,
            smooth: 'easeInOutQuart'
        });
    }

    async function sendData(value, postId) {
        const data = {
            content: value,
        };
        try {
            const response = await apiClient.put(`/post/${postId}/comment/test`, data);



            const responseData = await response.data;
            console.log('Response Data:', responseData);


        } catch (e) {
            console.error('Error sending data:', e);

        }
    }





    const handlePublish = async (event) => {
        event.preventDefault()
        if (value.length===0){
            Toast.error('必须要有内容哦')
            return
        }
        await sendData(value,postId)
        await setCommentCount(commentCount+1)
        scrollToTop()
        await handeScroll()
        await setValue('');
    };
    function handleResize(height) {
        console.log(height)
        const newHeight = height+12;
        setSize(newHeight)

    }
    function route(userId) {

        navigate(`/user/${userId}`);
    }

    return(
        <div className={'root'}>


            <div
                className="comments"
            >   <div className={'text'}>
                <Text className={'content'} >评论</Text>
            </div>
                <InfiniteScroll
                    style={{ width: '100%' }}
                    initialLoad={false}
                    pageStart={0}
                    threshold={100}
                    loadMore={fetchData}
                    hasMore={hasMore}


                >

                    <List

                        split={false}
                        dataSource={data}
                        renderItem={(item,index) => (
                            <div className={'comment'} id={index}>
                                <Avatar className={'comment-avatar'} src={item.avatar} onClick={()=>{route(item.userId)}}/>
                                <div className={'name'}>
                                    <Text className={'comment-user'}>{item.userId}</Text>
                                </div>
                                <div className={'detail'}>
                                    <Text className={'comment-content'}>{item.content}</Text>
                                    <Text className={'comment-time'}>{item.timeStamp}</Text>
                                </div>
                            </div>

                        )}
                    />
                    {loading && hasMore && (
                        <div style={{ textAlign: 'center' }}>
                            <Spin />
                        </div>
                    )}

                </InfiniteScroll>

                {
                    !hasMore && (
                        <div style={{textAlign:'center',marginTop:32}}>
                            <text style={{color:'var(--semi-color-text-40)',fontWeight:400}}>没有更多了...</text>
                        </div>
                    )
                }
                <div style={{height:'100px'}}/>

            </div>
            <div style={{ height: `${Size}px`, position: "fixed", bottom: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: "end", paddingBottom:"36px",backgroundColor:"white" }}>
                <TextArea
                    style={{ width: '90%' ,borderRadius:'12px',backgroundColor:'#F4F4F4',zIndex:1000}}
                    autosize={true}
                    onResize={handleResize}
                    rows={1}
                    maxLength={200}
                    minLength={1}
                    maxCount={200}
                    onChange={handleChange}
                    value={value}
                    placeholder={"评论"}
                    onEnterPress={handlePublish}
                />
            </div>
        </div>
    )
}
export default CommentList;