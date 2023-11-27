
/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let imgBaseUrl = '';
let wsBaseUrl = '';

/**
 启用本地开发模式
*/

// if (process.env.NODE_ENV == 'development') {
//     baseUrl = 'http://localhost:8185/api' //本地开发
//     imgBaseUrl = 'http://localhost:8185' //本地开发
//     wsBaseUrl = 'ws://localhost:8185'//聊天室

// }else if(process.env.NODE_ENV == 'production'){
//     baseUrl = 'http://localhost:8185/api'//线上部署
//     imgBaseUrl = 'http://localhost:8185'//线上部署
//     wsBaseUrl = 'ws://localhost:8185'//聊天室
// }

/**
 启用上线运行模式
*/


if (process.env.NODE_ENV == 'development') {
    baseUrl = 'https://t.me/usdtvps666/api' //本地开发
    imgBaseUrl = 'https://t.me/usdtvps666' //本地开发
    wsBaseUrl = 'wss://@usdtvps666'//聊天室

}else if(process.env.NODE_ENV == 'production'){
    baseUrl = 'https://t.me/usdtvps666/api'//线上部署
    imgBaseUrl = 'https://t.me/usdtvps666'//线上部署
    wsBaseUrl = 'wss://@usdtvps666'//聊天室
}

export{
    baseUrl,
    imgBaseUrl,wsBaseUrl
}
