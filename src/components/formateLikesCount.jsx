import PropTypes from "prop-types";
import React from "react";

const  FormateLikesCount = ({ likes }) => {

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
FormateLikesCount.propTypes = {
    likes: PropTypes.number.isRequired,
};
export default FormateLikesCount;