// 错误处理
exports.errorHander = (ctx, { msg = '服务器异常！', code = 500, data = null, err }) => {
    try {
        err = JSON.stringify(err);
    } catch (e) {
        err = '未知错误！';
    }
    ctx.response.type = 'json';
    ctx.response.body = {
        code,
        data,
        msg,
        err,
        success: false
    };
};