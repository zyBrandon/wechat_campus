// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback_title:"",
    feedback_content:"",
    feedback_user:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          feedback_user: res.userInfo.nickName
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  bindfeedback_title: function (e) {
    this.setData({
      feedback_title: e.detail.value
    })
  },
  bindfeedback_content: function (e) {
    this.setData({
      feedback_content: e.detail.value
    })
  },
  submitFun: function () {
    var that = this
    wx.request({
      url: 'http://localhost:8008/addfeedback', //仅为示例，并非真实的接口地址
      data: {
        'feedback_user': this.data.feedback_user,
        'feedback_title': this.data.feedback_title,
        'feedback_content': this.data.feedback_content,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        console.log(result.data)
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
    })
  }
  
})