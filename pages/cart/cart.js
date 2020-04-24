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
      nickName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },
  labelFun(e) {//单选
    let that = this
    let num = 0
    for (let i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i].id == e.currentTarget.dataset.id) {
        if (!that.data.list[i].select) {
          that.data.list[i].select = true
        } else {
          that.data.list[i].select = !that.data.list[i].select
        }
        that.setData({
          list: that.data.list
        })
      }

      if (that.data.list[i].select) {
        num++
        if (num == that.data.list.length) {
          that.setData({
            total: true
          })
        } else {
          that.setData({
            total: false
          })
        }
      }
    }
    this.totalPrice()
  },

  totalFun() { //全选
    this.data.total = !this.data.total
    // for (let i = 0; i < this.data.list.length; i++) {
    //   if (this.data.total) {
    //     this.data.list[i].select = true
    //   }else{
    //     this.data.list[i].select = false
    //   }
    // }
    this.data.list.map((v, k) => {
      if (this.data.total) {
        v.select = true
      } else {
        v.select = false
      }
    })
    this.setData({
      list: this.data.list,
      total: this.data.total
    })

    this.totalPrice()
  },
  editFun() { //编辑
    this.setData({
      isEdit: !this.data.isEdit
    })

    if (!this.data.isEdit) {
      console.log(this.data.list)
      app.http('v1/order/editCart', { list: this.data.list }, "POST")
        .then(res => {
          console.log(res)
        })
    }
  },
  plusFun(item) { //增加商品数量
    this.data.list.map((v, k) => {
      if (v.id == item.target.dataset.item.id) {
        this.data.list[k].num++
      }
    })

    this.setData({
      list: this.data.list
    })

    this.totalPrice()
  },
  reduceFun(item) { //减少商品数量
    this.data.list.map((v, k) => {
      if (v.id == item.target.dataset.item.id) {
        if (this.data.list[k].num > 1) {
          this.data.list[k].num--
        }
      }
    })
    this.setData({
      list: this.data.list
    })

    this.totalPrice()
  },
  delItemFun(item) { //删除单商品

    let id = item.target ? item.target.dataset.item.id : item.id

    this.data.list.map((v, k) => {
      if (v.id == id) {
        this.data.list.splice(k, 1)
      }
    })

    this.setData({
      list: this.data.list
    })

    this.totalPrice()
  },
  delFun() { //选中删除
    let list = []

    this.data.list.map((v, k) => {
      if (!v.select) {
        list.push(v)
      }
    })

    this.setData({
      list: list
    })

    this.totalPrice()

  },
  closeFun: function () {
    let list = []
    let listTotal = []
    this.data.list.map((v, k) => {
      if (v.select) {
        list.push(v)
      } else {
        listTotal.push(v)
      }
    })
    app.http('v1/order/set', { goods: list }, "POST").then(res => {
      if (res.code == 200) {
        app.http('v1/order/editCart', { list: listTotal }, "POST")
          .then(res => {
            console.log(res)
          })
        wx.navigateTo({
          url: "/pages/orderDetails/index?id=" + res.data._id
        });
      }
    })

  },

  totalPrice() {//计算总价
    let that = this
    let price = 0
    for (let i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i].select) {
        price = price + that.data.list[i].price * that.data.list[i].num
      }
    }
    this.setData({
      totalPrice: price.toFixed(2)
    })

  },
})