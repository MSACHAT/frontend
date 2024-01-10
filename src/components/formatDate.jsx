import PropTypes from "prop-types";
import React from "react";

export const FormattedTime = ({num}) => {


    const format = (num) => {
        const currentTime = new Date();
        const postTime = new Date(num);
        const timeDifference = currentTime - postTime;
        let formatted = ''

        if (timeDifference < 60 * 1000) {
            // 不到1分钟

            formatted = '刚刚'
        } else if (timeDifference < 60 * 60 * 1000) {
            // 不到1小时
            const minutes = Math.floor(timeDifference / (1000 * 60));

            formatted = `${minutes}分钟前`
        } else if (timeDifference < 24 * 60 * 60 * 1000) {
            // 不到1天
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));

            formatted = `${hours}小时前`
        } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
            // 不到7天
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            formatted=`${days}天前`

        } else {
            // 超过7天，显示实际日期和时间
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            formatted = postTime.toLocaleDateString('zh-CN', options)
        }
        return formatted

    }

    const formattedTime = format(num)
    return <p>{formattedTime}</p>
}
FormattedTime.propTypes = {
    num: PropTypes.string.isRequired,
};

