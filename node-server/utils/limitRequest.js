const { conf } = require('../conf');
const { result } = require('./result');

// 限制条件
exports.limitReq = async (ctx, next) => {
    let newTime = +new Date();
    let oldTime = ctx.session.times || 0;
    ctx.session.times = newTime; // 设置当前值
    newTime -= oldTime;
    // 如果1000内频繁去请求接口，就会提示太频繁了，请稍后再试
    if (newTime < conf.limitTime) {
        result(ctx, {
            code: 500,
            data: null,
            msg: "您请求太频繁了,休息一会儿！",
            success: false
        });
    } else {
        await next();
    }
}
