const { result } = require('./result');

// 登录过滤
exports.authorize = async (ctx, next) => {
    // req.session.user = {
    //     id: 19,
    //     username: '',
    //     email: null,
    //     tel: '13551301693',
    //     usertype: 1
    // };
    // next();
    console.log('ctx.session.user', ctx.session.user);
    if (!ctx.session.user) {
        result(ctx, {
            code: 403,
            data: null,
            msg: '没有登录',
            success: false
        });
        return false;
    } else {
        await next();
    }
};

// 后台过滤
exports.adminAuthorize = async (ctx, next) => {
    if (ctx.session.user && ctx.session.user.usertype !== 0) {
        result(ctx, {
            code: 403,
            data: null,
            msg: '没有权限',
            success: false
        });
    } else {
        await next();
    }
};

// 验证码filter
exports.codeFilter = async (ctx, next) => {
    // 不分字符串和数字
    if (req.session.code != req.body.code) {
        result(ctx, {
            code: 500,
            msg: '验证码错误',
            data: null,
            success: false
        });
    } else {
        await next();
    }
};
