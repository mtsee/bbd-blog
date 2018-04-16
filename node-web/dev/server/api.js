import ajax from '../utils/ajax';

/**
 * @desc 登录
 * @param tel 电话
 * @param password 密码
*/
export function login(data) {
    return ajax({
        type: 'post',
        url: '/api/login',
        successTips: true,
        errorTips: true,
        data
    });
}

/**
 * @desc 注册
 * @param tel 电话
 * @param password 密码
 * @param code 验证码
*/
export function register(data) {
    return ajax({
        type: 'post',
        url: '/api/register',
        errorTips: true,
        data
    });
}

/**
 * @desc 获取用户数据
*/
export function userInfo(data) {
    return ajax({
        type: 'get',
        url: '/api/userinfo',
        data
    });
}

/**
 * @desc 获取用户数据
*/
export function updateUser(data) {
    return ajax({
        type: 'post',
        data,
        url: '/api/updateUser'
    });
}

/**
 * @desc 退出登录
*/
export function logout() {
    return ajax({
        type: 'get',
        url: '/api/logout'
    });
}

/**
 * @desc 获取标签
*/
export function getTags() {
    return ajax({
        type: 'get',
        url: '/api/getTags'
    });
}

/**
 * @desc 获取文章列表 {tags, title, author, pageSize, pageNum}
*/
export function getArticles(data) {
    return ajax({
        type: 'get',
        url: '/api/getArticles',
        data
    });
}

/**
 * @desc 获取文章详情 { id }
*/
export function getArticle(data) {
    return ajax({
        type: 'get',
        url: '/api/getArticle',
        data
    });
}

/**
 * @desc 点赞 { id }
*/
export function updateLike(data) {
    return ajax({
        type: 'post',
        url: '/api/updateLike',
        data
    });
}

/**
 * @desc 更新文章 { id, title, pic, desc, author, content, data, tags }
*/
export function updateArticle(data) {
    return ajax({
        type: 'post',
        url: '/api/updateArticle',
        data
    });
}

/**
 * @desc 保存草稿 { id, draft }
*/
export function updateDraft(data) {
    return ajax({
        type: 'post',
        url: '/api/updateDraft',
        data
    });
}

/**
 * @desc 新建文章 { title, pic, desc, author, content, tags }
*/
export function addArticle(data) {
    return ajax({
        type: 'post',
        url: '/api/addArticle',
        data
    });
}

/**
 * @desc 删除文章 { id }
*/
export function delArticle(data) {
    return ajax({
        type: 'post',
        url: '/api/delArticle',
        data
    });
}

/* 上传文件接口
/api/upload
/api/uploadBase64
*/
