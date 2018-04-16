const Sequelize = require('sequelize');
const moment = require('moment');
const { errorHander } = require('../utils/errorHander');
const { aesEncrypt } = require('../utils/md5');
const { result } = require('../utils/result');
const { readSQL } = require('../modal/readSQL');
const { createSQL } = require('../modal/createSQL');
const { updateSQL } = require('../modal/updateSQL');

// 退出登录
exports.logout =  async (ctx, next) => {
    ctx.session.user = null;
    ctx.session.code = null;
    result(ctx, {
        msg: "退出成功"
    });
    return false;
    // await next();
}

/**
 * @desc 登录
*/
exports.login = (ctx, next) => {

    const { tel, password, code } = ctx.request.body || {};

    // 参数检查
    if (!tel || !password) {
        errorHander(ctx);
    }

    // // 验证码验证码
    // if (ctx.session.code != code) {
    //     result(ctx, {
    //         code: 500,
    //         msg: "验证码错误！",
    //         success: false
    //     })
    //     return;
    // } else {
    //     ctx.session.code = null;
    // }

    // 查询
    return readSQL({
        ctx,
        table: 'blog_user',
        where: {
            tel,
            password: aesEncrypt(password)
        },
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            username: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            tel: { type: Sequelize.CHAR },
            usertype: { type: Sequelize.INTEGER }
        }
    }).then(res => {
        if (res[0]) {
            // console.log('>>>>', res[0].dataValues);
            ctx.session.user = res[0].dataValues;
            ctx.session.user.like = '';
            result(ctx, {
                data: res[0].dataValues
            });
        } else {
            errorHander(ctx, { msg: '用户或密码不正确！' });
        }
    });
}

/**
 * @desc 获取用户信息，管理员可以输入 uid 查询
*/
exports.userInfo = (ctx, next) => {

    // usertype === 1 的时候，是管理员
    const { usertype, id } = ctx.session.user;
    const { uid } = ctx.request.body || {};
    const where = {
        id: usertype === 1 ? (uid || id) : id
    }

    // 查询
    return readSQL({
        ctx,
        table: 'blog_user',
        where,
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            username: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            tel: { type: Sequelize.CHAR },
            usertype: { type: Sequelize.INTEGER }
        }
    }).then(res => {
        if (res[0]) {
            result(ctx, {
                data: res[0]
            });
        } else {
            errorHander(ctx, { msg: '未登录', code: 403 });
        }
    });
};

/**
 * @desc 修改用户信息
*/
exports.updateUser = (ctx, next) => {
    const { username, pic, password } = ctx.request.body || {};
    let id = ctx.session.user.id;
    let data = {};
    if(username) {
        data.username = username;
    }
    if(pic) {
        data.pic = pic;
    }
    if(password) {
        data.password = password;
    }
    data.date = moment().format('YYYY-MM-DD HH:mm:ss');
    return updateSQL({
        ctx,
        table: 'blog_user',
        where: { id },
        data,
        sequeObj: {
            username: { type: Sequelize.CHAR },
            password: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            updatetime: { type: Sequelize.CHAR }
        }
    }).then(res => {
        if (res) {
            pic ? ctx.session.user.pic = pic : null;
            username ? ctx.session.user.username = username : null;
            result(ctx, {
                data: res
            });
        } else {
            errorHander(ctx, { msg: '参数错误！' });
        }
    });
}

/**
 * @desc 注册账号
*/
exports.register = (ctx, next) => {

    const { tel, password, nick, code } = ctx.request.body || {};

    // 验证
    if (!/^0?(13|15|18|14|17)[0-9]{9}$/.test(tel)) {
        result(ctx, {
            code: 500,
            success: false,
            msg: '手机号码不正确！'
        });
        return;
    }

    // 验证码验证码
    if (!code || ctx.session.code != code) {
        ctx.session.code = null;
        result(ctx, {
            code: 500,
            msg: "验证码错误！",
            success: false
        });
        return;
    } else {
        ctx.session.code = null;
    }

    // 注册
    return createSQL({
        ctx,
        table: 'blog_user',
        data: {
            tel,
            usertype: 0,
            password: aesEncrypt(password),
            username: nick,
            updatetime: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        sequeObj: {
            username: { type: Sequelize.CHAR },
            password: { type: Sequelize.CHAR },
            tel: { type: Sequelize.CHAR },
            del: { type: Sequelize.CHAR },
            updatetime: { type: Sequelize.CHAR },
            usertype: { type: Sequelize.INTEGER }
        }
    }).then(res => {
        if (res) {
            result(ctx, {
                data: res
            });
        } else {
            errorHander(ctx, { msg: '用户名已存在！' });
        }
    });

};
