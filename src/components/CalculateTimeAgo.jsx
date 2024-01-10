export const timeAgo = num => {
  const currentTime = new Date();
  const postTime = new Date(num);
  const timeDifference = currentTime - postTime;
  let formatted = '';

  if (timeDifference < 60 * 1000) {
    // 不到1分钟
    formatted = '刚刚';
  } else if (timeDifference < 60 * 60 * 1000) {
    // 不到1小时
    const minutes = Math.floor(timeDifference / (1000 * 60));
    formatted = `${minutes}分钟前`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // 不到1天
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    formatted = `${hours}小时前`;
  } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    // 不到7天
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    formatted = `${days}天前`;
  } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
    // 不到1个月
    const weeks = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
    formatted = `${weeks}周前`;
  } else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) {
    // 不到1年
    const months = Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000));
    formatted = `${months}个月前`;
  } else {
    // 超过1年
    const years = Math.floor(timeDifference / (12 * 30 * 24 * 60 * 60 * 1000));
    formatted = `${years}年前`;
  }
  return formatted;
};
