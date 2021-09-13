import axios from 'axios';

// 创建ajax请求对象
const request =axios.create({
    baseURL:'https://cnodejs.org/api/v1'
})


export default request;