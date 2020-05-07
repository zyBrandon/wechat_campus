// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isEdit:false,
      totalPrice: 0, //总价
      list:[
        {
            id:"1",
            select:true,
            img:"../../images/party.png",
            title:"二手书",
            spec:"基督山伯爵",
            price:"20",
            num:"1"
        }
      ],
      nickName:"",
      selectList:[],
      buyId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
  onShow:function(){
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
                url: 'http://localhost:8008/getcart', //仅为示例，并非真实的接口地址
                data: {
                  'nickName': res.userInfo.nickName,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(result) {
                  console.log(result.data)
                  that.setData({
                    list: result.data.data.cartList,
                    nickName: res.userInfo.nickName
                  })
                }
              })

            }
          })
        }
      }
    })

    for(var i=0;i < this.data.list.length;i++){
      that.data.select[i]=false;
    }
  },
  labelFun(e) {//单选
    let that = this
    let num = 0
    let selectListTemp = [];
    let price = this.data.list[e.currentTarget.dataset.id].product_price
    let chooseId = this.data.list[e.currentTarget.dataset.id].product_id
    selectListTemp[e.currentTarget.dataset.id] = true;

    that.setData({
      selectList:selectListTemp,
      isEdit:true,
      totalPrice: price,
      buyId: chooseId
    })
    console.log(this.data.selectList);
    
  },

  closeFun:function(){

    

    var that = this
    wx.request({
      url: 'http://localhost:8008/addorder', //仅为示例，并非真实的接口地址
      data: {
        'product_buy_username': this.data.nickName,
        'product_id': this.data.buyId,
        from: "cart"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        
        wx.showToast({
          title: '购买成功', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
        that.onShow();
      }
    })
    
  }
  
  
})