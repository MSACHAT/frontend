const axios = require('axios');

async function addToken(ctx, next) {
    const token = 'your_token_here';
    ctx.request.headers['Authorization'] = `Bearer ${token}`;
    await next();
}

// 自定义中间件，用于处理返回请求
app.use(async (ctx, next) => {
    // 处理返回请求后的操作
    // 这里可以是日志记录、响应头处理等操作

    await next();
});
module.exports = { addToken };
