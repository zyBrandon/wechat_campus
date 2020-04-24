// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortActive:0,
    list:[],
    nickName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.type)
    wx.request({
      url: 'http://localhost:8008/search', //仅为示例，并非真实的接口地址
      data: {
        'type': options.type,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        console.log(result.data)
        that.setData({
          list: result.data.data.productList
        })
      }
    })

    
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo.nickName)
              that.setData({
                nickName: res.userInfo.nickName
              })

            }
          })
        }
      }
    })

  },

  addCart: function (data) {
    var that = this
    console.log(data.currentTarget.dataset.item)
    wx.request({
      url: 'http://localhost:8008/addcart', //仅为示例，并非真实的接口地址
      data: {
        'product_id': data.currentTarget.dataset.item.product_id,
        'product_buy_username': this.data.nickName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        console.log(result.data)
      }
    })

  }
})