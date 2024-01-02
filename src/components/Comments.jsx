import React, { useState, useEffect } from 'react';
import { List, Button, Avatar, Spin ,Typography} from '@douyinfe/semi-ui';

import InfiniteScroll from 'react-infinite-scroller';
import './postStyle.scss'
const { Text } = Typography;
const ScrollLoad = () => {
    const count = 5;
    const dataList = [];
    for (let i = 0; i < 10; i++) {
        dataList.push({
            avatar: "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png",
            name:"asdsdasd",
            text: `Semi Design Title ${i}`,
            time:"ddcdcdcdc"
        });
    }
    const [hasMore,setHasMore] = useState(true)
    const [data, setData] = useState(dataList);
    const [countState, setCountState] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        setTimeout(() => {
            let dataSource = data.slice(countState * count, countState * count + count);
            setCountState(countState + 1);
            setData([...data, ...dataSource]);
            setLoading(false);
        }, 1000);
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <div
            className="comments"
        >   <div className={'text'}>
                <Text className={'content'} >评论</Text>
            </div>
            <InfiniteScroll
                style={{width:'100%'}}
                initialLoad={false}
                pageStart={0}
                threshold={200}
                loadMore={false}
                hasMore={hasMore} // 始终保持为true，以实现无限滚动加载


            >
                <List
                    style={{width:'100%'}}
                    split={false}
                    dataSource={data}
                    renderItem={(item,index) => (
                        <div className={'comment'} id={index}>
                            <Avatar className={'comment-avatar'} src={item.avatar}/>
                            <Text className={'comment-user'}>{item.name}</Text>
                            <div className={'detail'}>
                            <Text className={'comment-content'}> Semi Design
                                设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                                Web 应用。</Text>
                            <Text className={'comment-time'}>时间</Text>
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

        </div>
    );
};

export default ScrollLoad;
