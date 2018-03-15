//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // login(userinfo, callback) {
  //   wx.login({}) // 现在，调用 wx.login 是一个可选项了。只有当你需要使用微信登录鉴别用户，才需要用到它，用来获取用户的匿名识别符
  //   if (userinfo.detail.errMsg == 'getUserInfo:ok') {
  //     wx.request({}) // 将用户信息、匿名识别符发送给服务器，调用成功时执行 callback(null, res)
  //   } else if (userinfo.detail.errMsg == 'getUserInfo:fail auth deny') { // 当用户点击拒绝时
  //     wx.showModal({}) // 提示用户，需要授权才能登录
  //     callback('fail to modify scope', null)
  //   }
  // },
  globalData: {
    userInfo: null
  }
})