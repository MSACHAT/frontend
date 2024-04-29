import React from 'react';
import { withRouter } from 'storybook-addon-remix-react-router';
import { Post } from '../components/PostComponent.jsx'
import {reactRouterParameters} from 'storybook-addon-react-router-v6';

export default {
    title: 'Post',
    render: () => <Post />,
    decorators: [withRouter],
};

export const TextOnly = (args) => <Post {...args} />;
TextOnly.args ={
    "id": 38,
    "userName": "AlexxxC",
    "content": "你们好",
    "images": [],
    "timeStamp": "2024-03-04T03:45:08.293+00:00",
    "likeCount": 2,
    "commentCount": 1,
    "isLiked": false,
    "userId": 48,
    "avatar": "http://43.138.41.24:8085/uploads/avatar/170952394212348blob26"
};
TextOnly.parameters = {
    reactRouter: reactRouterParameters({
        location: {
            pathParams: { postId: '42' },
            state: { fromPage: 'homePage' },
        },
        routing: {
            path: '/post/:postId',
            handle: 'Profile',
        },
    }),
};

export const PicOnly = (args) => <Post {...args} />;
PicOnly.args ={
    "id": 34,
    "userName": "DEF",
    "content": "",
    "images": [
        "http://43.138.41.24:8085/uploads/postimages/170607762402538blob45"
    ],
    "timeStamp": "2024-01-24T06:27:18.711+00:00",
    "likeCount": 2,
    "commentCount": 2,
    "isLiked": false,
    "userId": 38,
    "avatar": "http://43.138.41.24:8085/uploads/avatar/170607747106638image.jpg92"
};
PicOnly.parameters = {
    reactRouter: reactRouterParameters({
        location: {
            pathParams: { postId: '42' },
            state: { fromPage: 'homePage' },
        },
        routing: {
            path: '/post/:postId',
            handle: 'Profile',
        },
    }),
};

export const TextandPic = (args) => <Post {...args} />;
TextandPic.args ={
    "id": 37,
    "userName": "Yixuan",
    "content": "开启寒假（测试一下这个圈哈哈哈）",
    "images": [
        "http://43.138.41.24:8085/uploads/postimages/170625871560544blob47"
    ],
    "timeStamp": "2024-01-26T08:45:37.916+00:00",
    "likeCount": 0,
    "commentCount": 1,
    "isLiked": false,
    "userId": 44,
    "avatar": "http://43.138.41.24:8085/uploads/avatar/170625881636944blob36"
};
TextandPic.parameters = {
    reactRouter: reactRouterParameters({
        location: {
            pathParams: { postId: '42' },
            state: { fromPage: 'homePage' },
        },
        routing: {
            path: '/post/:postId',
            handle: 'Profile',
        },
    }),
};