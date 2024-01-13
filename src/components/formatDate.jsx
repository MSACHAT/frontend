import PropTypes from "prop-types";
import React from "react";
import { Typography } from "@douyinfe/semi-ui";

export default function FormattedTime({ TimeStamp }) {
    const { Text } = Typography;

    function format(TimeStamp) {
        const currentTime = new Date();
        const postTime = new Date(TimeStamp);
        const timeDifference = currentTime - postTime;
        let formatted = '';

        if (timeDifference < 60 * 1000) {
            formatted = '刚刚';
        } else if (timeDifference < 60 * 60 * 1000) {
            const minutes = Math.floor(timeDifference / (1000 * 60));
            formatted = `${minutes}分钟前`;
        } else if (timeDifference < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            formatted = `${hours}小时前`;
        } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            formatted = `${days}天前`;
        } else {
            const options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            };
            formatted = postTime.toLocaleDateString("zh-CN", options);
        }
        return formatted;
    }

    const formattedTime = format(TimeStamp);

    return <Text>{formattedTime}</Text>;
}

FormattedTime.propTypes = {
    TimeStamp: PropTypes.string.isRequired,
};


