const Sequelize = require('sequelize');
const moment = require('moment');
const { errorHander } = require('../utils/errorHander');
const { aesEncrypt } = require('../utils/md5');
const { result } = require('../utils/result');
const { readSQL } = require('../modal/readSQL');
const { updateSQL } = require('../modal/updateSQL');
const { deleteSQL } = require('../modal/deleteSQL');
const { createSQL } = require('../modal/createSQL');
const { incrementSQL } = require('../modal/incrementSQL');

/**
 * @desc 文章列表 get，需要传入pageSize, pageNum, 或者不传
 */
exports.getArticles = (ctx, next) => {
    const { tags, title, owner, author, pageSize, pageNum } = ctx.query;

    if (!pageSize || !pageNum) {
        result(ctx, {
            msg: '请传参数：pageSize, pageNum',
            code: 500,
            success: false
        });
        next();
        return;
    }

    // 查询
    let where = {};
    tags ? (where.tags = { $like: `%${tags}%` }) : null;
    title ? (where.title = { $like: `%${title}%` }) : null;
    author ? (where.author = { $like: `%${author}%` }) : null;
    if(owner) {
        if(ctx.session.user) {
            where.owner = ctx.session.user.id;
        } else {
            errorHander(ctx, { code: 403, msg: '没有登录！' });
        }
    } else {
        where.hide = 0;
    }
    return readSQL({
        ctx,
        table: 'blog_article',
        where,
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            owner: { type: Sequelize.CHAR },
            title: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            photo: { type: Sequelize.CHAR },
            desc: { type: Sequelize.CHAR },
            date: { type: Sequelize.CHAR },
            author: { type: Sequelize.CHAR },
            del: { type: Sequelize.INTEGER },
            tags: { type: Sequelize.CHAR }
        }
    }).then(res => {
        if (res) {
            console.log(res);
            result(ctx, {
                data: res.rows,
                count: res.count
            });
        } else {
            errorHander(ctx, { msg: '查询参数错误！' });
        }
    });
};

/**
 * @desc 文章详情，传id
 */
exports.getArticle = (ctx, next) => {
    const { id } = ctx.query;

    // 查询
    return readSQL({
        ctx,
        table: 'blog_article',
        where: { id },
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            title: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            photo: { type: Sequelize.CHAR },
            desc: { type: Sequelize.CHAR },
            date: { type: Sequelize.CHAR },
            author: { type: Sequelize.CHAR },
            content: { type: Sequelize.TEXT('long') },
            data: { type: Sequelize.TEXT('long') },
            like: { type: Sequelize.INTEGER },
            del: { type: Sequelize.INTEGER },
            tags: { type: Sequelize.CHAR }
        }
    }).then(res => {
        if (res) {
            if (res[0]) {
                result(ctx, {
                    data: res[0]
                });
            } else {
                errorHander(ctx, { msg: '未找到该文章！' });
            }
        } else {
            errorHander(ctx, { msg: '查询参数错误！' });
        }
    });
};

/**
 * @desc 点赞，取消
 */
exports.updateLike = (ctx, next) => {
    const { id } = ctx.request.body || {};
    if (!id) {
        errorHander(ctx, { msg: '参数错误！' });
        return false;
    }
    if (ctx.session.user.like.indexOf(id) !== -1) {
        errorHander(ctx, { msg: '已经点过赞了！' });
        return false;
    }
    ctx.session.user.like += `,${id}`;
    return incrementSQL({
        ctx,
        table: 'blog_article',
        where: { id },
        data: { like: 1 },
        sequeObj: {
            like: { type: Sequelize.INTEGER }
        }
    }).then(res => {
        if (res) {
            result(ctx, {
                data: res
            });
        } else {
            errorHander(ctx, { msg: '参数错误！' });
        }
    });
};

/**
 * @desc 更新文章
 */
exports.updateArticle = (ctx, next) => {
    const { id, title, pic, desc, author, content, data, tags, hide } = ctx.request.body || {};
    let owner = ctx.session.user.id;
    if (!id) {
        errorHander(ctx, { msg: '参数错误！' });
        return false;
    }
    return updateSQL({
        ctx,
        table: 'blog_article',
        where: { id, owner },
        data: {
            title,
            pic,
            desc,
            photo: ctx.session.user.pic,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            author: author || ctx.session.user.username,
            content,
            tags,
            hide,
            data
        },
        sequeObj: {
            title: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            photo: { type: Sequelize.CHAR },
            desc: { type: Sequelize.CHAR },
            date: { type: Sequelize.CHAR },
            author: { type: Sequelize.CHAR },
            hide: { type: Sequelize.INTEGER },
            content: { type: Sequelize.TEXT('long') },
            data: { type: Sequelize.TEXT('long') },
            tags: { type: Sequelize.CHAR }
        }
    }).then(res => {
        if (res) {
            result(ctx, {
                data: res
            });
        } else {
            errorHander(ctx, { msg: '参数错误！' });
        }
    });
};

/**
 * @desc 保存草稿
 */
exports.updateDraft = (ctx, next) => {
    const { id, data } = ctx.request.body || {};
    let owner = ctx.session.user.id;

    return updateSQL({
        ctx,
        table: 'blog_article',
        where: { id, owner },
        data: { data },
        sequeObj: {
            data: { type: Sequelize.TEXT('long') }
        }
    }).then(res => {
        if (res) {
            result(ctx, {
                data: res
            });
        } else {
            errorHander(ctx, { msg: '参数错误！' });
        }
    });
};

/**
 * @desc 新建文章
 */
exports.addArticle = (ctx, next) => {
    const { hide, title, pic, desc, author, content, data, tags } = ctx.request.body || {};
    let owner = ctx.session.user.id;
    return createSQL({
        ctx,
        table: 'blog_article',
        data: {
            owner,
            title,
            pic,
            desc,
            photo: ctx.session.user.pic,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            author: author || ctx.session.user.username,
            content,
            tags,
            data,
            hide: hide ? 1 : 0
        },
        sequeObj: {
            owner: { type: Sequelize.CHAR },
            title: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            photo: { type: Sequelize.CHAR },
            desc: { type: Sequelize.CHAR },
            date: { type: Sequelize.CHAR },
            author: { type: Sequelize.CHAR },
            hide: { type: Sequelize.INTEGER },
            data: { type: Sequelize.TEXT('long') },
            content: { type: Sequelize.TEXT('long') },
            tags: { type: Sequelize.CHAR }
        }
    }).then(res => {
        if (res) {
            console.log('??????', res);
            result(ctx, {
                data: res
            });
        } else {
            errorHander(ctx, { msg: '参数错误！' });
        }
    });
};

/**
 * @desc 删除文章，id。只能自己删自己的
 */
exports.delArticle = (ctx, next) => {
    const { id } = ctx.request.body || {};
    let owner = ctx.session.user.id;
    // 查询
    return deleteSQL({
        ctx,
        table: 'blog_article',
        where: { id, owner }
    }).then(res => {
        if (res) {
            result(ctx, {
                data: res.rows,
                count: res.count
            });
        } else {
            errorHander(ctx, { msg: '参数错误！' });
        }
    });
};
