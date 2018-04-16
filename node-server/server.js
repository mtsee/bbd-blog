const path = require('path');
const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('koa-cors');
const responseTime = require('koa-response-time');
const body = require('koa-body');
const logger = require('koa-logger');
const session = require('koa-session');
const { conf } = require('./conf');
const { setRouter } = require('./router');

// 实例化
const app = new Koa();

app.use(logger());
app.use(responseTime());
app.use(helmet());

app.keys = ['bbdweb']; // secret
app.use(
    session(
        {
            key: 'uid', // cookie名称
            maxAge: 1000 * 60 * 60 * 8, // 8小时
            overwrite: true /** (boolean) can overwrite or not (default true) */,
            httpOnly: true /** (boolean) httpOnly or not (default true) */,
            signed: true /** (boolean) signed or not (default true) */,
            rolling: false // 强制为每个用户设置session
        },
        app
    )
);
app.use(cors());
app.use(body({ multipart: true }));

// 设置路由
setRouter(app);

app.listen(conf.port, function() {
    console.log('服务器启动，监听 port： ' + conf.port + '  running~');
});
