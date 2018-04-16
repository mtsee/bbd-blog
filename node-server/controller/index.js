const { vcode } = require('./vcode');
const { upload, uploadBase64 } = require('./upload');

// 用户
exports.user = require('./user');

// 公用
exports.common = {
    vcode,
    upload, 
    uploadBase64
}

// tags
exports.tags = require('./tags');

// 文章
exports.article = require('./article');