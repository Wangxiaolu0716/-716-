//Made by 王小路© 仓库地址：https://github.com/Wangxiaolu0716/-716-
//脚本说明：更改 登录信息（Logindata）中的账号名字及密码即可
//——————————————————
const axios = require('axios');
const moment = require('moment');
// 定义登录、签到和点赞的URL
const loginUrl = 'https://2550505.com/auth/login';
const signUrl = "https://2550505.com/sign";
const daysUrl = "https://2550505.com/sign/days";
const postListUrl = "https://2550505.com/post/list?page=1&pageSize=20&order=1&filter=0";
const userInfoUrl = "https://2550505.com/user/info";
// 登录信息
const loginData = {"account":"账号名字","password":"密码"};
// 初始化token和cookie
let token = '';
let cookie = process.env.mbtoken || '';
// 登录获取token
axios.post(loginUrl, loginData)
  .then(response => {
    token = response.data.token;
    if (!token) throw new Error('未获取到token');
    console.log('获取到的token：' + token);
    cookie = 'token=' + token;
    return axios.get(signUrl, { headers: { "Cookie": cookie, "Authorization": token } });
  })
  .then(response => {
    console.log("签到成功");
    return axios.get(daysUrl, { headers: { "Cookie": cookie, "Authorization": token } });
  })
  .then(response => {
    console.log("签到天数：" + JSON.stringify(response.data.day));
    return axios.get(postListUrl, { headers: { "Cookie": cookie, "Authorization": token } });
  })
  .then(response => {
    const [latestId, titles] = getLatestPostIdAndTitles(response);
    let currentId = latestId;
    let index = 0;
    const likePost = () => {
      const url = "https://2550505.com/post/like/" + currentId;
      axios.post(url, { "author": 17714 }, { headers: { "Cookie": cookie, "Authorization": token } })
        .then(response => {
          console.log("点赞帖子" + currentId + "（" + titles[index] + "）：" + response.data.msg);
          if (currentId > latestId - 50) {
            currentId--;
            index++;
            setTimeout(likePost, 15000);
          } else {
            getUserInfo();
          }
        })
        .catch(error => console.error(error));
    };
    likePost();
  })
  .catch(error => console.error(error));
// 从GET请求的响应中提取帖子的id、时间和title
function getLatestPostIdAndTitles(response) {
  const data = response.data;
  const now = moment();
  let minDiff = Number.MAX_VALUE;
  let latestId = null;
  let titles = [];
  for (let post of data.result) {
    const postId = post.id;
    const postTime = moment(post.post_time, "YYYY-MM-DD HH:mm:ss");
    const postTitle = post.title;
    const diff = Math.abs(now.diff(postTime));
    if (diff < minDiff) {
      minDiff = diff;
      latestId = postId;
    }
    titles.push(postTitle);
  }
  return [latestId, titles];
}
// 定义一个函数，用来获取用户信息并打印
function getUserInfo() {
  axios.get(userInfoUrl, { headers: { "Cookie": cookie, "Authorization": token } })
    .then(response => {
      if (response && response.data && response.data.info) {
        const { contribution, exp } = response.data.info;
        console.log("贡献值：" + contribution);
        console.log("经验值：" + exp);
      } else {
        throw new Error('用户信息响应无效');
      }
    })
    .catch(error => console.error(error));
}
