//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    nickName:"123",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls:[],
    list:[],
    inputVal: "",
    inputShowed: true,

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo.nickName)
              wx.request({
                url: 'http://localhost:8008/home', //仅为示例，并非真实的接口地址
                data: {
                  'nickName': res.userInfo.nickName,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(result) {
                  console.log(result.data)
                  that.setData({
                    imgUrls: result.data.data.adv,
                    list: result.data.data.product,
                    nickName: res.userInfo.nickName
                  })
                }
              })
              
            }
          })
        }
      }
    })

    
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  // 隐藏搜索框样式
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  

  searchSubmit:function(e){
    console.log(e.detail.value)
    wx.navigateTo({
      url: '../list/list?type=' + e.detail.value
    })
  },

  addCart:function(data){
    var that = this
    console.log(data.currentTarget.dataset.item)
    wx.request({
      url: 'http://localhost:8008/addcart', //仅为示例，并非真实的接口地址
      data: {
        'product_id': data.currentTarget.dataset.item.product_id,
        'product_buy_username':this.data.nickName
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
