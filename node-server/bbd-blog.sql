/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : bbd-blog

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-17 13:41:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `blog_article`
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `owner` varchar(50) NOT NULL COMMENT '用户id',
  `title` varchar(100) NOT NULL COMMENT '标题名字',
  `url` varchar(255) DEFAULT NULL COMMENT '文章链接地址',
  `pic` varchar(255) DEFAULT NULL COMMENT '主图',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述信息',
  `date` varchar(100) DEFAULT NULL COMMENT '修改日期',
  `content` longtext COMMENT '内容',
  `photo` varchar(50) DEFAULT NULL COMMENT '头像',
  `author` varchar(50) DEFAULT NULL COMMENT '作者',
  `del` int(1) unsigned zerofill DEFAULT '0' COMMENT '删除标记',
  `tags` varchar(255) DEFAULT NULL COMMENT '标签',
  `like` int(9) unsigned zerofill DEFAULT '000000000' COMMENT '点赞',
  `hide` int(1) unsigned zerofill NOT NULL COMMENT '如果是1，表示不显示在列表页面。0是正常的',
  `data` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COMMENT='用户的APP';

-- ----------------------------
-- Records of blog_article
-- ----------------------------
INSERT INTO `blog_article` VALUES ('107', '58', '测试一下', null, '', '测试描述', '2018-04-13 14:27:52', '<p>测试内容</p>', null, '馒头', '0', 'other', '000000023', '0', '测试内容');
INSERT INTO `blog_article` VALUES ('108', '58', '测试数据2', null, '/file/images/pic_1523602129968.jpg', '啊实打实大', '2018-04-13 14:48:51', '<h3 id=\"markdown\">标题 markdown</h3>\n<p><code>标签1</code> <code>标签2</code> <code>标签3</code></p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-keyword\">var</span> a = <span class=\"hljs-string\">\'hellow world!\'</span>;\n<span class=\"hljs-built_in\">console</span>.log(a);\n</code></pre>\n<blockquote>\n  <p>标注</p>\n</blockquote>\n<p><strong><em>你说什么</em></strong></p>\n<p><strong>你好</strong></p>\n<p><a href=\"http://www.baidu.com\">输入链接说明</a></p>\n<ul>\n<li>列表1</li>\n<li>列表2</li>\n</ul>\n<p>| h1    |    h2   |      h3 |<br>\n|:------|:-------:|--------:|<br>\n| 100   | 200     | 300     |<br>\n| <em>foo</em> | <strong>bar</strong> | ~~baz~~ |</p>\n<ul>\n<li>[x] This task is done</li>\n<li>[ ] This is still pending</li>\n</ul>\n<hr>', null, '馒头', '0', '', '000000002', '0', '\n### 标题 markdown\n\n``标签1`` ``标签2`` ``标签3``\n```\nvar a = \'hellow world!\';\nconsole.log(a);\n```\n> 标注\n\n***你说什么***\n\n__你好__\n\n[输入链接说明](http://www.baidu.com)\n\n* 列表1\n* 列表2\n\n| h1    |    h2   |      h3 |\n|:------|:-------:|--------:|\n| 100   | 200     | 300     |\n| *foo* | **bar** | ~~baz~~ |\n\n- [x] This task is done\n - [ ] This is still pending\n -----------\n\n\n\n\n        ');
INSERT INTO `blog_article` VALUES ('109', '58', '你什么', null, '', '我晕', '2018-04-13 14:52:45', '<h3 id=\"markdown\">标题 markdown</h3>\n<p><code>标签1</code> <code>标签2</code> <code>标签3</code></p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-keyword\">var</span> a = <span class=\"hljs-string\">\'hellow world!\'</span>;\n<span class=\"hljs-built_in\">console</span>.log(a);\n</code></pre>\n<blockquote>\n  <p>标注</p>\n</blockquote>\n<p><strong><em>你说什么</em></strong></p>\n<p><strong>你好</strong></p>\n<p><a href=\"http://www.baidu.com\">输入链接说明</a></p>\n<ul>\n<li>列表1</li>\n<li>列表2</li>\n</ul>\n<p>| h1    |    h2   |      h3 |<br>\n|:------|:-------:|--------:|<br>\n| 100   | 200     | 300     |<br>\n| <em>foo</em> | <strong>bar</strong> | ~~baz~~ |</p>\n<ul>\n<li>[x] This task is done</li>\n<li>[ ] This is still pending</li>\n</ul>\n<hr>', null, '测试', '0', 'html,es6/es7', '000000001', '0', '#### xxxxxx');
INSERT INTO `blog_article` VALUES ('110', '58', 'ssdsss', null, '', 'weqwe', '2018-04-13 15:02:57', '<h3 id=\"标题-markdown\">标题 markdown</h3>\n<p><code>标签1</code> <code>标签2</code> <code>标签3</code></p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-keyword\">var</span> a = <span class=\"hljs-string\">\'hellow world!\'</span>;\n<span class=\"hljs-built_in\">console</span>.log(a);</code></pre>\n<blockquote>\n  <p>标注</p>\n</blockquote>\n<p><strong><em>你说什么</em></strong></p>\n<p><strong>你好</strong></p>\n<p><a href=\"http://www.baidu.com\">输入链接说明</a></p>\n<ul>\n<li>列表1</li>\n<li>列表2</li>\n</ul>\n<table>\n<thead>\n<tr>\n<th id=\"h1\" style=\"text-align:left;\">h1</th>\n<th id=\"h2\" style=\"text-align:center;\">h2</th>\n<th id=\"h3\" style=\"text-align:right;\">h3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:left;\">100</td>\n<td style=\"text-align:center;\">200</td>\n<td style=\"text-align:right;\">300</td>\n</tr>\n<tr>\n<td style=\"text-align:left;\"><em>foo</em></td>\n<td style=\"text-align:center;\"><strong>bar</strong></td>\n<td style=\"text-align:right;\"><del>baz</del></td>\n</tr>\n</tbody>\n</table>\n<ul>\n<li class=\"task-list-item\" style=\"list-style-type: none;\"><input type=\"checkbox\" disabled=\"\" style=\"margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;\" checked=\"\"> This task is done<ul>\n<li class=\"task-list-item\" style=\"list-style-type: none;\"><input type=\"checkbox\" disabled=\"\" style=\"margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;\"> This is still pending</li></ul></li>\n</ul>\n<hr>', null, '测试', '0', '', '000000002', '0', '\n### 标题 markdown\n\n``标签1`` ``标签2`` ``标签3``\n```\nvar a = \'hellow world!\';\nconsole.log(a);\n```\n> 标注\n\n***你说什么***\n\n__你好__\n\n[输入链接说明](http://www.baidu.com)\n\n* 列表1\n* 列表2\n\n| h1    |    h2   |      h3 |\n|:------|:-------:|--------:|\n| 100   | 200     | 300     |\n| *foo* | **bar** | ~~baz~~ |\n\n- [x] This task is done\n - [ ] This is still pending\n -----------\n\n\n\n\n        ');
INSERT INTO `blog_article` VALUES ('111', '57', 'asdas', null, '', 'asdasdasd', '2018-04-17 09:39:07', '<h3 id=\"markdown\">标题 markdown</h3>\n<p><code>标签1</code> <code>标签2</code> <code>标签3</code></p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-keyword\">var</span> a = <span class=\"hljs-string\">\'hellow world!\'</span>;\n<span class=\"hljs-built_in\">console</span>.log(a);\n</code></pre>\n<blockquote>\n  <p>标注</p>\n</blockquote>\n<p><strong><em>你说什么</em></strong></p>\n<p><strong>你好</strong></p>\n<p><a href=\"http://www.baidu.com\">输入链接说明</a></p>\n<ul>\n<li>列表1</li>\n<li>列表2</li>\n</ul>\n<p>| h1    |    h2   |      h3 |<br>\n|:------|:-------:|--------:|<br>\n| 100   | 200     | 300     |<br>\n| <em>foo</em> | <strong>bar</strong> | ~~baz~~ |</p>\n<ul>\n<li>[x] This task is done</li>\n<li>[ ] This is still pending</li>\n</ul>\n<hr>', '/file/images/pic_1523596330668.jpg', '馒头', '0', '', '000000000', '0', '\n### 标题 markdown\n\n``标签1`` ``标签2`` ``标签3``\n```\nvar a = \'hellow world!\';\nconsole.log(a);\n```\n> 标注\n\n***你说什么***\n\n__你好__\n\n[输入链接说明](http://www.baidu.com)\n\n* 列表1\n* 列表2\n\n| h1    |    h2   |      h3 |\n|:------|:-------:|--------:|\n| 100   | 200     | 300     |\n| *foo* | **bar** | ~~baz~~ |\n\n- [x] This task is done\n - [ ] This is still pending\n -----------\n\n\n\n\n        ');
INSERT INTO `blog_article` VALUES ('112', '57', '21312', null, '', '312323', '2018-04-17 09:54:45', '<h3 id=\"标题-markdown\">标题 markdown</h3>\n<p><code>标签1</code> <code>标签2</code> <code>标签3</code></p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-keyword\">var</span> a = <span class=\"hljs-string\">\'hellow world!\'</span>;\n<span class=\"hljs-built_in\">console</span>.log(a);</code></pre>\n<blockquote>\n  <p>标注</p>\n</blockquote>\n<p><strong><em>你说什么</em></strong></p>\n<p><strong>你好</strong></p>\n<p><a href=\"http://www.baidu.com\">输入链接说明</a></p>\n<ul>\n<li>列表1</li>\n<li>列表2</li>\n</ul>\n<table>\n<thead>\n<tr>\n<th id=\"h1\" style=\"text-align:left;\">h1</th>\n<th id=\"h2\" style=\"text-align:center;\">h2</th>\n<th id=\"h3\" style=\"text-align:right;\">h3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:left;\">100</td>\n<td style=\"text-align:center;\">200</td>\n<td style=\"text-align:right;\">300</td>\n</tr>\n<tr>\n<td style=\"text-align:left;\"><em>foo</em></td>\n<td style=\"text-align:center;\"><strong>bar</strong></td>\n<td style=\"text-align:right;\"><del>baz</del></td>\n</tr>\n</tbody>\n</table>\n<ul>\n<li class=\"task-list-item\" style=\"list-style-type: none;\"><input type=\"checkbox\" disabled=\"\" style=\"margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;\" checked=\"\"> This task is done<ul>\n<li class=\"task-list-item\" style=\"list-style-type: none;\"><input type=\"checkbox\" disabled=\"\" style=\"margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;\"> This is still pending</li></ul></li>\n</ul>\n<hr>', '/file/images/pic_1523596330668.jpg', '馒头', '0', '', '000000000', '0', '\n### 标题 markdown\n\n``标签1`` ``标签2`` ``标签3``\n```\nvar a = \'hellow world!\';\nconsole.log(a);\n```\n> 标注\n\n***你说什么***\n\n__你好__\n\n[输入链接说明](http://www.baidu.com)\n\n* 列表1\n* 列表2\n\n| h1    |    h2   |      h3 |\n|:------|:-------:|--------:|\n| 100   | 200     | 300     |\n| *foo* | **bar** | ~~baz~~ |\n\n- [x] This task is done\n - [ ] This is still pending\n -----------\n\n\n\n\n        ');

-- ----------------------------
-- Table structure for `blog_comment`
-- ----------------------------
DROP TABLE IF EXISTS `blog_comment`;
CREATE TABLE `blog_comment` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL COMMENT '评论的人的id',
  `content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `like` int(10) unsigned zerofill NOT NULL COMMENT '点赞',
  `unlike` int(10) unsigned zerofill NOT NULL COMMENT '点倒',
  `date` varchar(20) NOT NULL COMMENT '时间',
  `fromaid` int(11) NOT NULL COMMENT '关联文章ID',
  `fromcid` int(11) DEFAULT NULL COMMENT '评论某个评论的',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_comment
-- ----------------------------

-- ----------------------------
-- Table structure for `blog_imgs`
-- ----------------------------
DROP TABLE IF EXISTS `blog_imgs`;
CREATE TABLE `blog_imgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `size` varchar(50) NOT NULL COMMENT '图片大小',
  `type` varchar(50) DEFAULT NULL COMMENT '分类',
  `owner` varchar(50) DEFAULT NULL COMMENT '拥有者 0 是系统的',
  `del` int(1) unsigned zerofill NOT NULL DEFAULT '0' COMMENT '删除标记，0表示正常，1表示删除',
  `date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8 COMMENT='用户上传的图片';

-- ----------------------------
-- Records of blog_imgs
-- ----------------------------
INSERT INTO `blog_imgs` VALUES ('116', '12293810.jpg', '/upload\\upload_46f8dc005f7cd6da2ff611b892a39aa3.jpg', '3kb', '10', null, '0', '2018/01/01 15:43:57');

-- ----------------------------
-- Table structure for `blog_tags`
-- ----------------------------
DROP TABLE IF EXISTS `blog_tags`;
CREATE TABLE `blog_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_tags
-- ----------------------------
INSERT INTO `blog_tags` VALUES ('1', 'react');
INSERT INTO `blog_tags` VALUES ('2', 'vue');
INSERT INTO `blog_tags` VALUES ('3', 'javascript');
INSERT INTO `blog_tags` VALUES ('4', 'threejs');
INSERT INTO `blog_tags` VALUES ('5', 'redux');
INSERT INTO `blog_tags` VALUES ('6', 'mobx');
INSERT INTO `blog_tags` VALUES ('7', 'css');
INSERT INTO `blog_tags` VALUES ('8', 'html');
INSERT INTO `blog_tags` VALUES ('9', 'es6/es7');
INSERT INTO `blog_tags` VALUES ('10', 'other');
INSERT INTO `blog_tags` VALUES ('11', 'nodejs');
INSERT INTO `blog_tags` VALUES ('12', 'photoshop');
INSERT INTO `blog_tags` VALUES ('13', 'npm');

-- ----------------------------
-- Table structure for `blog_types`
-- ----------------------------
DROP TABLE IF EXISTS `blog_types`;
CREATE TABLE `blog_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '类型名称',
  `type` int(2) unsigned zerofill NOT NULL DEFAULT '00' COMMENT '0文章分类',
  `del` int(1) unsigned zerofill NOT NULL DEFAULT '0' COMMENT '删除标记，0表示正常，1表示删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='系统图库类型';

-- ----------------------------
-- Records of blog_types
-- ----------------------------
INSERT INTO `blog_types` VALUES ('10', 'react', '00', '0');
INSERT INTO `blog_types` VALUES ('11', 'vue', '00', '0');
INSERT INTO `blog_types` VALUES ('13', 'javascript', '00', '0');
INSERT INTO `blog_types` VALUES ('14', 'css', '00', '0');
INSERT INTO `blog_types` VALUES ('15', 'html', '00', '0');
INSERT INTO `blog_types` VALUES ('16', '其他', '00', '0');

-- ----------------------------
-- Table structure for `blog_user`
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT '' COMMENT '用户名',
  `password` varchar(50) NOT NULL,
  `usertype` int(2) NOT NULL DEFAULT '0' COMMENT '用户类型。0普通用户，1管理员',
  `updatetime` varchar(50) DEFAULT NULL,
  `del` int(1) unsigned zerofill DEFAULT '0' COMMENT '如果是1，表示禁用',
  `tel` varchar(20) NOT NULL COMMENT '电话',
  `pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`tel`),
  UNIQUE KEY `tel` (`tel`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COMMENT='用户列表';

-- ----------------------------
-- Records of blog_user
-- ----------------------------
INSERT INTO `blog_user` VALUES ('57', '馒头', '3b4dc15edc0ed4d7d287ffb78bb4b566', '0', '2018-04-12 18:14:18', '0', '13551301693', '/file/images/pic_1523596330668.jpg');
INSERT INTO `blog_user` VALUES ('58', '测试', '3b4dc15edc0ed4d7d287ffb78bb4b566', '0', '2018-04-13 13:54:24', '0', '13551301694', '/file/images/pic_1523603098704.jpg');
INSERT INTO `blog_user` VALUES ('60', '111', 'b04b606145126b06f4c1b7427063771b', '0', '2018-04-13 15:24:54', '0', '13551301695', '/file/images/pic_1523611962691.jpg');
