//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // login(userinfo) { // 需要一个参数来额外接收用户数据
  //   app.login(userinfo, (err, res) => { // 呃…… 框架死掉了 🤣 只能屈服于回调地狱
  //     if (err) return console.log('login function has error') // 如果登录方法出错则报错
  //     // 登录完毕后，调用用户数据等信息，使用 that.setData 写入
  //   })
  // },
  gotoList() {
    wx.navigateTo({
      url: '../list/list'
    })
  }
})
