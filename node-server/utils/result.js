/**
 * @desc 返回参数
 */
exports.result = (ctx, data, type) => {
    ctx.response.type = type || 'json';
    ctx.response.body = Object.assign({
        code: 200,
        data: null,
        msg: '成功'
    }, data);
}