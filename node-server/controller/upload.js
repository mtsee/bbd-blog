const path = require('path');
const Sequelize = require('sequelize');
const fs = require('fs'); //  用于处理本地文件
const { createSQL } = require('../modal/createSQL');
const { result } = require('../utils/result');
const { conf } = require('../conf');

//  多文件上传
exports.upload = async (ctx, next) => {
    const filePaths = [];
    const files = ctx.request.body.files || {};
    let fileArr = null;

    if (files['filename'].length) {
        fileArr = files['filename'];
    } else {
        fileArr = [files['filename']];
    }
    fileArr.forEach(async (file, index) => {
        let { size, type, name } = file;
        var reg = new RegExp(`(${conf.uploadSuffix.join('|')})$`);
        if (reg.test(name)) {
            let imgName = `pic_${Date.now() + index}${/\.[^\.]+$/.exec(name)[0]}`;
            const filePath = path.join(__dirname, '../upload/file/images/', imgName);
            const reader = await fs.createReadStream(file.path);
            const writer = await fs.createWriteStream(filePath);
            await reader.pipe(writer);
            filePaths.push({
                data: { url: '/file/images/' + imgName },
                msg: '文件上传成功！',
                code: 200
            });
        } else {
            filePaths.push({
                url: name,
                msg: '不合法文件！',
                code: 500
            });
        }
    });
    ctx.body = filePaths;
    next();
};

//  base64文件上传
exports.uploadBase64 = (ctx, next) => {
    return new Promise((resolve, reject) => {
        const dirpath = path.join(__dirname, '../upload/images');
        if (fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath);
        }

        // 接收前台POST过来的base64
        let { imgData, name } = ctx.request.body;
        // 过滤data:URL
        let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
        let dataBuffer = new Buffer(base64Data, 'base64');
        name = name || 'upload_' + +new Date();
        fs.writeFile('upload/file/images/' + name + '.png', dataBuffer, function(err) {
            if (err) {
                result(ctx, {
                    code: 500,
                    msg: '上传文件失败'
                });
                reject();
            } else {
                result(ctx, {
                    data: {
                        src: '/file/images/' + name + '.png'
                    }
                });
                resolve();
            }
        });
    });
};
