// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{
      product_id:0,
      product_buy_username:"",
      title:"",
      price:"",
      tabIs: true,
      imgUrls: "",
      product_describe:""
    },
    
  },

  tabFun(e){
    console.log(e)
    if (e.currentTarget.dataset.state == 1){
      this.setData({
        tabIs:true
      })
    }else{
      this.setData({
        tabIs: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName:res.userInfo.nickName
        })
        
      }
    })

    console.log(options.product_id)
    wx.request({
      url: 'http://localhost:8008/getdetail', //仅为示例，并非真实的接口地址
      data: {
        'product_id': options.product_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        console.log(result.data)
        that.setData({
          imgUrls: result.data.data.product.product_image_url,
          title: result.data.data.product.product_name,
          price: result.data.data.product.product_price,
          product_describe: result.data.data.product.product_describe,
          product_id: options.product_id
        })
      }
    })
  },

  addCart: function (data) {
    var that = this
    console.log(data.currentTarget.dataset.item)
    wx.request({
      url: 'http://localhost:8008/addcart', //仅为示例，并非真实的接口地址
      data: {
        'product_id': this.data.product_id,
        'product_buy_username': this.data.nickName
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

  },
  addOrder:function(data){
    var that = this
    console.log(data.currentTarget.dataset.item)
    wx.request({
      url: 'http://localhost:8008/addorder', //仅为示例，并非真实的接口地址
      data: {
        'product_id': this.data.product_id,
        'product_buy_username': this.data.nickName
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