// config.js

export function getBaseUrl() {
  let baseUrl = '';

  // 检查当前环境
  if (process.env.NODE_ENV === 'development') {
    // 在开发环境下使用localhost
    baseUrl = 'http://localhost:3000';
  } else {
    // 在生产环境下使用不同的URL
    baseUrl = 'http://43.138.41.24';
  }

  return baseUrl;
}
