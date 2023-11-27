
export const validation = {
    tel:/^\d{5,15}$/,
    password:/^[A-Za-z0-9]{6,18}$/,
    email:/^[0-9a-zA-Z]+@[0-9a-zA-Z]+(\.[0-9a-zA-Z]+)+$/,
    assetsPwd:/^[0-9]{6}$/,
    nickName:/^([\u4e00-\u9fa5]|[a-zA-Z0-9]){4,10}$/,
    count:120,//验证码有效时间
}
