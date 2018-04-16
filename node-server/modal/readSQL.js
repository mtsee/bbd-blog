const Sequelize = require('sequelize');
const { sqlsqlz } = require('../utils/mysql');
const { errorHander } = require('../utils/errorHander');

/**
 * @desc 查询数据
 * @param table 表名
 * @param page 是否分页 {pageNum:1, pageSize: 20} / false
 * @param where 是否有条件 object / false
 * @param sequeObj sequelize 参数
*/
exports.readSQL = ({
    ctx,
    where = {},
    table,
    sequeObj = { id: { type: Sequelize.INTEGER, primaryKey: true } }
}) => {

    // 分页
    let data = (ctx.query ? ctx.query : ctx.request.body);
    const { pageNum, pageSize } = data;
    let page = false;
    if (pageSize) {
        page = {
            pageNum: parseInt(pageNum, 10) || 1,
            pageSize: parseInt(pageSize, 10) || 20
        };
    }

    const Task = sqlsqlz.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    });

    // 如果有 pageNum, pageSize 就有分页
    if (page) {
        return Task.findAndCountAll({
            offset: (page.pageNum - 1) * page.pageSize,
            limit: page.pageSize,
            where: where,
            order: [['id', 'DESC']] // 默认最新排序
        }).then(res => {
            return res;
        }).catch(err => {
            errorHander(ctx);
        });
    } else {
        return Task.findAll({
            where: where,
            order: [['id', 'DESC']]
        }).then(res => {
            return res;
        }).catch(err => {
            errorHander(ctx, { err });
        });
    }
}