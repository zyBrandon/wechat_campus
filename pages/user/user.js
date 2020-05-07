// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point:""
  },

  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {

        wx.request({
          url: 'http://localhost:8008/getpoint', //仅为示例，并非真实的接口地址
          data: {
            'nickName': res.userInfo.nickName,
            'from_keyword':'wechat'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(result) {
            console.log(result.data)
            that.setData({
              point: result.data.data.pointRes,
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})