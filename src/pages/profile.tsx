import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Avatar } from '@douyinfe/semi-ui';

export const Profile = () => {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 发送 GET 请求获取数据
                const response = await axios.get('https://localhost:8080');

                // 检查 HTTP 状态码
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                // 获取数据并设置到状态
                const data = response.data;
                setPostData(data.map(item => ({ title: item.title, postPicture: item.postPicture, time: item.time })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // 调用异步函数以获取数据
        fetchData();
    }, []); // 依赖数组为空，确保 effect 在初始渲染后只执行一次

    return (
        <>
            <div>
                <Avatar size="default" style={{ margin: 4 }} alt="User">
                    <img src="https://media.istockphoto.com/id/1426559579/photo/female-tourist-enjoying-watching-hot-air-balloons-flying-in-the-sky-at-rooftop-of-hotel-where.jpg?s=1024x1024&w=is&k=20&c=U4vr_oFGZaoMu0HV-hc9cdaZnSQe7rXqituo0CfjtpY=" alt="Square Image" />
                </Avatar>
            </div>
            <div className="grid">
                <p>sub-element align left</p>
                <Row type="flex" justify="start">
                    <Col span={4}>
                        <div className="col-content">
                            {/* 映射 post 数据到 col-4 的位置 */}
                            {postData.map((post, index) => (
                                <div key={index}>
                                    <p>{post.title}</p>
                                    <p>{post.postPicture}</p>
                                    <p>{post.time}</p>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className="col-content">col-4</div>
                    </Col>
                    <Col span={4}>
                        <div className="col-content">col-4</div>
                    </Col>
                    <Col span={4}>
                        <div className="col-content">col-4</div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
