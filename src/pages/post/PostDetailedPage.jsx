import React, { useEffect, useMemo, useState } from "react";
import { ImagePreview, Image, Typography, Toast, Avatar } from '@douyinfe/semi-ui';
import axios from "axios";
import { IconHeartStroked, IconLikeHeart } from "@douyinfe/semi-icons";

import mockData from '../../mockdata/PostMockData.json';
import PropTypes from "prop-types";

const LikesCount = ({ likes }) => {
    const formatLikesCount = (likes) => {
        if (likes < 1000) {
            return `${likes}赞`;
        } else if (likes < 1000000) {
            const roundedLikes = (likes / 1000).toFixed(1);
            return `${roundedLikes}K赞`;
        } else {
            const roundedLikes = (likes / 1000000).toFixed(1);
            return `${roundedLikes}M赞`;
        }
    }

    const formattedLikes = formatLikesCount(likes);

    return <p>{formattedLikes}</p>;
}

LikesCount.propTypes = {
    likes: PropTypes.number.isRequired,
};

const FormattedTime = ({ num }) => {

    const formate = (num) => {
        // 格式化时间逻辑
    }

    const formatedTime = formate(num);

    return <p>{formatedTime}</p>
}

FormattedTime.propTypes = {
    num: PropTypes.string.isRequired,
};

const DetailedPost = () => {

    const { Title, Paragraph, Text } = Typography;

    const [titlePost, setTitlePost] = useState('');
    const [likesPost, setLikesPost] = useState(0);

    useEffect(() => {
        // 初始化状态逻辑
    }, []);

    return (
        <div>
            <Title heading={3}>{}</Title>

            <Paragraph>{}</Paragraph>

            <LikesCount likes={likesPost} />

            <FormattedTime num={''}/>

            <div>
                // 图片预览组件
            </div>
        </div>
    )
}

export default DetailedPost;