import React from "react";
import NavigationBar from "../../components/NavigationBar";
import comment from "../../components/Comment";
import comments from "../../components/Comments";
import Comment from "../../components/Comment";
import navigationBar from "../../components/NavigationBar";
import Comments from "../../components/Comments";
import {Post} from "../../components/PostComponentNew";
import './postStyle.scss'
import {useParams} from "react-router-dom";
import CommentList from "../../components/CommentList";

const PostDetail = () => {
    const {postId } = useParams();
    const testData = {
        userName: "JohnDoe",
        timeStamp: "2024-01-02T10:30:00",
        images: ["image1.jpg", "image2.jpg", "image3.jpg"],
        content: "This is a sample post content.",
        likeCount: 42,
        commentCount: 18,
        title: "Sample Post Title",
        isLiked: true,
        postId: "123456789",
    };



    return(

            <div>
                <NavigationBar/>
                <div className={'content'}>
                    <Post {...testData}/>
                </div>
                <CommentList/>




            </div>

    )
}

export default PostDetail