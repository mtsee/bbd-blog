const path = require('path');
const fs = require('fs');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const { authorize, adminAuthorize } = require('./utils/filter');
const { conf } = require('./conf');
const { user, common, tags, article } = require('./controller/index');
const multer = require('koa-multer');
const { limitReq } = require('./utils/limitRequest');

// 路由
exports.setRouter = app => {
    // 静态资源
    app.use(koaStatic(path.join(__dirname, 'static'), { maxage: 365 * 24 * 60 * 1000}));
    app.use(koaStatic(path.join(__dirname, 'upload'), { maxage: 365 * 24 * 60 * 1000}));

    // api路由
    const router = new Router({
        prefix: conf.apiVersion //  api 版本，默认 /api
    });

    // 用户api
    router.post('/login', limitReq, user.login);
    router.post('/register', user.register);
    router.get('/userinfo', authorize, user.userInfo);
    router.get('/logout', authorize, user.logout);
    router.post('/updateUser', authorize, user.updateUser);

    // 获取标签
    router.get('/getTags', tags.getTags);

    // 公用
    router.get('/vcode', common.vcode);

    // 文章
    router.get('/getArticles', article.getArticles);
    router.get('/getArticle', article.getArticle);

    // 需要权限的文章
    router.post('/updateLike', authorize, article.updateLike);
    router.post('/updateArticle', authorize, article.updateArticle);
    router.post('/updateDraft', authorize, article.updateDraft);
    router.post('/addArticle', authorize, article.addArticle);
    router.post('/delArticle', authorize, article.delArticle);

    // 上传文件接口
    router.post('/upload', common.upload); //上传图片
    router.post('/uploadBase64', common.uploadBase64); // base64 上传

    app.use(router.routes());

    app.use(new Router().get('*', async (ctx, next) => {
        ctx.response.type = 'html'; //指定content type
        ctx.response.body = await fs.createReadStream(path.join(__dirname, 'static/index.html'));
    }).routes());

};
