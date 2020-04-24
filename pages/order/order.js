// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    list:[],
    nickName:"",
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.item == 0){
      that.setData({
        title: '所有列表'
      })
    } else if (options.item == 1){
      that.setData({
        title: '进行中'
      })
    } else {
      that.setData({
        title: '已完成'
      })
    }
    
    wx.getUserInfo({
      success: function (res) {
        
        wx.request({
          url: 'http://localhost:8008/getorder', //仅为示例，并非真实的接口地址
          data: {
            'nickName': res.userInfo.nickName,
            'order_status': options.item
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(result) {
            console.log(result.data)
            that.setData({
              list: result.data.data.productList,
            })
          }
        })
      }
    })

    
    
  },

  
})