import React from "react";
import NavigationBar from "../../components/NavigationBar";
import comment from "../../components/Comment";
import comments from "../../components/Comments";
import Comment from "../../components/Comment";
import navigationBar from "../../components/NavigationBar";
import Comments from "../../components/Comments";
import {Post} from "../../components/PostComponentNew";

const PostDetail = () => {
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
            <Post {...testData}/>
            <Comments/>
            <Comment/>


        </div>
    )
}

export default PostDetail