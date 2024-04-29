import React from 'react';
import { withRouter } from 'storybook-addon-remix-react-router';
import { Post } from '../components/PostComponent.jsx'
import {reactRouterParameters} from 'storybook-addon-react-router-v6';

export default {
    title: 'Post',
    render: () => <Post />,
    decorators: [withRouter],
};

export const FromHomePage = {
    parameters: {
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
    },
    args:{
        content:'11'
    }
};