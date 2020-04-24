// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationName:"",
    imgSrc:"",
    product_image_url:"",
    product_name:"",
    product_type:"",
    product_describe:"",
    product_price:"",
    product_sell_user:"",
    name:"",
    latitude:"",
    longitude:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          product_sell_user: res.userInfo.nickName
        })
      }
    })
  },

  chooseLocation: function() {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          locationName: res.address,
          name: res.name,
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
    })
  },
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost:8008/upload', 
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            description: '图片'
          },
          success(res) {
            console.log(res.data)
            that.setData({
              product_image_url: tempFilePaths[0]
            })
          }
        })
      }
    })
  },
  bindproduct_name:function(e){
    this.setData({
      product_name: e.detail.value
    })
  },
  bindproduct_type:function(e){
    this.setData({
      product_type: e.detail.value
    })
  },
  bindproduct_describe:function(e){
    this.setData({
      product_describe: e.detail.value
    })
  },
  bindproduct_price:function(e){
    this.setData({
      product_price: e.detail.value
    })
  },
  submitFun:function(){
    var that = this
    wx.request({
      url: 'http://localhost:8008/addproduct', //仅为示例，并非真实的接口地址
      data: {
        'product_sell_user': this.data.product_sell_user,
        'product_name': this.data.product_name,
        'product_type':this.data.product_type,
        'product_describe': this.data.product_describe,
        'product_price':this.data.product_price,
        'product_image_url': this.data.product_image_url,
        'address': this.data.locationName,
        'name':this.data.name,
        'latitude': this.data.latitude,
        'longitude': this.data.longitude
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