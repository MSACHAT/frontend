import React, { useState, useEffect } from 'react';
import { List, Button, Avatar, Spin } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';

const ScrollLoad = () => {
    const count = 5;
    const dataList = [];
    for (let i = 0; i < 100; i++) {
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

    useEffect(() => {
        fetchData();
    }, []); // componentDidMount

    return (
        <div
            className="light-scrollbar"
            style={{ height: 'auto', overflow: 'auto', border: '1px solid var(--semi-color-border)', padding: 10 }}
        >
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                threshold={200}
                loadMore={fetchData}
                hasMore={hasMore} // 始终保持为true，以实现无限滚动加载


            >
                <List
                    split={false}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            header={<Avatar src={item.avatar}/>}
                            main={
                                <div>
                                    <span style={{ color: 'var(--semi-color-text-40)', fontWeight: 400 }}>
                                        {item.name}
                                    </span>
                                    <p style={{ color: 'var(--semi-color-text-1)', margin: '4px 0' }}>
                                        Semi Design
                                        设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                                        Web 应用。
                                    </p>
                                </div>
                            }


                        />
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
