import requests
# D.Q.C提供 由GPT4.0借鉴制作 仅提供思路
# 很多地方可以写的更简洁 欢迎优化

# Python脚本中多处已标记 所有数据请抓包或者通过其它方式获取

# 请求的URL
url = "https://api.bilibili.com/x/activity/bws/online/park/reserve/do"

# 请求头部信息
headers = {
    "Accept": "application/json, text/plain, */*",
    "App-key": "iphone",
    "Buvid": "Y24D1022E85DBAEA45A1B91699DACDFBE6E7",#不知道
    "native_api_from": "h5",
    "GuestId": "36726530822151",#不知道
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_5 like Mac OS X) AppleWebKit/615.5.1.10.2 (KHTML, like Gecko) Mobile/20H307 BiliApp/80300100 os/ios model/iPhone X mobi_app/iphone build/80300100 osVer/16.7.5 network/2 channel/AppStore Buvid/Y24D1022E85DBAEA45A1B91699DACDFBE6E7 c_locale/zh-Hans_CN s_locale/zh-Hans_CN sessionID/4d84630 disable_rcmd/0",#填自己的UA也行
    "Referer": "https://www.bilibili.com/blackboard/bw/2024/bws_event.html?navhide=1&stahide=1&native.theme=1&night=0#/Order/FieldOrder",
}

# Cookie信息
cookies = {
    "SESSDATA": "xxx",
    "bili_jct": "xxx",
    "DedeUserID": "xxx",
    "DedeUserID__ckMd5": "xxx",
    "sid": "xxx",
}
#自己改一下 没必要做区分 一块加一起应该🆗

data = {
    "csrf": "327da3b443a2fc2d8388e5002c9d5952",#布吉岛
    "inter_reserve_id": "6022",#6022为场次 抓包可查
    "ticket_no": "票号",#会员购电子票里
    "mobi_app": "iphone",#手机端
    "platform": "ios",#苹果
    "statistics": '{"appId":1,"version":"8.3.0","abtest":"","platform":1}',
    "appkey": "27eb53fc9058f8c3",#1
    "access_key": "f6a35e9a3bea1ea067c1be922e4dcb72",#2
    "sign": "b59f913eb278267d484767c32fd7a13c",#3
}
#123不知道有没有用 应该有用
# 发送POST请求
response = requests.post(url, headers=headers, cookies=cookies, data=data)

# 打印响应内容
print(response.text)#抢成功了似乎是乱码


