import React, { useEffect, useMemo, useState } from "react";
import { ImagePreview, Image, Typography, Toast, Avatar } from '@douyinfe/semi-ui';
import axios from "axios";
import { IconHeartStroked, IconLikeHeart } from "@douyinfe/semi-icons";

import mockData from '../Json/mockPost.json'
import PropTypes from "prop-types";

interface LikesCountProps {
    likes: number;
}

const LikesCount: React.FC<LikesCountProps> = ({ likes }) => {
    const formatLikesCount = (likes: number) => {
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

interface FormattedTimeProps {
    num: string;
}

const FormattedTime: React.FC<FormattedTimeProps> = ({ num }) => {
    const formate = (num: string) => {
        const currentTime = new Date();
        const postTime = new Date(num);
        const timeDifference = currentTime.getTime() - postTime.getTime();
        let formated = '';

        if (timeDifference < 60 * 1000) {
            formated = '刚刚';
        } else if (timeDifference < 60 * 60 * 1000) {
            const minutes = Math.floor(timeDifference / (1000 * 60));
            formated = `${minutes}分钟前`;
        } else if (timeDifference < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            formated = `${hours}小时前`;
        } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            formated = `${days}天前`;
        } else {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            const formattedTime = postTime.toLocaleDateString('en-US', options);
            formated = formattedTime;
        }
        return formated;
    }

    const formatedTime = formate(num);
    return <p>{formatedTime}</p>
}

FormattedTime.propTypes = {
    num: PropTypes.string.isRequired,
};

const DetailedPost: React.FC = () => {
    const { Title, Paragraph, Text, Numeral } = Typography;
    const [id, setId] = useState<string | undefined>();
    const [titlePost, setTitlePost] = useState<string>('未命名');
    const [paragraphPost, setParagraphPost] = useState<string>('');
    const [imagesPost, setImagesPost] = useState<string[] | undefined>();
    const [authorPost, setAuthorPost] = useState<string>('');

    const [likesPost, setLikesPost] = useState<number>(0);
    const [preIsLike, setPreIsLike] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [finalIsLiked, setFinalIsLiked] = useState<number>(0);
    const [commentsNum, setCommentsNum] = useState<number>(0);
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        setTitlePost(mockData.title);
        setLikesPost(mockData.likes);
        setAuthorPost(mockData.author);
        setImagesPost(mockData.images);
        setParagraphPost(mockData.content);
        setCommentsNum(mockData.comments);
        setPreIsLike(mockData.preIsLike);
        setIsLiked(mockData.preIsLike);
        setPhoto(mockData.src);

        // 返回清理函数
        return () => {
            // 在清理函数中使用函数参数获取卸载时的isLiked值
            Toast.success("isLike: " + mockData.preIsLike);
        };
    }, []);

    const srcList = useMemo(() => (mockData.images), []);

    return (
        <div>
            <Title heading={3} style={{ margin: '8px 0' }}>{titlePost}</Title>
            <br /><br />
            <Paragraph spacing='extended'>{paragraphPost}</Paragraph>

            <IconLikeHeart style={isLiked ? { color: '#E91E63' } : { color: '#00000000' }} size="extra-large" onClick={() => setIsLiked(!isLiked)} />
            <LikesCount likes={likesPost} />
            <FormattedTime num={mockData.time} />
            <Avatar size="default" style={{ margin: 4 }} alt={authorPost} src={photo} />
            <div
                id="container"
                style={{
                    height: 400,
                    position: "relative"
                }}
            >
                <ImagePreview
                    getPopupContainer={() => {
                        const node = document.getElementById("container");
                        return node;
                    }}
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {srcList.map((src, index) => {
                        return (
                            <Image
                                key={index}
                                src={src}
                                width={200}
                                alt={`lamp${index + 1}`}
                                style={{ marginRight: 5 }}
                            />
                        );
                    })}
                </ImagePreview>
            </div>
        </div>
    )
}

export default DetailedPost;
