//chat.js
//获取应用实例
const app = getApp()
const msgs = require('./chat-mock-data.js');

Page({
  data: {
    messages: [],         // 聊天记录
    msg: '',              // 当前输入
    scrollTop: 0,         // 页面的滚动值
    socketOpen: false,    // websocket是否打开
    lastId: '',           // 最后一条消息的ID
    isFirstSend: true     // 是否第一次发送消息(区分历史和新加)
  },
  onLoad(option) {
    // 设置标题
    this.setNickName(option);
  },
  //事件处理函数
  onReady() {
    // 连接websocket服务器
    this.connect();
  },
  onUnload() {
    const socketOpen = this.data.socketOpen;
    if (socketOpen) {
      wx.closeSocket({});
      wx.onSocketClose(res => {
        console.log('WebSocket 已关闭！')
      });
    }
  },
  connect() {
    wx.connectSocket({
      url: 'ws://localhost:12112'
    });
    wx.onSocketOpen(res => {
      this.setData({ socketOpen: true });
      wx.sendSocketMessage({
        data: JSON.stringify(msgs),
      })
    });
    wx.onSocketMessage(res => {
      const isFirstSend = this.data.isFirstSend;
      const data = JSON.parse(res.data);
      let messages = this.data.messages;
      let lastId = '';
      
      if (isFirstSend) {
        messages = messages.concat(data);
        lastId = messages[0].id;
        this.setData({ messages, lastId, isFirstSend: false });
        // 延迟页面向顶部滑动
        this.delayPageScroll();
      } else {
        messages.push(data);
        const length = messages.length;
        lastId = messages[length - 1].id;
        this.setData({ messages, lastId });
      }
    });
    wx.onSocketError(res => {
      console.log(res);
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
  // 设置昵称
  setNickName(option) {
    const nickname = option.nickname || 'Marry';
    wx.setNavigationBarTitle({
      title: nickname
    });
  },
  // 延迟页面向顶部滑动
  delayPageScroll() {
    const messages = this.data.messages;
    const length = messages.length;
    const lastId = messages[length - 1].id;
    setTimeout(() => {
      this.setData({ lastId });
    }, 300);
  },
  // 输入
  onInput(event) {
    const value = event.detail.value;
    this.setData({ msg: value });
  },
  // 聚焦
  onFocus() {
    this.setData({ scrollTop: 9999999 });
  },
  // 发送消息
  send() {
    const socketOpen = this.data.socketOpen;
    let messages = this.data.messages;
    let nums = messages.length;
    let msg = this.data.msg;

    if (msg === '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'loading',
        duration: 1000
      })
      return false;
    }

    const data = {
      id: `msg${++nums}`,
      message: msg,
      messageType: 0,
      url: '../../images/5.png'
    };
    this.setData({ msg: '' });
    
    if (socketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(data)
      })
    }
  }
})
