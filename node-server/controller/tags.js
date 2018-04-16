const Sequelize = require('sequelize');
const moment = require('moment');
const { errorHander } = require('../utils/errorHander');
const { aesEncrypt } = require('../utils/md5');
const { result } = require('../utils/result');
const { readSQL } = require('../modal/readSQL');
const { updateSQL } = require('../modal/updateSQL');
const { deleteSQL } = require('../modal/deleteSQL');
const { createSQL } = require('../modal/createSQL');

/**
 * @desc 标签列表 get
*/
exports.getTags = (ctx, next) => {

    // 查询
    return readSQL({
        ctx,
        table: 'blog_tags',
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.CHAR }
        }
    }).then(res => {
        if (res) {
            result(ctx, {
                data: res
            });
        } else {
            errorHander(ctx, { msg: '查询参数错误！' });
        }
    });
}

/**
 * @desc 删除标签 delTag
*/
exports.delTag = (ctx, next) => {

    const { id } = ctx.request.body || {};
    // 查询
    return deleteSQL({
        ctx,
        table: 'blog_tags',
        where: { id }
    }).then(res => {
        if (res) {
            result(ctx, {
                data: res.rows,
                count: res.count
            });
        } else {
            errorHander(ctx, { msg: '查询参数错误！' });
        }
    });
}