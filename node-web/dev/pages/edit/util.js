export function switchType(type) {
    let val = '';
    switch (type) {
        case 'h':
            val = '### 标题';
            break;
        case 'iline':
            val = '***斜线***';
            break;
        case 'blod':
            val = '__加粗__';
            break;
        case 'tline':
            val = '~~中线~~';
            break;
        case 'code':
            val = `
\`\`\`
console.log('代码片段');
\`\`\``;
            break;
        case 'list':
            val = `
- 列表1
- 列表2
- 列表3`;
            break;
        case 'list2':
            val = `
1. 有序列表1
2. 有序列表2
3. 有序列表3
`;
            break;
        case 'link':
            val = '[输入链接说明](http://)';
            break;
        case 'table':
            val = `
| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | 200     | 300     |`;
            break;
        case 'from':
            val = '> 引用内容';
            break;
        case 'line':
            val = '-------------------------';
            break;
    }
    return val;
}

export const defaultMd = `
### 标题 markdown

\`\`标签1\`\` \`\`标签2\`\` \`\`标签3\`\`
\`\`\`
var a = 'hellow world!';
console.log(a);
\`\`\`
> 标注

***你说什么***

__你好__

[输入链接说明](http://www.baidu.com)

* 列表1
* 列表2

| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | 200     | 300     |
| *foo* | **bar** | ~~baz~~ |

- [x] This task is done
 - [ ] This is still pending
 -----------




        `;
