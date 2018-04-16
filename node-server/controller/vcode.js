const captchapng = require('captchapng');

// 获取验证码
exports.vcode = (ctx, next) => {
    const code = parseInt(Math.random() * 9000 + 1000, 10);
    // 设置code
    ctx.session.code = code;
    const p = new captchapng(80, 30, code); // width,height,numeric captcha
    p.color(255, 84, 2, 255);  // First color: background (red, green, blue, alpha)
    p.color(255, 124, 67, 255); // Second color: paint (red, green, blue, alpha)
    const img = p.getBase64();
    const imgbase64 = new Buffer(img, 'base64');
    ctx.response.body = imgbase64;
};
