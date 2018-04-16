// 基本配置
exports.conf = {
    host: '127.0.0.1', // 主域
    port: 7770, // 端口
    apiVersion: '/api',
    // 支持上传文件类型
    uploadSuffix: ['.jpg', '.png', '.gif', '.psd', '.xlsx', '.jpeg'],
    limitTime: 1000 // 频繁请求接口限制
};

// 数据库配置
exports.dbConf = {
    user: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
    database: 'bbd-blog'
};