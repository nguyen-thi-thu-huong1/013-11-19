webpackJsonp([1], {
    "/bJG": function(t, e) {},
    "0jYu": function(t, e) {},
    "27mo": function(t, e) {},
    "9xLq": function(t, e) {},
    "A/v3": function(t, e) {},
    FtGK: function(t, e) {},
    GvqT: function(t, e) {},
    IdL3: function(t, e) {},
    IpLF: function(t, e) {},
    Ji21: function(t, e) {},
    NHnr: function(t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = a("7+uW"),
        i = a("mvHQ"),
        n = a.n(i),
        o = {
            name: "App",
            data: function() {
                return {
                    daoTime: null,
                    loading: !1,
                    pid: ""
                }
            },
            created: function() {
                var t = this.$route.query;
                t.pid && (this.pid = t.pid),
                this.getVisitUrl(),
                this.getApp(),
                sessionStorage.getItem("token") && (this.openDaoTime(), this.getUserInfo())
            },
            methods: {
                getApp: function() {
                    var t = this;
                    t.$apiFun.post("/api/app", {}).then(function(e) {
                        200 == e.code && (localStorage.setItem("appInfo", n()(e.data)), t.$store.commit("changappInfo"), document.getElementsByTagName("title")[0].innerText = t.$store.state.appInfo.title)
                    })
                },
                getVisitUrl: function() {
                    var t = this;
                    t.$apiFun.get("/api/getVisitUrl", {}).then(function(e) {
                        if (200 == e.code) {
                            var a = t.pid ? e.data.url + "?pid=" + t.pid: e.data.url;
                            window.open(a, "_self")
                        }
                    }).
                    catch(function(t) {})
                },
                getAgentLoginUrl: function() {
                    this.showTost(1, "正在前往页面");
                    var t = this.$router.resolve({
                        path: "/gamePage",
                        query: {
                            dailiD: 1
                        }
                    });
                    window.open(t.href, "_blank")
                },
                outLogin: function() {
                    var t = this;
                    t.$confirm("您确定要退出登录吗?", "提示", {
                        confirmButtonText: "是的",
                        cancelButtonText: "点错了",
                        type: "warning"
                    }).then(function() {
                        t.showLoading(),
                        t.$apiFun.post("/api/logoff", {}).then(function(e) {
                            localStorage.clear(),
                            sessionStorage.clear(),
                            t.$store.commit("changUserInfo"),
                            t.$store.commit("changToken"),
                            t.closeDaoTime(),
                            t.hideLoading(),
                            t.$router.push({
                                path: "/login"
                            })
                        }).
                        catch(function() {
                            localStorage.clear(),
                            sessionStorage.clear(),
                            t.$store.commit("changUserInfo"),
                            t.$store.commit("changToken"),
                            t.closeDaoTime(),
                            t.hideLoading(),
                            t.$router.push({
                                path: "/login"
                            })
                        })
                    }).
                    catch(function() {})
                },
                openGamePage: function(t, e, a) {
                    if (sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "") {
                        this.showTost(1, "正在前往打开游戏页面");
                        var s = this.$router.resolve({
                            path: "/gamePage",
                            query: {
                                name: t,
                                type: e,
                                code: a
                            }
                        });
                        window.open(s.href, "_blank")
                    } else this.showTost(0, "请先登录");
                },
                openPage: function(t) {
                    var e = this.$router.resolve({
                        path: t,
                        query: {}
                    });
                    window.open(e.href, "_blank")
                },
                doCopy: function(t) {
                    var e = document.createElement("input");
                    e.style.opacity = "0",
                    e.value = t,
                    document.body.appendChild(e),
                    e.select(),
                    document.execCommand("copy"),
                    this.showTost(1, "复制成功！")
                },
                goNav: function(t) {
                    if (t != this.$route.fullPath) if ("/userredpacket" != t) this.$router.push({
                        path: t
                    });
                    else {
                        if (!this.$store.state.token) return void this.$router.push({
                            path: "/login"
                        });
                        if (0 == this.$store.state.appInfo.redpacket_switch) return void this.showTost(0, "红包已关闭");
                        var e = this.$router.resolve({
                            path: "/userredpacket"
                        });
                        window.open(e.href, "_blank")
                    } else this.showTost(0, "已在当前页面！")
                },
                closeDaoTime: function() {
                    null != this.daoTime && clearInterval(this.daoTime),
                    this.daoTime = null
                },
                getBalance: function() {
                    var t = this;
                    t.$apiFun.post("/api/balance", {}).then(function(e) {
                        if (200 == e.code) {
                            var a = JSON.parse(localStorage.getItem("userInfo"));
                            a.balance = e.data.balance,
                            localStorage.setItem("userInfo", n()(a)),
                            t.$store.commit("changUserInfo")
                        }
                        401 == e.code && (sessionStorage.setItem("token", ""), t.$store.commit("changToken"), t.closeDaoTime(), t.$router.push({
                            path: "/"
                        }))
                    }).
                    catch(function(t) {})
                },
                openDaoTime: function() {
                    var t = this;
                    t.daoTime = setInterval(function() {
                        t.getBalance()
                    },
                    4300)
                },
                getUserInfo: function() {
                    var t = this;
                    t.$apiFun.post("/api/user", {}).then(function(e) {
                        if (200 === e.code) {
                            var a = e.data,
                            s = a.current_vip,
                            i = s.indexOf("P"),
                            o = s.substr(i + 1, s.length);
                            a.vip = o,
                            localStorage.setItem("userInfo", n()(a)),
                            t.userInfo = a,
                            t.$store.commit("changUserInfo")
                        }
                    })
                },
                getUserInfoShowLoding: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/user", {}).then(function(e) {
                        if (200 === e.code) {
                            var a = e.data,
                            s = a.current_vip,
                            i = s.indexOf("P"),
                            o = s.substr(i + 1, s.length);
                            a.vip = o,
                            localStorage.setItem("userInfo", n()(a)),
                            t.userInfo = a,
                            t.$store.commit("changUserInfo"),
                            t.hideLoading()
                        }
                    })
                },
                openKefu: function() {
                    var t = this;
                    t.showTost(1, "正在链接人工客服"),
                    t.$apiFun.post("/api/getservicerurl", {}).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && window.open(e.data.url)
                    })
                },
                showTost: function(t, e) {
                    var a = t ? "success": "warning";
                    this.$message({
                        message: e,
                        type: a
                    })
                },
                showLoading: function() {
                    this.loading = !0
                },
                hideLoading: function() {
                    this.loading = !1
                }
            },
            mounted: function() {},
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        c = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    attrs: {
                        id: "app"
                    }
                },
                [1 == t.$store.state.appInfo.site_state ? a("div", [t.loading ? a("div", {
                    staticClass: "common__loading__2ISqR",
                    staticStyle: {
                        "user-select": "none",
                        display: "block"
                    }
                },
                [t._m(0)]) : t._e(), t._v(" "), a("keep-alive", [t.$route.meta.keepAlive ? a("router-view", {
                    key: t.$route.name
                }) : t._e()], 1), t._v(" "), t.$route.meta.keepAlive ? t._e() : a("router-view", {
                    key: t.$route.name
                })], 1) : t._e(), t._v(" "), 0 == t.$store.state.appInfo.site_state ? a("div", {
                    staticStyle: {
                        "box-sizing": "border-box",
                        padding: "30px",
                        "fong-size": "26px"
                    }
                },
                [t._v(t._s(t.$store.state.appInfo.repair_tips))]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "common__loadingWarp__jRby5"
                },
                [e("img", {
                    staticStyle: {
                        width: "96px",
                        height: "96px"
                    },
                    attrs: {
                        src: "/static/image/loading.01298b54.png"
                    }
                })])
            }]
        };
        var r = a("VU/8")(o, c, !1,
        function(t) {
            a("pE6g")
        },
        null, null).exports,
        _ = a("/ocq"),
        l = {
            name: "Header",
            data: function() {
                return {
                    baseURL: "",
                    bfNum: 0,
                    vipLis: [],
                    loginInfo: {},
                    nowTime: "",
                    nowTimeDao: null,
                    realbetList: [],
                    jokerList: [],
                    gamingList: [],
                    sportList: [],
                    lotteryList: [],
                    conciseList: [],
                    realbetImg: [{
                        title: "身临其境 美女如云",
                        img: "/static/image/model-ob.f7d9288eb03c74e2719a47c8522617ae.png"
                    },
                    {
                        title: "美艳荷官 现场互动",
                        img: "/static/image/model-bg.ec17e9248b1abbeaef8de1b0884288a0.png"
                    },
                    {
                        title: "视觉盛宴 革命体验",
                        img: "/static/image/model-ag.c294fe9c7dedeec529f992f4130b82d5.png"
                    },
                    {
                        title: "现场直播 美女互动",
                        img: "/static/image/model-ebet.e68c32250e149edefcedccc56347164d.png"
                    }],
                    sportImg: [{
                        title: "多元化的万场投注赛事",
                        img: "/static/image/model-ob.4a6215c4c47ed9bddc336c89a60da03b.png"
                    },
                    {
                        title: "全亚洲口碑最好的品牌",
                        img: "/static/image/model-xj.cf8af7740c9e164bdbf5bf4954a1ce6c.png"
                    },
                    {
                        title: "专业体育赛事投注",
                        img: "/static/image/model-im.fd9d7c98531bbf699c6127700af9cd7d.png"
                    }],
                    gamingImg: [{
                        title: "主流赛事 专业玩家",
                        img: "/static/image/model-ob.ebb35e6306efb15a10697acc8c033313.png"
                    },
                    {
                        title: "专业电竞平台 值得信赖",
                        img: "/static/image/model-lh.e6b48f117643602b3e950ff430f4fa1c.png"
                    },
                    {
                        title: "畅玩电竞 不二之选",
                        img: "/static/image/model-fy.13a024900754d2a8d121aeded914b7b8.png"
                    },
                    {
                        title: "精彩赛事 主流玩法",
                        img: "/static/image/model-ob.7f26dc12242baa4ed30560f72a98f097.png"
                    }],
                    jokerImg: [{
                        title: "真实万人 同台竞技",
                        img: "/static/image/model-ob.adabd64f040dcc73c142c3455bf4e298.png"
                    },
                    {
                        title: "热门游戏 应有尽有",
                        img: "/static/image/model-im.299443815640aa1e05d29007a0902cb9.png"
                    },
                    {
                        title: "好友相约 竞技娱乐",
                        img: "/static/image/model-gd.d31b2632a15154a3280a99c5b14afa7e.png"
                    },
                    {
                        title: "棋牌娱乐 惊喜不断",
                        img: "/static/image/model-by.22947db6915caa29e85c38a94532eb15.png"
                    }],
                    lotteryImg: [{
                        title: "旗舰彩种 应有尽有",
                        img: "/static/image/model-ob.a9c43641662cc922653821e41b271398.png"
                    },
                    {
                        title: "经典彩种 极易操作",
                        img: "/static/image/model-sg.42fec46df9aa69fe79e44bcaae2c5775.png"
                    },
                    {
                        title: "业界首创区块链彩票",
                        img: "/static/image/model-tcg.f36c7f872d1d19309f182fb89a82f6b4.png"
                    }],
                    activityImg: [{
                        title: "真实万人 同台竞技",
                        img: "/static/image/model-sc.6648a22dcebb241306d0bafea23e7a11.png"
                    },
                    {
                        title: "热门游戏 应有尽有",
                        img: "/static/image/model-tz.38e4f21978b8c3a75f337fbe1e0cd59f.png"
                    },
                    {
                        title: "好友相约 竞技娱乐",
                        img: "/static/image/model-ob.59409dd00c09a2fd426cc24c42cabf11.png"
                    },
                    {
                        title: "棋牌娱乐 惊喜不断",
                        img: "/static/image/model-yh.d831f71c5e790f33a17512656db97d03.png"
                    }],
                    conciseImg: [{
                        title: "经典游戏 巨额大奖",
                        img: "/static/image/concises/dz-1.3e3d53d73f4b94714f55db58891ecb6a.png"
                    },
                    {
                        title: "享受视觉盛宴",
                        img: "/static/image/concises/dz-2.b89cf0cffb1da2ca26aead2dad4ca33a.png"
                    },
                    {
                        title: "推陈出新 趣妙横生",
                        img: "/static/image/concises/dz-3.cb757b71e983a8f35f0e9231baafa3b0.png"
                    },
                    {
                        title: "经典玩法 高额奖金随心拿",
                        img: "/static/image/concises/dz-4.b989cf61999e6d75c33a2deb973a179d.png"
                    },
                    {
                        title: "这片区域归你了",
                        img: "/static/image/concises/dz-5.d772e90ba70a2e1405d6205613f5c074.png"
                    }],
                    activitylistList: [],
                    imgLis: ["2PYL", "6AQ5", "8PHD", "21I7", "69HM", "ACWA", "DUZ7", "IY98", "K647", "M52T", "NY52", "NZFA", "SN76", "SP4D", "VAEO", "YFQM", "ZZU5", "7GQT", "LFW3", "NU2T", "UAE3"],
                    index: 0
                }
            },
            created: function() {
                this.changIndex(),
                this.baseURL = sessionStorage.getItem("baseURL") || "",
                this.getGameList(),
                this.activitylist(),
                this.openTime()
            },
            methods: {
                changIndex: function() {
                    this.index = parseInt(20 * Math.random())
                },
                activitylist: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/activitylist", {}).then(function(e) {
                        200 === e.code && (t.activitylistList = e.data.data),
                        t.$parent.hideLoading()
                    })
                },
                getGameList: function() {
                    var t = this;
                    t.$apiFun.get("/api/game/list", {
                        category: ""
                    }).then(function(e) {
                        200 == e.code && e.data.forEach(function(e) {
                            "realbet" == e.category_id && 1 == e.app_state && t.realbetList.push(e),
                            "joker" == e.category_id && 1 == e.app_state && t.jokerList.push(e),
                            "gaming" == e.category_id && 1 == e.app_state && t.gamingList.push(e),
                            "sport" == e.category_id && 1 == e.app_state && t.sportList.push(e),
                            "lottery" == e.category_id && 1 == e.app_state && t.lotteryList.push(e),
                            "concise" == e.category_id && 1 == e.app_state && t.conciseList.push(e),
                            localStorage.setItem("realbetList", n()(t.realbetList)),
                            localStorage.setItem("jokerList", n()(t.jokerList)),
                            localStorage.setItem("gamingList", n()(t.gamingList)),
                            localStorage.setItem("sportList", n()(t.sportList)),
                            localStorage.setItem("lotteryList", n()(t.lotteryList)),
                            localStorage.setItem("conciseList", n()(t.conciseList)),
                            t.$store.commit("changGameList")
                        })
                    })
                },
                openTime: function() {
                    var t = this;
                    t.nowTimeDao = setInterval(function() {
                        t.getFormatDate()
                    },
                    1e3)
                },
                getFormatDate: function() {
                    var t = new Date,
                    e = t.getMonth() + 1,
                    a = t.getDate(),
                    s = t.getHours(),
                    i = t.getMinutes(),
                    n = t.getSeconds();
                    e >= 1 && e <= 9 && (e = "0" + e),
                    a >= 0 && a <= 9 && (a = "0" + a),
                    s >= 0 && s <= 9 && (s = "0" + s),
                    i >= 0 && i <= 9 && (i = "0" + i),
                    n >= 0 && n <= 9 && (n = "0" + n),
                    this.nowTime = t.getFullYear() + "-" + e + "-" + a + " " + t.getHours() + ":" + i + ":" + n
                },
                login: function() {
                    var t = this,
                    e = t.loginInfo;
                    if (e.name && e.password) {
                        var a = t.loginInfo.code;
                        if (a) {
                            if (a.toUpperCase() != t.imgLis[t.index]) return t.$parent.showTost(0, "验证码错误！"),
                            t.loginInfo.code = null,
                            void t.changIndex();
                            t.$parent.showLoading(),
                            t.$apiFun.login(e).then(function(e) {								
                                200 !== e.code && (t.$parent.showTost(0, e.message), t.loginInfo.code = null, t.changIndex(), t.$parent.hideLoading()),
                                200 === e.code && (sessionStorage.setItem("token", e.data.api_token), t.$store.commit("changToken"), t.getUserInfo(), t.$parent.openDaoTime())
                            })
                        } else t.$parent.showTost(0, "请输入验证码！")
                    } else t.$parent.showTost(0, "请输入您的账号和密码！")
                },
                getUserInfo: function() {
                    var t = this;
                    t.$apiFun.post("/api/user", {}).then(function(e) {
                        console.log(e),
                        200 !== e.code && t.$parent.showTost(0, e.message),
                        200 === e.code && (localStorage.setItem("userInfo", n()(e.data)), t.$store.commit("changUserInfo"), t.$router.push({
                            path: "/"
                        })),
                        t.$parent.hideLoading()
                    })
                },
                outLogin: function() {
                    this.$parent.outLogin()
                },
                changPath: function(t) {
                    var e = null;
                    "/" == t && (e = $("#meyNav").children().eq(0)),
                    "/joker" == t && (e = $("#meyNav").children().eq(1)),
                    "/concise" == t && (e = $("#meyNav").children().eq(2)),
                    "/realbet" == t && (e = $("#meyNav").children().eq(3)),
                    "/gaming" == t && (e = $("#meyNav").children().eq(5)),
                    "/lottery" == t && (e = $("#meyNav").children().eq(6)),
                    "/sport" == t && (e = $("#meyNav").children().eq(7)),
                    null != e ? (e.siblings().removeClass("selected"), e.addClass("selected")) : ($("#meyNav").children().eq(0).siblings().removeClass("selected"), $("#meyNav").children().eq(1).siblings().removeClass("selected"))
                }
            },
            updated: function() {
                this.changPath(this.$route.path)
            },
            mounted: function() {},
            beforeDestroy: function() {
                this.nowTimeDao && clearInterval(this.nowTimeDao),
                this.nowTimeDao = null
            },
            watch: {
                $route: {
                    immediate: !0,
                    handler: function() {
                        this.path = this.$route.path
                    }
                }
            }
        },
        d = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "_nav-bar__navbarContainer__1nCgO"
                },
                [a("div", {
                    staticClass: "_nav-bar__head__1uFFd"
                },
                [a("div", {
                    staticClass: "_nav-bar__headerbox__15BAD",
                    attrs: {
                        id: "loginapp"
                    }
                },
                [a("div", {
                    staticClass: "_nav-bar__leftbox__1oHQv"
                },
                [a("span", {
                    staticClass: "_nav-bar__line1__3KjiX"
                },
                [t._v("GMT+8")]), a("span", {
                    staticClass: "_nav-bar__margin10__2udrl"
                },
                [t._v(t._s(t.nowTime) + " ")]), t._v(" "), t._m(0), t._v(" "), t._m(1)]), t._v(" "), t.$store.state.token ? a("div", {
                    staticClass: "_nav-bar__rightbox__3GO2_"
                },
                [a("div", {
                    staticClass: "_nav-bar__userInfo__3rF_n"
                },
                [a("span", {
                    staticClass: "_nav-bar__username__3ePGp",
                    staticStyle: {
                        cursor: "pointer"
                    }
                },
                [a("b", [t._v("欢迎您，")]), a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/center")
                        }
                    }
                },
                [t._v(t._s(t.$store.state.userInfo.username))]), t._v(" "), a("img", {
                    staticClass: "_nav-bar__vip_icon__fmRGZ",
                    staticStyle: {
                        width: "43px !important",
                        height: "15px !important"
                    },
                    attrs: {
                        src: t.baseURL + t.$store.state.userInfo.vipname,
                        alt: ""
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/vip")
                        }
                    }
                })]), t._v(" "), a("span", {
                    staticClass: "_nav-bar__line1__3KjiX"
                },
                [t._v("|")]), t._v(" "), a("span", {
                    staticClass: "_nav-bar__money__3uMi5",
                    staticStyle: {
                        cursor: "pointer"
                    }
                },
                [t._v("\n            总资产： "), a("em", {
                    staticClass: "than",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/transfer")
                        }
                    }
                },
                [t._v(t._s(t.$store.state.userInfo.balance) + " 元")]), a("img", {
                    staticClass: "_nav-bar__refresh_mnoney__3csL-",
                    attrs: {
                        src: "/static/image/shuaxin@2x-5b83e4c9205a4241b51f544a75f26bab.png",
                        alt: "",
                        "data-type": "refresh"
                    },
                    on: {
                        click: t.$parent.getUserInfoShowLoding
                    }
                })]), t._v(" "), a("span", {
                    staticClass: "_nav-bar__actions__3Z8-N"
                },
                [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/recharge")
                        }
                    }
                },
                [t._v("存款")]), a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/withdraw")
                        }
                    }
                },
                [t._v("取款")]), a("a", {
                    staticClass: "_nav-bar__notMagrinR__ZcWN-",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/transfer")
                        }
                    }
                },
                [t._v("转账")])]), t._v(" "), a("span", {
                    staticClass: "_nav-bar__line1__3KjiX"
                },
                [t._v("|")]), t._v(" "), a("a", {
                    on: {
                        click: t.$parent.outLogin
                    }
                },
                [a("span", {
                    staticClass: "_nav-bar__logout__3yoqE",
                    staticStyle: {
                        cursor: "pointer",
                        "margin-right": "0px"
                    },
                    attrs: {
                        title: "退出登录"
                    }
                })])])]) : a("div", {
                    staticClass: "_nav-bar__rightbox__3GO2_"
                },
                [a("div", {
                    staticClass: "_nav-bar__userInfo__3rF_n"
                },
                [a("div", {
                    staticClass: "_nav-bar__input__17hJY"
                },
                [a("i"), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.name,
                        expression: "loginInfo.name"
                    }],
                    staticClass: "_nav-bar__inputbox__5XjvL _nav-bar__username__3ePGp",
                    attrs: {
                        type: "text",
                        placeholder: "账号",
                        id: "hd_account_tc",
                        value: ""
                    },
                    domProps: {
                        value: t.loginInfo.name
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.loginInfo, "name", e.target.value)
                        }
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "_nav-bar__pwdBox__1fARs _nav-bar__input__17hJY"
                },
                [a("i"), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.password,
                        expression: "loginInfo.password"
                    }],
                    staticClass: "_nav-bar__inputbox__5XjvL undefined",
                    attrs: {
                        type: "password",
                        placeholder: "密码",
                        id: "hd_passwd_tc",
                        maxlength: "32",
                        value: ""
                    },
                    domProps: {
                        value: t.loginInfo.password
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.loginInfo, "password", e.target.value)
                        }
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "_nav-bar__input__17hJY"
                },
                [a("i"), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.code,
                        expression: "loginInfo.code"
                    }],
                    staticClass: "_nav-bar__inputbox__5XjvL _nav-bar__username__3ePGp",
                    staticStyle: {
                        width: "82px"
                    },
                    attrs: {
                        type: "text",
                        placeholder: "验证码"
                    },
                    domProps: {
                        value: t.loginInfo.code
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.loginInfo, "code", e.target.value)
                        }
                    }
                })]), t._v(" "), a("img", {
                    staticStyle: {
                        height: "30px",
                        cursor: "pointer",
                        "margin-right": "20px"
                    },
                    attrs: {
                        src: "/static/image/yzm/" + t.imgLis[t.index] + ".png",
                        alt: ""
                    },
                    on: {
                        click: t.changIndex
                    }
                }), t._v(" "), a("div", {
                    staticClass: "_nav-bar__loginbtn__2chaT _nav-bar__changeBgColor__Q_xKS",
                    on: {
                        click: t.login
                    }
                },
                [t._v("登录")]), t._v(" "), a("div", {
                    staticClass: "_nav-bar__registerbtn__3TgmB _nav-bar__changeBgColor__Q_xKS"
                },
                [a("a", {
                    staticClass: "shiwan1",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/register")
                        }
                    }
                },
                [t._v("注册")])])])])])]), t._v(" "), a("div", {
                    staticClass: "_nav-bar__contentBg__2fJ6P"
                },
                [a("div", {
                    staticClass: "_nav-bar__navbarContent__33YJf"
                },
                [a("img", {
                    staticClass: "_nav-bar__navbarimg__22XW_",
                    attrs: {
                        src: t.$store.state.appInfo.site_logo,
                        onerror: "this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAABuCAMAAADLXPzWAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJkUExURUxpcRAjTg8lTxElTA8jTRAkTREjTA8jSw8iTw8lTQ8fTy9//yef/z/P7xElTg8kTQ8iTQAAAA8jTBEiTQ8kTSfX7w8jTA8fPx9v/yqf/2PH9yuT+yra8Fe/9yaU/jGZ+zuv9y+/+z209yBh/zaV+jKM/w4kTiOR/zq79SuK/yBg/z+x9UrP9CWW/zLj6GfL9yFj/yFi/yN1/SyV/SCW/yOR/ymf+yKx/zOd+iqg/RyS/zm6+CFh/zOf+VzG92TL9yvb6wS9/S/f5wW+/zXB/km49FbA9GDF9h/C9DS0/C+I/DzO/TSh+kq39WTM9hfQ9B3R8imw+UCx9B9r/yKY/x6q/zWZ+xyz/WrL9ibX7i/g6SBc/yJo/0m49Dyr8zmd+Dyr9TOL/SOy+yLL8jDZ8B9a/zXk5x9f/xEjTjHF+iuZ/zna/yVw/B9f/xCr/2nK9zjn5Trp4zfQ/yNx/SKG/0vW+Q6w/0rU+hAlTRElTiCM/yCU/yBg/yBc/yCP/y3e7BSf/xiY/z6u9CFj/x+R/yDX8jWL/zPk6VS+9i+W/jnn5izY7QG+/z/s4yvM7w7J+ke19A6p/yJo/zuk+AbE/SCX/xGk/xXO9zaR/Qys/xrR9CzR7iRy/irG8Si39Sfb7iex9inB8jGz/yV4/kKy9GnM9ziX+yi88yar+AO6/zTA/yJt/zO6/zGd/AW3/we0/yWl+RyT/wqw/yyI/U259Tqd+TjT/zre/yuB/S6O/Dq3+jWl+iul/znY/zyo9jiu+jfP/zXF/yOb/Cl8/WLH9zbK/1zC9j3C+SSg+yGC/0LN+SG0/8BHFgIAAAB5dFJOUwCfMO+Av99AIGAQECAQ/q9gAZDPcCBQECAwfEBfIJ+AQECWeu9/oJBatl+AMF96QKLf38+/gFBgr9/fb7+QosXf30Bf7sLfj3vHcINw71aj792vQO+/34ffyafvz9/fv+/f59+PMO9Q3qBv5++Q3+/cvMqQ7/ug347sPozVAAARJklEQVR42u2ciUNTV9qHT0Lukq3REMIqO7JvIvtmLUhRREUR667V2lq36ToVa6swDszKB+OMbemmoq1AWwf4Wi2jfrXa1v5T39lu3ntuknt1mI6DkyfhbiTgefI77zm5N4hixIgRI0aMGDFixIgRI0aMGDFi/IfgLUkrKytLW41iAAll20/8UeNXMTcMb9mv/iiyPQFFYPWB7aswz20v+68wtxqsACfCzZRt/D3hHcoLoO5JDcsLv4vICS8SOfDBB1gLqFnlRU8waaDFSJnhkR8Q9GbSnuRO9FvMC2WrvSgh7cRvRU4ggef+ZDCz6ontS94DpP2hESjhBYMZpCfrTxhqhmEIzJPUrUpW0bToigjz8Q65YUQxzxMx+tBsh5F+3ctff/31y6+kJTwh1cXYHQreEXhOePSHHxIxEBp45oF/fK1x4AlQU0bb7hUqjihmOwISnv8QozdTovWhV/5B4GZeLln0efn443c+5l7gmEAaAl769EMwQygLfed/MTo3kYcqu+OhQI+EU3yOSncTrZ6gIDMSVuGWG4eV7aIYnbWsTzHUDFdzICTzzp072AzIiWwm+NbDIDOJNhOcKIRCn2Mz7KsoOhJ5gLn9tN9gCgyyfiOwQfedTZ+KZp4PSXvl3r07opuIvcklW0mBf7Nq9RCOBCL+dWKewy3fiAhgZwPR8XFIzGpdR7p69So1QyBeEkLK7lHuhOQQMygCqrWZOD9i+EwypRpC6HOGcNADATiQiIJOgXj2DIEgEtjIxXg3JIiBeV+768ak2o+uYiA0G6ELFvwf5t69tkYvKnlJc7MORcKlUuLewvhVDfpvleimK/RIvxxFnWRHIdhj7Cam7VixJfFhYt5/v2z1sxvLIDDvC0Cp8Oz/SDRToHN27RpRk8DUvsJy87LJbM/FXlYx3RJ6dJy8wkhmFStgLcZv6Eq8+c9DHQEn8A3Kpo8wVwnMTCMSxGA1Pbg8Z6/Lwn2Odap1KCrsFVYWLkbmFUWNZkYivc5h5cVnLL5/o+g6xYa/CUBg+j4hYiA0zyIdyVPEzEsom+RmHTGDudMWPTJBFvKFiYHAUNcKg8XDyfdUXtsUxceSoQjAowDwsLEEAiN6gcA0foJhZgjMC9A2NTV1rS3rGk1OFp7u3SNEjQwPd+ICxUBgMBajEqtqstihoe6GkbZhw7Nenag/C6RBgflEMMO8AMVThLYpaqYRC24j1bgNRcNPiyhaoBgIjLUYGwsSEpCg1JmTIHp5OuRl02efgRnqRcS76eLFi1OMa9kkYbQaZ6Eo0FzHL1gMBAamvFwMnWRDk4NhCmGuFKciK54VxTyDOHWfYT4JqQEvUGXasBnuhg5XnaRTdZrOsXwLFSMGJshSqIkRO6sMlQfQCo9kGZin/6InFJiMr4gYrsbgBUJ1kTFVjAi03kD5hUkMTGNsagiJJkjlPFpgJBt7goOlkItxQXm3HpaCVoH5i4AWmK6vMGCmFkWmtpN46axBjM4pXHGyjC+xFbz22J2WBMm7KVYkFOievlCNoe6XQOU1Iy4RmRI5MMk/fqUzs78GRcXr8UBEsqYw2eHzOmts8ApbzVUVnRg6e3ZoYtiuHyqvKb9GZjzzBwEeGE/9jzozm5LRw9KJK05n2DBtjaySBlviN4hhEQmGxCyHMuZSLDEPjOCFB8Zd/92PYGaTBwks604hlC9D4TRexCADasCBYTXPAcjUCN10uqAomCC5DGLsvKhoYgK6eYvLZoH66IFZ+d132AxX0+tGOso7tk1MTBzfdhwvt7WUh3UsIiY8YNBsZDYqqQrFz2bsihFSVUEMbGprlQ/QMCybopgG5vM/4BuBrHhg8s9/B2aaBS2tE8c7uktKyrvLy8u7W7ZNbOtGIr1YTMRKzWIebypGfPOMogBiWELiQYzK1gsX88znAiww1efPUzO0Ox3W96HWidby8pTWCQwNDBHVKvaorvmLF7sQEObBWowCddZKjJ9GC8RowxKIkSMRZymml/r44vMvyP2Lp5mX/n5shoWmPhUBKce3lZd3pEwA+GD3tokUYdI3Pz+fjQzAAGKzFgMTeWsxEqvIICZeOBsYrfVOKzFZXwjQwJSeHhzsx16ImSqP3stESwkOS/fExPcaNCwd3+vNuLGYOhQJVnutxagwyzAXA4MSiFkO9hci5g3q48sv8ZcWmOTTp5kZ7CYf6b18n1KyDctISWlpPY7Xx1s7WjqomZT7ejP18/P10U9TLbEWY4M5v5UYF9sCMXwmrBcsh2MpxvOlwDPEy2snTxI1uDttqTF46SYhafWyz191dKy5j6FKCvRm6qZBTITmWImB0ited3Haw38S30rUiXFSGebF11rMG4KXY0RVw0kMNUO6EdB9P6WEiFizjNfh+5ShIXygJKVjCMbt9OnpepPTVKZiIObx2hYQr4aJCXANIIYPS2Zi4hQrMZ6/C+DAJK346SduJl+c061pXbaGeWF4hyj38Vf50FBL+xov4uQPg5jw+S8yFwNviUEMtEicx2iDkgRitM4VBDE2h4GAallj3hC8HGNemJmGVCTQMbSsZYjGQ4OJmWVihhrXFyNO9fBwlclpKisxCpReUQw/CmJgUAIx3GtgQcXX897f3yN3Ti32cuknysl8N60jEJihlALipUMvZhbfyDJraHZ2V/Z6L4hZGfU0lWQuRiy9LhVwyjCmgZh4zQKI8dGngxi/MxwLMX3v6TnmwV4uUTOv0arrbQULLUPL1gwNtbfoIjMbomA9XhSHIlN9Y7gw6jTGZyoGCoM98iAuG8TwDRDDgxlvPvO1EHNMENOXtGL8EjVT6KYhebMFhdjV4l0/m92OBezSzPTMjuDdkZHZkcZdIyMj7cXrQ2Ju5KMIsKttZmIgMPHRxIpi4IQdiGHDkqkYm7mY2v8RSF0xOU7MrNjMRqHXX4eelDmbiTKzcTCwjF1etKwgu339rnbsg1LcTpcjmVzMzMxak6ttFmKg9BqRwsUEmQTh/TfIUqNdDXaZizkmeFlZOTmJzYy/SuPiXff662+iECQNmSOczPV8o6fnMiU7myyL9zbyUWlmJjXq1baghRgnFFkAbMSLYhz0B4hi4OymdfF9mMBMjo5iMztZXLLefPDgwToUor0dxFzOvKyxO3v35bO7s5Mzz2J6enoQpXBmxm0yvzMRAyd0FSNBRxxPEvwo7bymKIb9iCX/vJhjf9VzcmBgdPRIDiIktD8gZKEQndkIaT724o2zZ/GdkN2YjDB78ebu4t1czDf7rK+2gRifaM8UWXSsvWO0aaeBfTabA4ZwgxiXBMjRxaT+VWByYGCgIon1ogcPfsC0IeByMRZzltHZeBbYy7sa2S7gO699Uxj1NJU/vGrYxdJrhqzqxdhhUILiC2ciYBLMccWFfyIiAr06K+++e/3tU02bmZa2HxjtCDhbAGJ6itn6FrntQRTv3lu3bhXcQgT33bulKAJ+WZYdSGC5LEuKOCSbEOdw6XPl42VLQgYxqsyzpRreiwaiX9MHPO8KjO8oQoQCbuXmDzezI4nB7W/uucUZu3VLe1D22NhYwRgibL50KQn9k6hKdOwuqOOS5HO4YE0PEVhHVf14k6zJt4XK4pMA/kwj6YKXLTluNsHddTNEIwL2FuMk7GU6uvaMARmIkbwnd6w0FxFyLu1EixZjYLTsZ98EChCwuxm5mzOZi5rdY0CN9vOau0ozqhChabwILV7ymZAz9OtMg9a8mzdv37zNyURA3R737rHmLqIi17N1bG5uDn8R+ITFvXVuLreujm5OjiehxUsD1UKt4Hs6YhTfBgQxXblubKErY24u3Y082AJja3qdh4m7cuVK3dYuhDk0WYEWL6VnBDyI0Xn79re3v+WUIiB1LnUPyUcGTYgbe8Dk7qnCS1JlMshu8xU6pakYPbSYAyN40QLjYUZADJDb3IXbvpUaZCZy07EWwh5P3gVMbuFWhEkaqESLl5rIganBOqa/neY0Ix0ZuZ5cIiG0n153QSMvlyzT961FmKKBxVx6V545cx3f+W1lqLVcydz0FXyrQzrcuXk0F27EKeRWzl04t/YcZl/+Oeq3cjEHxnMdwGZKQczwML5zcpGevNzkfSQdob51ToOJyduXRwNzKmKF8dtsCrJA9fsT0eMl/bqeBjg+fAULucJvN1KFyOwrTMXtz9V2wUtVIV6kp+9zk8OVkYckGa4nmX3W3/a4AzN4fRAohVTcEMhDelLP5ZFocFvJIKaw6sKFqvwLdEjKqUxaiBjpMY/VgwIepLGWG5m5MUNg6QBt5/LysAaSC4/HQ/rVMCHf7TlceHg4gw5Jbx9EpmJcJp+1s8dL6mMeq0/rSdcNVjMiqQYzF/LyhkurqI6thzO2kvVKGpTD09QLqsxBpmLUeOHitSvoDNphT1VdbE02GODx30DqSQFd690zM9/oKUQiGcPNqRlExzSmPiNjesth+rTmeeal4igyFaPKei/87wBkJ6IsXc5rTGJc6ISAKnhcKssv2tlhRpzkRGEoAZvfCXu47PuDsKsoyOUMkIEg6AgaS6/gpQHpKNRruXv37lokcnhLfWlp/TynPtVDRddvqWWJWuE2FaPE6c9y2/EewwFitDNaTyXSQ/i01YsqVUF38XEFxFACSMQl6T85YJfFE1wq3nTQX0mzKxl6kiAmH+lYe1fkiLGUeurme2tSm6uYGeIlq/ezXlalXl2RhMzEBNhVYwpPj+RYTlYBUYxdk6ViEwFmyCjmKaeiBOTws+a4vSBGJe7lOPgUOBiNcC0i+aRAsjAmH8GXT+5eAsLbWts7v+mNmuTkzMzMZE9N3/6fe7PYUysiegEx8fzaM5zDlBX6AULeOhCzVCKHeGCYqqfCxKi8ncGwc9xSUHEy/zL7HUG8lkJiZPYZSb8fC7MJqTh5ml60xyu8fA0J5GAZ45fG8Z0DrQWzfZt+/vnn/fv3k2Uf04KSdkb0AmIwghj6erGSwmIBYpBCksJWTlZcIonhQTQGRhZOrKvChso2mBK/oS8VntbD6ytEZtwAv/wm4s2q7evrq83yhoQe2ZmErMWAGQVv85LqZ0J0YpbSl3ippAVmyVtRxEhGMUKxdvLLUCBQZb9VokFzGsRUCWLykcjaSRF8renVJGRBUtNkhRtZiZEUGczY4aUNiGK08qssgcA8ihg/iAn9jjj4XIjMnqaEiyGfIxvEC3zDy2pk4NVRwiRd8q3KImSGO+fIaA4yR6aNVsGMi7aN50EUw0dsSYbrjg8nhleVUDm26y+t2C3FDAqkIyMVowID5KuyKClqWnJ2jFZCdzMbrsEMK7BSYrgY6F4YpgHZyfBtLsZlh2tXslPhUxSJfxAfiq+ZmC2D+ON1+Isw2L/FjQC3h+wdHYhExSF3pLA04W8dFb5j/pYgnprhr+KLTiXoFMRE/Dv8RLz5a3MxPt5GlzBc2+lILZOFai2mql8PfNDOXVpYwyupXsgpcmc0HT10EJwcLDq6kxzdCXGxEgNm4M8GpDAxPFC08bAjS5IUXYyklVl1ecQJnh1Zi6nuN7Ayv7o6P72hP98d6h4Vp6KyY2cTpnIH34X6Yy2GkujTzATkiGIgMjbjH/pHF6M61NAzHTZbwIU4Qb/P5oer14piZ395ix+g0h3A3XC+v5/cyYKuzpMv9m4Q1FSeegiaLLXAexSXbtvOWuP0Sb4AXjlZiaRrzhLWdmgthx5z4Y1E/h98QNsWTHLDeSNb8jUtQFHT2+bsqNiMfimWyo/jrJUnXbSSnhq5erqLKiqjWylyo1+OJfTd478fd2p1+kpCenWpB5lx8NDRph0GJzsrcqAI/2KBcaD/fNwHNxcV5RCKDh2EGc0vGxgUAxBO5sWIESNGjBgxYsSIESNGjBgxYjwZ/D/EvSinkw1iWwAAAABJRU5ErkJggg=='"
                    }
                }), t._v(" "), a("nav", [a("ul", {
                    staticClass: "_nav-bar__nav_ul__2w1iF"
                },
                [a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("span", [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/")
                        }
                    }
                },
                [t._v("首页")])]), a("i")])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/realbet" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("span", [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/realbet")
                        }
                    }
                },
                [t._v("真人娱乐")])]), a("i")]), t._v(" "), a("div", {
                    staticClass: "navStyles__navbox__2Mgk6 navStyles__zr__1rJUS",
                    staticStyle: {
                        height: "0px"
                    }
                },
                [a("ul", {
                    staticClass: "navStyles__navGroup__2yL5t",
                    staticStyle: {
                        width: "unset"
                    }
                },
                [t._l(t.realbetList,
                function(e, s) {
                    return s < 4 ? a("li", {
                        key: s,
                        staticClass: "navStyles__navItem__w3dcG navStyles__topTitle__21ANq",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "navStyles__model__2jfhz",
                        attrs: {
                            src: t.realbetImg[s].img,
                            width: "270px"
                        }
                    }), a("span", {
                        staticClass: "navStyles__itemTop__2N2zG"
                    },
                    [a("h2", {
                        staticClass: "navStyles__itemTitle__4fyMp"
                    },
                    [t._v(t._s(e.name))]), t._v(" "), a("p", {
                        staticClass: "navStyles__itemText__P2uUa"
                    },
                    [t._v(t._s(t.realbetImg[s].title))])])]) : t._e()
                }), t._v(" "), a("span", {
                    staticClass: "navStyles__boon__1NURp",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/realbet")
                        }
                    }
                },
                [a("span", {
                    staticClass: "navStyles__boonTitle__30StN"
                },
                [t._v("真人娱乐")]), a("span", {
                    staticClass: "navStyles__boonEnTitle__q37B8"
                },
                [t._v("LIVE CASINO")]), a("img", {
                    attrs: {
                        src: "/static/image/return.22f59de327e8df671b50b1f4e8090c63.png",
                        width: "91px"
                    }
                }), a("span", {
                    staticClass: "navStyles__boonSubTitle__3CvIH"
                },
                [t._v("天天最高返水")])])], 2)])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/sport" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("span", [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/sport")
                        }
                    }
                },
                [t._v("体育赛事")])]), a("i")]), t._v(" "), a("div", {
                    staticClass: "navStyles__navbox__2Mgk6 navStyles__ty__X5SzN",
                    staticStyle: {
                        height: "0px"
                    }
                },
                [a("ul", {
                    staticClass: "navStyles__navGroup__2yL5t",
                    staticStyle: {
                        width: "unset"
                    }
                },
                [t._l(t.sportList,
                function(e, s) {
                    return s < 3 ? a("li", {
                        key: s,
                        staticClass: "navStyles__navItem__w3dcG",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "navStyles__model__2jfhz",
                        attrs: {
                            src: t.sportImg[s].img,
                            width: "238px"
                        }
                    }), a("span", {
                        staticClass: "navStyles__itemRight__IIsdu"
                    },
                    [a("h2", {
                        staticClass: "navStyles__itemTitle__4fyMp"
                    },
                    [t._v(t._s(e.name))]), t._v(" "), a("p", {
                        staticClass: "navStyles__itemText__P2uUa"
                    },
                    [t._v(t._s(t.sportImg[s].title))]), t._v(" "), a("img", {
                        staticClass: "navStyles__itemBtn__3ANXo",
                        attrs: {
                            src: "/static/image/btn-enter.62374a382990732bc66da6739112a0b8.png",
                            width: "110px"
                        }
                    })])]) : t._e()
                }), t._v(" "), a("span", {
                    staticClass: "navStyles__boon__1NURp",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/sport")
                        }
                    }
                },
                [a("span", {
                    staticClass: "navStyles__boonTitle__30StN"
                },
                [t._v("体育赛事")]), a("span", {
                    staticClass: "navStyles__boonEnTitle__q37B8"
                },
                [t._v("SPORTS EVENTS")]), a("img", {
                    attrs: {
                        src: "/static/image/return.ede09f746df6fc6671d4252a2c64a491.png",
                        width: "94px"
                    }
                }), a("span", {
                    staticClass: "navStyles__boonSubTitle__3CvIH"
                },
                [t._v("天天最高返水")])])], 2)])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/gaming" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("span", [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/gaming")
                        }
                    }
                },
                [t._v("电子竞技")])]), a("i")]), t._v(" "), a("div", {
                    staticClass: "navStyles__navbox__2Mgk6 navStyles__dj__qH0IU",
                    staticStyle: {
                        height: "0px"
                    }
                },
                [a("ul", {
                    staticClass: "navStyles__navGroup__2yL5t",
                    staticStyle: {
                        width: "unset"
                    }
                },
                [t._l(t.gamingList,
                function(e, s) {
                    return s < 4 ? a("li", {
                        key: s,
                        staticClass: "navStyles__navItem__w3dcG navStyles__topTitle__21ANq",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "navStyles__model__2jfhz",
                        attrs: {
                            src: t.gamingImg[s].img,
                            width: "280px"
                        }
                    }), a("span", {
                        staticClass: "navStyles__itemTop__2N2zG"
                    },
                    [a("h2", {
                        staticClass: "navStyles__itemTitle__4fyMp"
                    },
                    [t._v(t._s(e.name))]), t._v(" "), a("p", {
                        staticClass: "navStyles__itemText__P2uUa"
                    },
                    [t._v(t._s(t.gamingImg[s].title))])])]) : t._e()
                }), t._v(" "), a("span", {
                    staticClass: "navStyles__boon__1NURp",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/gaming")
                        }
                    }
                },
                [a("span", {
                    staticClass: "navStyles__boonTitle__30StN"
                },
                [t._v("电子竞技")]), a("span", {
                    staticClass: "navStyles__boonEnTitle__q37B8"
                },
                [t._v("E-SPORTS")]), a("img", {
                    attrs: {
                        src: "/static/image/return.1b7a0d3387bf0358523d91f47d1d2c25.png",
                        width: "94px"
                    }
                }), a("span", {
                    staticClass: "navStyles__boonSubTitle__3CvIH"
                },
                [t._v("天天最高返水")])])], 2)])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/joker" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("span", [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/joker")
                        }
                    }
                },
                [t._v("棋牌游戏")])]), a("i")]), t._v(" "), a("div", {
                    staticClass: "navStyles__navbox__2Mgk6 navStyles__qp__3ByyR",
                    staticStyle: {
                        height: "0px"
                    }
                },
                [a("ul", {
                    staticClass: "navStyles__navGroup__2yL5t",
                    staticStyle: {
                        width: "unset"
                    }
                },
                [t._l(t.jokerList,
                function(e, s) {
                    return s < 4 ? a("li", {
                        key: s,
                        staticClass: "navStyles__navItem__w3dcG",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "navStyles__model__2jfhz",
                        attrs: {
                            src: t.jokerImg[s].img,
                            width: "192px"
                        }
                    }), a("span", {
                        staticClass: "navStyles__itemRight__IIsdu"
                    },
                    [a("h2", {
                        staticClass: "navStyles__itemTitle__4fyMp"
                    },
                    [t._v(t._s(e.name))]), t._v(" "), a("p", {
                        staticClass: "navStyles__itemText__P2uUa"
                    },
                    [t._v(t._s(t.jokerImg[s].title))])])]) : t._e()
                }), t._v(" "), a("span", {
                    staticClass: "navStyles__boon__1NURp",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/joker")
                        }
                    }
                },
                [a("span", {
                    staticClass: "navStyles__boonTitle__30StN"
                },
                [t._v("棋牌游戏")]), a("span", {
                    staticClass: "navStyles__boonEnTitle__q37B8"
                },
                [t._v("CHESS GAME")]), a("img", {
                    attrs: {
                        src: "/static/image/return.8dc572ee278800cc5d0cb1ac2362c6e4.png",
                        width: "99px"
                    }
                }), a("span", {
                    staticClass: "navStyles__boonSubTitle__3CvIH"
                },
                [t._v("棋牌连赢，最高")])])], 2)])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/concise" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("span", [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/concise")
                        }
                    }
                },
                [t._v("电子游艺")])]), a("i")]), t._v(" "), a("div", {
                    staticClass: "navStyles__navbox__2Mgk6 navStyles__dz__10OwB",
                    staticStyle: {
                        height: "0px"
                    }
                },
                [a("ul", {
                    staticClass: "navStyles__navGroup__2yL5t",
                    staticStyle: {
                        width: "unset"
                    }
                },
                [t._l(t.conciseList,
                function(e, s) {
                    return s < 5 ? a("li", {
                        key: s,
                        staticClass: "navStyles__navItem__w3dcG navStyles__topTitle__21ANq",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "navStyles__model__2jfhz",
                        attrs: {
                            src: t.conciseImg[s].img,
                            width: "224px"
                        }
                    }), a("span", {
                        staticClass: "navStyles__itemTop__2N2zG"
                    },
                    [a("h2", {
                        staticClass: "navStyles__itemTitle__4fyMp"
                    },
                    [t._v(t._s(e.name))]), t._v(" "), a("p", {
                        staticClass: "navStyles__itemText__P2uUa"
                    },
                    [t._v(t._s(t.conciseImg[s].title))])])]) : t._e()
                }), t._v(" "), a("span", {
                    staticClass: "navStyles__boon__1NURp",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/concise")
                        }
                    }
                },
                [a("span", {
                    staticClass: "navStyles__boonTitle__30StN"
                },
                [t._v("电子游艺")]), a("span", {
                    staticClass: "navStyles__boonEnTitle__q37B8"
                },
                [t._v("SLOT GAME")]), a("img", {
                    attrs: {
                        src: "/static/image/return.425ed49de821efbc6b07cd7cc99223c7.png",
                        width: "98px"
                    }
                }), a("span", {
                    staticClass: "navStyles__boonSubTitle__3CvIH"
                },
                [t._v("天天最高返水")])])], 2)])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/lottery" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("span", [a("a", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/lottery")
                        }
                    }
                },
                [t._v("彩票投注")])]), a("i")]), t._v(" "), a("div", {
                    staticClass: "navStyles__navbox__2Mgk6 navStyles__cp__2WipM",
                    staticStyle: {
                        height: "0px"
                    }
                },
                [a("ul", {
                    staticClass: "navStyles__navGroup__2yL5t",
                    staticStyle: {
                        width: "unset"
                    }
                },
                [t._l(t.lotteryList,
                function(e, s) {
                    return s < 3 ? a("li", {
                        key: s,
                        staticClass: "navStyles__navItem__w3dcG",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "navStyles__model__2jfhz",
                        attrs: {
                            src: t.lotteryImg[s].img,
                            width: "280px"
                        }
                    }), a("span", {
                        staticClass: "navStyles__itemRight__IIsdu"
                    },
                    [a("h2", {
                        staticClass: "navStyles__itemTitle__4fyMp"
                    },
                    [t._v(t._s(e.name))]), t._v(" "), a("p", {
                        staticClass: "navStyles__itemText__P2uUa"
                    },
                    [t._v(t._s(t.lotteryImg[s].title))]), t._v(" "), t._m(2, !0)])]) : t._e()
                }), t._v(" "), a("span", {
                    staticClass: "navStyles__boon__1NURp",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/lottery")
                        }
                    }
                },
                [a("span", {
                    staticClass: "navStyles__boonTitle__30StN"
                },
                [t._v("彩票游戏")]), a("span", {
                    staticClass: "navStyles__boonEnTitle__q37B8"
                },
                [t._v("LOTTERY GAME")]), a("img", {
                    attrs: {
                        src: "/static/image/return.3e15398124241be163586b022d90c06e.png",
                        width: "94px"
                    }
                }), a("span", {
                    staticClass: "navStyles__boonSubTitle__3CvIH"
                },
                [t._v("首存即送最高可享")])])], 2)])])])]), t._v(" "), a("nav", [a("ul", {
                    staticClass: "_nav-bar__nav_ul__2w1iF _nav-bar__nav_ul2__2jAev"
                },
                [a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax",
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [a("div", {
                    class: "/kefu" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/kf.db2638cc7222c080d75627fd6eb158db.svg",
                        width: "32px",
                        height: "32px"
                    }
                }), t._m(3)])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax"
                },
                [a("div", {
                    class: "/activity" == t.path || "/activityInfo" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 ",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/activity")
                        }
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/discount.764db12c939e1b3d0d0744f61383d92b.svg",
                        width: "32px",
                        height: "32px"
                    }
                }), t._m(4)]), t._v(" "), a("div", {
                    staticClass: "navStyles__navbox__2Mgk6 navStyles__yh__3oKDT",
                    staticStyle: {
                        height: "0px"
                    }
                },
                [a("ul", {
                    staticClass: "navStyles__navGroup__2yL5t",
                    staticStyle: {
                        width: "unset"
                    }
                },
                t._l(t.activitylistList,
                function(e, s) {
                    return s < 4 ? a("li", {
                        key: s,
                        staticClass: "navStyles__navItem__w3dcG",
                        on: {
                            click: function(a) {
                                return t.$parent.goNav("/activityInfo?id=" + e.id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "navStyles__model__2jfhz",
                        attrs: {
                            src: t.activityImg[s].img,
                            width: "200px"
                        }
                    }), a("span", {
                        staticClass: "navStyles__itemRight__IIsdu"
                    },
                    [a("h2", {
                        staticClass: "navStyles__itemTitle__4fyMp"
                    },
                    [t._v(t._s(e.title))]), t._v(" "), a("img", {
                        staticClass: "navStyles__itemBtn__3ANXo",
                        attrs: {
                            src: "/static/image/btn-details.399a3c5349c1bb71be5bf267cfbd45d7.png",
                            width: "100px"
                        }
                    })])]) : t._e()
                }), 0)])]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax",
                    on: {
                        click: t.$parent.getAgentLoginUrl
                    }
                },
                [t._m(5)]), t._v(" "), a("li", {
                    staticClass: "_nav-bar__nav_item__11Zax",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/app")
                        }
                    }
                },
                [a("div", {
                    class: "/app" == t.path ? "_nav-bar__nav_bar_item_inner__1Jx72 _nav-bar__isActive__2x4bL": "_nav-bar__nav_bar_item_inner__1Jx72 "
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/app.725c1a95f62c74d317c401d69944bc68.svg",
                        width: "32px",
                        height: "32px"
                    }
                }), t._m(6)])])])])])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticStyle: {
                        width: "25px",
                        "padding-left": "10px",
                        "padding-top": "5px"
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/lan_ch.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticStyle: {
                        width: "25px",
                        "padding-left": "15px",
                        "padding-top": "5px"
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/lan_tw.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("a", {
                    attrs: {
                        href: "/member/game?plat_name=vrbet&game_type=3",
                        target: "_blank"
                    }
                },
                [e("img", {
                    staticClass: "navStyles__itemBtn__3ANXo",
                    attrs: {
                        src: "/static/image/btn-enter.62374a382990732bc66da6739112a0b8.png",
                        width: "110px"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticStyle: {
                        "font-size": "14px"
                    }
                },
                [e("a", [this._v("客服")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticStyle: {
                        "font-size": "14px"
                    }
                },
                [e("a", [this._v("优惠")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "_nav-bar__nav_bar_item_inner__1Jx72"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/sponsor.80ac76b8f6b7c0d2b404991d75685641.svg",
                        width: "32px",
                        height: "32px"
                    }
                }), e("span", {
                    staticStyle: {
                        "font-size": "14px"
                    }
                },
                [e("a", [this._v("代理")])])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticStyle: {
                        "font-size": "14px"
                    }
                },
                [e("a", [this._v("APP")])])
            }]
        };
        var p = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "scrollLazy",
                    staticStyle: {
                        "min-height": "0px"
                    }
                },
                [a("div", {
                    staticClass: "scrollLazy",
                    staticStyle: {
                        "min-height": "0px"
                    }
                },
                [a("div", {
                    staticClass: "style__footer__3lDH1",
                    attrs: {
                        id: "ob_footer"
                    }
                },
                [t._m(0), t._v(" "), a("hr"), t._v(" "), a("div", {
                    staticClass: "style__explanation__18qt1"
                },
                [a("p", [t._v(t._s(t.$store.state.appInfo.title) + "拥有欧洲马耳他MGA和菲律宾政府（PAGCOR）颁发的合法牌照。 注册于英属维尔京群岛，是受国际协会认可的合法公司。进行注册并娱乐前，请确保您年满18周岁！")])]), t._v(" "), t._m(1), t._v(" "), a("div", {
                    staticClass: "style__helpbox__2sqb7"
                },
                [a("div", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/abouts?type=1")
                        }
                    }
                },
                [t._v("常见问题")]), t._v(" "), a("div", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/abouts?type=2")
                        }
                    }
                },
                [t._v("博彩责任")]), t._v(" "), a("div", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/abouts?type=3")
                        }
                    }
                },
                [t._v("隐私政策")]), t._v(" "), a("div", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/abouts?type=4")
                        }
                    }
                },
                [t._v("免责说明")]), t._v(" "), a("div", {
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/abouts?type=5")
                        }
                    }
                },
                [t._v("联络我们")])]), t._v(" "), a("p", {
                    staticClass: "style__copyright__10clK"
                },
                [t._v("版权所有 ©2018-2022 " + t._s(t.$store.state.appInfo.title) + " 保留所有权")])])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "style__logbox__1U__O"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1608047280311172.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1608047301174026.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1608047320665608.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060075775779.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060091328212.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060109820223.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060124788196.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060142308157.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060157021979.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060179784221.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1602060194977049.png"
                    }
                }), e("img", {
                    attrs: {
                        src: "/static/image/1603003071894791.png"
                    }
                })])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "style__logoList__2uccD"
                },
                [a("div", [a("div"), t._v(" "), a("span", [t._v("马耳他牌照(MGA)认证")])]), t._v(" "), a("div", [a("div"), t._v(" "), a("span", [t._v("英属维尔京群岛(BVI)认证")])]), t._v(" "), a("div", [a("div"), t._v(" "), a("span", [t._v("菲律宾(PAGCOR)监督牌照")])])])
            }]
        };
        var m = {
            name: "Main",
            data: function() {
                return {
                    baseURL: ""
                }
            },
            components: {
                Header: a("VU/8")(l, d, !1,
                function(t) {
                    a("eVZB")
                },
                "data-v-52d828f7", null).exports,
                Foot: a("VU/8")({
                    name: "Foot",
                    data: function() {
                        return {}
                    },
                    methods: {},
                    mounted: function() {}
                },
                p, !1,
                function(t) {
                    a("dOJm")
                },
                "data-v-399deb90", null).exports
            },
            created: function() {
                this.baseURL = sessionStorage.getItem("baseURL") || ""
            },
            updated: function() {},
            mounted: function() {},
            methods: {
                openPage: function(t) {
                    this.$parent.openPage(t)
                },
                getAgentLoginUrl: function() {
                    this.$parent.getAgentLoginUrl()
                },
                outLogin: function() {
                    this.$parent.outLogin()
                },
                openDaoTime: function() {
                    this.$parent.openDaoTime()
                },
                closeDaoTime: function() {
                    this.$parent.closeDaoTime()
                },
                openGamePage: function(t, e, a) {
                    this.$parent.openGamePage(t, e, a)
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                getUserInfo: function() {
                    this.$parent.getUserInfo()
                },
                getUserInfoShowLoding: function() {
                    this.$parent.getUserInfoShowLoding()
                },
                doCopy: function(t) {
                    this.$parent.doCopy(t)
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                },
                getBalance: function() {
                    this.$parent.getBalance()
                }
            },
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        u = {
            render: function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("Header"), this._v(" "), e("router-view"), this._v(" "), e("Foot")], 1)
            },
            staticRenderFns: []
        };
        var v = a("VU/8")(m, u, !1,
        function(t) {
            a("bwTS")
        },
        "data-v-09310e99", null).exports,
        g = {
            name: "index",
            data: function() {
                return {
                    bannerList: [],
                    homenoticelis: [],
                    message: null,
                    ok: !1,
                    hongbashow: !0,
                    tanshow: !0
                }
            },
            created: function() {
                this.getBanList(),
                this.homenotice()
            },
            methods: {
                changtanshow: function() {
                    this.tanshow = !this.tanshow
                },
                changhongbashow: function() {
                    this.hongbashow = !1
                },
                changMessage: function(t) {
                    console.log(123),
                    this.message = t
                },
                homenotice: function() {
                    var t = this;
                    t.$apiFun.post("/api/homenotice", {}).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.homenoticelis = e.data, t.ok = !0)
                    })
                },
                getBanList: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/bannerList", {
                        type: 1
                    }).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.bannerList = e.data),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {
                $(".games__content__2kgrX ul li").click(function() {
                    var t = $(this).index();
                    $(".games__content__2kgrX ul li").siblings().removeClass("games__active__2El6O").eq(t).addClass("games__active__2El6O"),
                    $(".con1 .games__bg__VnEEr").siblings().animate({
                        opacity: "0",
                        "margin-left": "-100px"
                    },
                    200).eq(t).animate({
                        opacity: "1",
                        "margin-left": ""
                    },
                    500)
                })
            },
            updated: function() {
                new Swiper(".mySwiper", {
                    speed: 1e3,
                    autoplay: {
                        disableOnInteraction: !1,
                        delay: 3e3
                    },
                    loop: !0,
                    navigation: {
                        nextEl: ".style__next__3f6-g",
                        prevEl: ".style__prev__14mIE"
                    },
                    pagination: {
                        el: ".style__dots__2wknW",
                        clickable: !0
                    }
                });
                this.ok && (jQuery.fn.extend({
                    pic_scroll: function() {
                        $(this).each(function() {
                            var t = $(this),
                            e = t.find(".home__marquee__3d0Ok"),
                            a = e.find("a"),
                            s = a.size() * a.outerWidth();
                            a.clone().prependTo(e),
                            e.width(2 * s);
                            var i, n = 1;
                            t.hover(function() {
                                n = 0
                            },
                            function() {
                                n = 1
                            });
                            setInterval(function() { (i = t.scrollLeft()) >= s ? t.scrollLeft(0) : t.scrollLeft(i + n)
                            },
                            20)
                        })
                    }
                }), $(".home__notice_wrap__2_0lO").pic_scroll(), this.ok = !1)
            },
            beforeDestroy: function() {}
        },
        f = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [1 == t.$store.state.appInfo.index_modal && t.tanshow ? a("div", {
                    staticClass: "msgBox__modal__2kbbd",
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "msg关闭"
                    }
                },
                [a("div", {
                    staticClass: "msgBox__modal_HomeAreat_model__2obMO msgBox__modal_CuorsterAreat_model__wwzuA"
                },
                [a("div", {
                    staticClass: "msgBox__notice_header__kkFdX"
                },
                [a("span", {
                    staticClass: "msgBox__text__2ODn2",
                    attrs: {
                        title: ""
                    }
                },
                [t._v("欢迎来到" + t._s(t.$store.state.appInfo.title))]), a("span", {
                    staticClass: "msgBox__close_icon__3J9a5",
                    on: {
                        click: t.changtanshow
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "msgBox__notice_content__3Tozy msgBox__notice_content_height__Z3O1m"
                },
                [a("div", {
                    staticClass: "msgBox__flex__-7cOr common__scroll_bar__28TB7",
                    domProps: {
                        innerHTML: t._s(t.$store.state.appInfo.webcontent)
                    }
                }), t._v(" "), a("div", {
                    staticClass: "msgBox__footer__3DHzZ"
                },
                [a("button", {
                    staticClass: "msgBox__confirm__3ypnx",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.changtanshow
                    }
                },
                [t._v("关闭")])])])])]) : t._e(), t._v(" "), 1 == t.$store.state.appInfo.redpacket_switch && t.hongbashow ? a("div", {
                    attrs: {
                        id: "redPacket"
                    }
                },
                [a("i", {
                    staticClass: "grab",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/userredpacket")
                        }
                    }
                }), t._v(" "), a("img", {
                    attrs: {
                        src: "/static/image/hongbaocolse.png"
                    },
                    on: {
                        click: t.changhongbashow
                    }
                })]) : t._e(), t._v(" "), a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "home__home_page_layout__3bSUu index__wrapper__3VwKM",
                    staticStyle: {
                        "background-image": "url(/static/image/bg.4dd7830db13982d6a052e96dd6332c07.jpg)",
                        "min-height": "3000px"
                    }
                },
                [a("div", {
                    staticClass: "banner__wrapBanner__1FaRM"
                },
                [a("div", {
                    staticClass: "style__banner__28HI6 mySwiper swiper-initialized swiper-horizontal swiper-pointer-events"
                },
                [a("div", {
                    staticClass: "style__wrapper__1mxxP swiper-wrapper"
                },
                t._l(t.bannerList,
                function(t, e) {
                    return a("div", {
                        key: e,
                        staticClass: "style__bannerItem__34zkO swiper-slide",
                        style: "background-image: url(" + t.src + "); width: 1087px"
                    })
                }), 0), t._v(" "), a("div", {
                    staticClass: "style__dots__2wknW swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
                }), t._v(" "), a("div", {
                    staticClass: "style__prev__14mIE",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Previous slide",
                        "aria-controls": "swiper-wrapper-3a5aceb5b3dfd6310"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "style__next__3f6-g",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Next slide",
                        "aria-controls": "swiper-wrapper-3a5aceb5b3dfd6310"
                    }
                }), t._v(" "), a("span", {
                    staticClass: "swiper-notification",
                    attrs: {
                        "aria-live": "assertive",
                        "aria-atomic": "true"
                    }
                })])]), t._v(" "), t.message ? a("div", {
                    staticClass: "msgBox__modal__2kbbd",
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "msg关闭"
                    }
                },
                [a("div", {
                    staticClass: "msgBox__modal_HomeAreat_model__2obMO msgBox__modal_CuorsterAreat_model__wwzuA"
                },
                [a("div", {
                    staticClass: "msgBox__notice_header__kkFdX"
                },
                [a("span", {
                    staticClass: "msgBox__text__2ODn2",
                    attrs: {
                        title: ""
                    }
                },
                [t._v("最新公告")]), a("span", {
                    staticClass: "msgBox__close_icon__3J9a5",
                    on: {
                        click: function(e) {
                            return t.changMessage(null)
                        }
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "msgBox__notice_content__3Tozy msgBox__notice_content_height__Z3O1m"
                },
                [t._l(t.homenoticelis,
                function(e, s) {
                    return s < 2 ? a("div", {
                        key: s,
                        staticClass: "msgBox__flex__-7cOr common__scroll_bar__28TB7"
                    },
                    [a("p", [t._v(t._s(e))])]) : t._e()
                }), t._v(" "), a("div", {
                    staticClass: "msgBox__footer__3DHzZ"
                },
                [a("button", {
                    staticClass: "msgBox__close__3a3LR",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: function(e) {
                            return t.changMessage(null)
                        }
                    }
                },
                [t._v("关闭")]), a("button", {
                    staticClass: "msgBox__confirm__3ypnx",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/message")
                        }
                    }
                },
                [t._v("查看全部公告")])])], 2)])]) : t._e(), t._v(" "), a("div", {
                    staticClass: "notice__led__15X-v"
                },
                [a("section", {
                    staticClass: "home__led__24I0q"
                },
                [a("div", {
                    staticClass: "home__notice_box__MTDrm",
                    staticStyle: {
                        "background-color": "rgb(238, 243, 247)"
                    }
                },
                [a("div", {
                    staticClass: "home__notice__2dv3X",
                    staticStyle: {
                        overflow: "visible"
                    }
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "home__noticelist__1AaLZ home__str_wrap__3K769"
                },
                [a("div", {
                    staticClass: "home__notice_wrap__2_0lO"
                },
                [a("div", {
                    staticClass: "marquee-container",
                    staticStyle: {
                        "--pause-on-hover": "paused",
                        "--pause-on-click": "running"
                    }
                },
                [a("div", {
                    staticClass: "marquee",
                    staticStyle: {
                        "--play": "running",
                        "--direction": "normal",
                        "--duration": "660.559s",
                        "--delay": "2s",
                        "--iteration-count": "infinite"
                    }
                },
                [a("p", {
                    staticClass: "home__marquee__3d0Ok",
                    on: {
                        click: function(e) {
                            return t.changMessage(1)
                        }
                    }
                },
                t._l(t.homenoticelis,
                function(e, s) {
                    return a("a", {
                        key: s,
                        staticStyle: {
                            height: "50px",
                            "line-height": "50px"
                        }
                    },
                    [t._v(t._s(e))])
                }), 0)])])])]), t._v(" "), a("p", {
                    staticClass: "fl",
                    staticStyle: {
                        "text-align": "center"
                    }
                },
                [a("a", {
                    staticClass: "home__cuorster__17Pr8",
                    staticStyle: {
                        width: "96px",
                        "text-align": "right"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/message")
                        }
                    }
                },
                [a("button", {
                    staticClass: "notice__more__2MgRR"
                },
                [t._v("更多")])])])])])])]), t._v(" "), a("div", {
                    staticClass: "sponsor__wrapper__3Wi1o"
                },
                [a("div", {
                    staticClass: "sponsor__item__14Sa8",
                    on: {
                        click: function(e) {
                            return t.$parent.openPage("/asdwl?type=1")
                        }
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/invalid-name@2x.aa69bc6e48a7db32e690d1c67a4ddec1.png",
                        width: "626px",
                        height: "180px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "sponsor__item__14Sa8",
                    on: {
                        click: function(e) {
                            return t.$parent.openPage("/asdwl?type=2")
                        }
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/asidunlawei@2x.07eeb5904586eafb13a9b498743f53d9.png",
                        width: "626px",
                        height: "180px"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "scrollLazy",
                    staticStyle: {
                        "min-height": "200px"
                    }
                },
                [a("div", {
                    staticClass: "appdownload__appDownload__28OI- animation-show",
                    attrs: {
                        id: "appDownload",
                        "animation-show": "true"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/shoujiappxiazai@2x.11b8ec3083d9c0c052b2f8cde0043dcc.png",
                        width: "480px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "appdownload__downContainer__2Yz3A"
                },
                [t._m(1), t._v(" "), a("div", {
                    staticClass: "appdownload__rightSide__gWFaK"
                },
                [a("div", {
                    staticClass: "appdownload__tabs__3tvRx"
                }), t._v(" "), a("div", {
                    staticClass: "appdownload__rightSideContainer__2lGDq appdownload__active__1p3Q_"
                },
                [a("img", {
                    staticClass: "appdownload__enjoy__3FakM",
                    attrs: {
                        src: "/static/image/app-sub-title.ea5de3f59f0d4e8129b37826dc6272fb.png",
                        width: "218px"
                    }
                }), t._v(" "), a("p", {
                    staticClass: "appdownload__description__3YMx1"
                },
                [t._v("棋牌、彩票、真人娱乐、体育赛事、电子游艺、电子竞技，您所要的尽在" + t._s(t.$store.state.appInfo.title) + "。行业种类最全娱乐竞技APP，" + t._s(t.$store.state.appInfo.title) + "为您呈现别样、缤纷的极致体验。")]), t._v(" "), a("div", {
                    staticClass: "appdownload__qcodeContainer__3VX0A"
                },
                [a("div", {
                    staticClass: "appdownload__topSide__27gqv"
                },
                [a("div", {
                    staticClass: "appdownload__codeWrapper__3eWWV"
                },
                [a("img", {
                    attrs: {
                        src: t.$store.state.appInfo.ios_download_qrcode,
                        onerror: "this.src = '/static/image/appurl.jpg'",
                        width: "152",
                        height: "152"
                    }
                })]), t._v(" "), a("div", [a("p", {
                    staticClass: "appdownload__botSide__3kjmH"
                },
                [t._v("\n                        扫码下载APP"), a("br"), t._v("\n                        支持IOS & Android全设备"), a("br"), t._v(" "), a("a", {
                    staticStyle: {
                        color: "rgb(70, 119, 255)",
                        visibility: "visible"
                    },
                    attrs: {
                        href: t.$store.state.appInfo.ios_download_url,
                        target: "_blank"
                    }
                },
                [t._v(t._s(t.$store.state.appInfo.ios_download_url))])])])]), t._v(" "), a("div", {
                    staticClass: "appdownload__topSide__27gqv appdownload__topSide1__3qE_b"
                },
                [t._m(2), t._v(" "), a("div", [a("p", {
                    staticClass: "appdownload__botSide__3kjmH undefined"
                },
                [t._v("\n                        无需下载直接访问"), a("br"), t._v("\n                        手机输入网址即可访问"), a("br"), t._v(" "), a("a", {
                    staticStyle: {
                        color: "rgb(70, 119, 255)",
                        cursor: "pointer",
                        visibility: "visible"
                    },
                    attrs: {
                        href: t.$store.state.appInfo.h5_url
                    }
                },
                [t._v(t._s(t.$store.state.appInfo.h5_url))])])])])])])])])])]), t._v(" "), a("div", {
                    staticClass: "scrollLazy",
                    staticStyle: {
                        "min-height": "200px"
                    }
                },
                [a("div", {
                    staticClass: "games__container__1thqP animation-show",
                    attrs: {
                        "animation-show": "true"
                    }
                },
                [a("div", {
                    staticClass: "games__wrapper__2V0hx"
                },
                [t._m(3), t._v(" "), a("div", {
                    staticClass: "games__content__2kgrX"
                },
                [t._m(4), t._v(" "), a("div", {
                    staticClass: "con1"
                },
                [a("div", {
                    staticClass: "games__bg__VnEEr bg"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/ty@5x.a37ed2b0b2c43c0d7420588637a1fddb.png",
                        width: "1146px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "games__buttons__PwhJ-"
                },
                t._l(t.$store.state.sportList,
                function(e, s) {
                    return s < 3 ? a("div", {
                        key: s,
                        staticStyle: {
                            "background-image": "url(/static/image/changguanxuanzhonganniu@2x.7e006449b9ff203eb4805313845d612f.png)",
                            width: "128px",
                            "z-index": "1"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("span", {
                        attrs: {
                            "data-venue": "YBTY"
                        }
                    },
                    [t._v(t._s(e.name))])]) : t._e()
                }), 0)]), t._v(" "), a("div", {
                    staticClass: "games__bg__VnEEr bg",
                    staticStyle: {
                        opacity: "0"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/dj@3x.83d58e52fe3dcdae81076bb9270a7067.png",
                        width: "1146px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "games__buttons__PwhJ-"
                },
                t._l(t.$store.state.gamingList,
                function(e, s) {
                    return s < 3 ? a("div", {
                        key: s,
                        staticStyle: {
                            "background-image": "url(/static/image/changguanxuanzhonganniu@2x.7e006449b9ff203eb4805313845d612f.png)",
                            width: "128px",
                            "z-index": "1"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, "")
                            }
                        }
                    },
                    [a("span", {
                        attrs: {
                            "data-venue": "YBTY"
                        }
                    },
                    [t._v(t._s(e.name))])]) : t._e()
                }), 0)]), t._v(" "), a("div", {
                    staticClass: "games__bg__VnEEr bg",
                    staticStyle: {
                        opacity: "0"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/zr@3x.788152124fcaceddcb15779235da34d0.png",
                        width: "1146px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "games__buttons__PwhJ-"
                },
                t._l(t.$store.state.realbetList,
                function(e, s) {
                    return s < 3 ? a("div", {
                        key: s,
                        staticStyle: {
                            "background-image": "url(/static/image/changguanxuanzhonganniu@2x.7e006449b9ff203eb4805313845d612f.png)",
                            width: "128px",
                            "z-index": "1"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, "")
                            }
                        }
                    },
                    [a("span", {
                        attrs: {
                            "data-venue": "YBTY"
                        }
                    },
                    [t._v(t._s(e.name))])]) : t._e()
                }), 0)]), t._v(" "), a("div", {
                    staticClass: "games__bg__VnEEr bg",
                    staticStyle: {
                        opacity: "0"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/qp@6x.015d5ab8a00e74f37cd360b39c713883.png",
                        width: "1146px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "games__buttons__PwhJ-"
                },
                t._l(t.$store.state.jokerList,
                function(e, s) {
                    return s < 3 ? a("div", {
                        key: s,
                        staticStyle: {
                            "background-image": "url(/static/image/changguanxuanzhonganniu@2x.7e006449b9ff203eb4805313845d612f.png)",
                            width: "128px",
                            "z-index": "1"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, "")
                            }
                        }
                    },
                    [a("span", {
                        attrs: {
                            "data-venue": "YBTY"
                        }
                    },
                    [t._v(t._s(e.name))])]) : t._e()
                }), 0)]), t._v(" "), a("div", {
                    staticClass: "games__bg__VnEEr bg",
                    staticStyle: {
                        opacity: "0"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/cp@7x.03016bd83654f2210cbf865be193e072.png",
                        width: "1146px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "games__buttons__PwhJ-"
                },
                t._l(t.$store.state.lotteryList,
                function(e, s) {
                    return s < 3 ? a("div", {
                        key: s,
                        staticStyle: {
                            "background-image": "url(/static/image/changguanxuanzhonganniu@2x.7e006449b9ff203eb4805313845d612f.png)",
                            width: "128px",
                            "z-index": "1"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, "")
                            }
                        }
                    },
                    [a("span", {
                        attrs: {
                            "data-venue": "YBTY"
                        }
                    },
                    [t._v(t._s(e.name))])]) : t._e()
                }), 0)]), t._v(" "), a("div", {
                    staticClass: "games__bg__VnEEr bg",
                    staticStyle: {
                        opacity: "0"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/dz@3x.ee147cc1d70e62669593c54b0c5391ec.png",
                        width: "1146px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "games__buttons__PwhJ-"
                },
                t._l(t.$store.state.conciseList,
                function(e, s) {
                    return s < 3 ? a("div", {
                        key: s,
                        staticStyle: {
                            "background-image": "url(/static/image/changguanxuanzhonganniu@2x.7e006449b9ff203eb4805313845d612f.png)",
                            width: "128px",
                            "z-index": "1"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, "")
                            }
                        }
                    },
                    [a("span", {
                        attrs: {
                            "data-venue": "YBTY"
                        }
                    },
                    [t._v(t._s(e.name))])]) : t._e()
                }), 0)])])])])])]), t._v(" "), t._m(5), t._v(" "), a("div", {
                    staticClass: "sidebar__floatMenu__EMITZ"
                },
                [a("div", {
                    staticClass: "sidebar__item__3ZxEn"
                },
                [a("div", {
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [a("div", {
                    staticClass: "sidebar__kefu__2c9mp"
                }), t._v(" "), a("p", [t._v("客服")])])]), t._v(" "), a("div", {
                    staticClass: "sidebar__item__3ZxEn xf_ewm"
                },
                [t._m(6), t._v(" "), a("div", {
                    staticClass: "sidebar__qrcode__2PR2T",
                    staticStyle: {
                        display: "none"
                    }
                },
                [a("img", {
                    attrs: {
                        src: t.$store.state.appInfo.ios_download_qrcode,
                        onerror: "this.src = '/static/image/appurl.jpg'",
                        width: "120",
                        height: "120"
                    }
                }), t._v(" "), a("span", [t._v("APP下载")])])]), t._v(" "), a("div", {
                    staticClass: "sidebar__item__3ZxEn"
                },
                [a("div", {
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [a("div", {
                    staticClass: "sidebar__help__1b3r3"
                }), t._v(" "), a("p", [t._v("帮助")])])]), t._v(" "), t._m(7)]), t._v(" "), a("div", {
                    staticClass: "float-windows__floatWindows__1ERSp"
                })])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "home__title__vakp6"
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAB+CAMAAAD7uHQoAAADAFBMVEUAAADr26zjvIjpzaHqypXYs3vjwJbaqXHXp3LkwIzaqGvhv4zXqW3jwJLivovetn3XpmvYqW7hu4ndsniqUznVoWHHj2DkyJnVpWvVo2fiw4/VoWXasHnes3bUnl/ds3rVomfhuoDSnmbSmVjVoF+yYj/fuHu4bUXUnl3Un1/UoWLKh1GqWD3Tm1vVomLds3fixpXarXTfuYDoz6W2cEzUomjbrW/AeEi6d1G9fFXAhFvlyputYEHIhEzarG7ds3fIkWDAcUHNik64b0fLjFbhw5DRl1nCfEvw36uuZUby47PLjlnKjlzo0KHx26Lv3rbZrHDkxpXarnLOllnYpmjctH3ctHnZqWzctX7s1qHNi0vlw4r17MbcsYL8+dj58tHSnFvhvojbr3HQl1Xm0aPfs27oy5Tx4rrUnF3u3rbZrHHYp2TOj07huXjAeUPdsnbFh07v4bnDf0+uWTnfvIXYp2fiwI3UoGfozJy+d0vgvYjUmlXr1KfkyJjCfEe1ZEG5b0G3bj7QmVLLjkrOlVDDfkHIiUfSnVWHJx3Tn1m9Zi6wPymNKR/HhUWBJBzVolqlOCWuRSerPidsHRe5SyuhMyTJezOyRimyTiirTCd1IBm1PyurOSecMiOTLSDz6bl6JBvXo2LeoTmZLyLMgz+nSCViGhTFWi6XNCGeOySiQiSNMR/gqDvblzbhxZ7kuE/dpkbjsz2UTDZaFxLVs5DOqIXnxm+2elulVTimZk3ozIvmy4j5+uHq1avq05Pp0ZHpzo7t3LLivnX18dDUiDPTn2vFg1LlyIPRgjLy6sffuorXp3PlxJPfuXrdsHPx5sPCekjDZi3iv3/LhE/v4rzSmGDarWj078vPezG1ZDXr1Ze/Xi3Jci/Wl0fSjULlxXz3993RiTnXpV3csWrPllft37jz7MH478XLjlr29dfao1C6bDvUmk+4WyzMl2z19NTfslzQjlHCcDO3UirdtW7Zq2TYqWDGgUO/dT7gt2/Iai+wVCvWjzXOkk3Dej29UyxLiBpzAAAAgnRSTlMAAgUGCAoMEAgRDBQUDhshGxgXMH5OPSgkIB9AHjhXKDYlLGtefUR6ZEcxZXlyOzQzLS39ZShJdlxSRkBzfkI9Nn10cFpSfG3+a/5RSo/+5XFgmZJpaF9XUP7+/Of+/fHFxLiha/Pl07OggOzo5N/OybetiNfVpKH+noXux62SjbHKYYrOWAAAEydJREFUeF7s0kdrG0Ech2HPSlFMwE65CIwhl5BrjEVOOuSk4xLkU2SvLWw2MSKEoIsJhnyxme19VXsvrr2k9z4a7ULwLWuJXPwy94f/jxn771122WWBADXmo0bOgOsPHt2NJugoy05Njo/QmQhG1pNMPn/EqfE4k0iywakRUb7wS9lWOe6Il22eV1V1iUmwV0YA+SNrTyocZ6f0dPrtfLVcXtRj9YN4Ijz8y4LLofqRvFDb/ljLQpQr5cq7BT2VOWBWWT8YogNAcC3Ebco9q2sKrVZLaAmigMycUTBi+yp9iwJgWBwIL2dUu9TdOlakFkkQRBFrWaOQluuJyLUhUQBMrGfUfM2ytO5XKDgUtnAwfWjoMpOYBrhhUDPLPMf3NE378cYUB5BrSWb2RH+xRM9enAI4P72wmf+p9aljBRHGoQhWKhzG9umZcdDPO0SKPg7ZVUsjVnfHFAXRcZxK1bK+x0Qp1/JOTa6UKqH5hkba6iqSJJ4LZpv6/sMZn3cKDJp9XlIXO5blWMcKlM5rUvrkVSXJXgWDvFLUvdze68+dhmvhb2j2LfJcCmYNI8awF6Moai5VD/0qdhoYI5p1qiDJyaWwdWIcrN6mHMwbdWMuZYfeFYvfOo5l4Q0RhHBgSUSSEKo10zIddihvR91cyWym2u12seha2tYpsbDmBhHaqH0xYslpyotFIJ/v/lO+ftg+O8NYh6yI77K2TfQ3BiEyN5Td79V8NOBhQ4fy33nGV6pn73G/23hEnNVo9HY2UD/ohExT+fCp2Uwlw+MU9Y/UH8rrPKjtMo0D+NoCKVcP1F52Z3Ud6zjruHUzrn847nZnlxmmM4i11hGQtnbVrr2srnXxdnMHyNkcBBLOcJUb26otqdBfoSRNEwKBBMMRkoBk0xBypwkJ+7y/QmecZdvw/SP/fvI87/N7D4BwKfGxDxSGEW8pRIBb4+FwWDcO6zV1CXF4oKYhX4BOHRsryNmDKDxrpVK2qmYMgxEJDyIuXdKFdUuowPB0R3t7+6UbuHMDunfHT6JRQ5LBfdlJYK2dgqKSXi/UzgxG6s6f5zY1cfmlJq+YxytdaggbW2tqahauTSFo6I41QGFRY1CW+os1t3C5qKT0N97Wa29K6poaIbImLg9FLGhoaNDBlrjYsTA1NXTtzig9iiRWcMxR8OEL69dm4RQURXjhY/2hubrzjc3NzbWNMiGXzxeLi/niJd3IsPH6YisUBiXRaQBRqSwaLdKvzUxYtuKEIKgoQure9/SufklTc0lJSUWtUCjkSouB4gtME9Waof/UtLQsLHBIqKQgi0UjU8YciuxtuIUSL7V+fWJScuozcCdrizQ2MxglJTJhbS1uwYCYRoiGbnvv5Y7ODnKQChCNRiOTKTTHPPH9lIS1UfhKJWdsf63XoJA0s9lswCqgMhmXX8znCeTEbq1aobSrO1umYZVwiBylkMhj+cc2p0BZy1h81Iak9NSMXa9lYYrvm6vKqqqq2GzQZNxiKZdnYmJm9cRAtUp7tb1mEhhwoiDR6WM3czI3x99CfCg2wFKlbd51nGiY+Y5Rdg5SVsVm1AqlXK5z2K129ap71ZzJauXlzhpgKBCQmJZQv/r93yciK34qISE9ecvmTX98W2+4yAYIWWxYLxmXN655RYG5lOZuZbXxR3175wQJQocwOQH/YJ82k5CyIc7Pa/n7TScA9fjRfXZVVX19/bl6oKCDXK+pYan1Cuaym83dCnm1/lJny206k8mBWAL+a3MjP2dvS0lcG0VI27Jr+/NHcw1tXfXffvttPTSQXdLkXRIIloztMziFESfyDe2dHRyLJRAI+Ed9134q6Cv8MJOQiKy4KNgqElMIyUDt/de7RO1FoOpRAxt5AkF5uaAhvDilt4Nl1rcO2YEK+P1Wq2/oSk9u5UzBzcPHCSnQwvgp+IA373hh7wF/PtZWj6RzVRU8Mb+4WAybvLGmx+yCsgpFaq21pWMBnJ6ruZWVswaDqg87s5WQkrg8GXFRyWlAbT3D1GgVXchiyPgymRBRsLe3LihdmNmscRMxTU3LwuWrWZWzswaIq+2m/ss3CSsWJJ6qEPW7k5Rqtf5CVf05tqypUSYtLke7hcA00NFjcLm0hb1mbLK1ZqpyVgkMZsAwu1KlOrw/jZB0bzLibeCTeTSbv1ffVVbSyGCXwLYE4YnFXpO7MivLboaHpHq6tWWqEhwMc0Hs5oKCQwe3pxFS0Me1hqq2nqEFyZxC7LumCgYDtgppeTnstsVg+dtGRvOVhn1qt7G15VIlDD84iOq+oFJmP4zKAmpd3NTev+exqEGbprftu7Iq2Cq45TjF53l1ngY4II0jmiEYx86rBjsevCpiAfHY41tQWRvip3574CQtGPM4RlSuC/D51sJSgSWV8pd0JsFSQ8PS0pK7AKhL0EoIUCjKOUXO3l1pyemJUBe+Wg+mnjh4Eg6IWFFkrk858z0cWbADgiTkigXiYgEEjb2pITwxNQsUkgz4bPT35vx5V0YqITEhTipt/9snqKFQyBOpC9lU+gvfM3CLK+R5BeJyATQScTwe9PGaAW8eZphFUcypct7ZtDEjOSkJrDiotN0nJoIhyFhEEglVq13z6MSCI4sLBvSRL5WWC/hNXHFDOGythGrAgaHMys0tHOk7/BlQqenxUZuOf5AXC1FprJgjUiqJ2PqUxC4GYE28YqFQKhXiE8KtlfFhzUzyoZ4rP+XeuHHl1uidW35fqEB58Dc7N6ampz+Awg/GXUffHRXFWOQomeVxlkokg7Y2/cWuKnYtn1sLR3EtdLKYK5TJuNBEb6lTdBt2WwudREFHMSekytn//E7o4IPKQtSO4yeDwRiZQiJFyTFnRAItnFNhF5tlwhJIBVo0LvxWAIguhhGT3BKwcOiUKBzHJLr75luf/OGJnRnJyYhadz8q7fWzNpZNToajjsmk0DxASSL9I1q9oxH1kIEf/BVo+rlSPg8oLyoLWSQ4i+kBqgp7dc826GByUmLCfakNj55kxSjMaNSCusKM4h2scwyrlcQf2BC4ZTAY6KdCCDcacWmp1+s0xegWC5NOgjCZscKcTJy6Nxj/R9ry5BEqNcqxTtL9kACHJC+KAFU3NpKvVHSVQdgMdhlIJUIpUAB54QHmIXM4dykO2U089tmebdt2ZjyAeuwfsOvRLX6fnDNqtY76A0xSsChSB9f2kLX30MVmOCHRpaYMLwo2KS/+9Ap75LfpdJxi3s7rzXkTpzKS70M9tOMANUTjBEBxu4ECy0KPhpxg1UVsQ7Pai1AXOrxwis/n8k3w5FpcHDCK5CQ8dM60xv7lS3ugg2gGE9cja7XZ23smj0ZhBuD09lU7/D5EcShkqsNZCnHmDc1ixC50p8EvajIuF66E19GjpPW6UUSmQEik27cVWPZLL0FZGzfeG/dVZu+vg26SxW/1QawOJkhQEzXkGEMv1LDOY7uKuS5ULd8JKxqbms7XOQfg5g7UgEiO3ztJE9Xaww+gHoIQTtuY0DwfnsFB2ygHHhkhRBWFBwaMHqo1V4ld+AGmgsFobmwESWK6jqjFAZFIJEcX6ugksfut/UChDq6+N+HU1s/9SLKO4mX1O6I0Kh5HEbzwRbFYLFidvw+bmW9uBghqOi8pNRkXa2oWr497wIIHiXyaaTBkZ65QyatQ4ED+dgJGwacZnQiAFHCHPDH4o2QaK1SkC3uKHPAQYFVfnnUZ5uvOQ2BUSp3wHxYXjeO6onHjgCgmEtF77cfe+SW1bhUq5TnUvD6Hf9Lig9ctLS8WY0Wj5KBHJxr3OE6fPv3NN6fPnLgM+7hqfkwCiThN8A4fB6ioyGMcgNiI5sPZmcvUztTk9NWpdSnPvOvT3CpwuJl+PyUYpFHobrkoKveMD0y7T//766eeeuSRR/759UenrlYatG2hCASGJaxDELLQcqm7u4/tvx8FDv76ePQUUJr5uWomGR6BUTrTz4nCGgxMf370wF+efgoslI/O9uybNfTO9zudJt0KhKxgH9F+KCf7l1TC/1LrgHrutWs+jc/qt7GoLNiiObALRifl0xPMIy8//TRO4fn0SH5u1qxST5wb9piKnPckhasbO/bJwftRK0Ul7nj1jk/jZ0bhYRslMeHSb6GIwjrLj7e+ehGncAzv4tlTr0BlmJo4Ehr2FFFjnmGVYgYzH3rrs4MH38jM3L37PhRIG1JS/nTKN2qjQUkUEtNioVMmJyenQ4U/f/wyUGCtUIB9evbH3H2zmMGuV+iJKq12Bq7whqz3PnkVUW/u3v3rh1ddq+X2weNj+6Nn6bRhGmreqGbEZh2C18VIQeUXB15csZ59dgX76MipntysSgMGd3dwsJ8rc/5LmB39pHXFcQDf1q6OoV7A0cGgXhA6BQcOOlCXIU4JOiHOqZXaLp1KNKTrZrO5NU1rH4Ta+GD8EwxJ/wqb2rUvPnVLeLhLfNkCxKclvlzteCDZ93fOwdtQVr8vPH74/c7v3nNO7uSNiYnLMzNXiAr+P0VSs9ES2XxZLZOklHN5tbC3s1Opzh7e7oVFAYUI7Oc7y8vXxi+Nb489GR1dml8gSVDRT4Mye64aUu8TZfD+dBO7Wz6fL68/PCpVnhce/3O1cH0+olEsJ328n1nOLKzcRuLxuE+jeoLOOkobirOQ2DXHlb6LS+DW5r9rxWPcA/+qPlQPvl2FBWz4C8orGlr6JRKJROJE+aanp2dSV8KMste9AwUl+me1dHgHza65ubmbt+78mMtV15TnarVU+eO7SVDDCDAKxz6BxCmkRqVARaNtQefrmwiTGGU0EOX3eBK+ri6X6/6t3EY2m39xVS3t/v3rUO8Io75CBMYljfIR5U6lwuHohTbZybbG9+opTDpbKUvI6wDV3u6G5UsX1dJ6dvPRcenFvfgI5TMKLOIoFy92dgpqaGjI53N1dRE1cKEnKEu04Ytd+DUKRYGyecygUJVv6ntVRV3r+d+WpjgkcmJ1IkIiygUqlTIzygmqhU1Fo1HHUHQ4/Dazud3thuSLzymqsrGp7O5fi3Sz9IlwbpjSy1KT3G6Soj1tssQOZ9S/Uyj0D1T6CGXl8DFuKQ4nFuvrpwgMYdQIIIqLanK3m9lKYdTFkfN0iqryTeVVde147+no0iRJMTgiNW2ER5NAoX0BWdIO0qdXRdRcqVQs7+2P/bkCKZFIJj/n0bhuZKSbAgg1ifbhoWI7CPr3JsoDSpSVLqnFzY3C/uGlIS5pYVasDwaHugGxmtC+gJPfrzSq8QRi2HlZsNKKepTLPipsP1uNQTqPDA4O4oewZH9/IhFjcceYYzYPkBSk9unrbo2Nnysx7QjGvVTMZX8fnV1JJD1JQCxCSyYTCCQwXKKaePtwF8ZQNKLOnD15WzhsfNy7UFg8g6NaLrezv79s9tj8Dq+3g0doSQSemeLxUEnonizRTVi0r47S9hBaLa9f1EVNxGIpWXVnd3zeDQlQyEIJhTrwsnQ4/OdtiAehXz8qQklSKz1SrKaG1BmimhnFJkNYU4tYLOXxKLY9UAGSrFarsLwOYLZa/CQFaMzRPSqK3kkaVb9f8RZ6YQksnqkouXLh6fb1lYTDG7BIdoPBYDQY7FaJcQFvm4OlBwXBcbJlwo373br21Y97k9FoZXUJC1imom69rG7tHT65YWuTLVZACGG8tgAwHkCyk5YJz65oX2NKrBZbrhA6YxNYelFVcPsuzh58PY0Xm91kauYxGlvtdklyWmQ5JCMoSPoIvaPmoXtC0qD6E1PTSQ9FYan4LxUV31fKzw7GLuPJtBv1Ol1Tk65Jp9cbjSY7IonY7a0EUUlCakiJFtbqsmhNpA6Wig+OxrbvRYMYLv6nz2FhdTp9s8lkouJaETCvQELSqPrTLTCqixXGsIFwOI1LycaDxaXVb8TJBEuONcd3oHMtLTpEL6IDA4fmgc+ekBqXBUr0UAyHLRyeWqxUincnZ2o7A1tyBBbHRIQkSnozJbCTBWPYwIA788PC5MTMxxpFDUKEp4X/hf+qs2OdhmEgDMCQNCSUlJR6MWDLhaFDl8qV2jF9BQYk3oH3fwDuP0dXyR4ycAz8c6WvZ0f9rwqcEiopxsTa7z0d4ef3x9d5l6iBqfS9mUthgx2ZKKdKLHsQt5fLeEYyqppSp4BAxBFoFmuSdYrG+3HcEcSUuVLyaURSOvMU5lpTpcStv4yArtTDRElKRqh5TX6k7MkcYEGaDnAjVJ6SmafkCB1RxtN1qVJ5pdCzgUqxMdJYHF9QN5J8kvmUTTmEaCbLH7DcZdQvIlTVNKmUcVuwPO3GilT5J9JZGw0wj6ECr6zKlKxQ1LV0hBwTwgDqTpuq6jTWsw0xGgodHzpEk0LkBPu1G95CiMcjt7l7xCLe1JoULGyG1LRusIECCUOlFzjKVMdzodSl0Te9bJL6FPrfOVkdUltVqpTsGsCe1ghtDpCartan2OLBkE3PO4rcFChFq+a52v6+x5rStuh0DCWQ9lzLVUtZrZY0EiBIyhRbwFIg6VNiAYOGLLpFV2WQLlV3naxDkPSpmT0FgDKG5AwgdUoiTkbpa7nzjymJivEDJbQESCa20VoAAAAASUVORK5CYII=",
                        width: "20px",
                        height: "24px"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "appdownload__leftSide__2K_EM"
                },
                [e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6 appdownload__active__1p3Q_"
                },
                [e("img", {
                    staticClass: "appdownload__iphone1__d-ys5 appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/zh.362e9e141ea5be7505e921577983e622.png",
                        width: "698px",
                        "data-type": "zh"
                    }
                })]), this._v(" "), e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6"
                },
                [e("img", {
                    staticClass: "appdownload__iphone2__1KetS appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/tiyu.320cff4864a85c7829620bf8577082fc.png",
                        width: "698px",
                        "data-type": "ty"
                    }
                })]), this._v(" "), e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6"
                },
                [e("img", {
                    staticClass: "appdownload__iphone3__1mcq5 appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/cp.f7fd720b5960205cd8dfeaec4c048379.png",
                        width: "698px",
                        "data-type": "cp"
                    }
                })]), this._v(" "), e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6"
                },
                [e("img", {
                    staticClass: "appdownload__iphone3__1mcq5 appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/qp.07e41c5b711af6021e3cc2378e21b948.png",
                        width: "696px",
                        "data-type": "qp"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "appdownload__codeWrapper__3eWWV"
                },
                [e("img", {
                    staticClass: "appdownload__h5__2f17w",
                    staticStyle: {
                        "margin-left": "10px"
                    },
                    attrs: {
                        src: "/static/image/zhijiefangwen@2x.3dfa4abeebf46d64aea082e3d55560c1.png",
                        width: "126px"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "games__title__b8RO0"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/games_title.9badfadfc430eedb4aa92ad013ca2db8.png",
                        width: "408px"
                    }
                })])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("ul", [a("li", {
                    staticClass: "games__active__2El6O",
                    staticStyle: {
                        "background-image": "url(style/weixuanzhonganniu@2x.8a60ef2628ff583747d912ada4073a40.png)",
                        width: "166px",
                        transform: "translate(0px, 0px)",
                        opacity: "1"
                    },
                    attrs: {
                        id: "game-li-0"
                    }
                },
                [a("span", [t._v("体育赛事")]), a("img", {
                    attrs: {
                        src: "/static/image/xuanzhongtiyu@2x.876783ff5a66e88140ce3370a090dac7.png",
                        height: "40px"
                    }
                })]), t._v(" "), a("li", {
                    staticStyle: {
                        "background-image": "url(style/weixuanzhonganniu@2x.8a60ef2628ff583747d912ada4073a40.png)",
                        width: "166px",
                        transform: "translate(0px, 0px)",
                        opacity: "1"
                    },
                    attrs: {
                        id: "game-li-1"
                    }
                },
                [a("span", [t._v("电子竞技")]), a("img", {
                    attrs: {
                        src: "/static/image/weixuanzhongdianzijingji@2x.ac09f7ec18cbaf9e8f9b27586e3c6918.png",
                        height: "40px"
                    }
                })]), t._v(" "), a("li", {
                    staticStyle: {
                        "background-image": "url(style/weixuanzhonganniu@2x.8a60ef2628ff583747d912ada4073a40.png)",
                        width: "166px",
                        transform: "translate(0px, 0px)",
                        opacity: "1"
                    },
                    attrs: {
                        id: "game-li-2"
                    }
                },
                [a("span", [t._v("真人娱乐")]), a("img", {
                    attrs: {
                        src: "/static/image/weixuanzhongzhenren@2x.e72bd355569a0afc9bc6e27774e54fd5.png",
                        height: "40px"
                    }
                })]), t._v(" "), a("li", {
                    staticStyle: {
                        "background-image": "url(style/weixuanzhonganniu@2x.8a60ef2628ff583747d912ada4073a40.png)",
                        width: "166px",
                        transform: "translate(0px, 0px)",
                        opacity: "1"
                    },
                    attrs: {
                        id: "game-li-3"
                    }
                },
                [a("span", [t._v("棋牌游戏")]), a("img", {
                    attrs: {
                        src: "/static/image/weixuanzhongqipai@2x.e0475d86c580d8f1cbdf06818842fb95.png",
                        height: "40px"
                    }
                })]), t._v(" "), a("li", {
                    staticClass: "games__cp__15BKF",
                    staticStyle: {
                        "background-image": "url(style/weixuanzhonganniu@2x.8a60ef2628ff583747d912ada4073a40.png)",
                        width: "166px",
                        transform: "translate(0px, 0px)",
                        opacity: "1"
                    },
                    attrs: {
                        id: "game-li-4"
                    }
                },
                [a("span", [t._v("彩票投注")]), a("img", {
                    attrs: {
                        src: "/static/image/weixuanzhongcaipiao@2x.1d4c546588d5bc631c706d92b2988b1f.png",
                        height: "40px"
                    }
                })]), t._v(" "), a("li", {
                    staticClass: "games__dz__Jil0M",
                    staticStyle: {
                        "background-image": "url(style/weixuanzhonganniu@2x.8a60ef2628ff583747d912ada4073a40.png)",
                        width: "166px",
                        transform: "translate(0px, 0px)",
                        opacity: "1"
                    },
                    attrs: {
                        id: "game-li-5"
                    }
                },
                [a("span", [t._v("电子游艺")]), a("img", {
                    attrs: {
                        src: "/static/image/weixuanzhongdianziyouyi@2x.03b87e4b9f088d1ab2d9a5e80ebc68f9.png",
                        height: "40px"
                    }
                })])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "scrollLazy",
                    staticStyle: {
                        "min-height": "200px"
                    }
                },
                [a("div", {
                    staticClass: "service__container__3dzDR animation-show",
                    attrs: {
                        "animation-show": "true"
                    }
                },
                [a("div", [a("div", {
                    staticClass: "service__title__2cIjz"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/service.14acf2b8dc2752073524b2c00a851ad0.png",
                        height: "66px",
                        alt: ""
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "service__wapper__8M2NB",
                    attrs: {
                        id: "ob_service"
                    }
                },
                [a("div", {
                    staticClass: "service__service_con__1bXu2 animate_enter"
                },
                [a("div", {
                    staticClass: "service__service_item__2E99q",
                    staticStyle: {
                        "background-image": "url('https://senbackkg.salinent.com/main-consumer-web/assets-oss/ob/images/home/fuwuyouhuikapian@2x.d53c603fceac6d6dabd6b165df72f133.png?x-oss-process=image/resize,p_100/format,webp')"
                    }
                },
                [a("div", {
                    staticClass: "service__content__32sig"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/zhuanye@2x.9b0f3551ce8cf65a8a9852511ef3076f.png",
                        width: "100px",
                        alt: ""
                    }
                }), a("img", {
                    attrs: {
                        src: "/static/image/zy@2x.0bd872aea80eaaeb6863cbf91dfb31cf.png",
                        width: "80px",
                        alt: ""
                    }
                }), t._v(" "), a("p", [t._v("每天为您提供近千场精彩体育赛事，更有真人、棋牌、彩票、电子游戏等多种娱乐方式供您选择，让您拥有完美游戏体验！")])])])]), t._v(" "), a("div", {
                    staticClass: "service__service_con__1bXu2 animate_enter"
                },
                [a("div", {
                    staticClass: "service__service_item__2E99q",
                    staticStyle: {
                        "background-image": "url('https://senbackkg.salinent.com/main-consumer-web/assets-oss/ob/images/home/fuwuyouhuikapian@2x.d53c603fceac6d6dabd6b165df72f133.png?x-oss-process=image/resize,p_100/format,webp')"
                    }
                },
                [a("div", {
                    staticClass: "service__content__32sig"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/anquan@2x.f0b656cdad3ce8a42d7579555c425bf9.png",
                        width: "100px",
                        alt: ""
                    }
                }), a("img", {
                    attrs: {
                        src: "/static/image/aq@2x.063f9f9e5504bb214d45f5b7f519fa58.png",
                        width: "80px",
                        alt: ""
                    }
                }), t._v(" "), a("p", [t._v("独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最全面的安全保障，让您尽享娱乐、赛事投注，无后顾之忧！")])])])]), t._v(" "), a("div", {
                    staticClass: "service__service_con__1bXu2 animate_enter"
                },
                [a("div", {
                    staticClass: "service__service_item__2E99q",
                    staticStyle: {
                        "background-image": "url('https://senbackkg.salinent.com/main-consumer-web/assets-oss/ob/images/home/fuwuyouhuikapian@2x.d53c603fceac6d6dabd6b165df72f133.png?x-oss-process=image/resize,p_100/format,webp')"
                    }
                },
                [a("div", {
                    staticClass: "service__content__32sig"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/bainjie@2x.ddaa0144cce2ade3702424d103405ca8.png",
                        width: "100px",
                        alt: ""
                    }
                }), a("img", {
                    attrs: {
                        src: "/static/image/bj@2x.6ada770c7a5966276ddb4ecab006c193.png",
                        width: "80px",
                        alt: ""
                    }
                }), t._v(" "), a("p", [t._v("引领市场的卓越技术，自主研发了全套终端应用，让您畅享Web、H5，更有iOS、Android原生App，为您提供最精致的娱乐投注体验！")])])])]), t._v(" "), a("div", {
                    staticClass: "service__service_con__1bXu2 animate_enter"
                },
                [a("div", {
                    staticClass: "service__service_item__2E99q",
                    staticStyle: {
                        "background-image": "url('https://senbackkg.salinent.com/main-consumer-web/assets-oss/ob/images/home/fuwuyouhuikapian@2x.d53c603fceac6d6dabd6b165df72f133.png?x-oss-process=image/resize,p_100/format,webp')"
                    }
                },
                [a("div", {
                    staticClass: "service__content__32sig"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/kuaisu@2x.a730f5d36b02d490c8b25981f7d804c5.png",
                        width: "100px",
                        alt: ""
                    }
                }), a("img", {
                    attrs: {
                        src: "/static/image/ks@2x.63d0d1bc8fab87bea992ba0b97c5c262.png",
                        width: "80px",
                        alt: ""
                    }
                }), t._v(" "), a("p", [t._v("采用最新技术自主研发的财务处理系统，真正做到极速存、取、转。独家网络优化技术，为您提供一流的游戏体验，最大优化网络延迟！")])])])])])])])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("div", {
                    staticClass: "sidebar__qcode__2HvQg"
                }), this._v(" "), e("p", [this._v("二维码")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "ant-back-top",
                    staticStyle: {
                        opacity: "1",
                        transform: "translateX(0px)"
                    }
                },
                [e("div", {
                    staticClass: "sidebar__item__3ZxEn"
                },
                [e("div", [e("div", {
                    staticClass: "sidebar__gotop__2p1eZ"
                }), this._v(" "), e("p", [this._v("回到顶部")])])])])
            }]
        };
        var h = a("VU/8")(g, f, !1,
        function(t) {
            a("cumU")
        },
        "data-v-78dec126", null).exports,
        b = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "help__help__cLCx3"
                },
                [a("div", {
                    staticClass: "help__help_box__2kBjB help__clearfix__eGfiN"
                },
                [a("div", {
                    staticClass: "help__help_box_left__1rCP8"
                },
                [a("ul", {
                    staticClass: "help__parentUl__2pNA3"
                },
                [a("div", [a("li", {
                    attrs: {
                        "data-analytics": "menu",
                        "data-id": "1"
                    },
                    on: {
                        click: function(e) {
                            return t.changType(1)
                        }
                    }
                },
                [a("div", {
                    staticClass: "help__block__AtyXW",
                    staticStyle: {
                        display: "none"
                    }
                }), t._v(" "), t._m(0), t._v(" "), a("span", {
                    staticClass: "help__title__2KI0N"
                },
                [t._v("常见问题")])])]), t._v(" "), a("div", [a("li", {
                    attrs: {
                        "data-analytics": "menu",
                        "data-id": "1"
                    },
                    on: {
                        click: function(e) {
                            return t.changType(2)
                        }
                    }
                },
                [a("div", {
                    staticClass: "help__block__AtyXW",
                    staticStyle: {
                        display: "none"
                    }
                }), t._v(" "), t._m(1), t._v(" "), a("span", {
                    staticClass: "help__title__2KI0N"
                },
                [t._v("博彩责任")])])]), t._v(" "), a("div", [a("li", {
                    attrs: {
                        "data-analytics": "menu",
                        "data-id": "1"
                    },
                    on: {
                        click: function(e) {
                            return t.changType(3)
                        }
                    }
                },
                [a("div", {
                    staticClass: "help__block__AtyXW",
                    staticStyle: {
                        display: "none"
                    }
                }), t._v(" "), t._m(2), t._v(" "), a("span", {
                    staticClass: "help__title__2KI0N"
                },
                [t._v("隐私政策")])])]), t._v(" "), a("div", [a("li", {
                    attrs: {
                        "data-analytics": "menu",
                        "data-id": "1"
                    },
                    on: {
                        click: function(e) {
                            return t.changType(4)
                        }
                    }
                },
                [a("div", {
                    staticClass: "help__block__AtyXW",
                    staticStyle: {
                        display: "none"
                    }
                }), t._v(" "), t._m(3), t._v(" "), a("span", {
                    staticClass: "help__title__2KI0N"
                },
                [t._v("免责说明")])])]), t._v(" "), a("div", [a("li", {
                    attrs: {
                        "data-analytics": "menu",
                        "data-id": "1"
                    },
                    on: {
                        click: function(e) {
                            return t.changType(5)
                        }
                    }
                },
                [a("div", {
                    staticClass: "help__block__AtyXW",
                    staticStyle: {
                        display: "none"
                    }
                }), t._v(" "), t._m(4), t._v(" "), a("span", {
                    staticClass: "help__title__2KI0N"
                },
                [t._v("联络我们")])])])])]), t._v(" "), 1 == t.type ? a("div", {
                    staticClass: "help__help_box_right__3vJ4w",
                    staticStyle: {
                        position: "relative"
                    }
                },
                [a("div", [a("div", {
                    domProps: {
                        innerHTML: t._s(t.dataBox1.content)
                    }
                })])]) : t._e(), t._v(" "), 2 == t.type ? a("div", {
                    staticClass: "help__help_box_right__3vJ4w",
                    staticStyle: {
                        position: "relative"
                    }
                },
                [a("div", [a("div", {
                    domProps: {
                        innerHTML: t._s(t.dataBox8.content)
                    }
                })])]) : t._e(), t._v(" "), 3 == t.type ? a("div", {
                    staticClass: "help__help_box_right__3vJ4w",
                    staticStyle: {
                        position: "relative"
                    }
                },
                [a("div", [a("div", {
                    domProps: {
                        innerHTML: t._s(t.dataBox2.content)
                    }
                })])]) : t._e(), t._v(" "), 4 == t.type ? a("div", {
                    staticClass: "help__help_box_right__3vJ4w",
                    staticStyle: {
                        position: "relative"
                    }
                },
                [a("div", [a("div", {
                    domProps: {
                        innerHTML: t._s(t.dataBox3.content)
                    }
                })])]) : t._e(), t._v(" "), 5 == t.type ? a("div", {
                    staticClass: "help__help_box_right__3vJ4w",
                    staticStyle: {
                        position: "relative"
                    }
                },
                [a("div", [a("div", {
                    domProps: {
                        innerHTML: t._s(t.dataBox4.content)
                    }
                })])]) : t._e()])])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "help__titleImg__2hQCq"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1587555761884253.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "help__titleImg__2hQCq"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1587556756778694.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "help__titleImg__2hQCq"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1587555785235453.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "help__titleImg__2hQCq"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1587555761884253.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "help__titleImg__2hQCq"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1587557843086979.png"
                    }
                })])
            }]
        };
        var y = a("VU/8")({
            name: "abouts",
            data: function() {
                return {
                    type: 1,
                    dataBox1: {},
                    dataBox2: {},
                    dataBox3: {},
                    dataBox4: {},
                    dataBox5: {},
                    dataBox7: {},
                    dataBox8: {}
                }
            },
            created: function() {
                var t = this,
                e = t.$route.query;
                e.type && (t.type = e.type),
                [1, 2, 3, 4, 5, 7, 8].forEach(function(e) {
                    t.getAllCont(e)
                })
            },
            methods: {
                getAllCont: function(t) {
                    var e = this;
                    e.$parent.showLoading(),
                    e.$apiFun.post("/api/article", {
                        type: t
                    }).then(function(a) {
                        e["dataBox" + t] = a.data,
                        e.$parent.hideLoading()
                    }).
                    catch(function(t) {
                        e.$parent.hideLoading()
                    })
                },
                changType: function(t) {
                    this.type = t
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {},
            watch: {
                $route: {
                    immediate: !0,
                    handler: function() {
                        var t = this.$route.query;
                        t.type && (this.type = t.type)
                    }
                }
            }
        },
        b, !1,
        function(t) {
            a("qlWE")
        },
        "data-v-976a10a6", null).exports,
        w = {
            name: "realbet",
            data: function() {
                return {
                    type: 0
                }
            },
            created: function() {},
            methods: {
                changType: function(t) {
                    this.type = t
                }
            },
            mounted: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            updated: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            beforeDestroy: function() {}
        },
        x = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "venueStyle__pages__3golT undefined venueStyle__zr__2WRy_",
                    staticStyle: {
                        "background-image": "url(/static/image/bg.5858f002c2ae068f4d2657e4074dc97f.jpg)",
                        height: "100%"
                    }
                },
                [t.$store.state.realbetList.length > 0 ? a("div", {
                    staticClass: "venueStyle__content__37kNp"
                },
                [t._l(t.$store.state.realbetList,
                function(e, s) {
                    return t.type == s ? a("div", {
                        key: s,
                        staticClass: "venueStyle__contentLeft__3bmvb"
                    },
                    [a("img", {
                        staticClass: "venueStyle__title__K3KhH",
                        staticStyle: {
                            width: "450px",
                            "min-height": "124px",
                            opacity: "1",
                            "margin-left": "0px"
                        },
                        attrs: {
                            src: e.api_logo_img,
                            width: "450px"
                        }
                    }), t._m(0, !0), t._v(" "), a("a", {
                        staticClass: "gotogames",
                        attrs: {
                            id: "gotogames"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "venueStyle__btn__HuPwB",
                        staticStyle: {
                            "margin-top": "25px",
                            "margin-left": "-3px"
                        },
                        attrs: {
                            src: "/static/image/btn.1cfd2c8e17e20f1631dd11d7504e717d.png",
                            width: "176px"
                        }
                    })])]) : t._e()
                }), t._v(" "), a("div", {
                    staticClass: "venueStyle__models__zXaM0"
                },
                [a("img", {
                    staticClass: "myImg",
                    staticStyle: {
                        "margin-left": "-28px",
                        opacity: "1"
                    },
                    attrs: {
                        src: "/static/image/realbet/" + t.type + ".png",
                        width: "800px"
                    }
                })]), t._v(" "), a("ul", {
                    staticClass: "venueStyle__tabs__3wTus",
                    staticStyle: {
                        "margin-left": "-132px"
                    }
                },
                t._l(t.$store.state.realbetList,
                function(e, s) {
                    return a("li", {
                        key: s,
                        staticClass: "venueStyle__tabItem__11CR_",
                        on: {
                            click: function(e) {
                                return t.changType(s)
                            }
                        }
                    },
                    [t.type == s ? a("img", {
                        attrs: {
                            src: e.check_yes_img,
                            width: "180px"
                        }
                    }) : a("img", {
                        attrs: {
                            src: e.check_no_img,
                            width: "180px"
                        }
                    })])
                }), 0), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img1",
                    staticStyle: {
                        left: "-201px",
                        top: "94px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-1.c2c95beac7b57cad2e6711b6c97ea63a.png",
                        width: "72px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anmTwo__1r2lK xf_img2",
                    staticStyle: {
                        left: "235px",
                        top: "664px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-2.0ba124fbac5f79fc4f688870dcd6c251.png",
                        width: "68px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img3",
                    staticStyle: {
                        left: "552px",
                        top: "377px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-3.35306cd51b3a351d3dea16f7d0b41a51.png",
                        width: "46px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anmTwo__1r2lK xf_img4",
                    staticStyle: {
                        left: "992px",
                        top: "186px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-4.8bb599d862699b9f8ee9adf07fa91368.png",
                        width: "66px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img5",
                    staticStyle: {
                        left: "1028px",
                        top: "577px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-5.a3d992b84fa2530cd3c9f6a5003ac1bb.png",
                        width: "92px"
                    }
                })], 2) : t._e()])])])
            },
            staticRenderFns: [function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("span", {
                    staticClass: "venueStyle__subTitle__2nKwg"
                },
                [t._v("业内独家多机位百家乐真人游戏，惊艳、美丽、专业的荷官，高清真实的现场环境，为您呈现奢华游戏体验！\n            "), a("ul", {
                    staticClass: "venueStyle__icons__kTABJ"
                },
                [a("li", {
                    staticClass: "venueStyle__iconItem__26QEL"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/icon-1.a22b97f337ffbc181e0a62558dc609b6.png",
                        width: "30px"
                    }
                }), a("span", {
                    staticClass: "venueStyle__iconText__3-V_q"
                },
                [t._v("百家乐")])]), t._v(" "), a("li", {
                    staticClass: "venueStyle__iconItem__26QEL"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/icon-2.589a9db6ce0a5e965a797843c7e27ced.png",
                        width: "30px"
                    }
                }), a("span", {
                    staticClass: "venueStyle__iconText__3-V_q"
                },
                [t._v("龙虎")])]), t._v(" "), a("li", {
                    staticClass: "venueStyle__iconItem__26QEL"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/icon-3.9aa174e9d05f2451283fa8220678554e.png",
                        width: "30px"
                    }
                }), a("span", {
                    staticClass: "venueStyle__iconText__3-V_q"
                },
                [t._v("骰宝")])]), t._v(" "), a("li", {
                    staticClass: "venueStyle__iconItem__26QEL"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/icon-4.e2a168915d33fdef12434ac275146c8f.png",
                        width: "30px"
                    }
                }), a("span", {
                    staticClass: "venueStyle__iconText__3-V_q"
                },
                [t._v("轮盘")])]), t._v(" "), a("li", {
                    staticClass: "venueStyle__iconItem__26QEL"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/icon-5.70e44006894fa46044ff62ff22b4a429.png",
                        width: "30px"
                    }
                }), a("span", {
                    staticClass: "venueStyle__iconText__3-V_q"
                },
                [t._v("牛牛")])]), t._v(" "), a("li", {
                    staticClass: "venueStyle__iconItem__26QEL"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/icon-6.2890aaa13864842c47bc689e6996e904.png",
                        width: "30px"
                    }
                }), a("span", {
                    staticClass: "venueStyle__iconText__3-V_q"
                },
                [t._v("炸金花")])])])])
            }]
        };
        var C = a("VU/8")(w, x, !1,
        function(t) {
            a("u2Bv")
        },
        "data-v-a2007bea", null).exports,
        k = {
            name: "sport",
            data: function() {
                return {
                    type: 0
                }
            },
            created: function() {},
            methods: {
                changType: function(t) {
                    this.type = t
                }
            },
            mounted: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            updated: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            beforeDestroy: function() {}
        },
        S = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "venueStyle__pages__3golT undefined venueStyle__ty__3em5P",
                    staticStyle: {
                        "background-image": "url(/static/image/bg.ad71d5e9d0a5ee6c91cc85f3664b5c43.jpg)",
                        height: "800px"
                    }
                },
                [t.$store.state.sportList.length > 0 ? a("div", {
                    staticClass: "venueStyle__content__37kNp"
                },
                [t._l(t.$store.state.sportList,
                function(e, s) {
                    return t.type == s ? a("div", {
                        key: s,
                        staticClass: "venueStyle__contentLeft__3bmvb"
                    },
                    [a("img", {
                        staticClass: "venueStyle__title__K3KhH",
                        staticStyle: {
                            width: "450px",
                            "min-height": "124px",
                            opacity: "1",
                            "margin-left": "0px"
                        },
                        attrs: {
                            src: e.api_logo_img,
                            width: "449.2px"
                        }
                    }), t._m(0, !0), t._v(" "), a("a", {
                        staticClass: "gotogames",
                        attrs: {
                            id: "gotogames"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "venueStyle__btn__HuPwB",
                        staticStyle: {
                            "margin-top": "25px",
                            "margin-left": "-3px"
                        },
                        attrs: {
                            src: "/static/image/btn.1cfd2c8e17e20f1631dd11d7504e717d.png",
                            width: "176px"
                        }
                    })])]) : t._e()
                }), t._v(" "), a("div", {
                    staticClass: "venueStyle__models__zXaM0"
                },
                [a("img", {
                    staticStyle: {
                        "margin-left": "-28px",
                        opacity: "1"
                    },
                    attrs: {
                        src: "/static/image/sport/" + t.type + ".png",
                        width: "800px"
                    }
                })]), t._v(" "), a("ul", {
                    staticClass: "venueStyle__tabs__3wTus",
                    staticStyle: {
                        "margin-left": "-132px"
                    }
                },
                t._l(t.$store.state.sportList,
                function(e, s) {
                    return a("li", {
                        key: s,
                        staticClass: "venueStyle__tabItem__11CR_",
                        on: {
                            click: function(e) {
                                return t.changType(s)
                            }
                        }
                    },
                    [t.type == s ? a("img", {
                        attrs: {
                            src: e.check_yes_img,
                            width: "180px"
                        }
                    }) : a("img", {
                        attrs: {
                            src: e.check_no_img,
                            width: "180px"
                        }
                    })])
                }), 0), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img1",
                    staticStyle: {
                        left: "-108px",
                        top: "606px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-1.e2d93640f3456429c6182d1aac07e3c8.png",
                        width: "124px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anmTwo__1r2lK xf_img2",
                    staticStyle: {
                        left: "1390px",
                        top: "645px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-2.43bc2a0d8aa959e723f9f74fe387cf72.png",
                        width: "92px"
                    }
                })], 2) : t._e()])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "venueStyle__subTitle__2nKwg"
                },
                [this._v("倾力打造的刺激火爆的体育娱乐游戏，每天为您提供千场精彩体育赛事，多种娱乐方式选择，让您拥有完美游戏体验。\n            "), e("ul", {
                    staticClass: "venueStyle__icons__kTABJ"
                })])
            }]
        };
        var I = a("VU/8")(k, S, !1,
        function(t) {
            a("qGo2")
        },
        "data-v-f6caee4e", null).exports,
        L = {
            name: "gaming",
            data: function() {
                return {
                    type: 0
                }
            },
            created: function() {},
            methods: {
                changType: function(t) {
                    this.type = t
                }
            },
            mounted: function() {
                $(".venueStyle__modelsDj__30CtN img").css({
                    "margin-left": "-264px"
                }),
                $(".venueStyle__modelsDj__30CtN img").animate({
                    "margin-left": "0px"
                },
                400),
                $(".venueStyle__models__zXaM0 img").css({
                    right: "-500px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    right: "-240px"
                },
                400),
                $(".venueStyle__title__K3KhH").hide(200),
                $(".venueStyle__title__K3KhH").show(200)
            },
            updated: function() {
                $(".venueStyle__modelsDj__30CtN img").css({
                    "margin-left": "-264px"
                }),
                $(".venueStyle__modelsDj__30CtN img").animate({
                    "margin-left": "0px"
                },
                400),
                $(".venueStyle__models__zXaM0 img").css({
                    right: "-500px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    right: "-240px"
                },
                400),
                $(".venueStyle__title__K3KhH").hide(200),
                $(".venueStyle__title__K3KhH").show(200)
            },
            beforeDestroy: function() {}
        },
        T = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "venueStyle__pages__3golT undefined venueStyle__dj__3onOP",
                    staticStyle: {
                        "background-image": "url(/static/image/bg-ob.de4eacec841b7bb8ea0a3e5dede4bcdc.jpg)",
                        height: "800px"
                    }
                },
                [a("img", {
                    staticClass: "venueStyle__djBg__2BW34",
                    staticStyle: {
                        opacity: "1"
                    },
                    attrs: {
                        src: "/static/image/gaming/" + t.type + ".png",
                        height: "100%"
                    }
                }), t._v(" "), t._l(t.$store.state.gamingList,
                function(e, s) {
                    return t.type == s ? a("div", {
                        key: s,
                        staticClass: "venueStyle__content__37kNp"
                    },
                    [a("div", {
                        staticClass: "venueStyle__modelsDj__30CtN"
                    },
                    [a("img", {
                        staticStyle: {
                            left: "-261px",
                            opacity: "1",
                            zoom: "1"
                        },
                        attrs: {
                            src: "/static/image/gaming/" + t.type + "_gaming_left.png",
                            width: "800px"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "venueStyle__contentLeft__3bmvb"
                    },
                    [a("img", {
                        staticClass: "venueStyle__title__K3KhH",
                        staticStyle: {
                            width: "450px",
                            "min-height": "120px",
                            opacity: "1",
                            "margin-left": "0px"
                        },
                        attrs: {
                            src: e.api_logo_img,
                            width: "630px"
                        }
                    }), a("img", {
                        staticClass: "venueStyle__apng__ppVvF",
                        staticStyle: {
                            "z-index": "3"
                        },
                        attrs: {
                            src: "/static/image/anm-ob-1.a8f00566894e5e6da6e0d5a595278bc7.png"
                        }
                    }), a("img", {
                        staticClass: "venueStyle__apng__ppVvF",
                        staticStyle: {
                            "z-index": "-1"
                        },
                        attrs: {
                            src: "/static/image/anm-ob-2.6bd188c6fd7022b9036f66ba0476ba85.png"
                        }
                    }), t._m(0, !0), t._v(" "), a("a", {
                        attrs: {
                            id: "gotogames"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "venueStyle__btn__HuPwB",
                        staticStyle: {
                            "margin-top": "18px",
                            "margin-bottom": "11px"
                        },
                        attrs: {
                            src: "/static/image/btn.6ae85c77b9899a7e4590b47da7b41266.png",
                            width: "342px"
                        }
                    })]), t._v(" "), t._m(1, !0)]), t._v(" "), a("div", {
                        staticClass: "venueStyle__models__zXaM0"
                    },
                    [a("img", {
                        staticStyle: {
                            right: "-240px",
                            opacity: "1",
                            zoom: "1"
                        },
                        attrs: {
                            src: "/static/image/gaming/" + t.type + "_gaming_right.png",
                            width: "800px"
                        }
                    })]), t._v(" "), a("ul", {
                        staticClass: "venueStyle__tabs__3wTus"
                    },
                    t._l(t.$store.state.gamingList,
                    function(e, s) {
                        return a("li", {
                            key: s,
                            staticClass: "venueStyle__tabItem__11CR_",
                            on: {
                                click: function(e) {
                                    return t.changType(s)
                                }
                            }
                        },
                        [t.type == s ? a("img", {
                            attrs: {
                                src: e.check_yes_img,
                                width: "212px"
                            }
                        }) : a("img", {
                            attrs: {
                                src: e.check_no_img,
                                width: "212px"
                            }
                        })])
                    }), 0)]) : t._e()
                })], 2)])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "venueStyle__subTitle__2nKwg"
                },
                [this._v("丰富的电竞赛事，玩法多元，结算快捷。高清直播让您体验精彩热血竞技，是最受玩家喜爱的竞猜娱乐平台。\n            "), e("ul", {
                    staticClass: "venueStyle__icons__kTABJ"
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("img", {
                    attrs: {
                        src: "/static/image/logos.d5c2cb0861129c60db8fbec3508a45c7.png",
                        width: "487px"
                    }
                })])
            }]
        };
        var z = a("VU/8")(L, T, !1,
        function(t) {
            a("IdL3")
        },
        "data-v-0d72bbf9", null).exports,
        q = {
            name: "joker",
            data: function() {
                return {
                    type: 0
                }
            },
            created: function() {},
            methods: {
                changType: function(t) {
                    this.type = t
                }
            },
            mounted: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            updated: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            beforeDestroy: function() {}
        },
        j = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "venueStyle__pages__3golT undefined venueStyle__ty__3em5P",
                    staticStyle: {
                        "background-image": "url(/static/image/bg.ad71d5e9d0a5ee6c91cc85f3664b5c43.jpg)",
                        height: "900px",
                        "padding-top": "20px"
                    }
                },
                [t.$store.state.jokerList.length > 0 ? a("div", {
                    staticClass: "venueStyle__content__37kNp"
                },
                [t._l(t.$store.state.jokerList,
                function(e, s) {
                    return t.type == s ? a("div", {
                        key: s,
                        staticClass: "venueStyle__contentLeft__3bmvb"
                    },
                    [a("img", {
                        staticClass: "venueStyle__title__K3KhH",
                        staticStyle: {
                            width: "450px",
                            "min-height": "124px",
                            opacity: "1",
                            "margin-left": "0px"
                        },
                        attrs: {
                            src: e.api_logo_img,
                            width: "449.2px"
                        }
                    }), t._m(0, !0), t._v(" "), a("a", {
                        staticClass: "gotogames",
                        attrs: {
                            id: "gotogames"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "venueStyle__btn__HuPwB",
                        staticStyle: {
                            "margin-top": "25px",
                            "margin-left": "-3px"
                        },
                        attrs: {
                            src: "/static/image/btn.1cfd2c8e17e20f1631dd11d7504e717d.png",
                            width: "176px"
                        }
                    })])]) : t._e()
                }), t._v(" "), a("div", {
                    staticClass: "venueStyle__models__zXaM0"
                },
                [a("img", {
                    staticStyle: {
                        "margin-left": "-28px",
                        opacity: "1"
                    },
                    attrs: {
                        src: "/static/image/joker/" + t.type + ".png",
                        width: "800px"
                    }
                })]), t._v(" "), a("ul", {
                    staticClass: "venueStyle__tabs__3wTus",
                    staticStyle: {
                        "margin-left": "-332px"
                    }
                },
                t._l(t.$store.state.jokerList,
                function(e, s) {
                    return a("li", {
                        key: s,
                        staticClass: "venueStyle__tabItem__11CR_",
                        on: {
                            click: function(e) {
                                return t.changType(s)
                            }
                        }
                    },
                    [t.type == s ? a("img", {
                        attrs: {
                            src: e.check_yes_img,
                            width: "180px"
                        }
                    }) : a("img", {
                        attrs: {
                            src: e.check_no_img,
                            width: "180px"
                        }
                    })])
                }), 0), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img1",
                    staticStyle: {
                        left: "-200px",
                        top: "90px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-1.d67963ba7ab17ddf2fbd46d1c35ba3fd.png",
                        width: "68px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anmTwo__1r2lK xf_img2",
                    staticStyle: {
                        left: "533px",
                        top: "233px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-2.1b95e7435c816c6c18081e735c02608b.png",
                        width: "64px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img3",
                    staticStyle: {
                        left: "1420px",
                        top: "692px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-3.86fbdb9702edb9d41676c604c1fdbbcd.png",
                        width: "66px"
                    }
                })], 2) : t._e()])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "venueStyle__subTitle__2nKwg"
                },
                [this._v("热门经典任君选择，真实万人同台，竞技娱乐爽快，快乐所在！\n            "), e("ul", {
                    staticClass: "venueStyle__icons__kTABJ"
                })])
            }]
        };
        var P = a("VU/8")(q, j, !1,
        function(t) {
            a("vtem")
        },
        "data-v-08625250", null).exports,
        E = {
            name: "index",
            data: function() {
                return {
                    gamecode: null,
                    obgdyList: [],
                    fgdzList: [],
                    ppList: [],
                    aeList: []
                }
            },
            created: function() {
                this.$route.query && (this.gamecode = this.$route.query.type || this.gamecode),
                this.gamelistBycode()
            },
            methods: {
                changgamecode: function(t) {
                    t != this.gamecode && (this.gamecode = t, this.gamelistBycode())
                },
                gamelistBycode: function() {
                    var t = this;
                    if (t.gamecode) {
                        var e = t.gamecode + "List";
                        t[e].length > 0 || (t.$parent.showLoading(), t.$apiFun.post("/api/gamelistBycode", {
                            gamecode: t.gamecode
                        }).then(function(a) {
                            console.log(a),
                            200 != a.code && t.$parent.showTost(0, a.message),
                            200 == a.code && (t[e] = a.data),
                            setTimeout(function() {
                                t.$parent.hideLoading()
                            },
                            2e3)
                        }).
                        catch(function(e) {
                            t.$parent.hideLoading()
                        }))
                    }
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        B = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "eGameStyle__egame__E5AS4"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "eGameStyle__egame_content__k3HLh"
                },
                [a("div", {
                    staticClass: "eGameStyle__content__n6sh5",
                    staticStyle: {
                        "z-index": "18"
                    }
                },
                [a("div", {
                    staticClass: "eGameStyle__headerWrapper__w0XEc"
                },
                [a("ul", [a("li", {
                    class: null == t.gamecode ? "eGameStyle__active__18JhP": "",
                    on: {
                        click: function(e) {
                            return t.changgamecode(null)
                        }
                    }
                },
                [a("span", [t._v("全部游戏")])]), t._v(" ")/*, a("li", {
                    class: "obgdy" == t.gamecode ? "eGameStyle__active__18JhP": "",
                    on: {
                        click: function(e) {
                            return t.changgamecode("obgdy")
                        }
                    }
                },
                [a("span", [t._v("OB电子")])]), t._v(" "), a("li", {
                    class: "fgdz" == t.gamecode ? "eGameStyle__active__18JhP": "",
                    on: {
                        click: function(e) {
                            return t.changgamecode("fgdz")
                        }
                    }
                },
                [a("span", [t._v("FG电子")])]), t._v(" "), a("li", {
                    class: "pp" == t.gamecode ? "eGameStyle__active__18JhP": "",
                    on: {
                        click: function(e) {
                            return t.changgamecode("pp")
                        }
                    }
                },
                [a("span", [t._v("PP电子")])]), t._v(" "), a("li", {
                    class: "ae" == t.gamecode ? "eGameStyle__active__18JhP": "",
                    on: {
                        click: function(e) {
                            return t.changgamecode("ae")
                        }
                    }
                },
                [a("span", [t._v("AE电子")])])*/])]), t._v(" "), a("div", {
                    staticClass: "eGameStyle__pager__M8cuD"
                },
                [null == t.gamecode ? a("ul", {
                    staticClass: "onshow",
                    staticStyle: {
                        display: "flex"
                    }
                },
                t._l(t.$store.state.conciseList,
                function(e, s) {
                    return a("li", {
                        key: s
                    },
                    [a("section", {
                        staticClass: "eGameStyle__game_section__3uTgc"
                    },
                    [a("div", {
                        staticClass: "eGameStyle__game__2G7z7"
                    },
                    [a("img", {
                        attrs: {
                            src: e.api_logo_img,
                            height: "130px"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_text__1XVw5"
                    },
                    [a("span", [t._v(t._s(e.name) + " ")])]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_cover__2OtQU"
                    },
                    [a("button", {
                        staticClass: "eGameStyle__play_button__2duIt",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [t._v("立即游戏")])])])])
                }), 0) : t._e(), t._v(" "), "obgdy" == t.gamecode ? a("ul", {
                    staticClass: "noshow",
                    staticStyle: {
                        display: "flex"
                    }
                },
                t._l(t.obgdyList,
                function(e, s) {
                    return a("li", {
                        key: s
                    },
                    [a("section", {
                        staticClass: "eGameStyle__game_section__3uTgc"
                    },
                    [a("div", {
                        staticClass: "eGameStyle__game__2G7z7"
                    },
                    [a("img", {
                        attrs: {
                            src: e.gamepic,
                            height: "130px"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_text__1XVw5"
                    },
                    [a("span", [t._v(" " + t._s(e.gamename))])]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_cover__2OtQU"
                    },
                    [a("button", {
                        staticClass: "eGameStyle__play_button__2duIt",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.catecode, e.gamecode, "")
                            }
                        }
                    },
                    [t._v("立即游戏")])])])])
                }), 0) : t._e(), t._v(" "), "fgdz" == t.gamecode ? a("ul", {
                    staticClass: "noshow",
                    staticStyle: {
                        display: "flex"
                    }
                },
                t._l(t.fgdzList,
                function(e, s) {
                    return a("li", {
                        key: s
                    },
                    [a("section", {
                        staticClass: "eGameStyle__game_section__3uTgc"
                    },
                    [a("div", {
                        staticClass: "eGameStyle__game__2G7z7"
                    },
                    [a("img", {
                        attrs: {
                            src: e.gamepic,
                            height: "130px"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_text__1XVw5"
                    },
                    [a("span", [t._v(" " + t._s(e.gamename))])]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_cover__2OtQU"
                    },
                    [a("button", {
                        staticClass: "eGameStyle__play_button__2duIt",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.catecode, e.gamecode, "")
                            }
                        }
                    },
                    [t._v("立即游戏")])])])])
                }), 0) : t._e(), t._v(" "), "pp" == t.gamecode ? a("ul", {
                    staticClass: "noshow",
                    staticStyle: {
                        display: "flex"
                    }
                },
                t._l(t.ppList,
                function(e, s) {
                    return a("li", {
                        key: s
                    },
                    [a("section", {
                        staticClass: "eGameStyle__game_section__3uTgc"
                    },
                    [a("div", {
                        staticClass: "eGameStyle__game__2G7z7"
                    },
                    [a("img", {
                        attrs: {
                            src: e.gamepic,
                            height: "130px"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_text__1XVw5"
                    },
                    [a("span", [t._v(" " + t._s(e.gamename))])]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_cover__2OtQU"
                    },
                    [a("button", {
                        staticClass: "eGameStyle__play_button__2duIt",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.catecode, e.gamecode, "")
                            }
                        }
                    },
                    [t._v("立即游戏")])])])])
                }), 0) : t._e(), t._v(" "), "ae" == t.gamecode ? a("ul", {
                    staticClass: "noshow",
                    staticStyle: {
                        display: "flex"
                    }
                },
                t._l(t.aeList,
                function(e, s) {
                    return a("li", {
                        key: s
                    },
                    [a("section", {
                        staticClass: "eGameStyle__game_section__3uTgc"
                    },
                    [a("div", {
                        staticClass: "eGameStyle__game__2G7z7"
                    },
                    [a("img", {
                        attrs: {
                            src: e.gamepic,
                            height: "130px"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_text__1XVw5"
                    },
                    [a("span", [t._v(" " + t._s(e.gamename))])]), t._v(" "), a("div", {
                        staticClass: "eGameStyle__game_cover__2OtQU"
                    },
                    [a("button", {
                        staticClass: "eGameStyle__play_button__2duIt",
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.catecode, e.gamecode, "")
                            }
                        }
                    },
                    [t._v("立即游戏")])])])])
                }), 0) : t._e()])])])])])])
            },
            staticRenderFns: [function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "eGameStyle__header__3Vlt9"
                },
                [a("div", {
                    staticClass: "egameStyle__banner__2qo9-"
                },
                [a("div", {
                    staticClass: "egameStyle__banner_img__2lHHx",
                    staticStyle: {
                        "background-image": "url('/static/image/beijing.webp')",
                    }
                },
                [a("div", {
                    staticClass: "egameStyle__imgBanner__2VpzZ",
                    staticStyle: {
                        "background-image": "url('/static/image/beijing.webp')",
                        width: "1920px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "egameStyle__numGroup__1D1nc",
                    staticStyle: {
                        "background-image": "url('/static/image/beijing2.webp')",
                    }
                },
                [a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-440px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-385px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-277px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-223px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-223px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-440px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-115px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-61px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-385px"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "egameStyle__numItem__1-2Zp"
                },
                [a("span", {
                    staticClass: "egameStyle__numitemNum__3mM7j",
                    staticStyle: {
                        "background-position-y": "-115px"
                    }
                })])])])])])
            }]
        };
        var Q = a("VU/8")(E, B, !1,
        function(t) {
            a("we7j")
        },
        "data-v-82f08d88", null).exports,
        D = {
            name: "lottery",
            data: function() {
                return {
                    type: 0
                }
            },
            created: function() {},
            methods: {
                changType: function(t) {
                    this.type = t
                }
            },
            mounted: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            updated: function() {
                $(".venueStyle__title__K3KhH ").css({
                    "margin-left": "-68px"
                }),
                $(".venueStyle__title__K3KhH ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".gotogames img ").css({
                    "margin-left": "-128px"
                }),
                $(".gotogames img ").animate({
                    "margin-left": "-0px"
                },
                400),
                $(".venueStyle__subTitle__2nKwg ").css({
                    "margin-left": "-128px"
                }),
                $(".venueStyle__subTitle__2nKwg ").animate({
                    "margin-left": "-0px"
                },
                200),
                $(".venueStyle__models__zXaM0 img").css({
                    "margin-left": "-28px"
                }),
                $(".venueStyle__models__zXaM0 img").animate({
                    "margin-left": "-108px"
                },
                400)
            },
            beforeDestroy: function() {}
        },
        N = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "venueStyle__pages__3golT undefined venueStyle__ty__3em5P",
                    staticStyle: {
                        "background-image": "url(/static/image/bg.ad71d5e9d0a5ee6c91cc85f3664b5c43.jpg)",
                        height: "800px"
                    }
                },
                [t.$store.state.lotteryList.length > 0 ? a("div", {
                    staticClass: "venueStyle__content__37kNp"
                },
                [t._l(t.$store.state.lotteryList,
                function(e, s) {
                    return t.type == s ? a("div", {
                        key: s,
                        staticClass: "venueStyle__contentLeft__3bmvb"
                    },
                    [a("img", {
                        staticClass: "venueStyle__title__K3KhH",
                        staticStyle: {
                            width: "450px",
                            "min-height": "124px",
                            opacity: "1",
                            "margin-left": "0px"
                        },
                        attrs: {
                            src: e.api_logo_img,
                            width: "449.2px"
                        }
                    }), t._m(0, !0), t._v(" "), a("a", {
                        staticClass: "gotogames",
                        attrs: {
                            id: "gotogames"
                        },
                        on: {
                            click: function(a) {
                                return t.$parent.openGamePage(e.platform_name, e.game_code, e.category_id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "venueStyle__btn__HuPwB",
                        staticStyle: {
                            "margin-top": "25px",
                            "margin-left": "-3px"
                        },
                        attrs: {
                            src: "/static/image/btn.1cfd2c8e17e20f1631dd11d7504e717d.png",
                            width: "176px"
                        }
                    })])]) : t._e()
                }), t._v(" "), a("div", {
                    staticClass: "venueStyle__models__zXaM0"
                },
                [a("img", {
                    staticStyle: {
                        "margin-left": "-28px",
                        opacity: "1"
                    },
                    attrs: {
                        src: "/static/image/lottery/" + t.type % 3 + ".png",
                        width: "800px"
                    }
                })]), t._v(" "), a("ul", {
                    staticClass: "venueStyle__tabs__3wTus",
                    staticStyle: {
                        "margin-left": "-132px"
                    }
                },
                t._l(t.$store.state.lotteryList,
                function(e, s) {
                    return a("li", {
                        key: s,
                        staticClass: "venueStyle__tabItem__11CR_",
                        on: {
                            click: function(e) {
                                return t.changType(s)
                            }
                        }
                    },
                    [t.type == s ? a("img", {
                        attrs: {
                            src: e.check_yes_img,
                            width: "180px"
                        }
                    }) : a("img", {
                        attrs: {
                            src: e.check_no_img,
                            width: "180px"
                        }
                    })])
                }), 0), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img1",
                    staticStyle: {
                        left: "476px",
                        top: "105px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-1.d0e64c5d9fd540a1f25a656de257a401.png",
                        width: "120px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anmTwo__1r2lK xf_img2",
                    staticStyle: {
                        left: "611px",
                        top: "212px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-2.bbb58f7a43dc0352e1530b268f5acbae.png",
                        width: "64px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anm__3WJmq xf_img3",
                    staticStyle: {
                        left: "936px",
                        top: "103px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-3.ec4795248988cc8a3ed653531aa6cd3a.png",
                        width: "64px"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "venueStyle__anmTwo__1r2lK xf_img4",
                    staticStyle: {
                        left: "999px",
                        top: "171px"
                    },
                    attrs: {
                        src: "/static/image/anm-ob-4.1fad548a4ab1420cc072472677e1bc72.png",
                        width: "70px"
                    }
                })], 2) : t._e()])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "venueStyle__subTitle__2nKwg"
                },
                [this._v("顶尖旗舰平台，最全热门彩种，玩法多样操作简洁，实时助运，稳添好彩！\n            "), e("ul", {
                    staticClass: "venueStyle__icons__kTABJ"
                })])
            }]
        };
        var A = a("VU/8")(D, N, !1,
        function(t) {
            a("9xLq")
        },
        "data-v-7e86705b", null).exports,
        U = {
            name: "activity",
            data: function() {
                return {
                    activitytypeList: [],
                    actType: "",
                    activitylistList: [],
                    imgList: ["/static/image/11.png", "/static/image/22.png", "/static/image/33.png", "/static/image/44.png", "/static/image/55.png", "/static/image/66.png", "/static/image/77.png", "/static/image/88.png"]
                }
            },
            created: function() {
                this.activitytype(),
                this.activitylist()
            },
            methods: {
                activitytype: function() {
                    var t = this;
                    t.$apiFun.post("/api/activitytype", {}).then(function(e) {
                        console.log(e),
                        200 !== e.code && t.$parent.showTost(0, e.message),
                        200 === e.code && (t.activitytypeList = e.data)
                    })
                },
                activitylist: function() {
                    var t = this,
                    e = "" == t.actType ? {}: {
                        type: t.actType
                    };
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/activitylist", e).then(function(e) {
                        console.log(e),
                        200 !== e.code && t.$parent.showTost(0, e.message),
                        200 === e.code && (t.activitylistList = e.data.data),
                        t.$parent.hideLoading()
                    })
                },
                changActType: function(t) {
                    t != this.actType && (this.actType = t, this.activitylist())
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        F = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "preferentialActivity__promoPage__yhEHq"
                },
                [a("div", {
                    staticClass: "preferentialActivity__activityBox__3o22k",
                    staticStyle: {
                        "background-image": "url('/static/image/b70ef7d781664dcf8ba63f2d7141f939.jpg')",
                        "background-repeat": "repeat-y",
                        "background-size": "100%"
                    }
                },
                [a("img", {
                    staticClass: "preferentialActivity__imgBanner__2nt2m",
                    attrs: {
                        src: "/static/image/2241be3282a94d84b76fbd35fcf3aae8.png",
                        width: "1920px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "preferentialActivity__innerBox__1svDM"
                },
                [a("div", {
                    staticClass: "preferentialActivity__content__UMK1C undefined"
                },
                [a("div", [a("ul", {
                    staticClass: "preferentialActivity__tab__3e2JQ"
                },
                [a("li", {
                    class: "" == t.actType ? "preferentialActivity__active__3GZpm": "",
                    on: {
                        click: function(e) {
                            return t.changActType("")
                        }
                    }
                },
                [a("img", {
                    attrs: {
                        src: t.imgList[0],
                        height: "unknow"
                    }
                }), t._v("全部优惠")]), t._v(" "), t._l(t.activitytypeList,
                function(e, s) {
                    return a("li", {
                        key: s,
                        class: t.actType == e.id ? "preferentialActivity__active__3GZpm": "",
                        on: {
                            click: function(a) {
                                return t.changActType(e.id)
                            }
                        }
                    },
                    [a("img", {
                        attrs: {
                            src: t.imgList[s + 1],
                            height: "unknow"
                        }
                    }), t._v(t._s(e.name))])
                })], 2)]), t._v(" "), a("div", {
                    staticClass: "preferentialActivity__wrap__1LC3I undefined"
                },
                [a("ul", {
                    staticClass: "preferentialActivity__acyivityList__3l7jF common__clearfix__28XIR"
                },
                t._l(t.activitylistList,
                function(e, s) {
                    return a("li", {
                        key: s,
                        on: {
                            click: function(a) {
                                return t.$parent.goNav("/activityInfo?id=" + e.id)
                            }
                        }
                    },
                    [a("img", {
                        staticClass: "preferentialActivity__activityTag__2AF1_",
                        attrs: {
                            src: "/static/image/zx.24788ea9a4c53a563601b90cc69e94da.png",
                            width: "unknow"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "preferentialActivity__imgBox__FENnL undefined"
                    },
                    [a("p", [a("img", {
                        attrs: {
                            src: e.banner,
                            width: "360px",
                            height: "224px"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "preferentialActivity__itemText__1l0uB"
                    },
                    [a("p", {
                        staticClass: "preferentialActivity__title__oKsn_",
                        attrs: {
                            title: e.title
                        }
                    },
                    [t._v(t._s(e.title))]), t._v(" "), a("p", {
                        staticClass: "preferentialActivity__time__2SVJC"
                    },
                    [a("span", [t._v(t._s(e.created_at))])])])])])
                }), 0)])])])])])])
            },
            staticRenderFns: []
        };
        var R = a("VU/8")(U, F, !1,
        function(t) {
            a("/bJG")
        },
        "data-v-4f8bf311", null).exports,
        M = {
            name: "activityInfo",
            data: function() {
                return {
                    dataInfo: {}
                }
            },
            created: function() {
                var t = this.$route.query;
                t.id && this.getInfo(t.id)
            },
            methods: {
                getInfo: function(t) {
                    var e = this;
                    e.$parent.showLoading(),
                    e.$apiFun.post("/api/activitydeatil", {
                        id: t
                    }).then(function(t) {
                        console.log(t),
                        200 !== t.code && e.$parent.showTost(0, t.message),
                        200 === t.code && (e.dataInfo = t.data),
                        e.$parent.hideLoading()
                    })
                },
                doactivityapply: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/doactivityapply", {
                        activityid: t.dataInfo.id
                    }).then(function(e) {
                        t.$parent.hideLoading(),
                        t.$parent.showTost(1, e.message)
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        G = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "style__active_details__2eC8m",
                    staticStyle: {
                        "font-size": "0px"
                    }
                },
                [a("div", {
                    staticClass: "style__main_bg__FZhzx"
                },
                [a("div", {
                    staticClass: "style__content_container__1gl64"
                },
                [a("section", {
                    staticClass: "recommendGame__container__3Usd1"
                },
                [a("img", {
                    staticClass: "recommendGame__page_pic__2FLT9",
                    attrs: {
                        src: t.dataInfo.banner
                    }
                })]), t._v(" "), a("div", [a("section", {
                    staticClass: "style__common_container__apSU5",
                    staticStyle: {
                        "background-image": "url('undefined')",
                        "background-size": "cover",
                        "background-repeat": "no-repeat"
                    }
                },
                [a("div", {
                    staticClass: "style__common_main__2-cmI"
                },
                [a("img", {
                    staticClass: "style__title__1ZEmt",
                    attrs: {
                        src: "/static/image/rule_title.f0067853f2128510b0fa1d3926bdc28d.svg",
                        width: "168px"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "style__content_wrapper__1wmO9"
                },
                [a("div", {
                    staticClass: "style__content__uU_Dt"
                },
                [a("div", {
                    staticStyle: {
                        padding: "20px 0"
                    },
                    domProps: {
                        innerHTML: t._s(t.dataInfo.content)
                    }
                }), t._v(" "), a("div", {
                    staticClass: "style__rule_content__1t2-x",
                    domProps: {
                        innerHTML: t._s(t.dataInfo.memo)
                    }
                })])])])])])])]), t._v(" "), t.$store.state.token ? a("div", {
                    staticClass: "style__entry__LyKjA",
                    on: {
                        click: t.doactivityapply
                    }
                },
                [t._m(0)]) : t._e()])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "activity-entry__floatIn__1t39T",
                    staticStyle: {
                        width: "120px",
                        height: "120px"
                    }
                },
                [e("img", {
                    staticClass: "activity-entry__entryImg__2Y5SL",
                    attrs: {
                        src: "/static/image/f0023def5a9a49c0a85868a4bbab3546.gif",
                        alt: ""
                    }
                })])
            }]
        };
        var H = a("VU/8")(M, G, !1,
        function(t) {
            a("pGD6")
        },
        "data-v-10a521f5", null).exports,
        V = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "scrollLazy",
                    staticStyle: {
                        "min-height": "200px"
                    }
                },
                [a("div", {
                    staticClass: "appdownload__appDownload__28OI- animation-show",
                    attrs: {
                        id: "appDownload",
                        "animation-show": "true"
                    }
                },
                [a("div", {
                    staticClass: "appdownload__downContainer__2Yz3A"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "appdownload__rightSide__gWFaK"
                },
                [a("div", {
                    staticClass: "appdownload__tabs__3tvRx"
                }), t._v(" "), a("div", {
                    staticClass: "appdownload__rightSideContainer__2lGDq appdownload__active__1p3Q_"
                },
                [a("img", {
                    staticClass: "appdownload__enjoy__3FakM",
                    attrs: {
                        src: "/static/image/app-sub-title.ea5de3f59f0d4e8129b37826dc6272fb.png",
                        width: "218px"
                    }
                }), t._v(" "), a("p", {
                    staticClass: "appdownload__description__3YMx1"
                },
                [t._v("棋牌、彩票、真人娱乐、体育赛事、电子游艺、电子竞技，您所要的尽在" + t._s(t.$store.state.appInfo.title) + "。行业种类最全娱乐竞技APP，" + t._s(t.$store.state.appInfo.title) + "为您呈现别样、缤纷的极致体验。")]), t._v(" "), a("div", {
                    staticClass: "appdownload__qcodeContainer__3VX0A"
                },
                [a("div", {
                    staticClass: "appdownload__topSide__27gqv"
                },
                [a("div", {
                    staticClass: "appdownload__codeWrapper__3eWWV"
                },
                [a("img", {
                    attrs: {
                        src: t.$store.state.appInfo.ios_download_qrcode,
                        onerror: "this.src = '/static/image/appurl.jpg'",
                        width: "152",
                        height: "152"
                    }
                })]), t._v(" "), a("div", [a("p", {
                    staticClass: "appdownload__botSide__3kjmH"
                },
                [t._v("\n                  扫码下载APP"), a("br"), t._v("\n                  支持IOS & Android全设备"), a("br"), t._v(" "), a("a", {
                    staticStyle: {
                        color: "rgb(70, 119, 255)",
                        visibility: "visible"
                    },
                    attrs: {
                        href: t.$store.state.appInfo.ios_download_url,
                        target: "_blank"
                    }
                },
                [t._v(t._s(t.$store.state.appInfo.ios_download_url))])])])]), t._v(" "), a("div", {
                    staticClass: "appdownload__topSide__27gqv appdownload__topSide1__3qE_b"
                },
                [t._m(1), t._v(" "), a("div", [a("p", {
                    staticClass: "appdownload__botSide__3kjmH undefined"
                },
                [t._v("\n                  无需下载直接访问"), a("br"), t._v("\n                  手机输入网址即可访问"), a("br"), t._v(" "), a("a", {
                    staticStyle: {
                        color: "rgb(70, 119, 255)",
                        cursor: "pointer",
                        visibility: "visible"
                    },
                    attrs: {
                        href: t.$store.state.appInfo.h5_url
                    }
                },
                [t._v(t._s(t.$store.state.appInfo.h5_url))])])])])])])])])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "appdownload__leftSide__2K_EM"
                },
                [e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6 appdownload__active__1p3Q_"
                },
                [e("img", {
                    staticClass: "appdownload__iphone1__d-ys5 appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/zh.362e9e141ea5be7505e921577983e622.png",
                        width: "698px",
                        "data-type": "zh"
                    }
                })]), this._v(" "), e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6"
                },
                [e("img", {
                    staticClass: "appdownload__iphone2__1KetS appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/tiyu.320cff4864a85c7829620bf8577082fc.png",
                        width: "698px",
                        "data-type": "ty"
                    }
                })]), this._v(" "), e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6"
                },
                [e("img", {
                    staticClass: "appdownload__iphone3__1mcq5 appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/cp.f7fd720b5960205cd8dfeaec4c048379.png",
                        width: "698px",
                        "data-type": "cp"
                    }
                })]), this._v(" "), e("div", {
                    staticClass: "appdownload__appDownloadOne__2Bth6"
                },
                [e("img", {
                    staticClass: "appdownload__iphone3__1mcq5 appdownload__iphone1enter__18nrh",
                    attrs: {
                        src: "/static/image/qp.07e41c5b711af6021e3cc2378e21b948.png",
                        width: "696px",
                        "data-type": "qp"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "appdownload__codeWrapper__3eWWV"
                },
                [e("img", {
                    staticClass: "appdownload__h5__2f17w",
                    staticStyle: {
                        "margin-left": "10px"
                    },
                    attrs: {
                        src: "/static/image/zhijiefangwen@2x.3dfa4abeebf46d64aea082e3d55560c1.png",
                        width: "126px"
                    }
                })])
            }]
        };
        var K = a("VU/8")({
            name: "index",
            data: function() {
                return {}
            },
            created: function() {},
            methods: {},
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        V, !1,
        function(t) {
            a("A/v3")
        },
        "data-v-4d6edc0e", null).exports,
        J = {
            name: "vip",
            data: function() {
                return {
                    vipLis: [],
                    vipTab: 1
                }
            },
            created: function() {
                this.uservip()
            },
            methods: {
                changvipTab: function(t) {
                    this.vipTab = t
                },
                uservip: function() {
                    var t = this;
                    t.$apiFun.post("/api/uservip", {}).then(function(e) {
                        if (200 == e.code) {
                            t.vipLis = e.data;
                            var a = 1 * t.$store.state.userInfo.vip;
                            console.log(a),
                            $("#n1").html("<span>￥</span>" + t.vipLis[a].flow),
                            $("#n2").html("<span>￥</span>" + t.vipLis[a].recharge)
                        }
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        W = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticClass: "vipStyle__vip__3yY2f"
                },
                [a("img", {
                    staticClass: "vipStyle__banner__Is1mD",
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        src: "/static/image/vipBanner.43fe5af505255e4458071fb241bbb46a.png"
                    }
                }), t._v(" "), a("ul", t._l(10,
                function(e, s) {
                    return a("li", {
                        key: s,
                        class: t.vipTab == s + 1 ? "vipStyle__active__1bBwm": "",
                        on: {
                            click: function(e) {
                                return t.changvipTab(s + 1)
                            }
                        }
                    },
                    [a("img", {
                        attrs: {
                            src: "/static/image/vip" + (s + 1) + ".png"
                        }
                    }), a("span", [t._v("VIP" + t._s(s + 1))])])
                }), 0), t._v(" "), t.vipLis.length > 0 ? a("div", {
                    staticClass: "vipStyle__vipInfo__1LJHw",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/vip" + t.vipTab + ".png"
                    }
                }), t._v(" "), a("div", [a("img", {
                    attrs: {
                        src: "/static/image/i1.307a5200e48ee81639ae8fb5ee655007.png"
                    }
                }), a("span", [t._v("累计存款")]), t._v(" "), a("p", [t._v(t._s(t.vipLis[t.vipTab - 1].recharge))])]), t._v(" "), a("div", [a("img", {
                    attrs: {
                        src: "/static/image/i2.6ac37e6878d0b355cd10368d899942c0.png"
                    }
                }), a("span", [t._v("累计流水")]), t._v(" "), a("p", [t._v(t._s(t.vipLis[t.vipTab - 1].flow))])]), t._v(" "), a("div", [a("img", {
                    attrs: {
                        src: "/static/image/i3zt.png"
                    }
                }), t._v(" "), a("p", [t._v("VIP" + t._s(t.vipTab))])])]) : t._e(), t._v(" "), a("div", {
                    staticClass: "vipStyle__table__f94L7",
                    staticStyle: {
                        "margin-top": "0px"
                    }
                },
                [a("h2", [t._v("VIP最高返水比例")]), t._v(" "), t._m(0), t._v(" "), t._l(t.vipLis,
                function(e, s) {
                    return a("ul", {
                        key: s,
                        class: t.vipTab == s + 1 ? "vipStyle__active__1bBwm": ""
                    },
                    [a("li", [t._v("VIP" + t._s(s + 1))]), t._v(" "), a("li", [t._v(t._s(e.realperson))]), t._v(" "), a("li", [t._v(t._s(e.electron))]), t._v(" "), a("li", [t._v(t._s(e.joker))]), t._v(" "), a("li", [t._v(t._s(e.sport))]), t._v(" "), a("li", [t._v(t._s(e.lottery))]), t._v(" "), a("li", [t._v(t._s(e.e_sport))])])
                })], 2), t._v(" "), a("div", {
                    staticClass: "vipStyle__rule__2QNnc",
                    staticStyle: {
                        "padding-top": "50px"
                    }
                },
                [a("h2", [t._v("活动规则：")]), t._v(" "), t._m(1), t._v(" "), t._m(2), t._v(" "), t._m(3), t._v(" "), t._m(4), t._v(" "), t._m(5), t._v(" "), t._m(6), t._v(" "), t._m(7), t._v(" "), a("p", [a("b", [t._v("8")]), t._v(t._s(t.$store.state.appInfo.title) + "娱乐保留对活动的修改，停止及最终解释权。"), a("br"), t._v("备注：以上为各场馆最高返水，具体返水金额请以实际游戏为准，每日返水将在次日的15:00 - 16:00陆续进行发放。")])]), t._v(" "), a("div", {
                    staticClass: "msgBox__modal__2kbbd",
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "msg关闭"
                    }
                },
                [a("div", {
                    staticClass: "vipStyle__VipBackDetail__twkAc"
                },
                [t._m(8), t._v(" "), a("section", [a("div", [t._m(9), t._v(" "), a("div", [t._v(" ")]), t._v(" "), t._m(10), t._v(" "), a("div", [t._v(" ")]), t._v(" "), t._m(11), t._v(" "), a("div", [t._v(" ")]), t._v(" "), t._m(12), t._v(" "), t._m(13), t._v(" "), t._m(14), t._v(" "), a("div", [a("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [t._v("捕鱼游戏：" + t._s(t.$store.state.appInfo.title) + "捕鱼、AG捕鱼、捕鱼3D、捕鱼2D、" + t._s(t.$store.state.appInfo.title) + '棋牌中的"海王捕鱼"；'), a("br"), t._v("彩票游戏：" + t._s(t.$store.state.appInfo.title) + "彩票、双赢彩票、TCG彩票；")])]), t._v(" "), a("div", [a("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [t._v("棋牌游戏：" + t._s(t.$store.state.appInfo.title) + '棋牌中的"龙虎斗"'), a("span", {
                    staticStyle: {
                        color: "#000000",
                        "font-size": "12pt"
                    }
                },
                [t._v('、博雅棋牌中的"龙虎斗"')]), t._v("；"), a("br"), t._v("泛亚电竞：英雄时时乐、王者时时乐、DOTA英雄乐；")])]), t._v(" "), t._m(15), t._v(" "), a("div", [t._v(" ")]), t._v(" "), t._m(16)])])])])])])])
            },
            staticRenderFns: [function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("ul", [a("li", [t._v("VIP等级")]), t._v(" "), a("li", [t._v("真人(%)")]), t._v(" "), a("li", [t._v("电子(%)")]), t._v(" "), a("li", [t._v("棋牌(%)")]), t._v(" "), a("li", [t._v("体育(%)")]), t._v(" "), a("li", [t._v("彩票(%)")]), t._v(" "), a("li", [t._v("电竞(%)")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("b", [this._v("1")]), e("span", [this._v("晋升标准：")]), this._v("会员的累计存款以及累计流水达到相应级别的要求，即可在次日24点前晋级相应VIP等级。")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("b", [this._v("2")]), e("span", [this._v("晋升顺序：")]), this._v("VIP等级达到相应的要求可每天晋升一级，但VIP等级不可越级晋升。")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("b", [this._v("3")]), e("span", [this._v("保级要求：")]), this._v("会员在达到某VIP等级后，90天内投注需要完成保级流水要求。如果在此期间完成晋升，保级要求重新按照当前等级计算。")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("b", [this._v("4")]), e("span", [this._v("降级标准：")]), this._v("如果会员在一个季度（90天计算）内没有完成相应的保级要求流水，系统会自动降级一个等级，相应的返水及其它优惠也会随之调整至降级后的等级。")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("b", [this._v("5")]), e("span", [this._v("升级礼金：")]), this._v("升级礼金在会员达到该会员级别后系统自动派发，每个级别的升级礼金每位会员仅能获得1次（升级礼金1倍流水即可提款）。")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("b", [this._v("6")]), e("span", [this._v("生日礼金：")]), this._v("会员在注册三个月内过生日，今年将不能领取生日礼金。另注册时间大于三个月的会员需在生日当天的VIP页面进行自助领取，每年可领取一次。"), e("br"), this._v("（生日礼金1倍流水即可提款）。")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("b", [this._v("7")]), e("span", [this._v("每月红包：")]), this._v("会员在上个月有过至少1次的存款成功记录，即可在次月1号和16号分别前往VIP页面领取当天相应等级的每月红包彩金的1/2（红包礼金1倍流水即可提款）")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("header", [this._v("\n            返水规则说明\n            "), e("div", {
                    staticClass: "vipStyle__close_icon__34qQ3"
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("1.返水优惠发放根据您当天北京时间00:00—23:59之间的有效投注进行计算，数据将与游戏记录中当天数据保持一致；")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("2.根据北京时间您投注的情况，当天玩家所有的投注额返水将在当天结束后24小时内，体育场投注结算后第二天24小时内返水。例如：北京时间11月1日玩家的返水，会在北京时间11月2日15:00-16:00时间段内发放完毕；")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("3.体育中的连串过关投注额返水将计算在注单中最迟开赛的赛事当天中；")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("4.不返水游戏包括")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("PT电子：丛林巫师、美式轮盘、终极足球、古怪猴子、黄金之旅、高速公路之王、招财进宝；")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("PP电子：21点富贵临门、百家乐、龙宝百家乐、美式二十一点；")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("雷火电竞：")]), e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("刀塔宝藏、王者荣耀(夺宝);")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticStyle: {
                        "font-size": "12pt"
                    }
                },
                [this._v("5.每日返水将不会超过您的返水上限，如您对返水金额有疑问，可联系在线客服为您协助。")])])
            }]
        };
        var Z = a("VU/8")(J, W, !1,
        function(t) {
            a("k5zD")
        },
        "data-v-2b44b089", null).exports,
        O = a("c/Tr"),
        X = a.n(O),
        Y = {
            name: "mine",
            data: function() {
                return {
                    path: null,
                    baseURL: "",
                    vipLis: [],
                    bfNum: 0
                }
            },
            created: function() {
                this.path = this.$route.path,
                this.baseURL = sessionStorage.getItem("baseURL") || "",
                this.uservip()
            },
            methods: {
                uservip: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/uservip", {}).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.vipLis = e.data, t.getbfNum()),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })
                },
                getbfNum: function() {
                    var t = 0,
                    e = 1 * this.$store.state.userInfo.vip;
                    this.vipLis.forEach(function(a, s) {
                        console.log(),
                        s == e && (t = 1 * a.recharge)
                    });
                    var a = 1 * this.$store.state.userInfo.paysum,
                    s = 0 == a || 0 == t ? 0 : Math.round(a / t * 100);
                    this.bfNum = s > 100 ? 100 : s
                },
                openPage: function(t) {
                    this.$parent.openPage(t)
                },
                getAgentLoginUrl: function() {
                    this.$parent.getAgentLoginUrl()
                },
                outLogin: function() {
                    this.$parent.outLogin()
                },
                openDaoTime: function() {
                    this.openDaoTime()
                },
                closeDaoTime: function() {
                    this.$parent.closeDaoTime()
                },
                openGamePage: function(t, e, a) {
                    this.$parent.openGamePage(t, e, a)
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                getUserInfo: function() {
                    this.$parent.getUserInfo()
                },
                getUserInfoShowLoding: function() {
                    this.$parent.getUserInfoShowLoding()
                },
                doCopy: function(t) {
                    this.$parent.doCopy(t)
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                },
                getBalance: function() {
                    this.$parent.getBalance()
                },
                onchangemd: function(t) {
                    var e = this;
                    console.log(t.target.files);
                    var a = new FormData;
                    X()(t.target.files).map(function(t) {
                        console.log(t),
                        a.append("file", t)
                    }),
                    e.showLoading(),
                    e.$apiFun.post("/api/uploadimg", a).then(function(t) {
                        e.$parent.getUserInfoShowLoding()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {},
            watch: {
                $route: {
                    immediate: !0,
                    handler: function() {
                        this.path = this.$route.path
                    }
                }
            }
        },
        tt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "common__pageContainer__3-VhW"
                },
                [a("div", {
                    staticClass: "common__pageBody__1Dn3a"
                },
                [a("div", {
                    staticStyle: {
                        width: "100%",
                        height: "auto"
                    }
                },
                [a("div", {
                    staticClass: "centerHead__users_main__1fT82 undefined",
                    staticStyle: {
                        "background-image": "url('/static/image/bg.dc5a82a281e10420d019c23e957bd692.png')"
                    }
                },
                [a("div", {
                    staticClass: "centerHead__users_content__3jK8m"
                },
                [a("div", {
                    staticClass: "index__user_left_kok__2nleM undefined"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "index__usercount__2PZnN undefined"
                },
                [a("div", {
                    staticClass: "index__private__2QUr-"
                },
                [a("i", {
                    staticClass: "index__user_icon__CS-AW",
                    style: "background-image: url(" + (t.$store.state.userInfo.avatar ? t.$store.state.userInfo.avatar: "/static/image/imageAvatar02@3x.png") + "); background-position: 0px 0px; background-size: 100% 100%; background-repeat: no-repeat"
                },
                [a("span", {
                    staticClass: "index__user_lamellae__30UFA",
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "更改头像"
                    }
                },
                [t._v("更改头像 "), a("input", {
                    staticClass: "inputsw",
                    attrs: {
                        type: "file",
                        single: "",
                        accept: "image/gif,image/png"
                    },
                    on: {
                        change: t.onchangemd
                    }
                })])]), a("i", {
                    staticClass: "index__vip_icon__158Bt",
                    staticStyle: {
                        "background-image": "url('/static/image/vip-0.ac6a1ae5500fc700d33a7fbbffbe2176.png')",
                        "background-position": "0px 0px",
                        "background-size": "100% 100%",
                        "background-repeat": "no-repeat"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "index__user_name__1RAED"
                },
                [a("span", {
                    staticClass: "index__name_text__1Tcx7"
                },
                [t._v(t._s(t.$store.state.userInfo.username))])]), t._v(" "), a("div", {
                    staticClass: "newBox",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/vip")
                        }
                    }
                },
                [a("div", {
                    staticClass: "profile_header_vip_bottom"
                },
                [a("div", {
                    staticClass: "progress profile_header_vip_level_progress"
                },
                [a("div", {
                    staticClass: "progress-bar",
                    style: "width: " + t.bfNum + "%"
                }), t._v(" "), a("div", {
                    staticClass: "progress_percent"
                },
                [t._v(t._s(t.bfNum) + "%")]), t._v(" "), a("div", {
                    staticClass: "progress_left_text",
                    attrs: {
                        title: "VIP1"
                    }
                },
                [t._v(t._s(t.$store.state.userInfo.current_vip))]), t._v(" "), a("div", {
                    staticClass: "progress_right_text",
                    attrs: {
                        title: "VIP2"
                    }
                },
                [t._v(t._s(t.$store.state.userInfo.next_vip))])])])]), t._v(" "), t._m(1)]), t._v(" "), a("div", {
                    staticClass: "index__wallet_menu__3F9Gy"
                },
                [a("div", {
                    staticClass: "index__userWallet__-4gsZ"
                },
                [a("p", [t._v("中心钱包：")]), t._v(" "), a("b", {
                    staticClass: "left_than"
                },
                [t._v(t._s(t.$store.state.userInfo.balance))])]), t._v(" "), a("div", {
                    staticClass: "index__user_menu__3JKmv undefined",
                    attrs: {
                        "data-render": "23"
                    }
                },
                [a("ul", {
                    staticClass: "index__part_one__2Ya3V"
                },
                [a("li", {
                    class: "/recharge" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/recharge")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("存款")])]), t._v(" "), a("li", {
                    class: "/transfer" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/transfer")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("转账")])]), t._v(" "), a("li", {
                    class: "/withdraw" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/withdraw")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("取款")])])]), t._v(" "), a("ul", {
                    staticClass: "index__part_two__3KeRW"
                },
                [a("li", {
                    class: "/bankCard" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/bankCard")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("我的钱包")])]), t._v(" "), a("li", {
                    class: "/transRecord" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/transRecord")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("交易记录")])]), t._v(" "), a("li", {
                    class: "/betRecord" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/betRecord")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("投注记录")])]), t._v(" "), a("li", {
                    class: "/fanshui" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/fanshui")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("返水记录")])]), t._v(" "), a("li", {
                    class: "/activityRecord" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/activityRecord")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("活动申请记录")])]), t._v(" "), 0 == t.$store.state.userInfo.isagent ? a("li", {
                    class: "/applyagent" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/applyagent")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("申请代理")])]) : t._e(), t._v(" "), 1 == t.$store.state.userInfo.isagent ? a("li", {
                    class: "/applyagent" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: t.$parent.getAgentLoginUrl
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("代理登录")])]) : t._e()]), t._v(" "), a("ul", {
                    staticClass: "index__part_three__pdBTn"
                },
                [a("li", {
                    class: "/center" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/center")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("个人资料")])]), t._v(" "), a("li", {
                    class: "/message" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/message")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("消息中心")])]), t._v(" "), a("li", {
                    class: "/welfare" == t.path ? "index__link_active__11H_t": "",
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/welfare")
                        }
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("红包")])]), t._v(" "), a("li", {
                    staticClass: "null",
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [a("div", {
                    staticClass: "index__icon__J6Rel"
                }), t._v(" "), a("p", [t._v("意见反馈")])])])])])]), t._v(" "), a("div", {
                    staticClass: "centerHead__centerContent__1K_n0"
                },
                [a("div", {
                    staticClass: "transiton_container",
                    staticStyle: {
                        height: "auto"
                    }
                },
                [a("router-view")], 1)])])])])])])
            },
            staticRenderFns: [function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "index__activeIcons__Z1BgD"
                },
                [a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/deposit.0947ecf747f936e9f9a20e20fe3a5806.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/deposit_active.dde1618b4c1e6b81d7129e30d1997845.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/deposit_hover.583baa477ab9c2ee3d3b6b7c2bc89073.png"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/transfer.cada0b68f36cabf40a9956d59bb9b1fe.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/transfer_active.357f49245ec9940adb0badebb8583edf.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/transfer_hover.d4d26662bdb027d7e27b04313a5dd97c.png"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/withdrawal.6fc5b140031dfbd3b77cc6aafbf4fe47.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/withdrawal_active.fd787d889022584f7ac4976505862b6e.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/withdrawal_hover.100ff3a693f47e8786e9fbab52280c5b.png"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/0.fa44efc644589909c1e16f3dedb07626.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/0-1.79122c3d6a38f284408a86fbc807b0a9.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/1.404d07d89fe207dd01ddbbe812b97c01.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/1-1.87a1c8da3d4ffd24d6197a21d4a769e3.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/2.c21324096c848ea53d629c3f8fc20631.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/2-1.d4198f6fdf5999d2f49d22345981a181.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/3.983decfccd2bdc503c4c42fdf583de89.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/3-1.d5283afeb84b6fee05f9fd6d682d3d11.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/4.d40de41e77eefd350e82d9a3534b25c3.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/4-1.bf6a3939dfd04c242e2da01250df2ad5.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/5.c6da83c12132a221cff965aefc959904.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/5-1.fdfceb407e70551f81fe01def26fa7ec.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/6.d62837c7256bdcb8be821f3ad2972ea2.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/6-1.bb8698837dee80be2e5f31658cd0d4da.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/7.31525e63cb61f29775d42bb0d42d2027.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/7-1.292dc81e3d6f153bdff5393e56dedd29.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/8.a0d43ac0366a91d5f8dd621f8c7e8de8.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/8-1.2267384b0cfb773154c159beda0a14da.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/9.dfa5c7b10ef63f38af88d933f93af398.png"
                    }
                }), a("img", {
                    staticStyle: {
                        filter: "blur(8px)",
                        "will-change": "transform, opacity"
                    },
                    attrs: {
                        src: "/static/image/9-1.21b240bebd1ef1b73252381d27cae81e.png"
                    }
                }), a("img", {
                    attrs: {
                        src: "/web/mb12/image/transfer"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "index__safe_icon__VhwnU"
                },
                [e("section", [e("div", {
                    staticClass: "index__icon__J6Rel",
                    staticStyle: {
                        "background-image": "url('/static/image/phone_active.87e65aa83a68e67a730f6f075e739a30.png')",
                        "background-position": "center center",
                        "background-size": "22px 22px",
                        "background-repeat": "no-repeat"
                    }
                })]), this._v(" "), e("section", {
                    staticClass: "index__gray__3uHT_"
                },
                [e("div", {
                    staticClass: "index__icon__J6Rel",
                    staticStyle: {
                        "background-image": "url('/static/image/email.9aeaf5c49ee0edfebbe1e3b322d29bab.png')",
                        "background-position": "center center",
                        "background-size": "22px 22px",
                        "background-repeat": "no-repeat"
                    }
                })]), this._v(" "), e("section", {
                    staticClass: "index__gray__3uHT_"
                },
                [e("div", {
                    staticClass: "index__icon__J6Rel",
                    staticStyle: {
                        "background-image": "url('/static/image/info.a38c2024fe7a57eeb567da8a819f8b49.png')",
                        "background-position": "center center",
                        "background-size": "22px 22px",
                        "background-repeat": "no-repeat"
                    }
                })]), this._v(" "), e("section", {
                    staticClass: "index__gray__3uHT_"
                },
                [e("div", {
                    staticClass: "index__icon__J6Rel",
                    staticStyle: {
                        "background-image": "url('/static/image/bank.ff9d0cefca70ab9a1b8cb8d4e18a94ee.png')",
                        "background-position": "center center",
                        "background-size": "22px 22px",
                        "background-repeat": "no-repeat"
                    }
                })])])
            }]
        };
        var et = a("VU/8")(Y, tt, !1,
        function(t) {
            a("kEOr")
        },
        "data-v-c3e8c2fe", null).exports,
        at = {
            name: "mine",
            data: function() {
                return {
                    type: 0,
                    noticeList: [],
                    homenoticelis: []
                }
            },
            created: function() {
                var t = this.$route.query;
                t.type && (this.type = 1 * t.type),
                this.$parent.showLoading(),
                this.homenotice(),
                this.getDatalist()
            },
            methods: {
                homenotice: function() {
                    var t = this;
                    t.$apiFun.post("/api/homenotice", {}).then(function(e) {
                        console.log(e),
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.homenoticelis = e.data)
                    })
                },
                getDatalist: function() {
                    var t = this,
                    e = t.page;
                    t.$apiFun.post("/api/noticeList", {
                        page: e
                    }).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.noticeList = e.data.data),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        st = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "myCenterCommon__userContent__2fHEF"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form__HFPCL"
                },
                [t._e(), t._v(" "), a("el-tabs", {
                    model: {
                        value: t.type,
                        callback: function(e) {
                            t.type = e
                        },
                        expression: "type"
                    }
                },
                [a("el-tab-pane", {
                    attrs: {
                        label: "公告",
                        name: "0"
                    }
                },
                t._l(t.homenoticelis,
                function(e, s) {
                    return a("div", {
                        key: s,
                        staticClass: "el-collapse",
                        attrs: {
                            role: "tablist",
                            "aria-multiselectable": "true"
                        }
                    },
                    [a("div", {
                        staticClass: "el-collapse-item is-active"
                    },
                    [a("div", {
                        attrs: {
                            role: "tab",
                            "aria-controls": "el-collapse-content-2341",
                            "aria-describedby": "el-collapse-content-2341",
                            "aria-expanded": "true"
                        }
                    },
                    [a("div", {
                        staticClass: "el-collapse-item__header is-active",
                        attrs: {
                            role: "button",
                            id: "el-collapse-head-2341",
                            tabindex: "0"
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "el-collapse-item__wrap",
                        attrs: {
                            role: "tabpanel",
                            "aria-labelledby": "el-collapse-head-2341",
                            id: "el-collapse-content-2341",
                            "data-old-padding-top": "",
                            "data-old-padding-bottom": "",
                            "data-old-overflow": ""
                        }
                    },
                    [a("div", {
                        staticClass: "el-collapse-item__content"
                    },
                    [a("div", [t._v(t._s(e))]), t._v(" "), a("div")])])])])
                }), 0), t._v(" "), a("el-tab-pane", {
                    attrs: {
                        label: "站内信",
                        name: "1"
                    }
                },
                t._l(t.noticeList,
                function(e, s) {
                    return a("div", {
                        key: s,
                        staticClass: "el-collapse",
                        attrs: {
                            role: "tablist",
                            "aria-multiselectable": "true"
                        }
                    },
                    [a("div", {
                        staticClass: "el-collapse-item is-active"
                    },
                    [a("div", {
                        attrs: {
                            role: "tab",
                            "aria-controls": "el-collapse-content-2341",
                            "aria-describedby": "el-collapse-content-2341",
                            "aria-expanded": "true"
                        }
                    },
                    [a("div", {
                        staticClass: "el-collapse-item__header is-active",
                        attrs: {
                            role: "button",
                            id: "el-collapse-head-2341",
                            tabindex: "0"
                        }
                    },
                    [t._v(t._s(e.title))])]), t._v(" "), a("div", {
                        staticClass: "el-collapse-item__wrap",
                        attrs: {
                            role: "tabpanel",
                            "aria-labelledby": "el-collapse-head-2341",
                            id: "el-collapse-content-2341",
                            "data-old-padding-top": "",
                            "data-old-padding-bottom": "",
                            "data-old-overflow": ""
                        }
                    },
                    [a("div", {
                        staticClass: "el-collapse-item__content"
                    },
                    [a("div", {
                        domProps: {
                            innerHTML: t._s(e.content)
                        }
                    }), t._v(" "), a("div", [t._v(t._s(e.created_at))])])])])])
                }), 0)], 1)], 1)])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("消息中心")]), this._v(" "), e("span")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "el-collapse-item is-active"
                },
                [e("div", {
                    attrs: {
                        role: "tab",
                        "aria-expanded": "true",
                        "aria-controls": "el-collapse-content-3213",
                        "aria-describedby": "el-collapse-content-3213"
                    }
                },
                [e("div", {
                    staticClass: "el-collapse-item__header is-active",
                    attrs: {
                        role: "button",
                        id: "el-collapse-head-3213",
                        tabindex: "0"
                    }
                },
                [this._v("遵守"), e("i", {
                    staticClass: "el-collapse-item__arrow el-icon-arrow-right is-active"
                })])]), this._v(" "), e("div", {
                    staticClass: "el-collapse-item__wrap",
                    attrs: {
                        role: "tabpanel",
                        "aria-labelledby": "el-collapse-head-3213",
                        id: "el-collapse-content-3213"
                    }
                },
                [e("div", {
                    staticClass: "el-collapse-item__content"
                },
                [e("div", [e("p", [this._v("请自觉遵守本站秩序")])]), this._v(" "), e("div", [this._v("发布时间：2021-10-12 15:09:06")])])])])
            }]
        };
        var it = a("VU/8")(at, st, !1,
        function(t) {
            a("27mo")
        },
        "data-v-71c3d398", null).exports,
        nt = {
            name: "center",
            data: function() {
                return {
                    mobile: null,
                    email: null,
                    birthday: null,
                    passwordInfo: {},
                    info: {},
                    baseURL: "",
                    pawShow: !1,
                    payPawShow: !1
                }
            },
            created: function() {
                var t = JSON.parse(localStorage.getItem("userInfo"));
                this.mobile = t.mobile,
                this.email = t.email,
                this.birthday = t.birthday,
                this.baseURL = sessionStorage.getItem("baseURL") || ""
            },
            methods: {
                editPassword: function(t) {
                    var e = this;
                    if (e.passwordInfo.password) if (e.passwordInfo.paypassword) if (e.passwordInfo.password.length < 6) e.$parent.showTost(0, "请输入正确的旧密码长度");
                    else if (e.passwordInfo.paypassword.length < 6) e.$parent.showTost(0, "请输入正确的新密码长度");
                    else if (e.passwordInfo.newpasword) if (e.passwordInfo.newpasword == e.passwordInfo.paypassword) {
                        if (e.passwordInfo.password == e.passwordInfo.paypassword) return e.$parent.showTost(0, "新旧密码不能一致！"),
                        void(e.passwordInfo = {});
                        var a = 1 == t ? "/api/editPassword": "/api/editPayPassword";
                        e.$parent.showLoading(),
                        e.$apiFun.post(a, e.passwordInfo).then(function(a) {
                            console.log(a),
                            200 != a.code && e.$parent.showTost(0, a.message),
                            e.$parent.hideLoading(),
                            200 == a.code && (e.$parent.showTost(1, "密码修改成功！"), e.passwordInfo = {},
                            e.close(), 1 == t && (e.$parent.closeDaoTime(), localStorage.clear(), sessionStorage.clear(), e.$store.commit("changUserInfo"), e.$store.commit("changToken"), e.$router.push({
                                path: "/login"
                            })))
                        })
                    } else e.$parent.showTost(0, "两次密码不一致！");
                    else e.$parent.showTost(0, "请输入确认密码");
                    else e.$parent.showTost(0, "请输入新密码");
                    else e.$parent.showTost(0, "请输入旧密码")
                },
                isOk: function() {
                    var t = this,
                    e = {
                        email: t.email,
                        mobile: t.mobile,
                        birthday: t.birthday
                    };
                    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(t.mobile) ? /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t.email) ? /^(\d{4})-(\d{2})-(\d{2})$/.test(t.birthday) ? (t.$parent.showLoading(), t.$apiFun.post("/api/updateuserinfo", e).then(function(a) {
                        if (console.log(a), 200 != a.code && t.$parent.showTost(0, a.message), 200 == a.code) {
                            var s = JSON.parse(localStorage.getItem("userInfo"));
                            s.mobile = e.mobile,
                            s.email = e.email,
                            s.birthday = e.birthday,
                            localStorage.setItem("userInfo", n()(s)),
                            t.$parent.getUserInfo(),
                            t.$parent.showTost(1, "操作成功")
                        }
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输入正确的日期格式：YYYY-MM-DD") : t.$parent.showTost(0, "请输入正确邮箱号") : t.$parent.showTost(0, "请输入正确手机号")
                },
                close: function() {
                    this.pawShow = !1,
                    this.payPawShow = !1,
                    this.info = {},
                    this.passwordInfo = {}
                },
                openpawShow: function() {
                    this.pawShow = !0,
                    this.info = {},
                    this.passwordInfo = {}
                },
                openpayPawShow: function() {
                    this.payPawShow = !0,
                    this.info = {},
                    this.passwordInfo = {}
                },
                openapl: function() {
                    this.apl = !0,
                    this.info = {},
                    this.passwordInfo = {}
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                },
                retrun: function(t) {
                    t.stopPropagation()
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        ot = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "myCenterCommon__userContent__2fHEF"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form__HFPCL"
                },
                [a("div", {
                    staticClass: "userInfo__users_infoTitle__UKMBL"
                },
                [t._v("基本资料")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("真实姓名：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "220px",
                        height: "40px"
                    },
                    attrs: {
                        type: "text",
                        "data-analytics": "button",
                        placeholder: "请输入真实姓名",
                        disabled: ""
                    },
                    domProps: {
                        value: t.$store.state.userInfo.realname
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("出生日期：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("el-date-picker", {
                    attrs: {
                        type: "date",
                        "value-format": "yyyy-MM-dd",
                        placeholder: "选择日期"
                    },
                    model: {
                        value: t.birthday,
                        callback: function(e) {
                            t.birthday = e
                        },
                        expression: "birthday"
                    }
                })], 1), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "birthday",
                        value: ""
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("邮箱：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.email,
                        expression: "email"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "220px",
                        height: "40px"
                    },
                    attrs: {
                        type: "text",
                        "data-analytics": "button",
                        placeholder: "请输入邮箱"
                    },
                    domProps: {
                        value: t.email
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.email = e.target.value)
                        }
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("手机号：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.mobile,
                        expression: "mobile"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "220px",
                        height: "40px"
                    },
                    attrs: {
                        type: "text",
                        "data-analytics": "button",
                        placeholder: "请输入手机号"
                    },
                    domProps: {
                        value: t.mobile
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.mobile = e.target.value)
                        }
                    }
                })])]), t._v(" "), a("button", {
                    staticClass: "index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "190px",
                        height: "40px",
                        margin: "0px 0px 20px 72px"
                    },
                    attrs: {
                        "data-analytics": "button"
                    },
                    on: {
                        click: t.isOk
                    }
                },
                [t._v("保存")])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout__safe__2p69W"
                },
                [a("div", {
                    staticClass: "userInfo__users_infoTitle__UKMBL"
                },
                [t._v("\n      账户安全"), a("span", {
                    staticClass: "userInfo__tips__3f00A"
                },
                [t._v("如果要修改请"), a("span", {
                    staticClass: "userInfo__call__pMMur"
                },
                [a("span", {
                    staticStyle: {
                        cursor: "pointer"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("联系客服")])])])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_safe_item__3y_RM"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("登录密码：")]), t._v(" "), a("span", {
                    staticClass: "userInfo__users_layout_spanFont__mFW6W"
                },
                [t._v("*******")]), t._v(" "), a("button", {
                    staticClass: "index__Button__It0J4 index__Button2__2-XSS",
                    staticStyle: {
                        width: "120px",
                        height: "40px",
                        position: "absolute",
                        right: "0px",
                        "font-size": "14px"
                    },
                    on: {
                        click: t.openpawShow
                    }
                },
                [t._v("修改")])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_safe_item__3y_RM"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("提款密码：")]), t._v(" "), a("span", {
                    staticClass: "userInfo__users_layout_spanFont__mFW6W"
                },
                [t._v("*******")]), t._v(" "), a("button", {
                    staticClass: "index__Button__It0J4 index__Button2__2-XSS",
                    staticStyle: {
                        width: "120px",
                        height: "40px",
                        position: "absolute",
                        right: "0px",
                        "font-size": "14px"
                    },
                    on: {
                        click: t.openpayPawShow
                    }
                },
                [t._v("修改")])]), t._v(" "), t.pawShow ? a("div", {
                    staticClass: "el-dialog__wrapper",
                    staticStyle: {
                        "z-index": "999",
                        background: "rgb(81 73 73 / 49%)"
                    },
                    on: {
                        click: t.close
                    }
                },
                [a("div", {
                    staticClass: "el-dialog",
                    staticStyle: {
                        "margin-top": "15vh"
                    },
                    attrs: {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "修改登录密码"
                    },
                    on: {
                        click: t.retrun
                    }
                },
                [a("div", {
                    staticClass: "el-dialog__header"
                },
                [a("span", {
                    staticClass: "el-dialog__title"
                },
                [t._v("修改登录密码")]), a("button", {
                    staticClass: "el-dialog__headerbtn",
                    attrs: {
                        type: "button",
                        "aria-label": "Close"
                    },
                    on: {
                        click: t.close
                    }
                },
                [a("i", {
                    staticClass: "el-dialog__close el-icon el-icon-close"
                })])]), t._v(" "), a("div", {
                    staticClass: "el-dialog__body"
                },
                [a("form", {
                    staticClass: "el-form el-form--inline"
                },
                [a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("原密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.passwordInfo.password,
                        expression: "passwordInfo.password"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "off",
                        placeholder: "请输入原密码"
                    },
                    domProps: {
                        value: t.passwordInfo.password
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.passwordInfo, "password", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("新密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.passwordInfo.paypassword,
                        expression: "passwordInfo.paypassword"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "off",
                        placeholder: "请输入新密码"
                    },
                    domProps: {
                        value: t.passwordInfo.paypassword
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.passwordInfo, "paypassword", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("确认密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.passwordInfo.newpasword,
                        expression: "passwordInfo.newpasword"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "off",
                        placeholder: "请再次输入新密码"
                    },
                    domProps: {
                        value: t.passwordInfo.newpasword
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.passwordInfo, "newpasword", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-10px",
                        "margin-right": "-10px"
                    }
                },
                [t._m(1), t._v(" "), a("div", {
                    staticClass: "el-col el-col-16",
                    staticStyle: {
                        "padding-left": "150px",
                        "padding-right": "10px"
                    }
                },
                [a("button", {
                    staticClass: "el-button el-button--primary",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: function(e) {
                            return t.editPassword(1)
                        }
                    }
                },
                [a("span", [t._v("确认操作")])])])])])])])]) : t._e(), t._v(" "), t.payPawShow ? a("div", {
                    staticClass: "el-dialog__wrapper",
                    staticStyle: {
                        "z-index": "999",
                        background: "rgb(81 73 73 / 49%)"
                    },
                    on: {
                        click: t.close
                    }
                },
                [a("div", {
                    staticClass: "el-dialog",
                    staticStyle: {
                        "margin-top": "15vh"
                    },
                    attrs: {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "修改支付密码"
                    },
                    on: {
                        click: t.retrun
                    }
                },
                [a("div", {
                    staticClass: "el-dialog__header"
                },
                [a("span", {
                    staticClass: "el-dialog__title"
                },
                [t._v("修改支付密码")]), a("button", {
                    staticClass: "el-dialog__headerbtn",
                    attrs: {
                        type: "button",
                        "aria-label": "Close"
                    },
                    on: {
                        click: t.close
                    }
                },
                [a("i", {
                    staticClass: "el-dialog__close el-icon el-icon-close"
                })])]), t._v(" "), a("div", {
                    staticClass: "el-dialog__body"
                },
                [a("form", {
                    staticClass: "el-form el-form--inline"
                },
                [a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("原密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.passwordInfo.password,
                        expression: "passwordInfo.password"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "off",
                        placeholder: "请输入原密码"
                    },
                    domProps: {
                        value: t.passwordInfo.password
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.passwordInfo, "password", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("新密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.passwordInfo.paypassword,
                        expression: "passwordInfo.paypassword"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "off",
                        placeholder: "请输入新密码"
                    },
                    domProps: {
                        value: t.passwordInfo.paypassword
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.passwordInfo, "paypassword", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("确认密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.passwordInfo.newpasword,
                        expression: "passwordInfo.newpasword"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "off",
                        placeholder: "请再次输入新密码"
                    },
                    domProps: {
                        value: t.passwordInfo.newpasword
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.passwordInfo, "newpasword", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-10px",
                        "margin-right": "-10px"
                    }
                },
                [t._m(2), t._v(" "), a("div", {
                    staticClass: "el-col el-col-16",
                    staticStyle: {
                        "padding-left": "150px",
                        "padding-right": "10px"
                    }
                },
                [a("button", {
                    staticClass: "el-button el-button--primary",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: function(e) {
                            return t.editPassword(2)
                        }
                    }
                },
                [a("span", [t._v("确认操作")])])])])])])])]) : t._e()])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("个人资料")]), this._v(" "), e("span", [this._v("为了确保您的账户安全，请您填写相关安全信息，以备不时之需")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "el-col el-col-4",
                    staticStyle: {
                        "padding-left": "10px",
                        "padding-right": "10px"
                    }
                },
                [e("div", {
                    staticClass: "grid-content bg-purple"
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "el-col el-col-4",
                    staticStyle: {
                        "padding-left": "10px",
                        "padding-right": "10px"
                    }
                },
                [e("div", {
                    staticClass: "grid-content bg-purple"
                })])
            }]
        };
        var ct = a("VU/8")(nt, ot, !1,
        function(t) {
            a("xX1K")
        },
        "data-v-1393ea89", null).exports,
        rt = {
            name: "applyagent",
            data: function() {
                return {
                    info: {}
                }
            },
            created: function() {},
            methods: {
                shenqing: function() {
                    var t = this;
                    t.birthday = $(".ant-picker-input").html();
                    var e = t.info;
                    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e.mobile) ? e.apply_info ? (t.showLoading(), t.$apiFun.post("/api/applyagentdo", e).then(function(e) {
                        t.showTost(1, e.message),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })) : t.showTost(0, "请输入申请理由") : t.showTost(0, "请输入正确手机号")
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        _t = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "myCenterCommon__userContent__2fHEF"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form__HFPCL"
                },
                [a("div", {
                    staticClass: "userInfo__users_infoTitle__UKMBL"
                },
                [t._v("基本资料")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("真实姓名：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "450px",
                        height: "40px"
                    },
                    attrs: {
                        type: "text",
                        "data-analytics": "button",
                        placeholder: "请输入真实姓名",
                        disabled: ""
                    },
                    domProps: {
                        value: t.$store.state.userInfo.realname
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("联系方式：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.info.mobile,
                        expression: "info.mobile"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "450px",
                        height: "40px"
                    },
                    attrs: {
                        type: "text",
                        "data-analytics": "button",
                        placeholder: "请输入您的联系方式"
                    },
                    domProps: {
                        value: t.info.mobile
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.info, "mobile", e.target.value)
                        }
                    }
                })])]), t._v(" "), t._e(), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr",
                    staticStyle: {
                        height: "auto"
                    }
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("申请说明：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("el-input", {
                    staticStyle: {
                        width: "450px",
                        height: "180px"
                    },
                    attrs: {
                        type: "textarea",
                        rows: 6,
                        placeholder: "请输入申请说明",
                        resize: "none",
                        autocomplete: "off"
                    },
                    model: {
                        value: t.info.apply_info,
                        callback: function(e) {
                            t.$set(t.info, "apply_info", e)
                        },
                        expression: "info.apply_info"
                    }
                })], 1)]), t._v(" "), a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q ",
                    staticStyle: {
                        width: "190px",
                        height: "40px",
                        margin: "0px 0px 20px 72px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "代理申请-保存"
                    },
                    on: {
                        click: t.shenqing
                    }
                },
                [t._v("提交申请")])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("申请代理")]), this._v(" "), e("span", [this._v("请填写真实申请信息，以便管理员审核代理信息！")])])
            }]
        };
        var lt = a("VU/8")(rt, _t, !1,
        function(t) {
            a("GvqT")
        },
        "data-v-2b15d2ae", null).exports,
        dt = {
            name: "mine",
            data: function() {
                return {
                    activityApplyLogList: [],
                    statuTypeS: ["0未约定", "待审核", "通过", "拒绝", "4未约定"]
                }
            },
            created: function() {
                this.getactivityApplyLogList()
            },
            methods: {
                getactivityApplyLogList: function() {
                    var t = this;
                    t.$parent.showLoading();
                    t.$apiFun.post("/api/activityApplyLog", {}).then(function(e) {
                        console.log(e),
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.activityApplyLogList = e.data.data),
                        t.$parent.hideLoading()
                    }).
                    catch(function(t) {})
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        pt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("section", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0",
                    staticStyle: {
                        "padding-top": "30px"
                    }
                }), t._v(" "), a("el-table", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        data: t.activityApplyLogList
                    }
                },
                [a("el-table-column", {
                    attrs: {
                        prop: "activity_name",
                        label: "活动标题"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "created_at",
                        label: "申请时间"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "state",
                        label: "状态",
                        width: "180"
                    },
                    scopedSlots: t._u([{
                        key: "default",
                        fn: function(e) {
                            return [t._v("\n        " + t._s(t.statuTypeS[e.row.state]) + "\n      ")]
                        }
                    }])
                })], 1)], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("活动申请记录")])])
            }]
        };
        var mt = a("VU/8")(dt, pt, !1,
        function(t) {
            a("Ji21")
        },
        "data-v-a748744e", null).exports,
        ut = {
            name: "fanshui",
            data: function() {
                return {
                    date: 4,
                    fanshuiList: [],
                    fanshuishowData: {},
                    jisuan: 0,
                    nojisuan: 0,
                    page: 1,
                    dogameLis: [],
                    api_type: ""
                }
            },
            created: function() {
                this.getdogame(),
                this.getfanshui()
            },
            methods: {
                changApiType: function() {
                    this.page = 1,
                    this.getfanshui()
                },
                getdogame: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(e) {
                        console.log(e),
                        200 != e.code && t.showTost(e.message),
                        200 == e.code && (t.dogameLis = e.data, t.dogameLis.unshift({
                            name: "全平台",
                            platname: ""
                        }))
                    })
                },
                changeDate: function() {
                    this.page = 1,
                    this.getfanshui()
                },
                getfanshui: function() {
                    var t = this;
                    t.$parent.showLoading();
                    var e = {
                        date: t.date,
                        page: t.page,
                        api_type: t.api_type,
                        type: ""
                    };
                    t.$apiFun.post("/api/getfanshui", e).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.fanshuiList = e.data.list.data, t.fanshuishowData = e.data.list, t.jisuan = e.data.jisuan, t.nojisuan = e.data.nojisuan),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })
                },
                lingqu: function() {
                    var t = this;
                    t.nojisuan <= 0 ? t.$parent.showTost(0, "暂无领取额度！") : (t.$parent.showLoading(), t.$apiFun.post("/api/dofanshui", {}).then(function(e) {
                        console.log(e),
                        t.$parent.getUserInfo(),
                        t.$parent.showTost(1, e.message),
                        t.getfanshui()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    }))
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        vt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("section", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__users_layout__params__2DfEC"
                },
                [a("div", {
                    staticClass: "myCenterCommon__check_wrap__3bM7H"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_layout__params_item__MYZdv myCenterCommon__fl__waaJH",
                    staticStyle: {
                        width: "35%"
                    }
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_params__label__3y-Q5"
                },
                [t._v("选择游戏：")]), t._v(" "), a("div", [a("el-select", {
                    attrs: {
                        placeholder: "请选择平台"
                    },
                    on: {
                        change: t.changApiType
                    },
                    model: {
                        value: t.api_type,
                        callback: function(e) {
                            t.api_type = e
                        },
                        expression: "api_type"
                    }
                },
                t._l(t.dogameLis,
                function(t, e) {
                    return a("el-option", {
                        key: e,
                        attrs: {
                            label: t.name,
                            value: t.platname
                        }
                    })
                }), 1)], 1)]), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__users_layout__params_item__MYZdv myCenterCommon__fr__3TeIF"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_params__label__3y-Q5"
                },
                [t._v("时间选择：")]), t._v(" "), a("el-radio-group", {
                    on: {
                        change: t.changeDate
                    },
                    model: {
                        value: t.date,
                        callback: function(e) {
                            t.date = e
                        },
                        expression: "date"
                    }
                },
                [a("el-radio-button", {
                    attrs: {
                        label: 1
                    }
                },
                [t._v("今日")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 2
                    }
                },
                [t._v("一周内")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 3
                    }
                },
                [t._v("半月内")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 4
                    }
                },
                [t._v("一月内")])], 1)], 1), t._v(" "), a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "113px",
                        height: "40px",
                        position: "absolute",
                        left: "120px",
                        top: "-60px"
                    },
                    attrs: {
                        "data-label": "投注记录-查询"
                    },
                    on: {
                        click: t.lingqu
                    }
                },
                [t._v("一键领取")]), t._v(" "), a("div", {
                    staticStyle: {
                        width: "200px",
                        "line-height": "40px",
                        height: "40px",
                        position: "absolute",
                        left: "300px",
                        top: "-60px"
                    }
                },
                [t._v("\n        可领取返水金额："), a("span", {
                    staticStyle: {
                        "font-weight": "bold",
                        color: "red"
                    }
                },
                [t._v(t._s(t.nojisuan))])]), t._v(" "), a("div", {
                    staticStyle: {
                        width: "200px",
                        "line-height": "40px",
                        height: "40px",
                        position: "absolute",
                        left: "500px",
                        top: "-60px"
                    }
                },
                [t._v("\n        总计领取返水金额："), a("span", {
                    staticStyle: {
                        "font-weight": "bold",
                        color: "red"
                    }
                },
                [t._v(t._s(t.jisuan))])])])]), t._v(" "), a("el-table", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        data: t.fanshuiList
                    }
                },
                [a("el-table-column", {
                    attrs: {
                        prop: "gamename",
                        label: "游戏名称"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "money",
                        label: "返水金额"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "state",
                        label: "状态"
                    },
                    scopedSlots: t._u([{
                        key: "default",
                        fn: function(e) {
                            return [t._v("\n        " + t._s(0 == e.row.state ? "待领取": "已领取") + "\n      ")]
                        }
                    }])
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "created_at",
                        label: "返水时间"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "state",
                        label: "领取时间"
                    },
                    scopedSlots: t._u([{
                        key: "default",
                        fn: function(e) {
                            return [t._v("\n        " + t._s(0 == e.row.state ? "暂未领取": e.row.updated_at) + "\n      ")]
                        }
                    }])
                })], 1), t._v(" "), t.fanshuishowData.total ? a("el-pagination", {
                    staticStyle: {
                        margin: "20px 0 0px 120px"
                    },
                    attrs: {
                        "current-page": t.page,
                        "page-size": 10,
                        layout: "prev, pager, next",
                        total: t.fanshuishowData.total
                    },
                    on: {
                        "current-change": t.getfanshui,
                        "update:currentPage": function(e) {
                            t.page = e
                        },
                        "update:current-page": function(e) {
                            t.page = e
                        }
                    }
                }) : t._e()], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("返水记录")])])
            }]
        };
        var gt = a("VU/8")(ut, vt, !1,
        function(t) {
            a("0jYu")
        },
        "data-v-f06f8dd2", null).exports,
        ft = {
            name: "betRecord",
            data: function() {
                return {
                    date: 4,
                    betrecordList: [],
                    page: 1,
                    betrecordShowData: {},
                    statuType: ["无效注单", "已结算", "未结算"],
                    dogameLis: [],
                    api_type: ""
                }
            },
            created: function() {
                this.getdogame(),
                this.getbetrecord()
            },
            methods: {
                changApiType: function() {
                    this.page = 1,
                    this.getbetrecord()
                },
                getdogame: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(e) {
                        console.log(e),
                        200 != e.code && t.showTost(e.message),
                        200 == e.code && (t.dogameLis = e.data, t.dogameLis.unshift({
                            name: "全平台",
                            platname: ""
                        }))
                    })
                },
                changeDate: function() {
                    this.page = 1,
                    this.getbetrecord()
                },
                getbetrecord: function() {
                    var t = this;
                    t.$parent.showLoading();
                    var e = {
                        date: t.date,
                        page: t.page,
                        api_type: t.api_type
                    };
                    t.$apiFun.post("/api/betrecord", e).then(function(e) {
                        console.log(e),
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.betrecordList = e.data.data, t.betrecordShowData = e.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        ht = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("section", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__users_layout__params__2DfEC"
                },
                [a("div", {
                    staticClass: "myCenterCommon__check_wrap__3bM7H"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_layout__params_item__MYZdv myCenterCommon__fl__waaJH",
                    staticStyle: {
                        width: "35%"
                    }
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_params__label__3y-Q5"
                },
                [t._v("选择游戏：")]), t._v(" "), a("div", [a("el-select", {
                    attrs: {
                        placeholder: "请选择平台"
                    },
                    on: {
                        change: t.changApiType
                    },
                    model: {
                        value: t.api_type,
                        callback: function(e) {
                            t.api_type = e
                        },
                        expression: "api_type"
                    }
                },
                t._l(t.dogameLis,
                function(t, e) {
                    return a("el-option", {
                        key: e,
                        attrs: {
                            label: t.name,
                            value: t.platname
                        }
                    })
                }), 1)], 1)])]), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__check_wrap__3bM7H"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_layout__params_item__MYZdv myCenterCommon__fr__3TeIF"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_params__label__3y-Q5"
                },
                [t._v("时间选择：")]), t._v(" "), a("el-radio-group", {
                    on: {
                        change: t.changeDate
                    },
                    model: {
                        value: t.date,
                        callback: function(e) {
                            t.date = e
                        },
                        expression: "date"
                    }
                },
                [a("el-radio-button", {
                    attrs: {
                        label: 1
                    }
                },
                [t._v("今日")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 2
                    }
                },
                [t._v("一周内")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 3
                    }
                },
                [t._v("半月内")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 4
                    }
                },
                [t._v("一月内")])], 1)], 1)])]), t._v(" "), a("el-table", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        data: t.betrecordList
                    }
                },
                [a("el-table-column", {
                    attrs: {
                        type: "index",
                        label: "序号",
                        width: "50"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "bet_time",
                        label: "时间",
                        width: "180"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "bet_id",
                        label: "订单号",
                        width: "200"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "Code",
                        label: "游戏名称"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "bet_amount",
                        label: "金额"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "win_loss",
                        label: "派彩"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "status",
                        label: "状态",
                        width: "70"
                    },
                    scopedSlots: t._u([{
                        key: "default",
                        fn: function(e) {
                            return [t._v(" " + t._s(t.statuType[e.row.status]) + " ")]
                        }
                    }])
                })], 1), t._v(" "), t.betrecordShowData.total ? a("el-pagination", {
                    staticStyle: {
                        margin: "20px 0 0px 120px"
                    },
                    attrs: {
                        "current-page": t.page,
                        "page-size": 10,
                        layout: "prev, pager, next",
                        total: t.betrecordShowData.total
                    },
                    on: {
                        "current-change": t.getbetrecord,
                        "update:currentPage": function(e) {
                            t.page = e
                        },
                        "update:current-page": function(e) {
                            t.page = e
                        }
                    }
                }) : t._e()], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("投注记录")]), this._v(" "), e("span", [this._v("每个场馆的数据将有一定时间的延迟，仅供参考使用")])])
            }]
        };
        var bt = a("VU/8")(ft, ht, !1,
        function(t) {
            a("uc4V")
        },
        "data-v-4d9e99ed", null).exports,
        yt = {
            name: "transRecord",
            data: function() {
                return {
                    date: 4,
                    transrecordList: [],
                    transrecordListShowData: {},
                    type: 1,
                    page: 1,
                    stateType12: ["未定义", "待审核", "审核通过", "审核拒绝"],
                    stateType34: ["失败", "成功", "待结算", "未定义"],
                    dogameLis: [],
                    api_type: ""
                }
            },
            created: function() {
                this.getdogame(),
                this.getTransrecord()
            },
            methods: {
                changApiType: function() {
                    this.page = 1,
                    this.getTransrecord()
                },
                getdogame: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(e) {
                        console.log(e),
                        200 != e.code && t.showTost(e.message),
                        200 == e.code && (t.dogameLis = e.data, t.dogameLis.unshift({
                            name: "全平台",
                            platname: ""
                        }))
                    })
                },
                changeDate: function() {
                    this.page = 1,
                    this.getTransrecord()
                },
                getTransrecord: function() {
                    var t = this;
                    t.$parent.showLoading();
                    var e = {
                        date: t.date,
                        type: t.type,
                        page: t.page,
                        api_type: t.api_type
                    };
                    t.$apiFun.post("/api/gettransrecord", e).then(function(e) {
                        console.log(e),
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.transrecordList = e.data.data, t.transrecordListShowData = e.data),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        wt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("section", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__users_layout__params__2DfEC"
                },
                [a("div", {
                    staticClass: "myCenterCommon__check_wrap__3bM7H"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_layout__params_item__MYZdv myCenterCommon__fl__waaJH",
                    staticStyle: {
                        width: "35%"
                    }
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_params__label__3y-Q5"
                },
                [t._v("选择游戏：")]), t._v(" "), a("div", [a("el-select", {
                    attrs: {
                        placeholder: "请选择平台"
                    },
                    on: {
                        change: t.changApiType
                    },
                    model: {
                        value: t.api_type,
                        callback: function(e) {
                            t.api_type = e
                        },
                        expression: "api_type"
                    }
                },
                t._l(t.dogameLis,
                function(t, e) {
                    return a("el-option", {
                        key: e,
                        attrs: {
                            label: t.name,
                            value: t.platname
                        }
                    })
                }), 1)], 1)])]), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__check_wrap__3bM7H"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_layout__params_item__MYZdv myCenterCommon__fr__3TeIF"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_params__label__3y-Q5"
                },
                [t._v("交易类型：")]), t._v(" "), a("el-radio-group", {
                    on: {
                        change: t.changeDate
                    },
                    model: {
                        value: t.type,
                        callback: function(e) {
                            t.type = e
                        },
                        expression: "type"
                    }
                },
                [a("el-radio-button", {
                    attrs: {
                        label: 1
                    }
                },
                [t._v("存款")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 2
                    }
                },
                [t._v("取款")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 3
                    }
                },
                [t._v("转入")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 4
                    }
                },
                [t._v("转出")])], 1)], 1)]), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__check_wrap__3bM7H"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_layout__params_item__MYZdv myCenterCommon__fr__3TeIF"
                },
                [a("div", {
                    staticClass: "myCenterCommon__users_params__label__3y-Q5"
                },
                [t._v("时间选择：")]), t._v(" "), a("el-radio-group", {
                    on: {
                        change: t.changeDate
                    },
                    model: {
                        value: t.date,
                        callback: function(e) {
                            t.date = e
                        },
                        expression: "date"
                    }
                },
                [a("el-radio-button", {
                    attrs: {
                        label: 1
                    }
                },
                [t._v("今日")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 2
                    }
                },
                [t._v("一周内")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 3
                    }
                },
                [t._v("半月内")]), t._v(" "), a("el-radio-button", {
                    attrs: {
                        label: 4
                    }
                },
                [t._v("一月内")])], 1)], 1)])]), t._v(" "), a("el-table", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        data: t.transrecordList
                    }
                },
                [a("el-table-column", {
                    attrs: {
                        type: "index",
                        label: "序号",
                        width: "50"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "created_at",
                        label: "时间",
                        width: "180"
                    }
                }), t._v(" "), 1 == t.type || 2 == t.type ? a("el-table-column", {
                    attrs: {
                        prop: "out_trade_no",
                        label: "订单号",
                        width: "200"
                    }
                }) : t._e(), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "pay_way",
                        label: "交易类型"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "amount",
                        label: "金额"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "state",
                        label: "状态",
                        width: "80"
                    },
                    scopedSlots: t._u([{
                        key: "default",
                        fn: function(e) {
                            return [t._v(" " + t._s(1 == t.type || 2 == t.type ? t.stateType12[e.row.state] : t.stateType34[e.row.state]) + " ")]
                        }
                    }])
                })], 1), t._v(" "), t.transrecordListShowData.total ? a("el-pagination", {
                    staticStyle: {
                        margin: "20px 0 0px 120px"
                    },
                    attrs: {
                        "current-page": t.page,
                        "page-size": 10,
                        layout: "prev, pager, next",
                        total: t.transrecordListShowData.total
                    },
                    on: {
                        "current-change": t.getTransrecord,
                        "update:currentPage": function(e) {
                            t.page = e
                        },
                        "update:current-page": function(e) {
                            t.page = e
                        }
                    }
                }) : t._e()], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("资金记录\n")]), this._v(" "), e("span", [this._v("每个场馆的数据将有一定时间的延迟，仅供参考使用")])])
            }]
        };
        var xt = a("VU/8")(yt, wt, !1,
        function(t) {
            a("IpLF")
        },
        "data-v-30e51fa0", null).exports,
        Ct = {
            name: "transfer",
            data: function() {
                return {
                    nshow: !0,
                    balancelist: [],
                    openInfo: {},
                    amount: null,
                    payType: 0,
                    daoTime: null
                }
            },
            created: function() {
                var t = this;
                t.getbalancelist()		
            },
            methods: {
                retrun: function(t) {
                    t.stopPropagation()
                },
                isOk: function() {
                    var t = this,
                    e = "",
                    a = "";
                    0 == t.payType ? (e = "userbalance", a = t.openInfo.platname) : (e = t.openInfo.platname, a = "userbalance");
                    var s = {
                        amount: t.amount,
                        sourcetype: e,
                        targettype: a
                    };
                    null != t.amount ? (t.showLoading(), t.$apiFun.post("/api/transfer", s).then(function(e) {
                        t.closeCv(),
                        t.showTost(1, e.message),
                        200 === e.code ? (t.refreshusermoney(), t.getbalancelist()) : t.hideLoading()
                    })) : t.showTost(0, "请输入操作金额！")
                },
                changVal: function(t) {					
					var ts = this;
					ts.UserApiMoney(t.platname),					
                    this.openInfo = t, this.amount = null										
                },
                UserApiMoney: function(code) {
                    var t = this;
                    t.$apiFun.post("/api/userapimoney/" + code, {}).then(function(s) {
                        200 != s.code && t.showTost(0, s.message),
						200 == s.code && (jiazai(code,s.data.balance),t.getbalancelistNoLoding())
                    }).
                    catch(function(e) {

                    })
                },				
                closeCv: function() {
                    this.openInfo = {},
                    this.amount = null
                },
                changeTasfer: function() {
                    var t = this;
                    t.showLoading();
                    var e = JSON.parse(localStorage.getItem("userInfo")),
                    a = e.transferstatus ? 0 : 1;
                    t.$apiFun.post("/api/uptransferstatus", {
                        transferstatus: a
                    }).then(function(s) {
                        200 != s.code && t.showTost(0, s.message),
                        200 == s.code && (e.transferstatus = a, localStorage.setItem("userInfo", n()(e)), t.$store.commit("changUserInfo"), t.showTost(1, "操作成功！")),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                getBalances: function() {
                    var t = this;
                    t.showLoading(),
                    t.getbalancelist(),
                    t.$apiFun.post("/api/balance", {}).then(function(e) {
                        if (200 == e.code) {
                            var a = JSON.parse(localStorage.getItem("userInfo"));
                            a.balance = e.data.balance,
                            localStorage.setItem("userInfo", n()(a)),
                            t.$store.commit("changUserInfo")
                        }
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                getbalancelistNoLoding: function() {
                    var t = this;				
                    t.$apiFun.post("/api/balancelist", {}).then(function(e) {
                        if (200 !== e.code && t.showTost(0, e.message), 200 === e.code) {
                            t.balancelist = e.data;
                            var a = e.data;
                            a.unshift({
                                platname: "userbalance",
                                name: "平台钱包"
                            }),
                            t.balancelist = a
                        }
                    }).
                    catch(function(t) {})
                },
                getbalancelist: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/balancelist", {}).then(function(e) {
                        if (200 !== e.code && t.showTost(0, e.message), 200 === e.code) {
                            t.balancelist = e.data;
                            var a = e.data;
                            a.unshift({
                                platname: "userbalance",
                                name: "平台钱包"
                            }),
                            t.balancelist = a
                        }
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                changBshow: function() {
                    this.nshow = !this.nshow
                },
                refreshusermoney: function() {
                    var t = this;
                    t.$apiFun.post("/api/refreshusermoney", {}).then(function(e) {
                        t.hideLoading(),
                        200 == e.code && (localStorage.setItem("userInfo", n()(e.data)), t.$store.commit("changUserInfo"))
                    })
                },
                transall: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/transall", {}).then(function(e) {
                        t.showTost(1, e.message),
                        t.getbalancelist(),
                        t.refreshusermoney(),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        kt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [a("div", {
                    staticClass: "style__titleHead__QII3Y common__clearfix__28XIR"
                },
                [t._m(0), t._v(" "), a("ul", {
                    staticClass: "tabs__tabsMyWallet__2l1uB"
                },
                [a("li", {
                    class: 0 == t.$store.state.userInfo.transferstatus ? "ddf tabs__active__qlOaY": "ddf ",
                    on: {
                        click: t.changeTasfer
                    }
                },
                [t._v("转账模式")]), t._v(" "), a("li", {
                    class: 1 == t.$store.state.userInfo.transferstatus ? "ddf tabs__active__qlOaY": "ddf ",
                    on: {
                        click: t.changeTasfer
                    }
                },
                [t._v("免转模式")])])]), t._v(" "), a("ul", {
                    staticClass: "amountList__box__1_ZI4"
                },
                [a("li", {
                    staticStyle: {
                        width: "100%"
                    }
                },
                [a("img", {
                    staticClass: "amountList__icon__33WXt",
                    attrs: {
                        src: "/static/image/sdqianbao.dc40ee4f3863c42e32b6a486b5b706fc.svg"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "amountList__infoWrap__3hanq"
                },
                [a("span", [t._v("钱包")]), t._v(" "), a("div", {
                    staticClass: "amountList__info__3_qtq"
                },
                [a("span", {
                    staticClass: "amountList__amount__3uzil left_than"
                },
                [t._v(t._s(t.$store.state.userInfo.balance))]), a("span", {
                    staticClass: "amountList__rmb__2yHNG"
                },
                [t._v("元")]), a("img", {
                    staticClass: "amountList__refresh__3I1Qb",
                    attrs: {
                        src: "/static/image/shuaxin.6eaac0e1956ef2120631f454674d245a.svg"
                    },
                    on: {
                        click: t.getBalances
                    }
                })])]), t._v(" "),t.$store.state.userInfo.transferstatus ? a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "80px",
                        height: "28px",
                        position: "absolute",
                        right: "18px",
                        top: "15px",
                        "border-radius": "20px",
                        "font-size": "14px"
                    },
                    on: {
                        click: t.transall
                    }
                },
                [t._v("一键回收")]) : t._v(" ")])]), t._v(" "), a("ul", {
                    staticClass: "style__walletlist__1AcAs common__clearfix__28XIR style__isShowMore__39BHt",
                    staticStyle: {
                        "margin-top": "20px"
                    }
                },
                t._l(t.balancelist,
				
                function(e, s) {					
                    return "userbalance" != e.platname ? a("li", {
                        key: s,
                        staticClass: "null null",
                        on: {
                            click: function(a) {
                                return t.changVal(e)
                            }
                        }
                    },
                    [a("div", {
                        staticClass: "style__top__199Xy"
                    },
                    [a("div", [a("span", {
                        staticClass: "style__clientName__1Muqt"
                    },
                    [t._v(t._s(e.name))])]), t._v(" "), a("div", {
                        staticClass: "style__actionBtnBox__Hce64"
                    },		
                    [t._v(t.$store.state.userInfo.transferstatus ? "刷新" : "额度转换")])]), t._v(" "), a("div", {
                        staticClass: "style__money__1Iols"
                    },
                    [a("i", [t._v(t._s(e.balance))])])]) : t._e()
                }), 0), t._v(" "), t.openInfo.name ? a("div", {
                    staticClass: "el-dialog__wrapper",
                    staticStyle: {
                        "z-index": "999",
                        background: "rgb(81 73 73 / 49%)"
                    },
                    on: {
                        click: t.closeCv
                    }
                },
                [a("div", {
                    staticClass: "el-dialog",
                    staticStyle: {
                        "margin-top": "15vh"
                    },
                    attrs: {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "额度转换"
                    },
                    on: {
                        click: t.retrun
                    }
                },
                [a("div", {
                    staticClass: "el-dialog__header"
                },
                [a("span", {
                    staticClass: "el-dialog__title"
                },
                [t._v("额度转换")]), a("button", {
                    staticClass: "el-dialog__headerbtn",
                    attrs: {
                        type: "button",
                        "aria-label": "Close"
                    },
                    on: {
                        click: t.closeCv
                    }
                },
                [a("i", {
                    staticClass: "el-dialog__close el-icon el-icon-close"
                })])]), t._v(" "), a("div", {
                    staticClass: "el-dialog__body"
                },
                [a("div", {
                    staticClass: "el-form el-form--inline"
                },
                [a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("平台账户余额")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input is-disabled"
                },
                [a("span", {
                        staticClass: "style__clientName__1Muqt"
                    },
                    [t._v(t._s(t.$store.state.userInfo.balance))])])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    }
                },
                [t._v("游戏账户余额")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input is-disabled"
                },
                [a("span", {
                        staticClass: "style__clientName__1Muqt",
						attrs: {
                            id: "money_" + t.openInfo.platname
                        }
                    },
                    [t._v(t._s("读取中·····"))])])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [t.$store.state.userInfo.transferstatus ? t._v(" ") : a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("转账方式")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("el-radio", {
                    attrs: {
                        label: 0
                    },
                    model: {
                        value: t.payType,
                        callback: function(e) {
                            t.payType = e
                        },
                        expression: "payType"
                    }
                },
                [t._v("转入")]), t._v(" "), a("el-radio", {
                    attrs: {
                        label: 1
                    },
                    model: {
                        value: t.payType,
                        callback: function(e) {
                            t.payType = e
                        },
                        expression: "payType"
                    }
                },
                [t._v("转出")])], 1)])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },

                [t.$store.state.userInfo.transferstatus ? t._v(" ") : a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "money"
                    }
                },
                [t._v("操作金额")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.amount,
                        expression: "amount"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "填写操作金额"
                    },
                    domProps: {
                        value: t.amount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.amount = e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-10px",
                        "margin-right": "-10px"
                    }
                },
                [t._m(1), t._v(" "), a("div", {
                    staticClass: "el-col el-col-16",
                    staticStyle: {
                        "padding-left": "150px",
                        "padding-right": "10px"
                    }
                },
                [t.$store.state.userInfo.transferstatus ? t._v(" ") : a("button", {
                    staticClass: "el-button el-button--primary",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.isOk
                    }
                },
                [a("span", [t._v("确认转账")])])]), t._v(" "), t._m(2)])])])])]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "title__title__RTC9P"
                },
                [e("b", [this._v("转账")]), e("span", [this._v("场馆钱包和场馆钱包之间不可以互转")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "el-col el-col-4",
                    staticStyle: {
                        "padding-left": "10px",
                        "padding-right": "10px"
                    }
                },
                [e("div", {
                    staticClass: "grid-content bg-purple"
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "el-col el-col-4",
                    staticStyle: {
                        "padding-left": "10px",
                        "padding-right": "10px"
                    }
                },
                [e("div", {
                    staticClass: "grid-content bg-purple"
                })])
            }]
        };
        var St = a("VU/8")(Ct, kt, !1,
        function(t) {
            a("QNeT")
        },
        "data-v-4299e2be", null).exports,
        $t = a("bOdI"),
        It = a.n($t),
        Lt = {
            name: "recharge",
            data: function() {
                var t;
                return t = {
                    pay_way: "rengong",
                    bankBox: {},
                    payInfo: {},
                    amount: null,
                    cardLis: [],
                    banklist: [1]
                },
                It()(t, "bankBox", {}),
                It()(t, "meyXi", "ERC20"),
                It()(t, "payWayList", {}),
                It()(t, "userbank", []),
                It()(t, "userUSD", [1]),
                It()(t, "min_price", 100),
                It()(t, "max_price", 1e4),
                t
            },
            created: function() {
                this.getPayWay(),
                this.getBanklist(),
                this.getcard()
            },
            methods: {
                getPayRange: function() {
                    var t = this,
                    e = null;
                    "bank" == t.pay_way && (e = "bank"),
                    "wechat" == t.pay_way && (e = "wechat"),
                    "alipay" == t.pay_way && (e = "alipay"),
                    "alipay" == t.pay_way && (e = "alipay"),
                    "usdt" == t.pay_way && ("ERC20" == t.meyXi && (e = "usdt-erc20"), "TRC20" == t.meyXi && (e = "usdt-trc20")),
                    t.showLoading(),
                    t.$apiFun.post("/api/getPayRange", {
                        type: e
                    }).then(function(e) {
                        200 == e.code && (t.min_price = e.data.min_price, t.max_price = e.data.max_price),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                changXiyi: function(t) {
                    this.meyXi != t && (this.meyXi = t, this.getPayRange())
                },
                getPayWay: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.get("/api/get_pay_way", {}).then(function(e) {
                        if (200 == e.code) {
                            t.payWayList = e.data,
                            t.payWayList.rengong = 1;
                            var a = t.payWayList;
                            for (var s in a) if (1 == a[s]) return t.pay_way = "card" == s ? "bank": s,
                            t.hideLoading(),
                            void t.getPayRange()
                        }
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                payTest: function() {
                    var t = this,
                    e = this,
                    a = {};
                    if ("bank" == e.pay_way) {
                        if (a = {
                            paytype: e.pay_way,
                            amount: 1 * e.amount,
                            bank: e.bankBox.bank,
                            bank_address: e.bankBox.bank_address,
                            bank_no: e.bankBox.bank_no,
                            bank_owner: e.bankBox.bank_owner
                        },
                        console.log(a), !a.bank_owner) return void e.showTost(0, "请输入存款人姓名");
                        if (!a.bank) return void e.showTost(0, "请输入银行类型");
                        if (!a.bank_no) return void e.showTost(0, "请输入银行卡号");
                        if (!a.bank_address) return void e.showTost(0, "请输入银行开户行地址")
                    } else a = {
                        paytype: e.pay_way,
                        amount: 1 * e.amount
                    };
                    "usdt" == e.pay_way && (a.catepay = e.meyXi),
                    a.amount < e.min_price || a.amount > e.max_price ? e.showTost(0, "请输入金额在" + e.min_price + "-" + e.max_price + "之间！") : (e.showLoading(), a.paytype = "wechat" == a.paytype ? "wxpay": a.paytype, e.$apiFun.post("/api/recharge", a).then(function(a) {
                        if (console.log(a), 200 != a.code && e.showTost(0, a.message), 200 == a.code) {
                            if (e.amount = null, "bank" == e.pay_way) return e.showTost(1, "提交成功，等待后台审核"),
                            e.bankBox = {},
                            e.amount = null,
                            e.hideLoading(),
                            void setTimeout(function() {
                                e.$router.push({
                                    path: "/transRecord"
                                })
                            },
                            2e3);
                            e.bankBox = {},
                            e.amount = null,
                            e.showTost(1, "正在跳转..."),
                            setTimeout(function() {
                                e.$router.push({
                                    path: "/transRecord"
                                })
                            },
                            2e3);
                            var s = t.$router.resolve({
                                path: "/payInfo",
                                query: {
                                    deposit_no: a.message
                                }
                            });
                            window.open(s.href, "_blank")
                        }
                        e.hideLoading()
                    }).
                    catch(function(t) {
                        e.hideLoading()
                    }))
                },
                changMey: function(t) {
                    this.amount = 1 * t
                },
                getBanklist: function() {
                    var t = this;
                    t.$apiFun.post("/api/banklist", {}).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.banklist = e.data),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                getcard: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/getpaybank", {}).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.cardLis = e.data, t.hideLoading())
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                getuseCardlist: function() {
                    var t = this;
                    t.$apiFun.post("/api/getcard", {
                        type: 1
                    }).then(function(e) {
                        200 == e.code && (t.userbank = e.data)
                    }),
                    t.$apiFun.post("/api/getcard", {
                        type: 2
                    }).then(function(e) {
                        200 == e.code && (t.userUSD = e.data)
                    })
                },
                changPayway: function(t) {
                    t != this.pay_way && (this.pay_way = t, this.bankBox = {},
                    this.payInfo = {},
                    this.amount = null, this.getPayRange())
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                doCopy: function(t) {
                    var e = document.createElement("input");
                    e.style.opacity = "0",
                    e.value = t,
                    document.body.appendChild(e),
                    e.select(),
                    document.execCommand("copy"),
                    this.showTost(1, "复制成功！")
                },
                getUserInfo: function() {
                    this.$parent.getUserInfo()
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {},
            beforeRouteEnter: function(t, e, a) {
                a(function(t) {
                    t.getuseCardlist()
                })
            }
        },
        Tt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "style__depositType_box__3Ls0s undefined"
                },
                [a("div", [a("div", {
                    staticClass: "style__tk_jr__1bGUA"
                },
                [a("div", {
                    staticClass: "style__list_box__2YvIs cunkuan1",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("ul", {
                    staticClass: "index__Checkbox__1YkXt pay-list",
                    staticStyle: {
                        width: "920px",
                        "text-align": "center",
                        "margin-left": "-21px"
                    }
                },
                [1 == t.payWayList.card ? a("div", {
                    class: "bank" == t.pay_way ? " index__Active__3D-PM": "",
                    staticStyle: {
                        width: "133px",
                        height: "100px",
                        margin: "0px 0px 20px 20px"
                    },
                    attrs: {
                        id: "tab1"
                    },
                    on: {
                        click: function(e) {
                            return t.changPayway("bank")
                        }
                    }
                },
                [t._m(1)]) : t._e(), t._v(" "), 1 == t.payWayList.usdt ? a("div", {
                    class: "usdt" == t.pay_way ? " index__Active__3D-PM": "",
                    staticStyle: {
                        width: "133px",
                        height: "100px",
                        margin: "0px 0px 20px 20px"
                    },
                    attrs: {
                        id: "tab2"
                    },
                    on: {
                        click: function(e) {
                            return t.changPayway("usdt")
                        }
                    }
                },
                [t._m(2)]) : t._e(), t._v(" "), 1 == t.payWayList.wechat ? a("div", {
                    class: "wechat" == t.pay_way ? " index__Active__3D-PM": "",
                    staticStyle: {
                        width: "133px",
                        height: "100px",
                        margin: "0px 0px 20px 20px"
                    },
                    attrs: {
                        id: "tab2"
                    },
                    on: {
                        click: function(e) {
                            return t.changPayway("wechat")
                        }
                    }
                },
                [t._m(3)]) : t._e(), t._v(" "), 1 == t.payWayList.alipay ? a("div", {
                    class: "alipay" == t.pay_way ? " index__Active__3D-PM": "",
                    staticStyle: {
                        width: "133px",
                        height: "100px",
                        margin: "0px 0px 20px 20px"
                    },
                    attrs: {
                        id: "tab2"
                    },
                    on: {
                        click: function(e) {
                            return t.changPayway("alipay")
                        }
                    }
                },
                [t._m(4)]) : t._e()])])]), t._v(" "), "bank" != t.pay_way || 0 == t.userbank.length && 0 == t.userUSD.length ? t._e() : a("div", {
                    staticStyle: {
                        width: "100%",
                        "margin-bottom": "20px",
                        display: "flex",
                        "flex-wrap": "wrap"
                    }
                },
                t._l(t.cardLis,
                function(e, s) {
                    return a("div", {
                        key: s,
                        staticClass: "usdt__card__1QL7m usdt__mid__2A8wC",
                        staticStyle: {
                            width: "42%",
                            "margin-right": "10px",
                            "margin-top": "10px"
                        }
                    },
                    [a("p", {
                        staticClass: "usdt__sub_tip__24nbZ sfff"
                    },
                    [t._v("收款账号：")]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v(t._s(e.bank_no) + " "), a("span", {
                        staticClass: "spanss",
                        on: {
                            click: function(a) {
                                return t.doCopy(e.bank_no)
                            }
                        }
                    },
                    [t._v("复制")])]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("银行户名：" + t._s(e.bank_owner) + " "), a("span", {
                        staticClass: "spanss",
                        on: {
                            click: function(a) {
                                return t.doCopy(e.bank_owner)
                            }
                        }
                    },
                    [t._v("复制")])]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("开 户 行：" + t._s(e.bank_data.bank_name) + " "), a("span", {
                        staticClass: "spanss",
                        on: {
                            click: function(a) {
                                return t.doCopy(e.bank_data.bank_name)
                            }
                        }
                    },
                    [t._v("复制")])]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("银行地址：" + t._s(e.bank_address) + " "), a("span", {
                        staticClass: "spanss",
                        on: {
                            click: function(a) {
                                return t.doCopy(e.bank_address)
                            }
                        }
                    },
                    [t._v("复制")])])])
                }), 0), t._v(" "), "bank" == t.pay_way ? a("div", {
                    staticStyle: {
                        "margin-top": "20px",
                        display: "block"
                    }
                },
                [a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        "margin-bottom": "20px",
                        display: "block"
                    },
                    attrs: {
                        id: "item2"
                    }
                },
                [a("p", {
                    staticClass: "style__text__1D2UV style__depositName__2M33H"
                },
                [t._v("存款银行")]), t._v(" "), a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("el-select", {
                    staticStyle: {
                        width: "360px"
                    },
                    attrs: {
                        placeholder: "请选择支持银行"
                    },
                    model: {
                        value: t.bankBox.bank,
                        callback: function(e) {
                            t.$set(t.bankBox, "bank", e)
                        },
                        expression: "bankBox.bank"
                    }
                },
                t._l(t.banklist,
                function(t) {
                    return a("el-option", {
                        key: t.bank_name,
                        attrs: {
                            label: t.bank_name,
                            value: t.bank_name
                        }
                    })
                }), 1)], 1)]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        "margin-bottom": "20px",
                        display: "block"
                    },
                    attrs: {
                        id: "item2"
                    }
                },
                [a("p", {
                    staticClass: "style__text__1D2UV style__depositName__2M33H"
                },
                [t._v("存款人姓名")]), t._v(" "), a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("span", [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.bankBox.bank_owner,
                        expression: "bankBox.bank_owner"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "286px",
                        height: "40px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "存款页存款姓名按钮点击次数",
                        "data-key": "yb_hm_dpst_dspname_tap",
                        type: "text",
                        placeholder: "请输入信息",
                        value: ""
                    },
                    domProps: {
                        value: t.bankBox.bank_owner
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.bankBox, "bank_owner", e.target.value)
                        }
                    }
                })]), t._m(5)])]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        "margin-bottom": "20px",
                        display: "block"
                    },
                    attrs: {
                        id: "item2"
                    }
                },
                [a("p", {
                    staticClass: "style__text__1D2UV style__depositName__2M33H"
                },
                [t._v("银行卡号")]), t._v(" "), a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("span", [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.bankBox.bank_no,
                        expression: "bankBox.bank_no"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "286px",
                        height: "40px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "存款页存款姓名按钮点击次数",
                        "data-key": "yb_hm_dpst_dspname_tap",
                        type: "text",
                        placeholder: "请输入银行卡号",
                        maxlength: "24",
                        value: ""
                    },
                    domProps: {
                        value: t.bankBox.bank_no
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.bankBox, "bank_no", e.target.value)
                        }
                    }
                })]), t._m(6)])]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        "margin-bottom": "20px",
                        display: "block"
                    },
                    attrs: {
                        id: "item2"
                    }
                },
                [a("p", {
                    staticClass: "style__text__1D2UV style__depositName__2M33H"
                },
                [t._v("开户行地址")]), t._v(" "), a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("span", [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.bankBox.bank_address,
                        expression: "bankBox.bank_address"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "286px",
                        height: "40px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "存款页存款姓名按钮点击次数",
                        "data-key": "yb_hm_dpst_dspname_tap",
                        type: "text",
                        placeholder: "请输入开户行地址",
                        maxlength: "24",
                        value: ""
                    },
                    domProps: {
                        value: t.bankBox.bank_address
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.bankBox, "bank_address", e.target.value)
                        }
                    }
                })]), t._m(7)])]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        id: "item3"
                    }
                },
                [a("span", {
                    staticClass: "style__text__1D2UV style__depositMpney__1s4D0"
                },
                [t._v("存款金额")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-bottom": "20px"
                    }
                },
                [a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.amount,
                        expression: "amount"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "286px",
                        height: "40px",
                        "font-weight": "600"
                    },
                    attrs: {
                        type: "text",
                        id: "jine_val",
                        "data-analytics": "button",
                        "data-label": "存款页输入框点击次数",
                        placeholder: "请输入取款金额 " + t.min_price + " - " + t.max_price,
                        "data-key": "yb_hm_dpst_input_tap",
                        value: ""
                    },
                    domProps: {
                        value: t.amount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.amount = e.target.value)
                        }
                    }
                }), t._v(" "), t._m(8)])]), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "usdt_rate",
                        value: "6.42"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "286px",
                        height: "50px",
                        "margin-top": "10px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-key": "yb_hm_dpst_idpst_tap"
                    },
                    on: {
                        click: t.payTest
                    }
                },
                [t._v("立即存款")])])]) : t._e(), t._v(" "), "usdt" == t.pay_way ? a("div", {
                    staticStyle: {
                        "margin-top": "20px",
                        display: "block"
                    }
                },
                [a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    attrs: {
                        id: "item3"
                    }
                },
                [a("span", {
                    staticClass: "style__text__1D2UV style__depositMpney__1s4D0"
                },
                [t._v("协议：")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-bottom": "9px"
                    }
                },
                [a("div", {
                    staticStyle: {
                        display: "flex",
                        "justify-items": "center"
                    }
                },
                [a("ul", {
                    staticClass: "index__Checkbox__1YkXt",
                    staticStyle: {
                        width: "auto",
                        "text-align": "center",
                        "margin-left": "-21px",
                        "margin-top": "10px"
                    }
                },
                [a("div", {
                    class: "TRC20" == t.meyXi ? "index__Active__3D-PM": "",
                    staticStyle: {
                        width: "133px",
                        height: "40px",
                        margin: "0px 0px 20px 20px"
                    },
                    attrs: {
                        id: "xieyi1"
                    },
                    on: {
                        click: function(e) {
                            return t.changXiyi("TRC20")
                        }
                    }
                },
                [a("div", {
                    staticClass: "usdt__checkbox_item__1OfBR"
                },
                [t._v("TRC20")])]), t._v(" "), a("div", {
                    class: "ERC20" == t.meyXi ? "index__Active__3D-PM": "",
                    staticStyle: {
                        width: "133px",
                        height: "40px",
                        margin: "0px 0px 20px 20px"
                    },
                    attrs: {
                        id: "xieyi2"
                    },
                    on: {
                        click: function(e) {
                            return t.changXiyi("ERC20")
                        }
                    }
                },
                [a("div", {
                    staticClass: "usdt__checkbox_item__1OfBR"
                },
                [t._v("ERC20")])])]), t._v(" "), t._m(9)]), t._v(" "), a("span", {
                    staticClass: "usdt__protocol_tip__2Olq6"
                },
                [t._v("小额高频交易推荐")])])]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        id: "item3"
                    }
                },
                [a("span", {
                    staticClass: "style__text__1D2UV style__depositMpney__1s4D0"
                },
                [t._v("存款金额")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-bottom": "20px"
                    }
                },
                [a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.amount,
                        expression: "amount"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "286px",
                        height: "40px",
                        "font-weight": "600"
                    },
                    attrs: {
                        type: "text",
                        id: "jine_val",
                        "data-analytics": "button",
                        "data-label": "存款页输入框点击次数",
                        placeholder: "请输入取款金额 " + t.min_price + " - " + t.max_price,
                        "data-key": "yb_hm_dpst_input_tap",
                        value: ""
                    },
                    domProps: {
                        value: t.amount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.amount = e.target.value)
                        }
                    }
                }), t._v(" "), t._m(10)])]), t._v(" "), a("div", {
                    staticClass: "style__tk_ts__302_r"
                },
                [t._v("\n            ≈"), a("span", {
                    staticClass: "usdt",
                    staticStyle: {
                        color: "red"
                    }
                },
                [t._v(t._s(t.amount ? Math.floor(t.amount / t.$store.state.userInfo.usdtrate * 100) / 100 : "0.00"))]), t._v(" USDT         参考汇率：" + t._s(t.$store.state.userInfo.usdtrate) + "\n          ")])]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "286px",
                        height: "50px",
                        "margin-top": "10px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "存款页立即存款按钮点击次数",
                        "data-key": "yb_hm_dpst_idpst_tap"
                    },
                    on: {
                        click: t.payTest
                    }
                },
                [t._v("立即存款")])])]) : t._e(), t._v(" "), "alipay" == t.pay_way ? a("div", {
                    staticStyle: {
                        "margin-top": "20px",
                        display: "block"
                    }
                },
                [a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        id: "item3"
                    }
                },
                [a("span", {
                    staticClass: "style__text__1D2UV style__depositMpney__1s4D0"
                },
                [t._v("存款金额")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-bottom": "20px"
                    }
                },
                [a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.amount,
                        expression: "amount"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "286px",
                        height: "40px",
                        "font-weight": "600"
                    },
                    attrs: {
                        type: "text",
                        id: "jine_val",
                        "data-analytics": "button",
                        "data-label": "存款页输入框点击次数",
                        placeholder: "请输入取款金额 " + t.min_price + " - " + t.max_price,
                        "data-key": "yb_hm_dpst_input_tap",
                        value: ""
                    },
                    domProps: {
                        value: t.amount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.amount = e.target.value)
                        }
                    }
                }), t._v(" "), t._m(11)])])]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "286px",
                        height: "50px",
                        "margin-top": "10px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "存款页立即存款按钮点击次数",
                        "data-key": "yb_hm_dpst_idpst_tap"
                    },
                    on: {
                        click: t.payTest
                    }
                },
                [t._v("立即存款")])])]) : t._e(), t._v(" "), "wechat" == t.pay_way ? a("div", {
                    staticStyle: {
                        "margin-top": "20px",
                        display: "block"
                    }
                },
                [a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        id: "item3"
                    }
                },
                [a("span", {
                    staticClass: "style__text__1D2UV style__depositMpney__1s4D0"
                },
                [t._v("存款金额")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-bottom": "20px"
                    }
                },
                [a("div", {
                    staticClass: "style__input__3HpTW"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.amount,
                        expression: "amount"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "286px",
                        height: "40px",
                        "font-weight": "600"
                    },
                    attrs: {
                        type: "text",
                        id: "jine_val",
                        "data-analytics": "button",
                        "data-label": "存款页输入框点击次数",
                        placeholder: "请输入取款金额 " + t.min_price + " - " + t.max_price,
                        "data-key": "yb_hm_dpst_input_tap",
                        value: ""
                    },
                    domProps: {
                        value: t.amount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.amount = e.target.value)
                        }
                    }
                }), t._v(" "), t._m(12)])])]), t._v(" "), a("div", {
                    staticClass: "style__tk_jr__1bGUA cunkuan1",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "286px",
                        height: "50px",
                        "margin-top": "10px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "存款页立即存款按钮点击次数",
                        "data-key": "yb_hm_dpst_idpst_tap"
                    },
                    on: {
                        click: t.payTest
                    }
                },
                [t._v("立即存款")])])]) : t._e()])]), t._v(" "), 0 == t.userbank.length && 0 == t.userUSD.length ? a("div", {
                    staticClass: "msgBox__modal__2kbbd",
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "msg关闭"
                    }
                },
                [a("div", {
                    staticClass: "msgBox__modal_HomeAreat_model__2obMO msgBox__modal_CuorsterAreat_model__wwzuA"
                },
                [a("div", {
                    staticClass: "msgBox__notice_header__kkFdX"
                },
                [a("span", {
                    staticClass: "msgBox__text__2ODn2",
                    attrs: {
                        title: ""
                    }
                },
                [t._v("温馨提示")]), a("span", {
                    staticClass: "msgBox__close_icon__3J9a5",
                    on: {
                        click: function(e) {
                            return t.$router.back()
                        }
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "msgBox__notice_content__3Tozy msgBox__notice_content_height__Z3O1m"
                },
                [a("div", {
                    staticClass: "msgBox__flex__-7cOr common__scroll_bar__28TB7"
                },
                [t._v("您还为绑定钱包卡片，请前往添加！")]), t._v(" "), a("div", {
                    staticClass: "msgBox__footer__3DHzZ"
                },
                [a("button", {
                    staticClass: "msgBox__confirm__3ypnx",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/bankCard")
                        }
                    }
                },
                [t._v("前往绑定")])])])])]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("div", {
                    staticClass: "title__title__RTC9P"
                },
                [e("b", [this._v("存款")]), e("span", [this._v("存款金额会存入中心钱包")])])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("li", {
                    staticStyle: {
                        height: "100%"
                    },
                    attrs: {
                        "data-analytics": "button"
                    }
                },
                [e("img", {
                    staticStyle: {
                        height: "36px",
                        "margin-top": "20px"
                    },
                    attrs: {
                        src: "/static/image/icoOnlineTransfer2@3x.png",
                        "data-analytics": "button"
                    }
                }), this._v(" "), e("p", [this._v("银行卡充值")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("li", {
                    staticStyle: {
                        height: "100%"
                    },
                    attrs: {
                        "data-analytics": "button"
                    }
                },
                [e("img", {
                    staticStyle: {
                        height: "36px",
                        "margin-top": "20px"
                    },
                    attrs: {
                        src: "/static/image/usdt.png",
                        "data-analytics": "button"
                    }
                }), this._v(" "), e("p", [this._v("USDT充值")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("li", {
                    staticStyle: {
                        height: "100%"
                    },
                    attrs: {
                        "data-analytics": "button"
                    }
                },
                [e("img", {
                    staticStyle: {
                        height: "36px",
                        "margin-top": "20px"
                    },
                    attrs: {
                        src: "/static/image/QuickWechat.png",
                        "data-analytics": "button"
                    }
                }), this._v(" "), e("p", [this._v("微信充值")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("li", {
                    staticStyle: {
                        height: "100%"
                    },
                    attrs: {
                        "data-analytics": "button"
                    }
                },
                [e("img", {
                    staticStyle: {
                        height: "36px",
                        "margin-top": "20px"
                    },
                    attrs: {
                        src: "/static/image/pay_alipay.png",
                        "data-analytics": "button"
                    }
                }), this._v(" "), e("p", [this._v("支付宝充值")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "style__tk_ts__302_r"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v(" 为及时到账，请务必输入正确的存款人姓名 ")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "style__tk_ts__302_r"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v(" 为及时到账，请务必输入正确的银行卡号")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "style__tk_ts__302_r"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v(" 为及时到账，请务必输入正确的开户行地址")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "style__tk_ts__302_r"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v("建议您存入带尾数的金额（例101、503），以便存款后能更快匹配到账")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("span", {
                    staticClass: "style__tk_ts__302_r usdt__link__2gOZ4 usdt__protocol_diff__3DxJj",
                    staticStyle: {
                        "margin-left": "13px"
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v("选择协议充值。")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "style__tk_ts__302_r"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v("建议您存入带尾数的金额（例101、503），以便存款后能更快匹配到账")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "style__tk_ts__302_r"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v("建议您存入带尾数的金额（例101、503），以便存款后能更快匹配到账")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("span", {
                    staticClass: "style__tk_ts__302_r"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v("建议您存入带尾数的金额（例101、503），以便存款后能更快匹配到账")])
            }]
        };
        var zt = a("VU/8")(Lt, Tt, !1,
        function(t) {
            a("viLX")
        },
        "data-v-2fa8a0db", null).exports,
        qt = {
            name: "withdraw",
            data: function() {
                return {
                    qutype: 0,
                    amount: null,
                    bankId: null,
                    chanmeyXi: null,
                    usercardLis: [],
                    usdssLis: [],
                    banklist: [],
                    cardInfo: {},
                    usdtInfo: {},
                    password: null,
                    bindShow: 0,
                    betAmount: null
                }
            },
            created: function() {
                this.getBetAmount(),
                this.getUsercard(),
                this.getUsdssList(),
                this.getBanklist()
            },
            methods: {
                getBetAmount: function() {
                    var t = this;
                    t.$apiFun.post("/api/getBetAmount", {}).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.betAmount = e.data.bet_amount)
                    }).
                    catch(function(t) {})
                },
                retrun: function(t) {
                    t.stopPropagation()
                },
                closeCv: function() {
                    this.openInfo = {},
                    this.amount = null
                },
                changApiType: function(t) {
                    if (1 == this.qutype) {
                        var e = null;
                        this.usdssLis.forEach(function(a) {
                            a.id != t || (e = a.bank_owner)
                        }),
                        this.chanmeyXi = e
                    } else this.chanmeyXi = null;
                    this.password = null,
                    this.amount = null
                },
                changBindShow: function(t) {
                    this.bindShow = t,
                    this.cardInfo = {},
                    this.usdtInfo = {}
                },
                bindUsdss: function() {
                    var t = this,
                    e = t.usdtInfo;
                    e.bank = "USDT",
                    null != e.bank_no && "" != e.bank_no ? e.bank_owner && null != e.bank_owner ? e.pay_pass ? (t.$parent.showLoading(), t.$apiFun.post("/api/bindcard", e).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.$parent.showTost(1, e.message), t.changBindShow(0), t.getUsercard(), t.getUsdssList()),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输人支付密码") : t.$parent.showTost(0, "请选择钱包协议") : t.$parent.showTost(0, "请输入USDT地址")
                },
                bindCard: function() {
                    var t = this;
                    t.cardInfo.bank_owner ? t.cardInfo.bank ? t.cardInfo.bank_address ? t.cardInfo.bank_no ? t.cardInfo.pay_pass ? t.cardInfo.bank_no.length < 8 ? t.$parent.showTost(0, "请输人正确的卡号长度") : t.cardInfo.pay_pass.length < 6 || t.cardInfo.pay_pass.length > 18 ? t.$parent.showTost(0, "请输人支付密码长度") : (t.$parent.showLoading(), t.$apiFun.post("/api/bindcard", t.cardInfo).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && t.$parent.showTost(1, "绑定成功"),
                        t.changBindShow(0),
                        t.getUsercard(),
                        t.getUsdssList(),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输人支付密码") : t.$parent.showTost(0, "请输人银行卡号") : t.$parent.showTost(0, "请输入开户行地址") : t.$parent.showTost(0, "请输入银行") : t.$parent.showTost(0, "请输入姓名")
                },
                getBanklist: function() {
                    var t = this;
                    t.$apiFun.post("/api/banklist", {}).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.banklist = e.data),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                changqutype: function(t) {
                    this.qutype != t && (this.qutype = t, this.amount = null, this.password = null, this.bankId = null, this.chanmeyXi = null)
                },
                getUsercard: function() {
                    var t = this;
                    t.$apiFun.post("/api/getcard", {
                        type: 1
                    }).then(function(e) {
                        200 == e.code && (t.usercardLis = e.data)
                    })
                },
                getUsdssList: function() {
                    var t = this;
                    t.$apiFun.post("/api/getcard", {
                        type: 2
                    }).then(function(e) {
                        200 == e.code && (t.usdssLis = e.data)
                    })
                },
                withdraw: function() {
                    var t = this,
                    e = t.bankId,
                    a = t.amount,
                    s = t.password;
                    e ? a < 100 ? t.showTost(0, "单笔取款不能低于100元") : s ? (t.showLoading(), t.$apiFun.post("/api/withdraw", {
                        amount: a,
                        bank: e,
                        password: s
                    }).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.showTost(1, "提交成功，等待后台审核"), t.amount = null, t.password = null, t.bank = null, setTimeout(function() {
                            t.$router.push({
                                path: "/transRecord"
                            })
                        },
                        1500)),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })) : t.showTost(0, "请输入您的支付密码") : t.showTost(0, "请选择您要提现到的银行卡")
                },
                withdraw1: function() {
                    var t = this,
                    e = t.bankId,
                    a = t.amount,
                    s = t.password;
                    e ? a < 100 ? t.showTost(0, "单笔取款不能低于100元") : s ? (t.showLoading(), t.$apiFun.post("/api/withdraw", {
                        amount: a,
                        bank: e,
                        password: s
                    }).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.showTost(1, "提交成功，等待后台审核"), t.chanmeyXi = null, t.amount = null, t.password = null, t.bank = null, setTimeout(function() {
                            t.$router.push({
                                path: "/transRecord"
                            })
                        },
                        1500)),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })) : t.showTost(0, "请输入您的支付密码") : t.showTost(0, "请选择USDT地址")
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                getUserInfo: function() {
                    this.$parent.getUserInfo()
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        jt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "myCenterCommon__userContent__2fHEF undefined route-fade-enter-done"
                },
                [a("div", {
                    staticClass: "withdrawal__withdrawal__26MdO"
                },
                [a("div", [a("div", {
                    staticClass: "withdrawal__tobank__1OFti common__clearfix__28XIR"
                },
                [a("div", {
                    staticClass: "_myCenterTheme__tab__Ij1fV"
                },
                [t._m(0), t._v(" "), a("ul", {
                    staticClass: "withdrawal__tabs__1Otai"
                },
                [a("li", {
                    class: 0 == t.qutype ? "withdrawal__tab_active__1j07I": " ",
                    on: {
                        click: function(e) {
                            return t.changqutype(0)
                        }
                    }
                },
                [t._v("银行卡取款")]), t._v(" "), a("li", {
                    class: 1 == t.qutype ? "withdrawal__tab_active__1j07I": " ",
                    on: {
                        click: function(e) {
                            return t.changqutype(1)
                        }
                    }
                },
                [a("span", [t._v("USDT取款")])])])]), t._v(" "), 0 == t.qutype ? a("div", {
                    staticClass: "tabs_con"
                },
                [a("ul", {
                    staticClass: "amountList__box__1_ZI4",
                    staticStyle: {
                        width: "100%"
                    }
                },
                [a("li", [a("img", {
                    staticClass: "amountList__icon__33WXt",
                    attrs: {
                        src: "/static/image/sdqianbao.dc40ee4f3863c42e32b6a486b5b706fc.svg"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "amountList__infoWrap__3hanq"
                },
                [a("span", [t._v("中心钱包")]), t._v(" "), a("div", {
                    staticClass: "amountList__info__3_qtq"
                },
                [a("span", {
                    staticClass: "amountList__amount__3uzil left_than"
                },
                [t._v(t._s(t.$store.state.userInfo.balance))]), a("span", {
                    staticClass: "amountList__rmb__2yHNG"
                },
                [t._v("元")]), a("img", {
                    staticClass: "amountList__refresh__3I1Qb",
                    attrs: {
                        src: "/static/image/shuaxin.6eaac0e1956ef2120631f454674d245a.svg"
                    },
                    on: {
                        click: t.$parent.getUserInfoShowLoding
                    }
                })])])]), t._v(" "), a("li", [a("img", {
                    staticClass: "amountList__icon__33WXt",
                    attrs: {
                        src: "/static/image/zxqianbao.0949a0930bb15fa74de93288493d5fc9.svg"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "amountList__infoWrap__3hanq"
                },
                [a("span", [t._v("打码量")]), t._v(" "), a("div", {
                    staticClass: "amountList__info__3_qtq"
                },
                [a("span", {
                    staticClass: "amountList__amount__3uzil"
                },
                [t._v(t._s(t.betAmount))]), a("span", {
                    staticClass: "amountList__rmb__2yHNG"
                },
                [t._v("元")])])])])]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-top": "50px"
                    }
                }), t._v(" "), t.usercardLis.length > 0 ? a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("选择银行：")]), t._v(" "), a("el-select", {
                    staticStyle: {
                        width: "280px"
                    },
                    attrs: {
                        placeholder: "请选择银行"
                    },
                    on: {
                        change: t.changApiType
                    },
                    model: {
                        value: t.bankId,
                        callback: function(e) {
                            t.bankId = e
                        },
                        expression: "bankId"
                    }
                },
                t._l(t.usercardLis,
                function(t, e) {
                    return a("el-option", {
                        key: e,
                        attrs: {
                            value: t.id,
                            label: t.bank + "---" + t.bank_no
                        }
                    })
                }), 1), t._v(" "), t.usercardLis.length < 5 ? a("div", {
                    staticClass: "xieyi2",
                    staticStyle: {
                        width: "133px",
                        color: "red",
                        cursor: "pointer",
                        height: "40px",
                        margin: "0px 0px 0px 20px"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(1)
                        }
                    }
                },
                [t._v("新增绑定")]) : t._e()], 1) : t._e(), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("取款金额：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.amount,
                        expression: "amount"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "280px",
                        height: "40px"
                    },
                    attrs: {
                        type: "text",
                        "data-analytics": "button",
                        "data-label": "",
                        placeholder: "取款金额",
                        value: ""
                    },
                    domProps: {
                        value: t.amount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.amount = e.target.value)
                        }
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("取款密码：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.password,
                        expression: "password"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "280px",
                        height: "40px"
                    },
                    attrs: {
                        type: "password",
                        autocomplete: "new-password",
                        "data-analytics": "button",
                        "data-label": "",
                        placeholder: "取款资金密码",
                        value: ""
                    },
                    domProps: {
                        value: t.password
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.password = e.target.value)
                        }
                    }
                })])]), t._v(" "), 0 == t.usercardLis.length ? a("div", [a("p", {
                    staticClass: "withdrawal__tip__2YpMI",
                    staticStyle: {
                        "margin-top": "20px"
                    }
                },
                [t._v("选择银行")]), t._v(" "), a("div", {
                    staticClass: "style__list_box__2YvIs cunkuan1",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("ul", {
                    staticClass: "withdrawal__bankList__3K4iO withdrawal__usdt__2WQ_o"
                },
                [a("li", {
                    staticClass: "withdrawal__addBankButton__2mx2m",
                    on: {
                        click: function(e) {
                            return t.changBindShow(1)
                        }
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/tianjia.5395050f231e402684eb5cd3a300729a.svg"
                    }
                }), t._v("添加银行卡")])])]), t._v(" "), t._m(1)]) : t._e(), t._v(" "), a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "440px",
                        height: "50px",
                        margin: "20px auto",
                        display: "block"
                    },
                    on: {
                        click: t.withdraw
                    }
                },
                [t._v("立即取款")])]) : t._e(), t._v(" "), 1 == t.qutype ? a("div", {
                    staticClass: "tabs_con"
                },
                [a("ul", {
                    staticClass: "amountList__box__1_ZI4",
                    staticStyle: {
                        width: "100%"
                    }
                },
                [a("li", [a("img", {
                    staticClass: "amountList__icon__33WXt",
                    attrs: {
                        src: "/static/image/sdqianbao.dc40ee4f3863c42e32b6a486b5b706fc.svg"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "amountList__infoWrap__3hanq"
                },
                [a("span", [t._v("中心钱包")]), t._v(" "), a("div", {
                    staticClass: "amountList__info__3_qtq"
                },
                [a("span", {
                    staticClass: "amountList__amount__3uzil left_than"
                },
                [t._v(t._s(t.$store.state.userInfo.balance))]), a("span", {
                    staticClass: "amountList__rmb__2yHNG"
                },
                [t._v("元")]), a("img", {
                    staticClass: "amountList__refresh__3I1Qb",
                    attrs: {
                        src: "/static/image/shuaxin.6eaac0e1956ef2120631f454674d245a.svg"
                    },
                    on: {
                        click: t.$parent.getUserInfoShowLoding
                    }
                })])])]), t._v(" "), a("li", [a("img", {
                    staticClass: "amountList__icon__33WXt",
                    attrs: {
                        src: "/static/image/zxqianbao.0949a0930bb15fa74de93288493d5fc9.svg"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "amountList__infoWrap__3hanq"
                },
                [a("span", [t._v("打码量")]), t._v(" "), a("div", {
                    staticClass: "amountList__info__3_qtq"
                },
                [a("span", {
                    staticClass: "amountList__amount__3uzil"
                },
                [t._v(t._s(t.betAmount))]), a("span", {
                    staticClass: "amountList__rmb__2yHNG"
                },
                [t._v("元")])])])])]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-top": "50px"
                    }
                }), t._v(" "), t.usdssLis.length > 0 ? a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("USDT地址：")]), t._v(" "), a("el-select", {
                    staticStyle: {
                        width: "280px"
                    },
                    attrs: {
                        placeholder: "请选择USDT地址"
                    },
                    on: {
                        change: t.changApiType
                    },
                    model: {
                        value: t.bankId,
                        callback: function(e) {
                            t.bankId = e
                        },
                        expression: "bankId"
                    }
                },
                t._l(t.usdssLis,
                function(t, e) {
                    return a("el-option", {
                        key: e,
                        attrs: {
                            value: t.id,
                            label: t.bank_owner + "---" + t.bank_no
                        }
                    })
                }), 1), t._v(" "), t.usdssLis.length < 5 ? a("div", {
                    staticClass: "xieyi2",
                    staticStyle: {
                        width: "133px",
                        color: "red",
                        cursor: "pointer",
                        height: "40px",
                        margin: "0px 0px 0px 20px"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(2)
                        }
                    }
                },
                [t._v("新增绑定")]) : t._e()], 1) : t._e(), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("取款金额：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.amount,
                        expression: "amount"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "280px",
                        height: "40px"
                    },
                    attrs: {
                        type: "text",
                        "data-analytics": "button",
                        "data-label": "",
                        placeholder: "取款金额",
                        value: ""
                    },
                    domProps: {
                        value: t.amount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.amount = e.target.value)
                        }
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("取款密码：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.password,
                        expression: "password"
                    }],
                    staticClass: "index__Input__tY5CA",
                    staticStyle: {
                        width: "280px",
                        height: "40px"
                    },
                    attrs: {
                        type: "password",
                        "data-analytics": "button",
                        autocomplete: "new-password",
                        "data-label": "",
                        placeholder: "取款资金密码",
                        value: ""
                    },
                    domProps: {
                        value: t.password
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.password = e.target.value)
                        }
                    }
                })])]), t._v(" "), t.chanmeyXi ? a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("每笔手续费：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("div", {
                    staticClass: "style__tk_ts__302_r"
                },
                [a("span", {
                    staticClass: "usdt"
                },
                [t._v(t._s("ERC20" == t.chanmeyXi ? t.$store.state.userInfo.withdrawcashfee: t.$store.state.userInfo.withdrawfeeusdttrc))]), t._v(" USDT\n              ")])])]) : t._e(), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("USDT换算：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("div", {
                    staticClass: "style__tk_ts__302_r"
                },
                [t._v("\n                ≈"), a("span", {
                    staticClass: "usdt"
                },
                [t._v(t._s(t.amount ? Math.floor(t.amount / t.$store.state.userInfo.withdrawusdtrate * 100) / 100 : "0.00"))]), t._v(" USDT          参考汇率：" + t._s(t.$store.state.userInfo.withdrawusdtrate) + "\n              ")])])]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_item__35aDr"
                },
                [a("div", {
                    staticClass: "userInfo__users_layout_form_label__2V7le"
                },
                [t._v("实际到账：")]), t._v(" "), a("div", {
                    staticClass: "userInfo__users_layout_form_input__2D3z3"
                },
                [a("div", {
                    staticClass: "style__tk_ts__302_r"
                },
                [a("span", {
                    staticClass: "usdt",
                    staticStyle: {
                        color: "red"
                    }
                },
                [t._v(t._s(t.amount ? Math.floor(t.amount / t.$store.state.userInfo.withdrawusdtrate * 100) / 100 - ("ERC20" == t.chanmeyXi ? 1 * t.$store.state.userInfo.withdrawcashfee: 1 * t.$store.state.userInfo.withdrawfeeusdttrc) : "0.00") + " ")]), t._v(" USDT\n              ")]), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "usdt_rate",
                        value: "6.56"
                    }
                })])]), t._v(" "), 0 == t.usdssLis.length ? a("div", [a("p", {
                    staticClass: "withdrawal__tip__2YpMI",
                    staticStyle: {
                        "margin-top": "50px"
                    }
                },
                [t._v("选择USDT地址")]), t._v(" "), a("div", {
                    staticClass: "style__list_box__2YvIs cunkuan1",
                    staticStyle: {
                        display: "block"
                    }
                },
                [a("ul", {
                    staticClass: "withdrawal__bankList__3K4iO withdrawal__usdt__2WQ_o"
                },
                [a("li", {
                    staticClass: "withdrawal__addBankButton__2mx2m",
                    on: {
                        click: function(e) {
                            return t.changBindShow(2)
                        }
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/tianjia.5395050f231e402684eb5cd3a300729a.svg"
                    }
                }), t._v("添加地址")])])]), t._v(" "), t._m(2)]) : t._e(), t._v(" "), a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "440px",
                        height: "50px",
                        margin: "10px auto",
                        display: "block"
                    },
                    on: {
                        click: t.withdraw1
                    }
                },
                [t._v("立即取款")])]) : t._e()])])]), t._v(" "), 1 == t.bindShow ? a("div", {
                    staticClass: "el-dialog__wrapper",
                    staticStyle: {
                        "z-index": "999",
                        background: "rgb(81 73 73 / 49%)"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("div", {
                    staticClass: "el-dialog",
                    staticStyle: {
                        "margin-top": "15vh"
                    },
                    attrs: {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "绑定银行卡"
                    },
                    on: {
                        click: t.retrun
                    }
                },
                [a("div", {
                    staticClass: "el-dialog__header"
                },
                [a("span", {
                    staticClass: "el-dialog__title"
                },
                [t._v("绑定银行卡")]), a("button", {
                    staticClass: "el-dialog__headerbtn",
                    attrs: {
                        type: "button",
                        "aria-label": "Close"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("i", {
                    staticClass: "el-dialog__close el-icon el-icon-close"
                })])]), t._v(" "), a("div", {
                    staticClass: "el-dialog__body"
                },
                [a("div", {
                    staticClass: "el-form el-form--inline"
                },
                [a("div", {
                    staticClass: "el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank"
                    }
                },
                [t._v("请选择支持银行")]), t._v(" "), a("el-select", {
                    staticStyle: {
                        width: "380px"
                    },
                    attrs: {
                        placeholder: "请选择支持银行"
                    },
                    model: {
                        value: t.cardInfo.bank,
                        callback: function(e) {
                            t.$set(t.cardInfo, "bank", e)
                        },
                        expression: "cardInfo.bank"
                    }
                },
                t._l(t.banklist,
                function(t) {
                    return a("el-option", {
                        key: t.bank_name,
                        attrs: {
                            label: t.bank_name,
                            value: t.bank_name
                        }
                    })
                }), 1)], 1)]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("填写开户行")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_address,
                        expression: "cardInfo.bank_address"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "请输入开户行"
                    },
                    domProps: {
                        value: t.cardInfo.bank_address
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "bank_address", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("填写卡号")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_no,
                        expression: "cardInfo.bank_no"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "填写卡号"
                    },
                    domProps: {
                        value: t.cardInfo.bank_no
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "bank_no", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("填写持卡人姓名")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_owner,
                        expression: "cardInfo.bank_owner"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "填写持卡人姓名"
                    },
                    domProps: {
                        value: t.cardInfo.bank_owner
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "bank_owner", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("支付密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.pay_pass,
                        expression: "cardInfo.pay_pass"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: "支付密码"
                    },
                    domProps: {
                        value: t.cardInfo.pay_pass
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "pay_pass", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px",
                        "padding-left": "150px"
                    }
                },
                [a("button", {
                    staticClass: "el-button el-button--primary",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.bindCard
                    }
                },
                [a("span", [t._v("绑定")])])])])])])]) : t._e(), t._v(" "), 2 == t.bindShow ? a("div", {
                    staticClass: "el-dialog__wrapper",
                    staticStyle: {
                        "z-index": "999",
                        background: "rgb(81 73 73 / 49%)"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("div", {
                    staticClass: "el-dialog",
                    staticStyle: {
                        "margin-top": "15vh"
                    },
                    attrs: {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "绑定USDT地址"
                    },
                    on: {
                        click: t.retrun
                    }
                },
                [a("div", {
                    staticClass: "el-dialog__header"
                },
                [a("span", {
                    staticClass: "el-dialog__title"
                },
                [t._v("绑定USDT地址")]), a("button", {
                    staticClass: "el-dialog__headerbtn",
                    attrs: {
                        type: "button",
                        "aria-label": "Close"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("i", {
                    staticClass: "el-dialog__close el-icon el-icon-close"
                })])]), t._v(" "), a("div", {
                    staticClass: "el-dialog__body"
                },
                [a("div", {
                    staticClass: "el-form el-form--inline"
                },
                [a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("USDT地址")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.usdtInfo.bank_no,
                        expression: "usdtInfo.bank_no"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "绑定USDT地址"
                    },
                    domProps: {
                        value: t.usdtInfo.bank_no
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.usdtInfo, "bank_no", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("USDT协议")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("el-radio", {
                    attrs: {
                        label: "ERC20"
                    },
                    model: {
                        value: t.usdtInfo.bank_owner,
                        callback: function(e) {
                            t.$set(t.usdtInfo, "bank_owner", e)
                        },
                        expression: "usdtInfo.bank_owner"
                    }
                },
                [t._v("ERC20")]), t._v(" "), a("el-radio", {
                    attrs: {
                        label: "TRC20"
                    },
                    model: {
                        value: t.usdtInfo.bank_owner,
                        callback: function(e) {
                            t.$set(t.usdtInfo, "bank_owner", e)
                        },
                        expression: "usdtInfo.bank_owner"
                    }
                },
                [t._v("TRC20")])], 1)])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("支付密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.usdtInfo.pay_pass,
                        expression: "usdtInfo.pay_pass"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: "支付密码"
                    },
                    domProps: {
                        value: t.usdtInfo.pay_pass
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.usdtInfo, "pay_pass", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px",
                        "padding-left": "150px"
                    }
                },
                [a("button", {
                    staticClass: "el-button el-button--primary",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.bindUsdss
                    }
                },
                [a("span", [t._v("绑定")])])])])])])]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("取款")]), this._v(" "), e("span", [this._v("通常您的提款只需3 - 15分钟即可到账，若超过30分钟仍未到账，请联系在线客服核查")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "withdrawal__tisi__25TqN undefined",
                    staticStyle: {
                        "margin-bottom": "33px"
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v("您还没绑定银行卡，为了您的资金安全，绑定银行卡时，需要填写您的个人信")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "withdrawal__tisi__25TqN undefined",
                    staticStyle: {
                        "margin-bottom": "33px"
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tisi.8d134098e1e18d283c7886fb98257f6d.svg"
                    }
                }), this._v("您还没绑定钱包地址，为了您的资金安全，请仔细填写")])
            }]
        };
        var Pt = a("VU/8")(qt, jt, !1,
        function(t) {
            a("fyu+")
        },
        "data-v-29dc73cf", null).exports,
        Et = {
            name: "transfer",
            data: function() {
                return {
                    qutype: 0,
                    amount: null,
                    bankId: null,
                    chanmeyXi: null,
                    usercardLis: [],
                    usdssLis: [],
                    banklist: [],
                    cardInfo: {},
                    usdtInfo: {},
                    password: null,
                    bindShow: 0,
                    activeName: "bank"
                }
            },
            created: function() {
                this.getUsercard(),
                this.getUsdssList(),
                this.getBanklist()
            },
            methods: {
                delCard: function(t) {
                    var e = this;
                    this.$confirm("确定要解绑吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(function() {
                        e.$parent.showLoading(),
                        e.$apiFun.post("/api/delcard", {
                            id: t
                        }).then(function(t) {
                            200 != t.code && e.$parent.showTost(0, t.message),
                            e.$parent.hideLoading(),
                            200 == t.code && (e.$parent.showTost(1, "解绑成功"), e.getUsercard(), e.getUsdssList())
                        })
                    }).
                    catch(function() {})
                },
                transall: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/transall", {}).then(function(e) {
                        t.showTost(1, e.message),
                        t.refreshusermoney(),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                refreshusermoney: function() {
                    var t = this;
                    t.$apiFun.post("/api/refreshusermoney", {}).then(function(e) {
                        t.hideLoading(),
                        200 == e.code && (localStorage.setItem("userInfo", n()(e.data)), t.$store.commit("changUserInfo"))
                    })
                },
                getBalances: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/balance", {}).then(function(e) {
                        if (200 == e.code) {
                            var a = JSON.parse(localStorage.getItem("userInfo"));
                            a.balance = e.data.balance,
                            localStorage.setItem("userInfo", n()(a)),
                            t.$store.commit("changUserInfo")
                        }
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                retrun: function(t) {
                    t.stopPropagation()
                },
                closeCv: function() {
                    this.openInfo = {},
                    this.amount = null
                },
                changApiType: function(t) {
                    if (1 == this.qutype) {
                        var e = null;
                        this.usdssLis.forEach(function(a) {
                            a.id != t || (e = t.bank_owner)
                        }),
                        this.chanmeyXi = e
                    } else this.chanmeyXi = null;
                    this.password = null,
                    this.amount = null
                },
                changBindShow: function(t) {
                    this.bindShow = t,
                    this.cardInfo = {},
                    this.usdtInfo = {}
                },
                bindUsdss: function() {
                    var t = this,
                    e = t.usdtInfo;
                    e.bank = "USDT",
                    null != e.bank_no && "" != e.bank_no ? e.bank_owner && null != e.bank_owner ? e.pay_pass ? (t.$parent.showLoading(), t.$apiFun.post("/api/bindcard", e).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.$parent.showTost(1, e.message), t.changBindShow(0), t.getUsercard(), t.getUsdssList()),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输人支付密码") : t.$parent.showTost(0, "请选择钱包协议") : t.$parent.showTost(0, "请输入USDT地址")
                },
                bindCard: function() {
                    var t = this;
                    t.cardInfo.bank_owner ? t.cardInfo.bank ? t.cardInfo.bank_address ? t.cardInfo.bank_no ? t.cardInfo.pay_pass ? t.cardInfo.bank_no.length < 8 ? t.$parent.showTost(0, "请输人正确的卡号长度") : t.cardInfo.pay_pass.length < 6 || t.cardInfo.pay_pass.length > 18 ? t.$parent.showTost(0, "请输人支付密码长度") : (t.$parent.showLoading(), t.$apiFun.post("/api/bindcard", t.cardInfo).then(function(e) {
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && t.$parent.showTost(1, "绑定成功"),
                        t.changBindShow(0),
                        t.getUsercard(),
                        t.getUsdssList(),
                        t.$parent.hideLoading()
                    }).
                    catch(function(e) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输人支付密码") : t.$parent.showTost(0, "请输人银行卡号") : t.$parent.showTost(0, "请输入开户行地址") : t.$parent.showTost(0, "请输入银行") : t.$parent.showTost(0, "请输入姓名")
                },
                getBanklist: function() {
                    var t = this;
                    t.$apiFun.post("/api/banklist", {}).then(function(e) {
                        200 != e.code && t.showTost(0, e.message),
                        200 == e.code && (t.banklist = e.data),
                        t.hideLoading()
                    }).
                    catch(function(e) {
                        t.hideLoading()
                    })
                },
                getUsercard: function() {
                    var t = this;
                    t.$apiFun.post("/api/getcard", {
                        type: 1
                    }).then(function(e) {
                        200 == e.code && (t.usercardLis = e.data)
                    })
                },
                getUsdssList: function() {
                    var t = this;
                    t.$apiFun.post("/api/getcard", {
                        type: 2
                    }).then(function(e) {
                        200 == e.code && (t.usdssLis = e.data)
                    })
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                getUserInfo: function() {
                    this.$parent.getUserInfo()
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, e) {
                    this.$parent.showTost(t, e)
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        Bt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [t._m(0), t._v(" "), a("ul", {
                    staticClass: "amountList__box__1_ZI4"
                },
                [a("li", {
                    staticStyle: {
                        width: "100%"
                    }
                },
                [a("img", {
                    staticClass: "amountList__icon__33WXt",
                    attrs: {
                        src: "/static/image/sdqianbao.dc40ee4f3863c42e32b6a486b5b706fc.svg"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "amountList__infoWrap__3hanq"
                },
                [a("span", [t._v("钱包")]), t._v(" "), a("div", {
                    staticClass: "amountList__info__3_qtq"
                },
                [a("span", {
                    staticClass: "amountList__amount__3uzil left_than"
                },
                [t._v(t._s(t.$store.state.userInfo.balance))]), a("span", {
                    staticClass: "amountList__rmb__2yHNG"
                },
                [t._v("元")]), a("img", {
                    staticClass: "amountList__refresh__3I1Qb",
                    attrs: {
                        src: "/static/image/shuaxin.6eaac0e1956ef2120631f454674d245a.svg"
                    },
                    on: {
                        click: t.getBalances
                    }
                })])]), t._v(" "), a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "80px",
                        height: "28px",
                        position: "absolute",
                        right: "18px",
                        top: "15px",
                        "border-radius": "20px",
                        "font-size": "14px"
                    },
                    on: {
                        click: t.transall
                    }
                },
                [t._v("一键回收")])])]), t._v(" "), a("el-tabs", {
                    staticStyle: {
                        "margin-top": "20px"
                    },
                    model: {
                        value: t.activeName,
                        callback: function(e) {
                            t.activeName = e
                        },
                        expression: "activeName"
                    }
                },
                [a("el-tab-pane", {
                    attrs: {
                        label: "银行卡",
                        name: "bank"
                    }
                },
                [a("div", {
                    staticStyle: {
                        width: "100%",
                        "margin-bottom": "20px",
                        display: "flex",
                        "flex-wrap": "wrap"
                    }
                },
                t._l(t.usercardLis,
                function(e, s) {
                    return a("div", {
                        key: s,
                        staticClass: "usdt__card__1QL7m usdt__mid__2A8wC",
                        staticStyle: {
                            width: "30%",
                            "margin-right": "10px",
                            "margin-top": "10px"
                        }
                    },
                    [a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("卡号："), a("span", {
                        staticClass: "delss",
                        on: {
                            click: function(a) {
                                return t.delCard(e.id)
                            }
                        }
                    },
                    [t._v("解绑")])]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v(t._s(e.bank_no))]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("银行户名：" + t._s(e.bank_owner))]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("开 户 行：" + t._s(e.bank))]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("银行地址：" + t._s(e.bank_address))])])
                }), 0), t._v(" "), t.usercardLis.length < 5 ? a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "440px",
                        height: "50px",
                        margin: "30px auto",
                        display: "block"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(1)
                        }
                    }
                },
                [t._v("添加银行卡")]) : t._e()]), t._v(" "), a("el-tab-pane", {
                    attrs: {
                        label: "USDT",
                        name: "usdt"
                    }
                },
                [a("div", {
                    staticStyle: {
                        width: "100%",
                        "margin-bottom": "20px",
                        display: "flex",
                        "flex-wrap": "wrap"
                    }
                },
                t._l(t.usdssLis,
                function(e, s) {
                    return a("div", {
                        key: s,
                        staticClass: "usdt__card__1QL7m usdt__mid__2A8wC",
                        staticStyle: {
                            width: "30%",
                            "margin-right": "10px",
                            "margin-top": "10px"
                        }
                    },
                    [a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("钱包地址："), a("span", {
                        staticClass: "delss",
                        on: {
                            click: function(a) {
                                return t.delCard(e.id)
                            }
                        }
                    },
                    [t._v("解绑")])]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v(t._s(e.bank_no))]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("钱包类型：" + t._s(e.bank))]), t._v(" "), a("p", {
                        staticClass: "usdt__sub_tip__24nbZ"
                    },
                    [t._v("钱包协议：" + t._s(e.bank_owner))])])
                }), 0), t._v(" "), t.usdssLis.length < 5 ? a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "440px",
                        height: "50px",
                        margin: "30px auto",
                        display: "block"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(2)
                        }
                    }
                },
                [t._v("添加USDT地址")]) : t._e()])], 1), t._v(" "), 1 == t.bindShow ? a("div", {
                    staticClass: "el-dialog__wrapper",
                    staticStyle: {
                        "z-index": "999",
                        background: "rgb(81 73 73 / 49%)"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("div", {
                    staticClass: "el-dialog",
                    staticStyle: {
                        "margin-top": "15vh"
                    },
                    attrs: {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "绑定银行卡"
                    },
                    on: {
                        click: t.retrun
                    }
                },
                [a("div", {
                    staticClass: "el-dialog__header"
                },
                [a("span", {
                    staticClass: "el-dialog__title"
                },
                [t._v("绑定银行卡")]), a("button", {
                    staticClass: "el-dialog__headerbtn",
                    attrs: {
                        type: "button",
                        "aria-label": "Close"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("i", {
                    staticClass: "el-dialog__close el-icon el-icon-close"
                })])]), t._v(" "), a("div", {
                    staticClass: "el-dialog__body"
                },
                [a("div", {
                    staticClass: "el-form el-form--inline"
                },
                [a("div", {
                    staticClass: "el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank"
                    }
                },
                [t._v("请选择支持银行")]), t._v(" "), a("el-select", {
                    staticStyle: {
                        width: "380px"
                    },
                    attrs: {
                        placeholder: "请选择支持银行"
                    },
                    model: {
                        value: t.cardInfo.bank,
                        callback: function(e) {
                            t.$set(t.cardInfo, "bank", e)
                        },
                        expression: "cardInfo.bank"
                    }
                },
                t._l(t.banklist,
                function(t) {
                    return a("el-option", {
                        key: t.bank_name,
                        attrs: {
                            label: t.bank_name,
                            value: t.bank_name
                        }
                    })
                }), 1)], 1)]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("填写开户行")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_address,
                        expression: "cardInfo.bank_address"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "请输入开户行"
                    },
                    domProps: {
                        value: t.cardInfo.bank_address
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "bank_address", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("填写卡号")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_no,
                        expression: "cardInfo.bank_no"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "填写卡号"
                    },
                    domProps: {
                        value: t.cardInfo.bank_no
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "bank_no", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("填写持卡人姓名")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("div", {
                    staticClass: "el-input"
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_owner,
                        expression: "cardInfo.bank_owner"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "填写持卡人姓名"
                    },
                    domProps: {
                        value: t.cardInfo.bank_owner
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "bank_owner", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("支付密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.pay_pass,
                        expression: "cardInfo.pay_pass"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: "支付密码"
                    },
                    domProps: {
                        value: t.cardInfo.pay_pass
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.cardInfo, "pay_pass", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px",
                        "padding-left": "150px"
                    }
                },
                [a("button", {
                    staticClass: "el-button el-button--primary",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.bindCard
                    }
                },
                [a("span", [t._v("绑定")])])])])])])]) : t._e(), t._v(" "), 2 == t.bindShow ? a("div", {
                    staticClass: "el-dialog__wrapper",
                    staticStyle: {
                        "z-index": "999",
                        background: "rgb(81 73 73 / 49%)"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("div", {
                    staticClass: "el-dialog",
                    staticStyle: {
                        "margin-top": "15vh"
                    },
                    attrs: {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "绑定USDT地址"
                    },
                    on: {
                        click: t.retrun
                    }
                },
                [a("div", {
                    staticClass: "el-dialog__header"
                },
                [a("span", {
                    staticClass: "el-dialog__title"
                },
                [t._v("绑定USDT地址")]), a("button", {
                    staticClass: "el-dialog__headerbtn",
                    attrs: {
                        type: "button",
                        "aria-label": "Close"
                    },
                    on: {
                        click: function(e) {
                            return t.changBindShow(0)
                        }
                    }
                },
                [a("i", {
                    staticClass: "el-dialog__close el-icon el-icon-close"
                })])]), t._v(" "), a("div", {
                    staticClass: "el-dialog__body"
                },
                [a("div", {
                    staticClass: "el-form el-form--inline"
                },
                [a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("USDT地址")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.usdtInfo.bank_no,
                        expression: "usdtInfo.bank_no"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "text",
                        autocomplete: "off",
                        placeholder: "绑定USDT地址"
                    },
                    domProps: {
                        value: t.usdtInfo.bank_no
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.usdtInfo, "bank_no", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("USDT协议")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("el-radio", {
                    attrs: {
                        label: "ERC20"
                    },
                    model: {
                        value: t.usdtInfo.bank_owner,
                        callback: function(e) {
                            t.$set(t.usdtInfo, "bank_owner", e)
                        },
                        expression: "usdtInfo.bank_owner"
                    }
                },
                [t._v("ERC20")]), t._v(" "), a("el-radio", {
                    attrs: {
                        label: "TRC20"
                    },
                    model: {
                        value: t.usdtInfo.bank_owner,
                        callback: function(e) {
                            t.$set(t.usdtInfo, "bank_owner", e)
                        },
                        expression: "usdtInfo.bank_owner"
                    }
                },
                [t._v("TRC20")])], 1)])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px"
                    }
                },
                [a("div", {
                    staticClass: "el-form-item is-required"
                },
                [a("label", {
                    staticClass: "el-form-item__label",
                    staticStyle: {
                        width: "150px"
                    },
                    attrs: {
                        for: "bank_address"
                    }
                },
                [t._v("支付密码")]), t._v(" "), a("div", {
                    staticClass: "el-form-item__content"
                },
                [a("div", {
                    staticClass: "el-input",
                    staticStyle: {
                        width: "380px"
                    }
                },
                [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.usdtInfo.pay_pass,
                        expression: "usdtInfo.pay_pass"
                    }],
                    staticClass: "el-input__inner",
                    attrs: {
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: "支付密码"
                    },
                    domProps: {
                        value: t.usdtInfo.pay_pass
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.usdtInfo, "pay_pass", e.target.value)
                        }
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "grid-content bg-purple el-row",
                    staticStyle: {
                        "margin-left": "-12px",
                        "margin-right": "-12px",
                        "padding-left": "150px"
                    }
                },
                [a("button", {
                    staticClass: "el-button el-button--primary",
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.bindUsdss
                    }
                },
                [a("span", [t._v("绑定")])])])])])])]) : t._e()], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "style__titleHead__QII3Y common__clearfix__28XIR"
                },
                [e("div", {
                    staticClass: "title__title__RTC9P"
                },
                [e("b", [this._v("我的钱包")]), e("span", [this._v("银行卡/USDT 地址管理")])])])
            }]
        };
        var Qt = a("VU/8")(Et, Bt, !1,
        function(t) {
            a("rMhH")
        },
        "data-v-00ad03e1", null).exports,
        Dt = {
            name: "welfare",
            data: function() {
                return {
                    redpacketList: [],
                    page: 1,
                    redpacketShowData: {},
                    userredpacket: {}
                }
            },
            created: function() {
                this.getuserredpacket()
            },
            methods: {
                getwelfare: function() {
                    var t = this;
                    t.userredpacket.sendnums < 1 ? t.$parent.showTost(0, "您的剩余次数不足！") : (t.$parent.showLoading(), t.$apiFun.post("/api/douserredpacket", {}).then(function(e) {
                        console.log(e),
                        t.$parent.showTost(0, e.message),
                        t.$parent.hideLoading(),
                        t.getuserredpacket()
                    }).
                    catch(function() {
                        t.$parent.showTost(0, "服务器异常，请稍后再试"),
                        t.$parent.hideLoading()
                    }))
                },
                getuserredpacket: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.get("/api/userredpacket", {}).then(function(e) {
                        console.log(e),
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.userredpacket = e.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        Nt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("section", {
                    staticClass: "myCenterCommon__userContent__2fHEF route-fade-enter-done"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "myCenterCommon__users_layout__params__2DfEC"
                },
                [a("div", {
                    staticClass: "myCenterCommon__check_wrap__3bM7H"
                },
                [a("button", {
                    staticClass: "index__Button__It0J4 index__Button3__1Pn-Q",
                    staticStyle: {
                        width: "113px",
                        height: "40px",
                        position: "absolute",
                        left: "120px",
                        top: "-60px"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/userredpacket")
                        }
                    }
                },
                [t._v("领取红包")]), t._v(" "), a("div", {
                    staticStyle: {
                        width: "200px",
                        "line-height": "40px",
                        height: "40px",
                        position: "absolute",
                        left: "300px",
                        top: "-60px"
                    }
                },
                [t._v("\n        剩余领取次数："), a("span", {
                    staticStyle: {
                        "font-weight": "bold",
                        color: "red"
                    }
                },
                [t._v(t._s(t.userredpacket.sendnums))])]), t._v(" "), a("div", {
                    staticStyle: {
                        width: "200px",
                        "line-height": "40px",
                        height: "40px",
                        position: "absolute",
                        left: "500px",
                        top: "-60px"
                    }
                },
                [t._v("\n        累计领取次数："), a("span", {
                    staticStyle: {
                        "font-weight": "bold",
                        color: "red"
                    }
                },
                [t._v(t._s(t.userredpacket.acquirednum))])])])]), t._v(" "), a("el-table", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        data: t.redpacketList
                    }
                },
                [a("el-table-column", {
                    attrs: {
                        type: "index",
                        label: "序号"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "money",
                        label: "充值金额"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "redpacketmoney",
                        label: "红包金额"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "created_at",
                        label: "充值时间"
                    }
                }), t._v(" "), a("el-table-column", {
                    attrs: {
                        prop: "usetime",
                        label: "领取时间"
                    }
                })], 1), t._v(" "), t.redpacketShowData.total ? a("el-pagination", {
                    staticStyle: {
                        margin: "20px 0 0px 120px"
                    },
                    attrs: {
                        "current-page": t.page,
                        "page-size": 10,
                        layout: "prev, pager, next",
                        total: t.redpacketShowData.total
                    },
                    on: {
                        "current-change": t.getredpacket,
                        "update:currentPage": function(e) {
                            t.page = e
                        },
                        "update:current-page": function(e) {
                            t.page = e
                        }
                    }
                }) : t._e()], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "myCenterCommon__users_layout__title__3CoQ0"
                },
                [e("h3", [this._v("红包记录")])])
            }]
        };
        var At = a("VU/8")(Dt, Nt, !1,
        function(t) {
            a("FtGK")
        },
        "data-v-071a5f8e", null).exports,
        Ut = {
            name: "login",
            data: function() {
                return {
                    loginInfo: {},
                    passShow: !0,
                    imgLis: ["2PYL", "6AQ5", "8PHD", "21I7", "69HM", "ACWA", "DUZ7", "IY98", "K647", "M52T", "NY52", "NZFA", "SN76", "SP4D", "VAEO", "YFQM", "ZZU5", "7GQT", "LFW3", "NU2T", "UAE3"],
                    index: 0
                }
            },
            created: function() {
                this.changIndex()
            },
            methods: {
                changIndex: function() {
                    this.index = parseInt(20 * Math.random())
                },
                changPassShow: function() {
                    this.passShow = !this.passShow
                },
                login: function() {
                    var t = this,
                    e = t.loginInfo;
                    if (e.name && e.password) {
                        var a = t.loginInfo.code;
                        if (a) {
                            if (a.toUpperCase() != t.imgLis[t.index]) return t.$parent.showTost(0, "验证码错误！"),
                            t.loginInfo.code = null,
                            void t.changIndex();
                            t.$parent.showLoading(),
                            t.$apiFun.login(e).then(function(e) {
                                200 !== e.code && (t.$parent.showTost(0, e.message), t.loginInfo.code = null, t.changIndex(), t.$parent.hideLoading()),
                                200 === e.code && (sessionStorage.setItem("token", e.data.api_token), t.$store.commit("changToken"), t.getUserInfo(), t.$parent.openDaoTime())
                            })
                        } else t.$parent.showTost(0, "请输入验证码！")
                    } else t.$parent.showTost(0, "请输入您的账号和密码！")
                },
                getUserInfo: function() {
                    var t = this;
                    t.$apiFun.post("/api/user", {}).then(function(e) {
                        console.log(e),
                        200 !== e.code && t.$parent.showTost(0, e.message),
                        200 === e.code && (localStorage.setItem("userInfo", n()(e.data)), t.$store.commit("changUserInfo"), t.$router.push({
                            path: "/"
                        })),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        Ft = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", [t._m(0), t._v(" "), a("div", {
                    staticClass: "login__login_container__19JVq"
                },
                [a("img", {
                    staticStyle: {
                        width: "100%",
                        height: "100vh"
                    },
                    attrs: {
                        src: "/static/image/bg.aeffce071a77b9f3cadbb3e35832d14b.jpg",
                        width: "100%"
                    }
                }), t._v(" "), t._m(1), t._v(" "), a("div", {
                    staticClass: "login__login_box__2nAFl"
                },
                [a("div", {
                    staticClass: "login__contentBox__2Z4Z7 login__sp__3RBFD"
                },
                [t._m(2), t._v(" "), t._m(3), t._v(" "), a("div", [a("ul", {
                    staticClass: "register__login_input__2JBiQ"
                },
                [a("li", {
                    staticClass: "register__row__2AFZD"
                },
                [a("div", {
                    staticClass: "register__userWrap__2EOis"
                },
                [a("i", {
                    staticClass: "register__icon__2fHin register__user__3ejK8"
                }), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.name,
                        expression: "loginInfo.name"
                    }],
                    attrs: {
                        type: "text",
                        placeholder: "用户名",
                        name: "name",
                        id: "login_form_username",
                        maxlength: "32",
                        value: ""
                    },
                    domProps: {
                        value: t.loginInfo.name
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.loginInfo, "name", e.target.value)
                        }
                    }
                })])]), t._v(" "), a("li", {
                    staticClass: "register__row__2AFZD"
                },
                [a("div", {
                    staticClass: "register__userWrap__2EOis"
                },
                [a("div", {
                    staticStyle: {
                        position: "relative",
                        display: "inherit",
                        width: "100%"
                    }
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__password__2Yj9_"
                }), t._v(" "), "checkbox" == (t.passShow ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.password,
                        expression: "loginInfo.password"
                    }],
                    attrs: {
                        placeholder: "密码",
                        name: "password",
                        maxlength: "32",
                        autocomplete: "off",
                        value: "",
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(t.loginInfo.password) ? t._i(t.loginInfo.password, "") > -1 : t.loginInfo.password
                    },
                    on: {
                        change: function(e) {
                            var a = t.loginInfo.password,
                            s = e.target,
                            i = !!s.checked;
                            if (Array.isArray(a)) {
                                var n = t._i(a, "");
                                s.checked ? n < 0 && t.$set(t.loginInfo, "password", a.concat([""])) : n > -1 && t.$set(t.loginInfo, "password", a.slice(0, n).concat(a.slice(n + 1)))
                            } else t.$set(t.loginInfo, "password", i)
                        }
                    }
                }) : "radio" == (t.passShow ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.password,
                        expression: "loginInfo.password"
                    }],
                    attrs: {
                        placeholder: "密码",
                        name: "password",
                        maxlength: "32",
                        autocomplete: "off",
                        value: "",
                        type: "radio"
                    },
                    domProps: {
                        checked: t._q(t.loginInfo.password, "")
                    },
                    on: {
                        change: function(e) {
                            return t.$set(t.loginInfo, "password", "")
                        }
                    }
                }) : a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.password,
                        expression: "loginInfo.password"
                    }],
                    attrs: {
                        placeholder: "密码",
                        name: "password",
                        maxlength: "32",
                        autocomplete: "off",
                        value: "",
                        type: t.passShow ? "password": "text"
                    },
                    domProps: {
                        value: t.loginInfo.password
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.loginInfo, "password", e.target.value)
                        }
                    }
                }), t._v(" "), a("div", {
                    staticStyle: {
                        position: "absolute",
                        top: "13px",
                        right: "12px",
                        width: "16px",
                        height: "16px",
                        cursor: "pointer"
                    },
                    on: {
                        click: t.changPassShow
                    }
                },
                [t.passShow ? a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_close.0a2c8f5a5502b3cd6835e8c19be3bfbd.png",
                        width: "16px",
                        height: "16px"
                    }
                }) : a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_see.cfa834943719d71c121de1ebd3440954.png",
                        width: "16px",
                        height: "16px"
                    }
                })])])])]), t._v(" "), a("li", {
                    staticClass: "register__row__2AFZD"
                },
                [a("div", {
                    staticClass: "register__userWrap__2EOis"
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__password__2Yj9_"
                }), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.code,
                        expression: "loginInfo.code"
                    }],
                    staticStyle: {
                        "padding-right": "0"
                    },
                    attrs: {
                        type: "text",
                        placeholder: "验证码",
                        maxlength: "6"
                    },
                    domProps: {
                        value: t.loginInfo.code
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.loginInfo, "code", e.target.value)
                        }
                    }
                }), t._v(" "), a("img", {
                    staticStyle: {
                        cursor: "pointer",
                        height: "37px",
                        "padding-top": "2px",
                        "padding-right": "8px"
                    },
                    attrs: {
                        src: "/static/image/yzm/" + t.imgLis[t.index] + ".png",
                        alt: ""
                    },
                    on: {
                        click: t.changIndex
                    }
                })])]), t._v(" "), a("li", {
                    staticClass: "login__forgetpasswordButton__3Le8o"
                },
                [a("div", {
                    staticClass: "login__checkBox__3UDyY"
                },
                [a("i", {
                    staticClass: "login__actived__3GArM"
                }), t._v(" "), a("svg", {
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15",
                        height: "15",
                        viewBox: "0 0 15 15"
                    }
                },
                [a("g", {
                    attrs: {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }
                },
                [a("g", [a("g", {
                    attrs: {
                        transform: "translate(-35 -35) translate(35 35)"
                    }
                },
                [a("rect", {
                    attrs: {
                        width: "15",
                        height: "15",
                        fill: "#63B8FC",
                        rx: "3"
                    }
                }), t._v(" "), a("path", {
                    attrs: {
                        fill: "#FFF",
                        "fill-rule": "nonzero",
                        d: "M11.418 3.028L12.582 3.972 6.449 11.535 2.549 8.595 3.451 7.397 6.195 9.465z"
                    }
                })])])])]), t._v(" "), a("a", [t._v("记住密码")])]), t._v(" "), a("a", {
                    attrs: {
                        target: "_blank"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("忘记密码?")])]), t._v(" "), a("li", [a("button", {
                    staticClass: "register__submit__3siWx",
                    staticStyle: {
                        opacity: "1"
                    },
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.login
                    }
                },
                [t._v("登录")])]), t._v(" "), a("div", {
                    staticClass: "login__linkGroup__3kpQw"
                },
                [a("span", {
                    attrs: {
                        "data-label": "登 录-注册账号"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/register")
                        }
                    }
                },
                [t._v("注册新账号")]), a("span", {
                    attrs: {
                        "data-label": "登 录-先去逛逛"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/")
                        }
                    }
                },
                [t._v("先去逛逛")])])])]), t._v(" "), a("div", {
                    staticClass: "login__service__1lRgp"
                },
                [a("a", {
                    attrs: {
                        target: "_blank"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._m(4)])])])])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "common__loading__2ISqR",
                    staticStyle: {
                        "user-select": "none",
                        display: "none"
                    }
                },
                [e("div", {
                    staticClass: "common__loadingWarp__jRby5"
                },
                [e("img", {
                    staticStyle: {
                        width: "96px",
                        height: "96px"
                    },
                    attrs: {
                        src: "/static/image/loading-01298b545f5c991b77dcfde358b313f2.png",
                        alt: "loadingGif"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("video", {
                    staticClass: "login__video__3vENQ",
                    attrs: {
                        id: "login_video",
                        autoplay: "",
                        preload: "",
                        loop: ""
                    }
                },
                [e("source", {
                    attrs: {
                        src: "/static/image/video.mp4",
                        type: "video/mp4"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "login__logo__1NulW",
                    staticStyle: {
                        "margin-bottom": "23px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "登录-logo"
                    }
                },
                [e("a", [e("img", {
                    attrs: {
                        src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjUuODU0IDE0LjYzNGgxOS45OTl2LjE5M2MwIC45MzgtLjc2IDEuNjk3LTEuNjk4IDEuNjk3aC0yLjU2OXY0LjU2aDQuMjY3di4xOTJjMCAuOTM4LS43NiAxLjY5OC0xLjY5OCAxLjY5OGgtMi41Njl2OC40OTRjMCAuOTA0LS43MzIgMS42MzYtMS42MzYgMS42MzZoLTEuMjI1di0xMC4xM2gtNS44NGwtMS4wMzIgOC42ODdhMS42MzYgMS42MzYgMCAwMS0xLjYyNSAxLjQ0M2gtMS40MDZsMS4yMDQtMTAuMTNINjcuNTVjLS45MzcgMC0xLjY5Ny0uNzYtMS42OTctMS42OTh2LS4xOTJoNC4zOTdsLjU0MS00LjU2aC0zLjI0MWMtLjkzNyAwLTEuNjk3LS43Ni0xLjY5Ny0xLjY5N3YtLjE5M3ptMTIuODcgMS44OXY0LjU2SDczLjExbC41NDItNC41Nmg1LjA3M3ptMzEuMjctMS44OWgzLjA4NmwtMy4xNjMgNi4yMjFoMS4xMjR2MTEuMjFjMCAuODEzLS42NiAxLjQ3Mi0xLjQ3MyAxLjQ3MmgtMS4zNzlWMjEuNDkyaC0xLjY4M2wzLjQ4OC02Ljg1OHptMTAuOTE3LjAxaC0yLjg2djEuNjMyaC01LjY0NnYuMTYyYzAgLjkzNy43NiAxLjY5NyAxLjY5NyAxLjY5N2gzLjk0OXYxMS45MDhoLTEuODk2VjMxLjloMS44OTZ2MS42MzZoMi44NnYtMS42MzZoMS44ODR2LTEuODU4aC0xLjg4NFYxOC4xMzVoNC4wNTRjLjkzNyAwIDEuNjk3LS43NiAxLjY5Ny0xLjY5N3YtLjE2MmgtNS43NTF2LTEuNjMyem0tMy42NzYgNS4xOTRoLTIuNzYzbC0yLjE3MyAxMy43aDEuMzY2Yy44MDQgMCAxLjQ4OS0uNTg2IDEuNjE2LTEuMzhsMS45NTQtMTIuMzJ6bTcuMTggMGgtMi43NjNsMS45NTUgMTIuMzJjLjEyNi43OTQuODExIDEuMzggMS42MTYgMS4zOGgxLjM2NmwtMi4xNzQtMTMuN3ptMTEuMTcxLTUuMTk0aDIuNzAzdjEuNjMzaDguMDUydi4xODJjMCAuOTM4LS43NiAxLjY5OC0xLjY5NyAxLjY5OGgtMTAuOTU3bC0xLjQwMiAyLjMzN2g5LjIwOGwtMS4wMjEtMS42aDMuMjQ0bDIuMTk4IDMuNDQ2SDEyOC4wMWwuMDk3LS4wNzcgMi40NjMtNC4xMDdoLTEuMTY3Yy0uOTM3IDAtMS42OTctLjc2LTEuNjk3LTEuNjk3di0uMTgyaDcuODh2LTEuNjMzem0tNy4wMzUgOC4yOGgxNi45MDl2OS4xNGMwIC44MTQtLjY1OSAxLjQ3My0xLjQ3MyAxLjQ3M2gtNS45MTRjLS45MzggMC0xLjY5OC0uNzYtMS42OTgtMS42OTd2LS4xMTJoNi4xNzhWMjQuNzJoLTExLjE5OXYxLjE4NUgxNDEuN3YuMTk1YzAgLjg4LS43MTMgMS41OTMtMS41OTMgMS41OTNoLTguNzUzdjEuMDk3SDE0MS43di4xOTVjMCAuODgtLjcxMyAxLjU5My0xLjU5MyAxLjU5M2gtOC43NTN2MS40ODZjMCAuODEzLS42NTkgMS40NzItMS40NzIgMS40NzJoLTEuMzMxVjIyLjkyNHptLTI0LjYyOC03Ljg1N2gtMTUuMDV2LjE5M2MwIC45MzguNzYgMS42OTggMS42OTggMS42OThoMTEuNjU1Yy45MzcgMCAxLjY5Ny0uNzYgMS42OTctMS42OTh2LS4xOTN6bS0zLjgyOCAxNi4zNzJ2LS4wMDNIOTEuODhsMy4yMTMtOC4wM2g4Ljg1NmMuOTM4IDAgMS42OTgtLjc2IDEuNjk4LTEuNjk3di0uMTkyaC0xOC41di4xOTJjMCAuOTM4Ljc2IDEuNjk4IDEuNjk4IDEuNjk4aDMuMTE3bC00LjI0MyA5LjlIMTAxLjg1OWEzLjMyMSAzLjMyMSAwIDAwMC02LjY0M2gtNi4yNTZ2MS43OTRhLjA4LjA4IDAgMDAuMDc5LjA3OWw1LjU3LjAwNGExLjQ1IDEuNDUgMCAwMS0uMDAxIDIuODk4aC0xLjE1NnptLTMxLjczNyA2LjU5aC0xLjY5NHY4Ljg1MmgxLjY5NHYtMi40MWwxLjA3OC0uODggMy40MjUgMy4yOWgyLjA0NWwtNC4zNDMtNC4zNDQgMi44OC0yLjY0NWgtMi4yNWwtMi44MzUgMi4zOTd2LTQuMjZ6bTE3LjA3NS45NGMwLS41MS40MjEtLjkyNC45NDMtLjkyNHMuOTQ0LjQxNS45NDQuOTI0YzAgLjUxLS40MjIuOTIzLS45NDQuOTIzYS45MzQuOTM0IDAgMDEtLjk0NC0uOTIzem0uMTAyIDEuNDM1aDEuNjk0djYuNDk1aC0xLjY5NHYtNi40OTV6bTQuMzc1IDBoMS44OTdsMS44NDUgNC4yMzcgMi4yNDgtNC4yMzdoMS44OTZsLTQuODE1IDguOTg2aC0xLjY5NGwxLjI4Ni0yLjctMi42NjMtNi4yODZ6bTE3LjgyMSA2LjYxNXYtNi41MzZsMy41MzYuMDAyLjE0MS4wMDVjMS40NzYuMDg0IDIuMjU2Ljg1IDIuMjk5IDIuMjU0bC4wMDEuMjAydjQuMDczaC0xLjY1NGwuMDAxLTMuOTA3LS4wMDUtLjE3NS0uMDA5LS4xMDhjLS4wNzYtLjczNS0uNDY1LTEuMTEtMS4yLTEuMTU1bC0uMTU2LS4wMDVoLTEuMjZ2NS4zNWgtMS42OTR6bTIzLjUwNi0uNDQ0YzEuMDk5IDAgMS45NTQtLjMzNCAyLjU2NS0xIC41MDQtLjU0OC43NTYtMS4yMDYuNzU2LTEuOTcyIDAtLjc1OC0uMjU0LTEuNDExLS43NjItMS45Ni0uNjIzLS42Ny0xLjQ1Ni0xLjAwNS0yLjUtMS4wMDUtMS4xMzQgMC0yLjAwOS4zMzUtMi42MjQgMS4wMDYtLjUwOC41NTYtLjc2MiAxLjE5My0uNzYyIDEuOTEyIDAgLjc5OC4yNTIgMS40Ny43NTYgMi4wMTkuNjExLjY2NiAxLjQ2OCAxIDIuNTcxIDF6bS4wMDEtMS4zM2ExLjU3IDEuNTcgMCAwMS0xLjI2MS0uNTc4IDEuNTk1IDEuNTk1IDAgMDEtLjM5NS0xLjA2NGMwLS4zOTYuMTMyLS43NDguMzk1LTEuMDU3YTEuNTcgMS41NyAwIDAxMS4yNjEtLjU3N2MuNDU1IDAgLjg0NC4xNTggMS4xNjUuNDc1LjMyMi4zMTYuNDgzLjcwMy40ODMgMS4xNTkgMCAuNDYtLjE2Ljg1LS40NzkgMS4xNjZhMS41OTcgMS41OTcgMCAwMS0xLjE2OS40NzV6bS03LjMzMiAxLjMwNmMuNDQ0IDAgLjg2OS0uMTAxIDEuMjc0LS4zMDR2LTEuNTYzYy0uMzQ5LjIzOC0uNjg3LjM1Ny0xLjAxMi4zNTctLjM4OSAwLS44NDktLjEyNS0xLjEwMy0uMzc1YTEuNTgyIDEuNTgyIDAgMDEtLjQ1My0xLjA1N2MwLS4zODkuMTk5LS44NDYuNDUzLTEuMDk2LjI1NC0uMjUuNzE0LS4zNzUgMS4xMDMtLjM3NS4zMjkgMCAuNjY2LjEyIDEuMDEyLjM2M3YtMS41MjRhMi43MjMgMi43MjMgMCAwMC0xLjI3NC0uMzFjLTEuMDA4IDAtMS44MDcuMzQyLTIuMzk4IDEuMDI1YTIuODMzIDIuODMzIDAgMDAtLjcxNCAxLjkxN2MwIC43MjcuMjM4IDEuMzY2LjcxNCAxLjkxOC41OTEuNjgzIDEuMzkgMS4wMjQgMi4zOTggMS4wMjR6bS02LjQ1Ny0uMDlhLjY5LjY5IDAgMDAuNTA2LS4yMDguNjg5LjY4OSAwIDAwLjIwOC0uNTA2LjY3OS42NzkgMCAwMC0uMjA4LS41MDMuNjk1LjY5NSAwIDAwLS41MDYtLjIwNi43Mi43MiAwIDAwLS41MjEuMjA2LjY3NC42NzQgMCAwMC0uMjExLjUwM2MwIC4xOTkuMDcuMzY3LjIxMS41MDZhLjcxNC43MTQgMCAwMC41MjEuMjA5em0yMS41NzYtLjA5NHYtMi43MzRjMC0uMjY2LjAxNC0uNDc1LjA0MS0uNjI4YS44ODcuODg3IDAgMDEuMTM3LS4zNi44MjEuODIxIDAgMDEuNzE0LS4zN2MuMzMgMCAuNTc0LjE0My43MzIuNDI5LjA4LjE0My4xMTkuNDUzLjExOS45M3YyLjczM2gxLjU5MnYtMi43MzRjMC0uNDI5LjA2MS0uNzQyLjE4NC0uOTRhLjgzNC44MzQgMCAwMS43NS0uNDI0Yy4yOTQgMCAuNTE0LjEzLjY2MS4zODcuMDk5LjE3NS4xNDkuNS4xNDkuOTc3djIuNzM0aDEuNTkzdi0zLjU5MWMwLS4zMzgtLjAzMi0uNjItLjA5NS0uODQ2LS4xMDctLjM3My0uNTg5LTEuMTg1LTEuNDIxLTEuMTg1LS43NzYuMDE4LS45NTIuMTUtMS4zNDUuNDUyYTIuMTEgMi4xMSAwIDAwLS41MDYuNTg0bC0uMDM0LS4wNTRjLS4xNTMtLjI0LS4yODktLjQ1NS0uNDU5LS41ODhsLS4wNTgtLjA0NmMtLjMxLS4yNDMtLjM4My0uMzAxLS45NjktLjM0Mi0uNDI0IDAtLjgwOS4wOTMtMS4xNTQuMjhhMy4wMDIgMy4wMDIgMCAwMC0uNjMxLjQ4OHYtLjY3OWgtMS41ODZ2NS41MjdoMS41ODZ6bS0zOC41NjktNS4xNzhsLTEuNjU0IDIuOTY0di4zNjVsLS4wMDIuMjA4Yy4wMTkgMS4zODEuNzEgMi4xNTQgMi4wNCAyLjI3NmwuMTM1LjAxLjE5Ny4wMDcuMjIzLS4wMDJoMy4zODVWNDAuNTJoLTEuNjk1bC4wMDEgNS4zMTFoLTEuMzQ2Yy0uOC0uMDI2LTEuMjE0LS40LTEuMjc2LTEuMTU2bC0uMDA3LS4xMDUtLjAwMS0zLjM4MXpNNzUuODQgNDMuNjljMC0xLjg5MyAxLjYxOC0zLjQzMiAzLjYxNy0zLjQzMiAxLjYwNyAwIDMuMDE4IDEuMDA4IDMuNDY5IDIuNDYyLjEuMzIxLjE0Ni42MzQuMTU2IDEuMDRsLjAwMi4xODFWNDYuOUg4MS40N3YtMi45NDNsLS4wMDQtLjItLjAwOC0uMTI2YTIuMzU3IDIuMzU3IDAgMDAtLjA0NC0uMzIzYy0uMTktLjg4Mi0xLjAxLTEuNTE3LTEuOTU4LTEuNTE3LTEuMTAyIDAtMiAuODUtMiAxLjkgMCAxLjA1Mi44OTcgMS45MDIgMS45OTUgMS45MDIuMjg0LS4wMDYuNDg0LS4wNDIuNzM0LS4xM2wuMTM1LS4wNDdjLjA0My0uMDE2LjA4NC0uMDMzLjEyNC0uMDVsLjA2Mi0uMDI5djEuNjRsLS4wNzQuMDIxYy0uMjUzLjA2Ny0uNTgyLjExLS45ODQuMTI2LTEuOTkxIDAtMy42MDktMS41MzktMy42MDktMy40MzJ6TTUwLjYzNSAzOS4xNzdjLjI1LS4zMzIuODg0LS41ODguMDY0LjY1Mi0uODIgMS4yNC0xLjcyIDIuMDktMi4yMjQgMi41NzUtOS41NCA5LjE2My0yMi42NCA1Ljk2Ny0yNy4xOTcgMy4xODQtMy40MS0yLjIyLTUuNDQ3LTcuODQtMi4wMTMtMTIuMzE4IDEuNDI5LS43NDMgNC42ODctMi44NTggNi45NzgtNC44MDItMi4yMiA0LjQ2MS0yLjQxNSA4LjYwOS0uMjk4IDEyLjM0NCAzLjI0NSA1LjM3NCAxNy4xMjQgOC41NCAyNC42OS0xLjYzNXpNNDAuMTI1IDEyLjk4M2MxLjIzMi0yLjExNi03LjgwNC0zLjM5Ny04LjkzNS0uMTU1LTEuMjQxIDMuMzE4LTguOTQgMTMuMDgzLTE2LjIxOCAxOS42NTctMS44NTggMS42NzgtMy45MjcgMy41MDQtNS40ODMgNC4zMDQuODUyLjIyNyAyMS4zLTkuNjEgMzAuNjM2LTIzLjgwNnoiIGZpbGw9IiNmZmYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ5LjQxIDQwLjc5N2MuNjEyLjA1Ni42Mi4xMjIgMi4xMDUtMS45NDIgMS40ODQtMi4wNjUgMy42NTktNi44OTMgMy4zMy0xMi40NC0uMjk1LTIuNDY1LS41MTQtNS4xNC0yLjc2OC05LjAzMi0yLjA2Mi0zLjUxLTUuNzMzLTQuMzI2LTguMDI2LTMuMTc1LTIuMjMgMS4xMi0zLjM4MyA0LjA1LTEuNDYyIDYuNjUxIDIuNDE1IDIuNzg0IDcuMTE0IDEuMzE5IDUuODc4LTEuMzYzLS44MjktMS43MTEtMy4zMzUtMS4wOTYtMy4zNDYuNTIyLTEuMjEtMS4zOTEuMDYxLTMuMjI0IDIuMDg0LTIuNjM5IDIuNDkyLjY5OSA0LjgzNyA0LjgxMSA1LjU5MiA4LjAzNi41MTcgMi40MSAxLjM1NiA5LjQyNS0zLjM4OCAxNS4zODJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEwLjMyMiAyNy44MDRjLTEuOTQ3IDQuMTc1LTIuNDY0IDUuMjgzLTQuOTUyIDEwLjkyOC0yLjg2IDYuNDkyLTEuNjk1IDguMzkxLjI5OCA5LjI3OSAzLjIzNC45OTcgOC4zMTEuNTU1IDEyLjcyLTIuOTY0LTIuMzg0IDEuMzkyLTUuNTc0IDEuNjM2LTYuNzk4Ljc1LTEuMjMyLTEuMTExLS42Ni0zLjEzOSAxLjU0NC04LjEzNCAzLjI0LTcuMzQgNC4yNTgtOS4zOTIgNS45MjItMTIuNzUuNDI4LS44NjIuODk4LTEuODExIDEuNDYtMi45NTguMzExLS42MzUuNjE4LTEuMjQyLjkxMS0xLjgyMyAyLjI5OC00LjU1MyAzLjc3OS03LjQ4OS4yMzMtOS4zOTYtMy40Ny0xLjg2Ny05LjU3Ny41NTYtMTIuMzMgMi4yNGExNS43NiAxNS43NiAwIDAwLTIuODE4IDIuMDUyYy0xLjYzMyAxLjU5NC0xLjYzIDMuNTIyLS42OTQgNC42MDYuNjk0Ljc0OSAxLjY4My42NzkgMi40NzUuMzI2IDEuMDQ0LS41NTMgMS43MDgtMS45MSAyLjI1NC0zLjAyN2wuMDgtLjE2NWMtMS45MDMgMi4yMDQtMy4wNTUgMS42MTMtMy4wMDkuNDM4LjA5My0uOTI1IDEuMzc5LTIuMTI4IDIuODA0LTMuMTc1bC4wMDMtLjAwMWM0Ljk2NS0yLjk0OCA2LjQwNS4xMzMgNS4zOTIgMi4yMjYtLjM4Mi44MTYtLjcxMSAxLjQ5LTEuMTE2IDIuMzE4YTM2My4xNjQgMzYzLjE2NCAwIDAwLTMuMzk1IDcuMTIxbC0uOTg0IDIuMTA5eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzkuMzQgMzYuMzI3bDMuNjAzLTEuODkzLjQzMi0zLjE1OS0yLjg2NC0xLjk1My0zLjE3Mi42MzctLjUwMiA0LjIzIDIuNTAzIDIuMTM4em02LjQtNS44MzZsLS4zNTQtMy41MmMtLjQ2Ni0uMzMtMS41MjMtMS4wNjctMi4xNDYtMS40MzJsLTIuOTI1LjcxMy4wNTUgMi43NjUgMy4xOSAyLjEyNiAyLjE4LS42NTJ6TTM5LjIwMiAzOC43bDIuNjk3IDEuNDEgMi43ODEtMS43Ni41MDMtMi40MTUtMi4wMS0xLjQyOC0zLjY5IDEuOTI2LS4yODEgMi4yNjd6bS0zLjkzNS0xMC42MzhsLTIuNjAzIDEuOTQzdjMuMDE0bDEuOTc0IDIuMzI4IDEuNzk4LTEuMTc0LjU0LTQuMzktMS43MDktMS43MnptMS44NDgtMi4zMzVsLS4wMzIuMDE0LS40MzgtMS4zMjFhOC42NCA4LjY0IDAgMDAtNC4zOTggNC41ODRsLjQ3NS43NCAyLjM1Mi0xLjc3Ny0uMDE0LS4wMTYgMi4wNTUtMi4yMjR6bS4zMTMtLjExNGwzLjA3LjM4IDIuNDYtLjU4Mi0uMTEtMS4zMjNhOC43NTQgOC43NTQgMCAwMC0yLjYyNi0uNDAyIDguNyA4LjcgMCAwMC0zLjI0Ni42MjNsLjQ1MiAxLjMwNHptOS45MTcgNy42N2wuMDEzLS4wOTYgMS41MDkuMzRhOC45NCA4Ljk0IDAgMDAtMi4xMTgtNy4wMDVsLTEuMDEuNDQyLjM0MiAzLjMwMSAxLjI2NCAzLjAxN3ptMS41OTQuNTU3bC0xLjQwNy0uMzE0LS4wMy4yMjMtLjEtLjAxMi4wMTctLjEyLTEuOTUzIDIuMjk0LS41NiAyLjUwMiAxLjE0NS40MDQuMDc0LjAzM2MxLjQ2MS0xLjI5MyAyLjQ4LTMuMDQgMi44MTQtNS4wMXptLTEzLjY1NSA1Ljg1bC40NC0uOS0xLjEyOC0yLjgzLTIuMDEtMi40MzQtLjg5Ni43MDNhOC43ODYgOC43ODYgMCAwMDMuNTk0IDUuNDYxem0uMjk0LjA3MWwtLjI3MS0uMTA1YTguOTI3IDguOTI3IDAgMDA1LjkzOCAxLjM2OGwuMzIyLS44MS0yLjc2LTEuMzYxLTIuODI1LjExOC0uNDA0Ljc5em00LjU1LTE2LjQ2N2M1LjAzMiAwIDkuMTExIDQuMDc4IDkuMTExIDkuMTA3IDAgNS4wMjgtNC4wNzkgOS4xMDYtOS4xMTEgOS4xMDYtNS4wMzIgMC05LjExMS00LjA3OC05LjExMS05LjEwNiAwLTUuMDMgNC4wNzktOS4xMDcgOS4xMS05LjEwN3ptLS4wMjMtLjcxN2MtNS40MTUgMC05LjgwNiA0LjM5MS05LjgwNiA5LjgwNyAwIDUuNDE1IDQuMzkxIDkuODA2IDkuODA2IDkuODA2IDUuNDE2IDAgOS44MDgtNC4zOSA5LjgwOC05LjgwNiAwLTUuNDE2LTQuMzkyLTkuODA3LTkuODA4LTkuODA3eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==",
                        width: "310px",
                        height: "98px"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "styles__sponsor__iVADu",
                    staticStyle: {
                        "margin-bottom": "28px"
                    }
                },
                [e("div", {
                    staticClass: "styles__title__2vzEr"
                },
                [this._v("赞助伙伴")]), this._v(" "), e("div", {
                    staticClass: "styles__sponsorBox__ePs6n"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/loginx.png",
                        height: "44px"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "register__service__etg7Y"
                },
                [e("img", {
                    staticClass: "register__serviceIcon__2PLa8",
                    attrs: {
                        src: "/static/image/icon-online-service.6b73e5a37af863724b3a063314163f8a.svg",
                        width: "29px"
                    }
                }), e("span", {
                    staticStyle: {
                        cursor: "pointer"
                    }
                },
                [this._v("联系客服")])])
            }]
        };
        var Rt = a("VU/8")(Ut, Ft, !1,
        function(t) {
            a("mOG6")
        },
        "data-v-4742fb89", null).exports,
        Mt = {
            name: "register",
            data: function() {
                return {
                    registerInfo: {},
                    check_agree: !0,
                    passShow: !0,
                    passShow1: !0,
                    passShow2: !0,
                    imgLis: ["2PYL", "6AQ5", "8PHD", "21I7", "69HM", "ACWA", "DUZ7", "IY98", "K647", "M52T", "NY52", "NZFA", "SN76", "SP4D", "VAEO", "YFQM", "ZZU5", "7GQT", "LFW3", "NU2T", "UAE3"],
                    pid: "",
                    index: 0
                }
            },
            created: function() {
                var t = this.$route.query;
                t.pid && (this.pid = t.pid),
                this.changIndex()
            },
            methods: {
                changIndex: function() {
                    this.index = parseInt(20 * Math.random())
                },
                changPassShow: function() {
                    this.passShow = !this.passShow,
                    console.log(1)
                },
                changPassShow1: function() {
                    this.passShow1 = !this.passShow1
                },
                changPassShow2: function() {
                    this.passShow2 = !this.passShow2
                },
                register: function() {
                    var t = this;
                    if (t.check_agree) {
                        var e = {};
                        e.name = t.registerInfo.name || "",
                        e.password = t.registerInfo.password || "",
                        e.confirmPass = t.registerInfo.confirmPass || "",
                        e.realname = t.registerInfo.realname || "",
                        e.paypassword = t.registerInfo.paypassword || "";
                        var a = t.registerInfo.code || "";
                        if (0 != /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(e.name)) if (0 != /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(e.password)) if (e.confirmPass == e.password) if (0 != /^[\u0391-\uFFE5a-zA-Z·&\\s]+$/.test(e.realname)) if (0 != /^.{6,6}$/.test(e.paypassword)) {
                            if (0 == /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,}$/.test(a) || a.toUpperCase() != t.imgLis[t.index]) return t.$parent.showTost(0, "验证码错误！"),
                            t.registerInfo.code = "",
                            void t.changIndex();
                            t.$parent.showLoading(),
                            t.pid && (e.pid = t.pid),
                            t.$apiFun.register(e).then(function(e) {                                
								200 !== e.code && t.$parent.showTost(0, e.message),								
                                200 == e.code ? (sessionStorage.setItem("token", e.data.api_token), t.$store.commit("changToken"), t.getUserInfo(), t.$parent.openDaoTime()) : (t.registerInfo.code = null, t.changIndex(), t.$parent.hideLoading())
                            })
                        } else t.$parent.showTost(0, "支付密码长度需是6位！");
                        else t.$parent.showTost(0, "姓名格式不正确，可以是中，英文名称！");
                        else t.$parent.showTost(0, "两次密码不一致！");
                        else t.$parent.showTost(0, "密码长度最少8位！以字母和数字组合！");
                        else t.$parent.showTost(0, " 用户名长度不得低于6位，以字母和数字组合！")
                    } else t.$parent.showTost(0, "请阅读并同意相关条款和隐私协议！")
                },
                getUserInfo: function() {
                    var t = this;
                    t.$apiFun.post("/api/user", {}).then(function(e) {
                        console.log(e),
                        200 !== e.code && t.$parent.showTost(0, e.message),
                        200 === e.code && (localStorage.setItem("userInfo", n()(e.data)), t.$store.commit("changUserInfo"), t.$router.push({
                            path: "/"
                        })),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        Gt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", [t._m(0), t._v(" "), a("div", {
                    staticClass: "login__login_container__19JVq"
                },
                [a("img", {
                    staticStyle: {
                        width: "100%",
                        height: "100vh"
                    },
                    attrs: {
                        src: "/static/image/bg.aeffce071a77b9f3cadbb3e35832d14b.jpg",
                        width: "100%"
                    }
                }), t._v(" "), t._m(1), t._v(" "), a("div", {
                    staticClass: "login__login_box__2nAFl"
                },
                [a("div", {
                    staticClass: "login__contentBox__2Z4Z7 login__sp__3RBFD"
                },
                [t._m(2), t._v(" "), t._m(3), t._v(" "), a("div", [a("input", {
                    attrs: {
                        type: "hidden",
                        name: "_token",
                        value: "pCza8bpM6H9LjlszCeE2Ylk1H3zEf0FGh5At3J0u"
                    }
                }), t._v(" "), a("ul", {
                    staticClass: "register__login_input__1kDu_"
                },
                [a("li", {
                    staticClass: "register__row__1yYHy"
                },
                [a("div", {
                    staticClass: "register__userWrap___s_S1"
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__user__3jerM"
                }), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.name,
                        expression: "registerInfo.name"
                    }],
                    attrs: {
                        type: "text",
                        placeholder: "帐号（最少6位，英文及数字）",
                        readonly: "",
                        onfocus: "this.removeAttribute('readonly');",
                        onblur: "this.setAttribute('readonly',true);",
                        name: "name",
                        id: "name",
                        maxlength: "32",
                        value: ""
                    },
                    domProps: {
                        value: t.registerInfo.name
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.registerInfo, "name", e.target.value)
                        }
                    }
                })])]), t._v(" "), a("li", {
                    staticClass: "register__row__1yYHy"
                },
                [a("div", {
                    staticClass: "register__userWrap___s_S1"
                },
                [a("div", {
                    staticStyle: {
                        position: "relative",
                        display: "inherit",
                        width: "100%"
                    }
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__password__2Yj9_"
                }), t._v(" "), "checkbox" == (t.passShow ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.password,
                        expression: "registerInfo.password"
                    }],
                    attrs: {
                        placeholder: "密码（最少8位，英文及数字）",
                        name: "password",
                        id: "password",
                        maxlength: "32",
                        autocomplete: "new-password2",
                        value: "",
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(t.registerInfo.password) ? t._i(t.registerInfo.password, "") > -1 : t.registerInfo.password
                    },
                    on: {
                        change: function(e) {
                            var a = t.registerInfo.password,
                            s = e.target,
                            i = !!s.checked;
                            if (Array.isArray(a)) {
                                var n = t._i(a, "");
                                s.checked ? n < 0 && t.$set(t.registerInfo, "password", a.concat([""])) : n > -1 && t.$set(t.registerInfo, "password", a.slice(0, n).concat(a.slice(n + 1)))
                            } else t.$set(t.registerInfo, "password", i)
                        }
                    }
                }) : "radio" == (t.passShow ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.password,
                        expression: "registerInfo.password"
                    }],
                    attrs: {
                        placeholder: "密码（最少8位，英文及数字）",
                        name: "password",
                        id: "password",
                        maxlength: "32",
                        autocomplete: "new-password2",
                        value: "",
                        type: "radio"
                    },
                    domProps: {
                        checked: t._q(t.registerInfo.password, "")
                    },
                    on: {
                        change: function(e) {
                            return t.$set(t.registerInfo, "password", "")
                        }
                    }
                }) : a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.password,
                        expression: "registerInfo.password"
                    }],
                    attrs: {
                        placeholder: "密码（最少8位，英文及数字）",
                        name: "password",
                        id: "password",
                        maxlength: "32",
                        autocomplete: "new-password2",
                        value: "",
                        type: t.passShow ? "password": "text"
                    },
                    domProps: {
                        value: t.registerInfo.password
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.registerInfo, "password", e.target.value)
                        }
                    }
                }), t._v(" "), a("div", {
                    staticStyle: {
                        position: "absolute",
                        top: "13px",
                        right: "12px",
                        width: "16px",
                        height: "16px",
                        cursor: "pointer"
                    },
                    on: {
                        click: t.changPassShow
                    }
                },
                [t.passShow ? a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_close.0a2c8f5a5502b3cd6835e8c19be3bfbd.png",
                        width: "16px",
                        height: "16px"
                    }
                }) : a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_see.cfa834943719d71c121de1ebd3440954.png",
                        width: "16px",
                        height: "16px"
                    }
                })])])])]), t._v(" "), a("li", {
                    staticClass: "register__row__1yYHy"
                },
                [a("div", {
                    staticClass: "register__userWrap___s_S1"
                },
                [a("div", {
                    staticStyle: {
                        position: "relative",
                        display: "inherit",
                        width: "100%"
                    }
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__password__2Yj9_"
                }), t._v(" "), "checkbox" == (t.passShow1 ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.confirmPass,
                        expression: "registerInfo.confirmPass"
                    }],
                    attrs: {
                        placeholder: "确认密码",
                        id: "repassword",
                        name: "secondPassword",
                        maxlength: "32",
                        autocomplete: "off",
                        value: "",
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(t.registerInfo.confirmPass) ? t._i(t.registerInfo.confirmPass, "") > -1 : t.registerInfo.confirmPass
                    },
                    on: {
                        change: function(e) {
                            var a = t.registerInfo.confirmPass,
                            s = e.target,
                            i = !!s.checked;
                            if (Array.isArray(a)) {
                                var n = t._i(a, "");
                                s.checked ? n < 0 && t.$set(t.registerInfo, "confirmPass", a.concat([""])) : n > -1 && t.$set(t.registerInfo, "confirmPass", a.slice(0, n).concat(a.slice(n + 1)))
                            } else t.$set(t.registerInfo, "confirmPass", i)
                        }
                    }
                }) : "radio" == (t.passShow1 ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.confirmPass,
                        expression: "registerInfo.confirmPass"
                    }],
                    attrs: {
                        placeholder: "确认密码",
                        id: "repassword",
                        name: "secondPassword",
                        maxlength: "32",
                        autocomplete: "off",
                        value: "",
                        type: "radio"
                    },
                    domProps: {
                        checked: t._q(t.registerInfo.confirmPass, "")
                    },
                    on: {
                        change: function(e) {
                            return t.$set(t.registerInfo, "confirmPass", "")
                        }
                    }
                }) : a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.confirmPass,
                        expression: "registerInfo.confirmPass"
                    }],
                    attrs: {
                        placeholder: "确认密码",
                        id: "repassword",
                        name: "secondPassword",
                        maxlength: "32",
                        autocomplete: "off",
                        value: "",
                        type: t.passShow1 ? "password": "text"
                    },
                    domProps: {
                        value: t.registerInfo.confirmPass
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.registerInfo, "confirmPass", e.target.value)
                        }
                    }
                }), t._v(" "), a("div", {
                    staticStyle: {
                        position: "absolute",
                        top: "13px",
                        right: "12px",
                        width: "16px",
                        height: "16px",
                        cursor: "pointer"
                    },
                    on: {
                        click: t.changPassShow1
                    }
                },
                [t.passShow1 ? a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_close.0a2c8f5a5502b3cd6835e8c19be3bfbd.png",
                        width: "16px",
                        height: "16px"
                    }
                }) : a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_see.cfa834943719d71c121de1ebd3440954.png",
                        width: "16px",
                        height: "16px"
                    }
                })])])])]), t._v(" "), a("li", {
                    staticClass: "register__row__1yYHy"
                },
                [a("div", {
                    staticClass: "register__userWrap___s_S1"
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__user__3jerM"
                }), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.realname,
                        expression: "registerInfo.realname"
                    }],
                    attrs: {
                        type: "text",
                        placeholder: "请输入您的真实姓名",
                        name: "realname",
                        id: "realname",
                        maxlength: "32",
                        value: ""
                    },
                    domProps: {
                        value: t.registerInfo.realname
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.registerInfo, "realname", e.target.value)
                        }
                    }
                })])]), t._v(" "), a("li", {
                    staticClass: "register__row__1yYHy"
                },
                [a("div", {
                    staticClass: "register__userWrap___s_S1"
                },
                [a("div", {
                    staticStyle: {
                        position: "relative",
                        display: "inherit",
                        width: "100%"
                    }
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__password__2Yj9_"
                }), t._v(" "), "checkbox" == (t.passShow2 ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.paypassword,
                        expression: "registerInfo.paypassword"
                    }],
                    attrs: {
                        placeholder: "请输入6位取款密码",
                        id: "qukuanmima",
                        name: "secondPassword",
                        maxlength: "6",
                        autocomplete: "off",
                        value: "",
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(t.registerInfo.paypassword) ? t._i(t.registerInfo.paypassword, "") > -1 : t.registerInfo.paypassword
                    },
                    on: {
                        change: function(e) {
                            var a = t.registerInfo.paypassword,
                            s = e.target,
                            i = !!s.checked;
                            if (Array.isArray(a)) {
                                var n = t._i(a, "");
                                s.checked ? n < 0 && t.$set(t.registerInfo, "paypassword", a.concat([""])) : n > -1 && t.$set(t.registerInfo, "paypassword", a.slice(0, n).concat(a.slice(n + 1)))
                            } else t.$set(t.registerInfo, "paypassword", i)
                        }
                    }
                }) : "radio" == (t.passShow2 ? "password": "text") ? a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.paypassword,
                        expression: "registerInfo.paypassword"
                    }],
                    attrs: {
                        placeholder: "请输入6位取款密码",
                        id: "qukuanmima",
                        name: "secondPassword",
                        maxlength: "6",
                        autocomplete: "off",
                        value: "",
                        type: "radio"
                    },
                    domProps: {
                        checked: t._q(t.registerInfo.paypassword, "")
                    },
                    on: {
                        change: function(e) {
                            return t.$set(t.registerInfo, "paypassword", "")
                        }
                    }
                }) : a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.paypassword,
                        expression: "registerInfo.paypassword"
                    }],
                    attrs: {
                        placeholder: "请输入6位取款密码",
                        id: "qukuanmima",
                        name: "secondPassword",
                        maxlength: "6",
                        autocomplete: "off",
                        value: "",
                        type: t.passShow2 ? "password": "text"
                    },
                    domProps: {
                        value: t.registerInfo.paypassword
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.registerInfo, "paypassword", e.target.value)
                        }
                    }
                }), t._v(" "), a("div", {
                    staticStyle: {
                        position: "absolute",
                        top: "13px",
                        right: "12px",
                        width: "16px",
                        height: "16px",
                        cursor: "pointer"
                    },
                    on: {
                        click: t.changPassShow2
                    }
                },
                [t.passShow2 ? a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_close.0a2c8f5a5502b3cd6835e8c19be3bfbd.png",
                        width: "16px",
                        height: "16px"
                    }
                }) : a("img", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        src: "/static/image/eye_see.cfa834943719d71c121de1ebd3440954.png",
                        width: "16px",
                        height: "16px"
                    }
                })])])])]), t._v(" "), a("li", {
                    staticClass: "register__row__1yYHy"
                },
                [a("div", {
                    staticClass: "register__userWrap___s_S1"
                },
                [a("i", {
                    staticClass: "register__icon__D7BhQ register__user__3jerM"
                }), t._v(" "), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.code,
                        expression: "registerInfo.code"
                    }],
                    staticStyle: {
                        "padding-right": "0"
                    },
                    attrs: {
                        type: "text",
                        placeholder: "验证码",
                        maxlength: "4"
                    },
                    domProps: {
                        value: t.registerInfo.code
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || t.$set(t.registerInfo, "code", e.target.value)
                        }
                    }
                }), t._v(" "), a("img", {
                    staticStyle: {
                        cursor: "pointer",
                        height: "37px",
                        "padding-top": "2px",
                        "padding-right": "8px"
                    },
                    attrs: {
                        src: "/static/image/yzm/" + t.imgLis[t.index] + ".png",
                        alt: ""
                    },
                    on: {
                        click: t.changIndex
                    }
                })])]), t._v(" "), a("li", {
                    staticClass: "register__row__1yYHy"
                }), t._v(" "), a("li", {
                    staticClass: "register__buttonBox__13Vic"
                },
                [a("button", {
                    staticClass: "register__submit__1fyJo",
                    attrs: {
                        "data-analytics": "button",
                        type: "button",
                        "data-label": "注册按钮点击次数"
                    },
                    on: {
                        click: t.register
                    }
                },
                [t._v("注册")])]), t._v(" "), a("div", {
                    staticClass: "register__linkGroup__a4v25"
                },
                [a("span", {
                    attrs: {
                        "data-label": "登录提交"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/login")
                        }
                    }
                },
                [t._v("已有账号？"), a("span", [t._v("请登录")])]), a("span", {
                    attrs: {
                        "data-label": "登 录-先去逛逛"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/")
                        }
                    }
                },
                [t._v("先去逛逛")])])]), t._v(" "), a("div", {
                    staticClass: "login__service__1lRgp"
                },
                [a("div", {
                    staticClass: "register__service__etg7Y",
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [a("img", {
                    staticClass: "register__serviceIcon__2PLa8",
                    attrs: {
                        src: "/static/image/icon-online-service.6b73e5a37af863724b3a063314163f8a.svg",
                        width: "29px"
                    }
                }), a("span", {
                    staticStyle: {
                        cursor: "pointer"
                    }
                },
                [t._v("联系客服")])])])])])])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "common__loading__2ISqR",
                    staticStyle: {
                        "user-select": "none",
                        display: "none"
                    }
                },
                [e("div", {
                    staticClass: "common__loadingWarp__jRby5"
                },
                [e("img", {
                    staticStyle: {
                        width: "96px",
                        height: "96px"
                    },
                    attrs: {
                        src: "/static/image/loading-01298b545f5c991b77dcfde358b313f2.png",
                        alt: "loadingGif"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("video", {
                    staticClass: "login__video__3vENQ",
                    attrs: {
                        id: "login_video",
                        autoplay: "",
                        preload: "",
                        loop: ""
                    }
                },
                [e("source", {
                    attrs: {
                        src: "/static/image/video.mp4",
                        type: "video/mp4"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "login__logo__1NulW",
                    staticStyle: {
                        "margin-bottom": "23px"
                    },
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "登录-logo"
                    }
                },
                [e("a", [e("img", {
                    attrs: {
                        src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjUuODU0IDE0LjYzNGgxOS45OTl2LjE5M2MwIC45MzgtLjc2IDEuNjk3LTEuNjk4IDEuNjk3aC0yLjU2OXY0LjU2aDQuMjY3di4xOTJjMCAuOTM4LS43NiAxLjY5OC0xLjY5OCAxLjY5OGgtMi41Njl2OC40OTRjMCAuOTA0LS43MzIgMS42MzYtMS42MzYgMS42MzZoLTEuMjI1di0xMC4xM2gtNS44NGwtMS4wMzIgOC42ODdhMS42MzYgMS42MzYgMCAwMS0xLjYyNSAxLjQ0M2gtMS40MDZsMS4yMDQtMTAuMTNINjcuNTVjLS45MzcgMC0xLjY5Ny0uNzYtMS42OTctMS42OTh2LS4xOTJoNC4zOTdsLjU0MS00LjU2aC0zLjI0MWMtLjkzNyAwLTEuNjk3LS43Ni0xLjY5Ny0xLjY5N3YtLjE5M3ptMTIuODcgMS44OXY0LjU2SDczLjExbC41NDItNC41Nmg1LjA3M3ptMzEuMjctMS44OWgzLjA4NmwtMy4xNjMgNi4yMjFoMS4xMjR2MTEuMjFjMCAuODEzLS42NiAxLjQ3Mi0xLjQ3MyAxLjQ3MmgtMS4zNzlWMjEuNDkyaC0xLjY4M2wzLjQ4OC02Ljg1OHptMTAuOTE3LjAxaC0yLjg2djEuNjMyaC01LjY0NnYuMTYyYzAgLjkzNy43NiAxLjY5NyAxLjY5NyAxLjY5N2gzLjk0OXYxMS45MDhoLTEuODk2VjMxLjloMS44OTZ2MS42MzZoMi44NnYtMS42MzZoMS44ODR2LTEuODU4aC0xLjg4NFYxOC4xMzVoNC4wNTRjLjkzNyAwIDEuNjk3LS43NiAxLjY5Ny0xLjY5N3YtLjE2MmgtNS43NTF2LTEuNjMyem0tMy42NzYgNS4xOTRoLTIuNzYzbC0yLjE3MyAxMy43aDEuMzY2Yy44MDQgMCAxLjQ4OS0uNTg2IDEuNjE2LTEuMzhsMS45NTQtMTIuMzJ6bTcuMTggMGgtMi43NjNsMS45NTUgMTIuMzJjLjEyNi43OTQuODExIDEuMzggMS42MTYgMS4zOGgxLjM2NmwtMi4xNzQtMTMuN3ptMTEuMTcxLTUuMTk0aDIuNzAzdjEuNjMzaDguMDUydi4xODJjMCAuOTM4LS43NiAxLjY5OC0xLjY5NyAxLjY5OGgtMTAuOTU3bC0xLjQwMiAyLjMzN2g5LjIwOGwtMS4wMjEtMS42aDMuMjQ0bDIuMTk4IDMuNDQ2SDEyOC4wMWwuMDk3LS4wNzcgMi40NjMtNC4xMDdoLTEuMTY3Yy0uOTM3IDAtMS42OTctLjc2LTEuNjk3LTEuNjk3di0uMTgyaDcuODh2LTEuNjMzem0tNy4wMzUgOC4yOGgxNi45MDl2OS4xNGMwIC44MTQtLjY1OSAxLjQ3My0xLjQ3MyAxLjQ3M2gtNS45MTRjLS45MzggMC0xLjY5OC0uNzYtMS42OTgtMS42OTd2LS4xMTJoNi4xNzhWMjQuNzJoLTExLjE5OXYxLjE4NUgxNDEuN3YuMTk1YzAgLjg4LS43MTMgMS41OTMtMS41OTMgMS41OTNoLTguNzUzdjEuMDk3SDE0MS43di4xOTVjMCAuODgtLjcxMyAxLjU5My0xLjU5MyAxLjU5M2gtOC43NTN2MS40ODZjMCAuODEzLS42NTkgMS40NzItMS40NzIgMS40NzJoLTEuMzMxVjIyLjkyNHptLTI0LjYyOC03Ljg1N2gtMTUuMDV2LjE5M2MwIC45MzguNzYgMS42OTggMS42OTggMS42OThoMTEuNjU1Yy45MzcgMCAxLjY5Ny0uNzYgMS42OTctMS42OTh2LS4xOTN6bS0zLjgyOCAxNi4zNzJ2LS4wMDNIOTEuODhsMy4yMTMtOC4wM2g4Ljg1NmMuOTM4IDAgMS42OTgtLjc2IDEuNjk4LTEuNjk3di0uMTkyaC0xOC41di4xOTJjMCAuOTM4Ljc2IDEuNjk4IDEuNjk4IDEuNjk4aDMuMTE3bC00LjI0MyA5LjlIMTAxLjg1OWEzLjMyMSAzLjMyMSAwIDAwMC02LjY0M2gtNi4yNTZ2MS43OTRhLjA4LjA4IDAgMDAuMDc5LjA3OWw1LjU3LjAwNGExLjQ1IDEuNDUgMCAwMS0uMDAxIDIuODk4aC0xLjE1NnptLTMxLjczNyA2LjU5aC0xLjY5NHY4Ljg1MmgxLjY5NHYtMi40MWwxLjA3OC0uODggMy40MjUgMy4yOWgyLjA0NWwtNC4zNDMtNC4zNDQgMi44OC0yLjY0NWgtMi4yNWwtMi44MzUgMi4zOTd2LTQuMjZ6bTE3LjA3NS45NGMwLS41MS40MjEtLjkyNC45NDMtLjkyNHMuOTQ0LjQxNS45NDQuOTI0YzAgLjUxLS40MjIuOTIzLS45NDQuOTIzYS45MzQuOTM0IDAgMDEtLjk0NC0uOTIzem0uMTAyIDEuNDM1aDEuNjk0djYuNDk1aC0xLjY5NHYtNi40OTV6bTQuMzc1IDBoMS44OTdsMS44NDUgNC4yMzcgMi4yNDgtNC4yMzdoMS44OTZsLTQuODE1IDguOTg2aC0xLjY5NGwxLjI4Ni0yLjctMi42NjMtNi4yODZ6bTE3LjgyMSA2LjYxNXYtNi41MzZsMy41MzYuMDAyLjE0MS4wMDVjMS40NzYuMDg0IDIuMjU2Ljg1IDIuMjk5IDIuMjU0bC4wMDEuMjAydjQuMDczaC0xLjY1NGwuMDAxLTMuOTA3LS4wMDUtLjE3NS0uMDA5LS4xMDhjLS4wNzYtLjczNS0uNDY1LTEuMTEtMS4yLTEuMTU1bC0uMTU2LS4wMDVoLTEuMjZ2NS4zNWgtMS42OTR6bTIzLjUwNi0uNDQ0YzEuMDk5IDAgMS45NTQtLjMzNCAyLjU2NS0xIC41MDQtLjU0OC43NTYtMS4yMDYuNzU2LTEuOTcyIDAtLjc1OC0uMjU0LTEuNDExLS43NjItMS45Ni0uNjIzLS42Ny0xLjQ1Ni0xLjAwNS0yLjUtMS4wMDUtMS4xMzQgMC0yLjAwOS4zMzUtMi42MjQgMS4wMDYtLjUwOC41NTYtLjc2MiAxLjE5My0uNzYyIDEuOTEyIDAgLjc5OC4yNTIgMS40Ny43NTYgMi4wMTkuNjExLjY2NiAxLjQ2OCAxIDIuNTcxIDF6bS4wMDEtMS4zM2ExLjU3IDEuNTcgMCAwMS0xLjI2MS0uNTc4IDEuNTk1IDEuNTk1IDAgMDEtLjM5NS0xLjA2NGMwLS4zOTYuMTMyLS43NDguMzk1LTEuMDU3YTEuNTcgMS41NyAwIDAxMS4yNjEtLjU3N2MuNDU1IDAgLjg0NC4xNTggMS4xNjUuNDc1LjMyMi4zMTYuNDgzLjcwMy40ODMgMS4xNTkgMCAuNDYtLjE2Ljg1LS40NzkgMS4xNjZhMS41OTcgMS41OTcgMCAwMS0xLjE2OS40NzV6bS03LjMzMiAxLjMwNmMuNDQ0IDAgLjg2OS0uMTAxIDEuMjc0LS4zMDR2LTEuNTYzYy0uMzQ5LjIzOC0uNjg3LjM1Ny0xLjAxMi4zNTctLjM4OSAwLS44NDktLjEyNS0xLjEwMy0uMzc1YTEuNTgyIDEuNTgyIDAgMDEtLjQ1My0xLjA1N2MwLS4zODkuMTk5LS44NDYuNDUzLTEuMDk2LjI1NC0uMjUuNzE0LS4zNzUgMS4xMDMtLjM3NS4zMjkgMCAuNjY2LjEyIDEuMDEyLjM2M3YtMS41MjRhMi43MjMgMi43MjMgMCAwMC0xLjI3NC0uMzFjLTEuMDA4IDAtMS44MDcuMzQyLTIuMzk4IDEuMDI1YTIuODMzIDIuODMzIDAgMDAtLjcxNCAxLjkxN2MwIC43MjcuMjM4IDEuMzY2LjcxNCAxLjkxOC41OTEuNjgzIDEuMzkgMS4wMjQgMi4zOTggMS4wMjR6bS02LjQ1Ny0uMDlhLjY5LjY5IDAgMDAuNTA2LS4yMDguNjg5LjY4OSAwIDAwLjIwOC0uNTA2LjY3OS42NzkgMCAwMC0uMjA4LS41MDMuNjk1LjY5NSAwIDAwLS41MDYtLjIwNi43Mi43MiAwIDAwLS41MjEuMjA2LjY3NC42NzQgMCAwMC0uMjExLjUwM2MwIC4xOTkuMDcuMzY3LjIxMS41MDZhLjcxNC43MTQgMCAwMC41MjEuMjA5em0yMS41NzYtLjA5NHYtMi43MzRjMC0uMjY2LjAxNC0uNDc1LjA0MS0uNjI4YS44ODcuODg3IDAgMDEuMTM3LS4zNi44MjEuODIxIDAgMDEuNzE0LS4zN2MuMzMgMCAuNTc0LjE0My43MzIuNDI5LjA4LjE0My4xMTkuNDUzLjExOS45M3YyLjczM2gxLjU5MnYtMi43MzRjMC0uNDI5LjA2MS0uNzQyLjE4NC0uOTRhLjgzNC44MzQgMCAwMS43NS0uNDI0Yy4yOTQgMCAuNTE0LjEzLjY2MS4zODcuMDk5LjE3NS4xNDkuNS4xNDkuOTc3djIuNzM0aDEuNTkzdi0zLjU5MWMwLS4zMzgtLjAzMi0uNjItLjA5NS0uODQ2LS4xMDctLjM3My0uNTg5LTEuMTg1LTEuNDIxLTEuMTg1LS43NzYuMDE4LS45NTIuMTUtMS4zNDUuNDUyYTIuMTEgMi4xMSAwIDAwLS41MDYuNTg0bC0uMDM0LS4wNTRjLS4xNTMtLjI0LS4yODktLjQ1NS0uNDU5LS41ODhsLS4wNTgtLjA0NmMtLjMxLS4yNDMtLjM4My0uMzAxLS45NjktLjM0Mi0uNDI0IDAtLjgwOS4wOTMtMS4xNTQuMjhhMy4wMDIgMy4wMDIgMCAwMC0uNjMxLjQ4OHYtLjY3OWgtMS41ODZ2NS41MjdoMS41ODZ6bS0zOC41NjktNS4xNzhsLTEuNjU0IDIuOTY0di4zNjVsLS4wMDIuMjA4Yy4wMTkgMS4zODEuNzEgMi4xNTQgMi4wNCAyLjI3NmwuMTM1LjAxLjE5Ny4wMDcuMjIzLS4wMDJoMy4zODVWNDAuNTJoLTEuNjk1bC4wMDEgNS4zMTFoLTEuMzQ2Yy0uOC0uMDI2LTEuMjE0LS40LTEuMjc2LTEuMTU2bC0uMDA3LS4xMDUtLjAwMS0zLjM4MXpNNzUuODQgNDMuNjljMC0xLjg5MyAxLjYxOC0zLjQzMiAzLjYxNy0zLjQzMiAxLjYwNyAwIDMuMDE4IDEuMDA4IDMuNDY5IDIuNDYyLjEuMzIxLjE0Ni42MzQuMTU2IDEuMDRsLjAwMi4xODFWNDYuOUg4MS40N3YtMi45NDNsLS4wMDQtLjItLjAwOC0uMTI2YTIuMzU3IDIuMzU3IDAgMDAtLjA0NC0uMzIzYy0uMTktLjg4Mi0xLjAxLTEuNTE3LTEuOTU4LTEuNTE3LTEuMTAyIDAtMiAuODUtMiAxLjkgMCAxLjA1Mi44OTcgMS45MDIgMS45OTUgMS45MDIuMjg0LS4wMDYuNDg0LS4wNDIuNzM0LS4xM2wuMTM1LS4wNDdjLjA0My0uMDE2LjA4NC0uMDMzLjEyNC0uMDVsLjA2Mi0uMDI5djEuNjRsLS4wNzQuMDIxYy0uMjUzLjA2Ny0uNTgyLjExLS45ODQuMTI2LTEuOTkxIDAtMy42MDktMS41MzktMy42MDktMy40MzJ6TTUwLjYzNSAzOS4xNzdjLjI1LS4zMzIuODg0LS41ODguMDY0LjY1Mi0uODIgMS4yNC0xLjcyIDIuMDktMi4yMjQgMi41NzUtOS41NCA5LjE2My0yMi42NCA1Ljk2Ny0yNy4xOTcgMy4xODQtMy40MS0yLjIyLTUuNDQ3LTcuODQtMi4wMTMtMTIuMzE4IDEuNDI5LS43NDMgNC42ODctMi44NTggNi45NzgtNC44MDItMi4yMiA0LjQ2MS0yLjQxNSA4LjYwOS0uMjk4IDEyLjM0NCAzLjI0NSA1LjM3NCAxNy4xMjQgOC41NCAyNC42OS0xLjYzNXpNNDAuMTI1IDEyLjk4M2MxLjIzMi0yLjExNi03LjgwNC0zLjM5Ny04LjkzNS0uMTU1LTEuMjQxIDMuMzE4LTguOTQgMTMuMDgzLTE2LjIxOCAxOS42NTctMS44NTggMS42NzgtMy45MjcgMy41MDQtNS40ODMgNC4zMDQuODUyLjIyNyAyMS4zLTkuNjEgMzAuNjM2LTIzLjgwNnoiIGZpbGw9IiNmZmYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ5LjQxIDQwLjc5N2MuNjEyLjA1Ni42Mi4xMjIgMi4xMDUtMS45NDIgMS40ODQtMi4wNjUgMy42NTktNi44OTMgMy4zMy0xMi40NC0uMjk1LTIuNDY1LS41MTQtNS4xNC0yLjc2OC05LjAzMi0yLjA2Mi0zLjUxLTUuNzMzLTQuMzI2LTguMDI2LTMuMTc1LTIuMjMgMS4xMi0zLjM4MyA0LjA1LTEuNDYyIDYuNjUxIDIuNDE1IDIuNzg0IDcuMTE0IDEuMzE5IDUuODc4LTEuMzYzLS44MjktMS43MTEtMy4zMzUtMS4wOTYtMy4zNDYuNTIyLTEuMjEtMS4zOTEuMDYxLTMuMjI0IDIuMDg0LTIuNjM5IDIuNDkyLjY5OSA0LjgzNyA0LjgxMSA1LjU5MiA4LjAzNi41MTcgMi40MSAxLjM1NiA5LjQyNS0zLjM4OCAxNS4zODJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEwLjMyMiAyNy44MDRjLTEuOTQ3IDQuMTc1LTIuNDY0IDUuMjgzLTQuOTUyIDEwLjkyOC0yLjg2IDYuNDkyLTEuNjk1IDguMzkxLjI5OCA5LjI3OSAzLjIzNC45OTcgOC4zMTEuNTU1IDEyLjcyLTIuOTY0LTIuMzg0IDEuMzkyLTUuNTc0IDEuNjM2LTYuNzk4Ljc1LTEuMjMyLTEuMTExLS42Ni0zLjEzOSAxLjU0NC04LjEzNCAzLjI0LTcuMzQgNC4yNTgtOS4zOTIgNS45MjItMTIuNzUuNDI4LS44NjIuODk4LTEuODExIDEuNDYtMi45NTguMzExLS42MzUuNjE4LTEuMjQyLjkxMS0xLjgyMyAyLjI5OC00LjU1MyAzLjc3OS03LjQ4OS4yMzMtOS4zOTYtMy40Ny0xLjg2Ny05LjU3Ny41NTYtMTIuMzMgMi4yNGExNS43NiAxNS43NiAwIDAwLTIuODE4IDIuMDUyYy0xLjYzMyAxLjU5NC0xLjYzIDMuNTIyLS42OTQgNC42MDYuNjk0Ljc0OSAxLjY4My42NzkgMi40NzUuMzI2IDEuMDQ0LS41NTMgMS43MDgtMS45MSAyLjI1NC0zLjAyN2wuMDgtLjE2NWMtMS45MDMgMi4yMDQtMy4wNTUgMS42MTMtMy4wMDkuNDM4LjA5My0uOTI1IDEuMzc5LTIuMTI4IDIuODA0LTMuMTc1bC4wMDMtLjAwMWM0Ljk2NS0yLjk0OCA2LjQwNS4xMzMgNS4zOTIgMi4yMjYtLjM4Mi44MTYtLjcxMSAxLjQ5LTEuMTE2IDIuMzE4YTM2My4xNjQgMzYzLjE2NCAwIDAwLTMuMzk1IDcuMTIxbC0uOTg0IDIuMTA5eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzkuMzQgMzYuMzI3bDMuNjAzLTEuODkzLjQzMi0zLjE1OS0yLjg2NC0xLjk1My0zLjE3Mi42MzctLjUwMiA0LjIzIDIuNTAzIDIuMTM4em02LjQtNS44MzZsLS4zNTQtMy41MmMtLjQ2Ni0uMzMtMS41MjMtMS4wNjctMi4xNDYtMS40MzJsLTIuOTI1LjcxMy4wNTUgMi43NjUgMy4xOSAyLjEyNiAyLjE4LS42NTJ6TTM5LjIwMiAzOC43bDIuNjk3IDEuNDEgMi43ODEtMS43Ni41MDMtMi40MTUtMi4wMS0xLjQyOC0zLjY5IDEuOTI2LS4yODEgMi4yNjd6bS0zLjkzNS0xMC42MzhsLTIuNjAzIDEuOTQzdjMuMDE0bDEuOTc0IDIuMzI4IDEuNzk4LTEuMTc0LjU0LTQuMzktMS43MDktMS43MnptMS44NDgtMi4zMzVsLS4wMzIuMDE0LS40MzgtMS4zMjFhOC42NCA4LjY0IDAgMDAtNC4zOTggNC41ODRsLjQ3NS43NCAyLjM1Mi0xLjc3Ny0uMDE0LS4wMTYgMi4wNTUtMi4yMjR6bS4zMTMtLjExNGwzLjA3LjM4IDIuNDYtLjU4Mi0uMTEtMS4zMjNhOC43NTQgOC43NTQgMCAwMC0yLjYyNi0uNDAyIDguNyA4LjcgMCAwMC0zLjI0Ni42MjNsLjQ1MiAxLjMwNHptOS45MTcgNy42N2wuMDEzLS4wOTYgMS41MDkuMzRhOC45NCA4Ljk0IDAgMDAtMi4xMTgtNy4wMDVsLTEuMDEuNDQyLjM0MiAzLjMwMSAxLjI2NCAzLjAxN3ptMS41OTQuNTU3bC0xLjQwNy0uMzE0LS4wMy4yMjMtLjEtLjAxMi4wMTctLjEyLTEuOTUzIDIuMjk0LS41NiAyLjUwMiAxLjE0NS40MDQuMDc0LjAzM2MxLjQ2MS0xLjI5MyAyLjQ4LTMuMDQgMi44MTQtNS4wMXptLTEzLjY1NSA1Ljg1bC40NC0uOS0xLjEyOC0yLjgzLTIuMDEtMi40MzQtLjg5Ni43MDNhOC43ODYgOC43ODYgMCAwMDMuNTk0IDUuNDYxem0uMjk0LjA3MWwtLjI3MS0uMTA1YTguOTI3IDguOTI3IDAgMDA1LjkzOCAxLjM2OGwuMzIyLS44MS0yLjc2LTEuMzYxLTIuODI1LjExOC0uNDA0Ljc5em00LjU1LTE2LjQ2N2M1LjAzMiAwIDkuMTExIDQuMDc4IDkuMTExIDkuMTA3IDAgNS4wMjgtNC4wNzkgOS4xMDYtOS4xMTEgOS4xMDYtNS4wMzIgMC05LjExMS00LjA3OC05LjExMS05LjEwNiAwLTUuMDMgNC4wNzktOS4xMDcgOS4xMS05LjEwN3ptLS4wMjMtLjcxN2MtNS40MTUgMC05LjgwNiA0LjM5MS05LjgwNiA5LjgwNyAwIDUuNDE1IDQuMzkxIDkuODA2IDkuODA2IDkuODA2IDUuNDE2IDAgOS44MDgtNC4zOSA5LjgwOC05LjgwNiAwLTUuNDE2LTQuMzkyLTkuODA3LTkuODA4LTkuODA3eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==",
                        width: "310px",
                        height: "98px"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "styles__sponsor__iVADu",
                    staticStyle: {
                        "margin-bottom": "28px"
                    }
                },
                [e("div", {
                    staticClass: "styles__title__2vzEr"
                },
                [this._v("赞助伙伴")]), this._v(" "), e("div", {
                    staticClass: "styles__sponsorBox__ePs6n"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/loginx.png",
                        height: "44px"
                    }
                })])])
            }]
        };
        var Ht = a("VU/8")(Mt, Gt, !1,
        function(t) {
            a("ip6p")
        },
        "data-v-7f7653b1", null).exports,
        Vt = {
            name: "gamePage",
            data: function() {
                return {}
            },
            components: {},
            created: function() {
                var t = this,
                e = t.$route.query;
                console.log(e),
                e.dailiD ? t.$apiFun.get("/api/getAgentLoginUrl", {
                    is_mobile_url: 0
                }).then(function(e) {
                    200 != e.code && t.showTost(0, e.message),
                    200 == e.code && window.open(e.data.url, "_self")
                }) : e.name && t.goGamePage(e.name, e.type, e.code)
            },
            mounted: function() {},
            methods: {
                goGamePage: function(t, e, a) {
                    var s = this;
                    s.$apiFun.post("/api/getGameUrl", {
                        plat_name: t,
                        game_type: e || 0,
                        game_code: a,
                        is_mobile_url: 0
                    }).then(function(t) {
                        console.log(t),
                        200 != t.code && (s.showTost(0, t.message), setTimeout(function() {
                            window.location.href = "about:blank",
                            window.close()
                        },
                        2e3)),
                        200 == t.code && window.open(t.data.url, "_self")
                    }).
                    catch(function(t) {
                        setTimeout(function() {
                            window.location.href = "about:blank",
                            window.close()
                        },
                        2e3)
                    })
                },
                showTost: function(t, e) {
                    var a = t ? "success": "error";
                    $("body").append('\n            <div role="alert" class="ants-message el-message el-message--' + a + '" style="top: 20px; z-index: 2009;"><i class="el-message__icon el-icon-' + a + '"></i>\n            <p class="el-message__content">' + e + "\n            </p></div>"),
                    setTimeout('$(".ants-message").detach()', 3e3)
                }
            }
        },
        Kt = {
            render: function() {
                this.$createElement;
                this._self._c;
                return this._m(0)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    attrs: {
                        id: "loading_screen"
                    }
                },
                [e("div", {
                    staticClass: "lds-ring large"
                },
                [e("div"), this._v(" "), e("div"), this._v(" "), e("div"), this._v(" "), e("div")])])
            }]
        };
        var Jt = a("VU/8")(Vt, Kt, !1,
        function(t) {
            a("u+Mf")
        },
        "data-v-f21adb4c", null).exports,
        Wt = {
            name: "gamePage",
            data: function() {
                return {
                    type: 1
                }
            },
            components: {},
            created: function() {
                var t = this;
                t.$parent.showLoading();
                var e = t.$route.query;
                console.log(e),
                e.type && (t.type = e.type),
                setTimeout(function() {
                    t.$parent.hideLoading()
                },
                2e3)
            },
            mounted: function() {},
            methods: {
                changType: function(t) {
                    this.type = t
                }
            }
        },
        Zt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", [1 == t.type ? a("div", {
                    staticClass: "main"
                },
                [a("div", {
                    staticClass: "subNav"
                },
                [a("a", {
                    staticClass: "juventus",
                    on: {
                        click: function(e) {
                            return t.changType(1)
                        }
                    }
                },
                [t._v("尤文图斯官方区域合作伙伴")]), t._v(" "), a("a", {
                    staticClass: "avfc",
                    on: {
                        click: function(e) {
                            return t.changType(2)
                        }
                    }
                },
                [t._v("阿斯顿维拉官方全球顶级合作伙伴")])]), t._v(" "), a("div", {
                    staticClass: "wrap"
                },
                [a("div", {
                    staticClass: "swiper_wrap swiper-container swiper-container-initialized swiper-container-vertical",
                    staticStyle: {
                        "overflow-y": "auto"
                    },
                    attrs: {
                        id: "mainSwiper"
                    }
                },
                [a("div", {
                    staticClass: "swiper_wrap swiper-wrapper",
                    staticStyle: {
                        transform: "translate3d(0px, 0px, 0px)"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/banner-1.55bcde09ee8cab8b010f9b6c2b9a066b.jpg",
                        alt: ""
                    }
                }), t._v(" "), a("div", {
                    staticClass: "swiper-slide section section_one swiper-slide-next",
                    attrs: {
                        id: "video"
                    }
                },
                [a("div", {
                    staticClass: "football"
                },
                [a("div", {
                    staticClass: "football_info"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "video_box"
                },
                [t._m(1), t._v(" "), a("div", {
                    staticClass: "football_text"
                },
                [a("p", [t._v("\n                      北京时间2020年9月18日，意甲豪门尤文图斯足球俱乐部与亚洲领先体育娱乐平台之一的" + t._s(t.$store.state.appInfo.title) + "举行官方签约仪式正式宣布双方合作关系。" + t._s(t.$store.state.appInfo.title) + "全球关系发展总监兼发言人William Robert与尤文图斯亚太区董事总经理Federico\n                      Palomba共同出席并签署赞助协议。自此，" + t._s(t.$store.state.appInfo.title) + "正式成为尤文图斯官方区域合作伙伴，两家知名品牌将通过深入合作，共同 “携手拼搏，直至巅峰，竭力为用户提供最佳体育与娱乐体验”。\n                    ")]), t._v(" "), t._m(2)])])]), t._v(" "), t._m(3)])]), t._v(" "), t._m(4), t._v(" "), t._m(5), t._v(" "), t._m(6), t._v(" "), t._m(7), t._v(" "), t._m(8)]), t._v(" "), t._m(9), t._v(" "), a("span", {
                    staticClass: "swiper-notification",
                    attrs: {
                        "aria-live": "assertive",
                        "aria-atomic": "true"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "modal",
                    attrs: {
                        id: "modal"
                    }
                })]) : t._e(), t._v(" "), 2 == t.type ? a("div", {
                    staticClass: "sponsorPage",
                    attrs: {
                        id: "main"
                    }
                },
                [a("div", {
                    staticClass: "subNav"
                },
                [a("a", {
                    staticClass: "juventus",
                    on: {
                        click: function(e) {
                            return t.changType(1)
                        }
                    }
                },
                [t._v("尤文图斯官方区域合作伙伴")]), t._v(" "), a("a", {
                    staticClass: "avfc",
                    on: {
                        click: function(e) {
                            return t.changType(2)
                        }
                    }
                },
                [t._v("阿斯顿维拉官方全球顶级合作伙伴")])]), t._v(" "), a("img", {
                    attrs: {
                        src: "/static/image/banner.57c0282eccf86dd00ab9ee36ae51c98e.png",
                        width: "100%",
                        alt: ""
                    }
                }), t._v(" "), a("div", {
                    staticClass: "box",
                    attrs: {
                        id: "video"
                    }
                },
                [a("div", {
                    staticClass: "boxContent"
                },
                [a("h1", [t._v("官宣视频")]), t._v(" "), a("div", {
                    staticClass: "video"
                },
                [t._m(10), t._v(" "), a("div", {
                    staticClass: "synopsis"
                },
                [a("p", [t._v("\n              2021年6月22日,\n              " + t._s(t.$store.state.appInfo.title) + "成为阿斯顿维拉全球顶级合作伙伴及官方球衣袖标合作伙伴。" + t._s(t.$store.state.appInfo.title) + "的品牌标志将出现在维拉2021/22赛季的新球衣袖标上,并将在所有阿斯顿维拉主客场及一线队的比赛中展现。届时，在全球最受瞩目的英超联赛上，" + t._s(t.$store.state.appInfo.title) + "将携手阿斯顿维拉俱乐部为广大球迷和用户提供更好的赛事体验。不仅如此，双方的合作将覆盖全球诸多领域，包括比赛日的联合活动，全球范围的企业社会责任项目，以及其它贯穿维拉球迷和" + t._s(t.$store.state.appInfo.title) + "用户的合作。\n            ")]), t._v(" "), t._m(11)])])]), t._v(" "), t._m(12)]), t._v(" "), t._m(13), t._v(" "), t._m(14), t._v(" "), t._m(15), t._v(" "), t._m(16), t._v(" "), t._m(17)]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("h3", {
                    staticStyle: {
                        "margin-bottom": "0"
                    }
                },
                [e("span", {
                    staticClass: "line-vertical"
                }), this._v(" 官宣视频")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "video_box_img"
                },
                [e("video", {
                    staticClass: "video",
                    attrs: {
                        poster: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-1.bed592d671889693ffb58982cc59a59c.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        controls: "true",
                        preload: "none"
                    }
                },
                [e("source", {
                    attrs: {
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventus1.4c63aa193493ea9598403b1bef9eef70.mp4",
                        type: "video/mp4"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "btn btn1"
                },
                [e("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/jinruyouwentusianniu@2x.b47747a482585b72471363b4f765cb6f.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/jinruyouwentusianniu@2x.b47747a482585b72471363b4f765cb6f.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "boxContent"
                },
                [a("div", {
                    staticClass: "swiper-container1 swiper-container-initialized swiper-container-horizontal"
                },
                [a("div", {
                    staticClass: "swiper-wrapper",
                    staticStyle: {
                        transform: "translate3d(-1160px, 0px, 0px)",
                        transition: "all 0ms ease 0s"
                    }
                },
                [a("ul", {
                    staticClass: "swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next",
                    staticStyle: {
                        width: "1160px"
                    },
                    attrs: {
                        "data-swiper-slide-index": "1"
                    }
                },
                [a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventus2.f81e5d37cc7473b8c91369c11d9db782.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-2.5f04d9e7f078e368361d5e326e28fd8b.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-2.5f04d9e7f078e368361d5e326e28fd8b.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-2.5f04d9e7f078e368361d5e326e28fd8b.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯3:0桑普多利亚")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("i", {
                    attrs: {
                        onclick: "showPlayer(false)"
                    }
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/valencia-web/nodata.ccb7955dad4982f09ef7d4ad4d716e40.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/valencia-web/nodata.ccb7955dad4982f09ef7d4ad4d716e40.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("敬请期待")])])]), t._v(" "), a("ul", {
                    staticClass: "swiper-slide video-item swiper-slide-active",
                    staticStyle: {
                        width: "1160px"
                    },
                    attrs: {
                        "data-swiper-slide-index": "0"
                    }
                },
                [a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/newSpring.acf2d708f5e260592fcbe4687ae990e8.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-newyear.dd951c8bf8c3678d18c30e9dddd35ff1.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-newyear.dd951c8bf8c3678d18c30e9dddd35ff1.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-newyear.dd951c8bf8c3678d18c30e9dddd35ff1.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯与您共度新春佳节")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventusOct.27752b75bced5419e1f3bc364877e09e.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-5.0f0ad02f4d063e5d053a8816e4a75fbd.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-5.0f0ad02f4d063e5d053a8816e4a75fbd.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-5.0f0ad02f4d063e5d053a8816e4a75fbd.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯10月精彩进球集锦")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventus3.421cffe70f261baea20528e6c689843e.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-4.3dbfc0aa887030d55ae29dbe9fa05463.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-4.3dbfc0aa887030d55ae29dbe9fa05463.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-4.3dbfc0aa887030d55ae29dbe9fa05463.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯1:1维罗纳")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventusSep.d8aae9bed3f96e2e2f0aa90b9ecb7f50.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-3.091956f20461ce4edc5934183066b09a.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-3.091956f20461ce4edc5934183066b09a.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-3.091956f20461ce4edc5934183066b09a.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯9月精彩进球集锦")])])])]), t._v(" "), a("ul", {
                    staticClass: "swiper-slide swiper-slide-next swiper-slide-duplicate-prev",
                    staticStyle: {
                        width: "1160px"
                    },
                    attrs: {
                        "data-swiper-slide-index": "1"
                    }
                },
                [a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventus2.f81e5d37cc7473b8c91369c11d9db782.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-2.5f04d9e7f078e368361d5e326e28fd8b.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-2.5f04d9e7f078e368361d5e326e28fd8b.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-2.5f04d9e7f078e368361d5e326e28fd8b.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯3:0桑普多利亚")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("i", {
                    attrs: {
                        onclick: "showPlayer(false)"
                    }
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/valencia-web/nodata.ccb7955dad4982f09ef7d4ad4d716e40.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/valencia-web/nodata.ccb7955dad4982f09ef7d4ad4d716e40.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("敬请期待")])])]), t._v(" "), a("ul", {
                    staticClass: "swiper-slide video-item swiper-slide-duplicate swiper-slide-duplicate-active",
                    staticStyle: {
                        width: "1160px"
                    },
                    attrs: {
                        "data-swiper-slide-index": "0"
                    }
                },
                [a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/newSpring.acf2d708f5e260592fcbe4687ae990e8.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-newyear.dd951c8bf8c3678d18c30e9dddd35ff1.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-newyear.dd951c8bf8c3678d18c30e9dddd35ff1.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-newyear.dd951c8bf8c3678d18c30e9dddd35ff1.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯与您共度新春佳节")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventusOct.27752b75bced5419e1f3bc364877e09e.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-5.0f0ad02f4d063e5d053a8816e4a75fbd.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-5.0f0ad02f4d063e5d053a8816e4a75fbd.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-5.0f0ad02f4d063e5d053a8816e4a75fbd.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯10月精彩进球集锦")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventus3.421cffe70f261baea20528e6c689843e.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-4.3dbfc0aa887030d55ae29dbe9fa05463.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-4.3dbfc0aa887030d55ae29dbe9fa05463.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-4.3dbfc0aa887030d55ae29dbe9fa05463.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯1:1维罗纳")])])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("div", {
                    staticClass: "video_item",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/juventusSep.d8aae9bed3f96e2e2f0aa90b9ecb7f50.mp4",
                        "data-poster": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-3.091956f20461ce4edc5934183066b09a.jpg"
                    }
                },
                [a("i", {
                    staticClass: "play_icon"
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-3.091956f20461ce4edc5934183066b09a.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/poster-3.091956f20461ce4edc5934183066b09a.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", [t._v("尤文图斯9月精彩进球集锦")])])])])]), t._v(" "), a("div", {
                    staticClass: "swiper-pagination1 swiper-pagination-bullets"
                },
                [a("span", {
                    staticClass: "swiper-pagination-bullet swiper-pagination-bullet-active"
                }), a("span", {
                    staticClass: "swiper-pagination-bullet"
                })]), t._v(" "), a("div", {
                    staticClass: "swiper-button-prev",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Previous slide"
                    }
                },
                [a("span")]), t._v(" "), a("div", {
                    staticClass: "swiper-button-next",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Next slide"
                    }
                },
                [a("span")]), t._v(" "), a("span", {
                    staticClass: "swiper-notification",
                    attrs: {
                        "aria-live": "assertive",
                        "aria-atomic": "true"
                    }
                })])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "swiper-slide section section_two",
                    attrs: {
                        id: "info"
                    }
                },
                [a("div", {
                    staticClass: "sponsor_box"
                },
                [a("div", {
                    staticClass: "sponsor_img_box"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/sponsor-img.00b028f11dcd3fa07222df88d18d1ece.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/sponsor-img.00b028f11dcd3fa07222df88d18d1ece.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "sponsor_text_box"
                },
                [a("h3", {
                    staticClass: "football_info"
                },
                [t._v("意甲尤文图斯足球俱乐部")]), t._v(" "), a("p", [t._v("\n                    尤文图斯——意大利足球的领军俱乐部，在截止到2020年这九年间，创纪录地连续九次夺得意甲联赛冠军，完成队史上38次夺得意甲联赛冠军的壮举。而在欧战赛场上，尤文更是欧陆第一支把欧洲三大杯（欧洲冠军杯，欧洲联盟杯，欧洲优胜者杯）都收入囊中的球队。尤文图斯，不仅是意大利的冠军队伍，也是欧战的强劲团队。\n                  ")])])]), t._v(" "), a("div", {
                    staticClass: "honor_list_box"
                },
                [a("h3", {
                    staticClass: "football_info"
                },
                [a("span", {
                    staticClass: "line-vertical"
                }), t._v("荣誉")]), t._v(" "), a("div", {
                    staticClass: "honor_list"
                },
                [a("div", {
                    staticClass: "honor_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-1.cca7ac2d153d5162e9e829ec937191d3.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-1.cca7ac2d153d5162e9e829ec937191d3.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "honor_text_box"
                },
                [a("b", [t._v("38")]), t._v(" "), a("span", [t._v("意大利甲级联赛冠军")])])]), t._v(" "), a("div", {
                    staticClass: "honor_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-2.1f7e7d3b8072e021760df2f0237a6e24.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-2.1f7e7d3b8072e021760df2f0237a6e24.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "honor_text_box"
                },
                [a("b", [t._v("13")]), t._v(" "), a("span", [t._v("意大利杯冠军")])])]), t._v(" "), a("div", {
                    staticClass: "honor_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "honor_text_box"
                },
                [a("b", [t._v("8")]), t._v(" "), a("span", [t._v("意大利超级杯冠军")])])]), t._v(" "), a("div", {
                    staticClass: "honor_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "honor_text_box"
                },
                [a("b", [t._v("2")]), t._v(" "), a("span", [t._v("欧洲冠军联赛奖杯")])])]), t._v(" "), a("div", {
                    staticClass: "honor_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "honor_text_box"
                },
                [a("b", [t._v("3")]), t._v(" "), a("span", [t._v("欧洲联盟杯/欧洲联赛冠军")])])]), t._v(" "), a("div", {
                    staticClass: "honor_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/honor-3.99e0d3b5d7b412901d817790d5725d56.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "honor_text_box"
                },
                [a("b", [t._v("2")]), t._v(" "), a("span", [t._v("欧洲超级杯冠军")])])])])])])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "swiper-slide section section_third",
                    attrs: {
                        id: "picture"
                    }
                },
                [a("div", {
                    staticClass: "pic_box"
                },
                [a("div", {
                    staticClass: "pic_title"
                },
                [a("span"), t._v(" "), a("h3", [t._v("球队日常图集")])]), t._v(" "), a("div", {
                    staticClass: "pics"
                },
                [a("div", {
                    staticClass: "pic_item"
                },
                [a("img", {
                    staticStyle: {
                        width: "276px",
                        height: "428px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-1.5538672a58f1f2cf3348e03cb062f505.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-1.5538672a58f1f2cf3348e03cb062f505.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "pic_text_box"
                },
                [a("h3"), t._v(" "), a("p")])]), t._v(" "), a("div", {
                    staticClass: "pic_item"
                },
                [a("img", {
                    staticStyle: {
                        width: "570px",
                        height: "428px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-2.e2487821cf3070d4fd0ce69c3f1d5aab.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-2.e2487821cf3070d4fd0ce69c3f1d5aab.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "pic_text_box"
                },
                [a("h3"), t._v(" "), a("p")])]), t._v(" "), a("div", {
                    staticClass: "pic_item"
                },
                [a("img", {
                    staticStyle: {
                        width: "275px",
                        height: "275px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-3.31ffa625f653c956a16d0ad4c0c6e0c9.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-3.31ffa625f653c956a16d0ad4c0c6e0c9.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "pic_text_box"
                },
                [a("h3", [t._v("训练照片")]), t._v(" "), a("p", [t._v("刻苦训练的尤文球员，图中球员分别为库卢塞夫斯基、阿图尔、莫拉塔、麦肯尼")])])]), t._v(" "), a("div", {
                    staticClass: "pic_item"
                },
                [a("img", {
                    staticStyle: {
                        width: "275px",
                        height: "259px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-4.0b1237704f345d668a69b0d6c84f9bea.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-4.0b1237704f345d668a69b0d6c84f9bea.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "pic_text_box"
                },
                [a("h3"), t._v(" "), a("p", [t._v("比赛照片，与罗马的比赛中，摆脱对手的拉比奥特")])])]), t._v(" "), a("div", {
                    staticClass: "pic_item"
                },
                [a("img", {
                    staticStyle: {
                        width: "275px",
                        height: "259px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-5.9360f9aeafa9f66ab87564635f4e286c.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-5.9360f9aeafa9f66ab87564635f4e286c.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "pic_text_box"
                },
                [a("h3"), t._v(" "), a("p", [t._v("比赛照片，球队中场大将拉比奥特在观察场上形势")])])]), t._v(" "), a("div", {
                    staticClass: "pic_item"
                },
                [a("img", {
                    staticStyle: {
                        width: "275px",
                        height: "259px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-6.0612999fa2323cda0e64eca915308ee0.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-6.0612999fa2323cda0e64eca915308ee0.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "pic_text_box"
                },
                [a("h3"), t._v(" "), a("p", [t._v("尤文图斯VS维罗纳赛前首发球员合照")])])]), t._v(" "), a("div", {
                    staticClass: "pic_item"
                },
                [a("img", {
                    staticStyle: {
                        width: "275px",
                        height: "259px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-7.529e7c6d921d5969bc4f548d7cb9d4f8.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/picture-7.529e7c6d921d5969bc4f548d7cb9d4f8.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "pic_text_box"
                },
                [a("h3"), t._v(" "), a("p", [t._v("比赛照片，阿根廷球星迪巴拉")])])])])])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "swiper-slide section section_four",
                    attrs: {
                        id: "service"
                    }
                },
                [a("div", {
                    staticClass: "service"
                },
                [a("div", {
                    staticClass: "service_box"
                },
                [a("div", {
                    staticClass: "app_img"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/service-app.38499c781fb6dc413a0ebe18de86ae6e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/service-app.38499c781fb6dc413a0ebe18de86ae6e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "service_content"
                },
                [a("h2", [t._v("业内最顶尖的原生APP")]), t._v(" "), a("div", {
                    staticClass: "service_icons"
                },
                [a("div", {
                    staticClass: "service_icon"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-1.17378a734f5a7fdc12600fe8ad34b1f0.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-1.17378a734f5a7fdc12600fe8ad34b1f0.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("h3", [t._v("更安全")]), t._v(" "), a("p", [t._v("\n                        独家网络技术 "), a("br"), t._v("\n                        超强防劫持\n                      ")])]), t._v(" "), a("div", {
                    staticClass: "service_icon"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-2.c95d87fc455a5e81ba05b879b2358995.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-2.c95d87fc455a5e81ba05b879b2358995.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("h3", [t._v("更稳定")]), t._v(" "), a("p", [t._v("\n                        强大的技术团队 "), a("br"), t._v("\n                        提供最稳定的产品\n                      ")])]), t._v(" "), a("div", {
                    staticClass: "service_icon"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-3.6233d635883f80c8813393d8662e439f.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-3.6233d635883f80c8813393d8662e439f.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("h3", [t._v("更丰富")]), t._v(" "), a("p", [t._v("\n                        丰富的游戏产品 "), a("br"), t._v("\n                        您想要的我们都有\n                      ")])]), t._v(" "), a("div", {
                    staticClass: "service_icon"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-4.7090bd8d1486bdab2e39259f20bee15c.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/invalid-4.7090bd8d1486bdab2e39259f20bee15c.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("h3", [t._v("更私密")]), t._v(" "), a("p", [t._v("\n                        三重数据加密 "), a("br"), t._v("\n                        保护您的资料安全\n                      ")])])]), t._v(" "), a("div", {
                    staticClass: "logo_box"
                },
                [a("div", {
                    staticClass: "logo_item service_logo3"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/service-logo-3.b6cfffb103a336bbcdb77c9440e436c2.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/service-logo-3.b6cfffb103a336bbcdb77c9440e436c2.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])])])]), t._v(" "), a("div", {
                    staticClass: "license_box"
                },
                [a("div", {
                    staticClass: "license"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/license-2.74b5f7a2333fb0b9882fb732772b2c30.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/license-2.74b5f7a2333fb0b9882fb732772b2c30.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", {},
                [t._v("马耳他牌照（MGA）认证")])]), t._v(" "), a("div", {
                    staticClass: "license"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/license-3.1628b60d61f1baf3f6acb052a5c6f8ab.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/license-3.1628b60d61f1baf3f6acb052a5c6f8ab.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", {},
                [t._v("英属维尔京群岛（BVI）认证")])]), t._v(" "), a("div", {
                    staticClass: "license"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/license-4.ca240aa025d6f9579a10d9c399b0dbbc.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/license-4.ca240aa025d6f9579a10d9c399b0dbbc.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("p", {},
                [t._v("菲律宾（PAGCOR）监督牌照")])])])])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "swiper-slide section section_five",
                    attrs: {
                        id: "players"
                    }
                },
                [a("div", {
                    staticClass: "player_box"
                },
                [a("div", {
                    staticClass: "img_box"
                },
                [a("h2", [a("span"), t._v(" 官方宣传")]), t._v(" "), a("div", {
                    staticClass: "photos"
                },
                [a("img", {
                    staticClass: "photo1",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/ppd-1.271193a9b9d8037ccd54223f6ec5eaf4.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/ppd-1.271193a9b9d8037ccd54223f6ec5eaf4.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("img", {
                    staticClass: "photo2",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/ppd-2.293ec10ec7564ee46748bdbf9f247d74.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/ppd-2.293ec10ec7564ee46748bdbf9f247d74.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "player_list"
                },
                [a("div", {
                    staticClass: "player_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-1.03b25e2dd35d046e324b99f4fbcc8ccc.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-1.03b25e2dd35d046e324b99f4fbcc8ccc.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "player_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-2.58e2416d697bc8482ca0a1a406863edc.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-2.58e2416d697bc8482ca0a1a406863edc.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "player_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-3.9ef27db093ebc55dc0b32a32cbde5b54.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-3.9ef27db093ebc55dc0b32a32cbde5b54.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "player_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-4.c92bd9f91a92025dacbb648a168257c3.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-4.c92bd9f91a92025dacbb648a168257c3.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "player_item"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-5.82f8725af1b3101f2792bfd086372ff7.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/player-5.82f8725af1b3101f2792bfd086372ff7.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])])])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "swiper-slide section section_six",
                    attrs: {
                        id: "news"
                    }
                },
                [e("div", {
                    staticClass: "news_box"
                },
                [e("img", {
                    staticClass: "news",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/news.6d2fdbe72aa5f7e24a1bf71b4c97e6b0.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/news.6d2fdbe72aa5f7e24a1bf71b4c97e6b0.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), this._v(" "), e("img", {
                    staticClass: "logos",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/logos.1f34d881ca1aac6a8a487d7b96157d1e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/juventus-web/logos.1f34d881ca1aac6a8a487d7b96157d1e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
                },
                [e("span", {
                    staticClass: "swiper-pagination-bullet swiper-pagination-bullet-active",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Go to slide 1"
                    }
                }), e("span", {
                    staticClass: "swiper-pagination-bullet",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Go to slide 2"
                    }
                }), e("span", {
                    staticClass: "swiper-pagination-bullet",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Go to slide 3"
                    }
                }), e("span", {
                    staticClass: "swiper-pagination-bullet",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Go to slide 4"
                    }
                }), e("span", {
                    staticClass: "swiper-pagination-bullet",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Go to slide 5"
                    }
                }), e("span", {
                    staticClass: "swiper-pagination-bullet",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Go to slide 6"
                    }
                }), e("span", {
                    staticClass: "swiper-pagination-bullet",
                    attrs: {
                        tabindex: "0",
                        role: "button",
                        "aria-label": "Go to slide 7"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("video", {
                    attrs: {
                        poster: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/video3.4d33a4e69f9fa8f3e03ec8617425c9f9.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        controls: "",
                        controlslist: " noremote footbar nodownload",
                        preload: "none"
                    }
                },
                [e("source", {
                    attrs: {
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/avfc03.2e51fde2ffec17a7402d49710a98a82f.mp4",
                        type: "video/mp4"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "btn"
                },
                [e("img", {
                    staticClass: "btn2",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/but-1@2x.35a6e77893e9d8ce0111433f95387711.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/but-1@2x.35a6e77893e9d8ce0111433f95387711.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "boxContent"
                },
                [a("h1", [t._v("精彩赛事")]), t._v(" "), a("div", {
                    staticClass: "swiper-container1"
                },
                [a("div", {
                    staticClass: "swiper-wrapper"
                },
                [a("ul", {
                    staticClass: "swiper-slide"
                },
                [a("li", {
                    staticClass: "slide-item"
                },
                [a("video", {
                    attrs: {
                        poster: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/video1.6b6ca8c0a4b1d2b5fceb5207a09a00d6.jpg?x-oss-process=image/resize,m_fixed,w_2000,h_1124/quality,Q_100/format,webp",
                        controls: "",
                        preload: "none"
                    }
                },
                [a("source", {
                    attrs: {
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/avfc01.c46046d6fa0b0908e34391b8a866d04f.mp4",
                        type: "video/mp4"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("阿斯维拉精彩集锦①")])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("video", {
                    attrs: {
                        poster: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/video2.93d43044fc6a9e036723023bb99ac439.jpg?x-oss-process=image/resize,m_fixed,w_2000,h_1124/quality,Q_100/format,webp",
                        controls: "",
                        preload: "none"
                    }
                },
                [a("source", {
                    attrs: {
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/videos/avfc02.618e0626a5f0af189b31f24331c62f89.mp4",
                        type: "video/mp4"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("阿斯维拉精彩集锦②")])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("img", {
                    staticStyle: {
                        cursor: "default"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/video0.52e172b7ec3ad5c87f42b7a85ba8187d.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/video0.52e172b7ec3ad5c87f42b7a85ba8187d.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("敬请期待")])]), t._v(" "), a("li", {
                    staticClass: "slide-item"
                },
                [a("img", {
                    staticStyle: {
                        cursor: "default"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/video0.52e172b7ec3ad5c87f42b7a85ba8187d.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/video0.52e172b7ec3ad5c87f42b7a85ba8187d.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("敬请期待")])])])])])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "box",
                    attrs: {
                        id: "picture"
                    }
                },
                [a("div", {
                    staticClass: "boxContent"
                },
                [a("div", {
                    staticClass: "left"
                },
                [a("div", {
                    staticStyle: {
                        height: "204px"
                    }
                },
                [a("h1", [t._v("阿斯顿维拉足球俱乐部")]), t._v(" "), a("p", [t._v("阿斯顿维拉足球俱乐部（绰号维拉人）是一家位于英格兰中部伯明翰市的足球俱乐部，于1874年创立，现时于英格兰足球超级联赛竞逐，是1888年甲组联赛及1992年英格兰足球超级联赛首届赛事球队，因此阿斯顿维拉也是英超之中历史最悠久的球队之一，其主场位于伯明翰市的维拉公园球场。 　")]), t._v(" "), a("p", [t._v("早年，阿斯顿维拉曾经七次赢得顶级联赛冠军和七次英格兰足总杯，更于1982年获得欧洲联赛冠军杯和欧洲超级杯冠军。")])]), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor1.b769c4e6fe49ac2defecf6dc19443bd7.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "344",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor1.b769c4e6fe49ac2defecf6dc19443bd7.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor2.9dc36ae8b757f459e5d2615d1ba0b0e8.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "344",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor2.9dc36ae8b757f459e5d2615d1ba0b0e8.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "right"
                },
                [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor3.833838cd6b550cd25b7c2b7aa59fb1f7.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "408",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor3.833838cd6b550cd25b7c2b7aa59fb1f7.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "boxContent"
                },
                [a("h1", [t._v("荣誉")]), t._v(" "), a("div", {
                    staticClass: "swiper-container2"
                },
                [a("div", {
                    staticClass: "swiper-wrapper"
                },
                [a("div", {
                    staticClass: "swiper-slide"
                },
                [a("div", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor4.97e7ee0b0134e0c320aa85e206c137de.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor4.97e7ee0b0134e0c320aa85e206c137de.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("7")]), t._v(" "), a("span", {
                    staticClass: "videoTit"
                },
                [t._v("英格兰甲级联赛")])]), t._v(" "), a("div", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor5.82db459ba1645cb9332958fd29ff453d.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor5.82db459ba1645cb9332958fd29ff453d.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("2")]), t._v(" "), a("span", {
                    staticClass: "videoTit"
                },
                [t._v("英格兰乙级联赛")])]), t._v(" "), a("div", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor6.c0bd6749bfb12007495f796536beab87.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor6.c0bd6749bfb12007495f796536beab87.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("1")]), t._v(" "), a("span", {
                    staticClass: "videoTit"
                },
                [t._v("欧洲冠军杯")])]), t._v(" "), a("div", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor7.4be891f2af8817c1cd112876ed987008.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/honor7.4be891f2af8817c1cd112876ed987008.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("1")]), t._v(" "), a("span", {
                    staticClass: "videoTit"
                },
                [t._v("欧洲超级杯")])])])])])])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "box",
                    attrs: {
                        id: "info"
                    }
                },
                [a("div", {
                    staticClass: "boxContent"
                },
                [a("h1", [t._v("球队日常图集")]), t._v(" "), a("div", {
                    staticClass: "signing"
                },
                [a("div", {
                    staticClass: "signingLeft"
                },
                [a("img", {
                    staticStyle: {
                        width: "276px",
                        height: "428px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info1.e0437ed742eb3f47dfdf085fc60c16ef.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info1.e0437ed742eb3f47dfdf085fc60c16ef.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "signingCenter"
                },
                [a("img", {
                    staticStyle: {
                        width: "570px",
                        height: "428px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info2.7d1278213f2a252ed21527261a13afb0.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info2.7d1278213f2a252ed21527261a13afb0.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "signingRight"
                },
                [a("img", {
                    staticStyle: {
                        width: "276px",
                        height: "276px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info3.39e6fe7617fb8af27ce7ebada0061e7a.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info3.39e6fe7617fb8af27ce7ebada0061e7a.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", [a("h1", [t._v("比赛照片")]), t._v(" "), a("p", [t._v("左图为比赛准备开始麦克金蓄势待发中图为进球后队员互相击掌庆祝，图为埃尔加齐、英斯、扬、毕达斯、瓦特金斯右图为后场大将马蒂·卡什组织进攻")])])])]), t._v(" "), a("div", {
                    staticClass: "swiper-container3"
                },
                [a("div", {
                    staticClass: "swiper-wrapper"
                },
                [a("div", {
                    staticClass: "swiper-slide"
                },
                [a("div", [a("img", {
                    staticStyle: {
                        width: "276px",
                        height: "260px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info4.dc3e7ad3a9f82be99e3b50205d232027.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info4.dc3e7ad3a9f82be99e3b50205d232027.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("比赛照片，对决意甲萨勒尼塔纳赛")])]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        width: "276px",
                        height: "260px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info5.00a39625598474316cc23424200a7ea4.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info5.00a39625598474316cc23424200a7ea4.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("比赛照片，球队中场纳卡姆巴观察场上形势")])]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        width: "276px",
                        height: "260px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info6.2dbafc17b133ff729f009a4315f98079.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info6.2dbafc17b133ff729f009a4315f98079.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("比赛照片，英斯进球，瓦特金斯上前庆贺")])]), t._v(" "), a("div", [a("img", {
                    staticStyle: {
                        width: "276px",
                        height: "260px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info7.db32133bb6873f7f49312a7c1e7de2d3.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/info7.db32133bb6873f7f49312a7c1e7de2d3.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "videoTit"
                },
                [t._v("比赛照片，赛季新援埃尔加齐")])])])])])])])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "box",
                    staticStyle: {
                        height: "960px"
                    },
                    attrs: {
                        id: "service"
                    }
                },
                [a("div", {
                    staticClass: "boxContent",
                    staticStyle: {
                        padding: "42px 20px 46px 60px"
                    }
                },
                [a("img", {
                    staticClass: "iphone",
                    staticStyle: {
                        width: "326px",
                        height: "666px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/service1.0c8e13297f172116c5cb79317edbccd4.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/service1.0c8e13297f172116c5cb79317edbccd4.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "iphoneRight"
                },
                [a("h1", [t._v("业内最顶尖的原生APP")]), t._v(" "), a("ul", [a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon1.1bc99f66a0b7e9e6b9ca558bf6c3dd5e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon1.1bc99f66a0b7e9e6b9ca558bf6c3dd5e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("更安全")]), t._v(" "), a("p", [t._v("\n                独家网络技术"), a("br"), t._v(" "), a("br"), t._v("\n                超强防劫持\n              ")])]), t._v(" "), a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon2.734efa6c74e38f374be642b74e2b4bb7.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon2.734efa6c74e38f374be642b74e2b4bb7.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("更稳定")]), t._v(" "), a("p", [t._v("\n                强大的技术团队"), a("br"), t._v(" "), a("br"), t._v("\n                提供最稳定的产品\n              ")])]), t._v(" "), a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon3.3f5358a4ec1c7cdc83cf6efd225fa2b4.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon3.3f5358a4ec1c7cdc83cf6efd225fa2b4.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("更丰富")]), t._v(" "), a("p", [t._v("\n                丰富的游戏产品"), a("br"), t._v(" "), a("br"), t._v("\n                您想要的我们都有\n              ")])]), t._v(" "), a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon4.babeaf82416d56ba4f992242f534186e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/icon4.babeaf82416d56ba4f992242f534186e.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), t._v(" "), a("span", [t._v("更私密")]), t._v(" "), a("p", [t._v("\n                三重数据加密"), a("br"), t._v(" "), a("br"), t._v("\n                保护您的资料安全\n              ")])])]), t._v(" "), a("img", {
                    staticClass: "bottomImg",
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/service2.37ff7c4c7b523bf110bcb5c01bf08fe5.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/service2.37ff7c4c7b523bf110bcb5c01bf08fe5.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "license"
                })])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "box",
                    attrs: {
                        id: "official"
                    }
                },
                [a("div", {
                    staticClass: "boxContent",
                    staticStyle: {
                        height: "564px"
                    }
                },
                [a("h1", [t._v("官方宣传")]), t._v(" "), a("div", {
                    staticClass: "official"
                },
                [a("div", {
                    staticClass: "officialLeft"
                },
                [a("img", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official1.8b5ef6003632dcf1570ebbd5004b4821.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official1.8b5ef6003632dcf1570ebbd5004b4821.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "officialRight"
                },
                [a("div", [a("img", {
                    staticStyle: {
                        width: "100%",
                        height: "192px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official2.a805676e968affd950e310e0010ce46b.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official2.a805676e968affd950e310e0010ce46b.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-top": "9px"
                    }
                },
                [a("img", {
                    staticStyle: {
                        width: "100%",
                        height: "276px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official3.d1e78174da8917670d434360df0817f3.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official3.d1e78174da8917670d434360df0817f3.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])])])]), t._v(" "), a("ul", {
                    staticClass: "officialList"
                },
                [a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official4.eb2e77af73bf19f3d9f66e203e4da8e1.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official4.eb2e77af73bf19f3d9f66e203e4da8e1.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official5.98d5451746f3e31283625bd5fc533d97.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official5.98d5451746f3e31283625bd5fc533d97.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official6.578b522eca58cba74e72376767ac1c0f.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official6.578b522eca58cba74e72376767ac1c0f.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official7.ce5764598ec4c0cb6d45ce6146f71fd2.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official7.ce5764598ec4c0cb6d45ce6146f71fd2.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })]), t._v(" "), a("li", [a("img", {
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official8.a1505e9c6734e6a5d4f6454721d989f5.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/official8.a1505e9c6734e6a5d4f6454721d989f5.jpg?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "box",
                    attrs: {
                        id: "cooperation"
                    }
                },
                [e("div", {
                    staticClass: "media"
                },
                [e("img", {
                    staticStyle: {
                        width: "1218px",
                        height: "648px",
                        display: "block"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/media1.84d78d7b17623bf3e42e68dc15fc6cec.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/media1.84d78d7b17623bf3e42e68dc15fc6cec.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                }), this._v(" "), e("img", {
                    staticStyle: {
                        width: "1218px",
                        height: "174px",
                        display: "block",
                        "margin-top": "30px"
                    },
                    attrs: {
                        "data-src": "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/cooperation.c2c4e4f308fb1919065e64a38b38e01a.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp",
                        width: "undefined",
                        height: "undefined",
                        src: "https://senbackkg.salinent.com/static-sponsor/assets-oss/ob/images/avfc-web/cooperation.c2c4e4f308fb1919065e64a38b38e01a.png?x-oss-process=image/resize,p_100/quality,Q_100/format,webp"
                    }
                })])])
            }]
        };
        var Ot = a("VU/8")(Wt, Zt, !1,
        function(t) {
            a("tmiB")
        },
        "data-v-4c355a2d", null).exports,
        Xt = {
            name: "payInfo",
            data: function() {
                return {
                    payInfo: {},
                    daoTime: null,
                    m: 0,
                    s: 0,
                    type: null
                }
            },
            components: {},
            created: function() {
                var t = this.$route.query;
                t.deposit_no && this.getpayinfo(t.deposit_no)
            },
            mounted: function() {},
            methods: {
                doCopy: function(t) {
                    var e = document.createElement("input");
                    e.style.opacity = "0",
                    e.value = t,
                    document.body.appendChild(e),
                    e.select(),
                    document.execCommand("copy"),
                    this.showTost("复制成功！")
                },
                getpayinfo: function(t) {
                    var e = this;
                    e.$apiFun.post("/api/payinfo", {
                        deposit_no: t
                    }).then(function(t) {
                        console.log(t),
                        200 != t.code && e.showTost(t.message),
                        200 == t.code && (e.payInfo = t.data, e.type = t.message, e.countTime())
                    })
                },
                countTime: function() {
                    var t = (new Date).getTime(),
                    e = this.payInfo.info.created_at,
                    a = new Date(e).getTime() + 36e5 - t;
                    if (a >= 0) {
                        this.m = Math.floor(a / 1e3 / 60 % 60),
                        this.s = Math.floor(a / 1e3 % 60);
                        var s = this.m >= 10 ? this.m: "0" + this.m,
                        i = this.s >= 10 ? this.s: "0" + this.s;
                        $("._1ar3pTm_JYB-u2qWpt6e_z").html(s + ":" + i),
                        setTimeout(this.countTime, 1e3)
                    } else $("._1ar3pTm_JYB-u2qWpt6e_z").html("00:00")
                },
                showTost: function(t) {
                    $("body").append("\n            <div class='ant-message' style='top: 400px;'><span><div class='ant-message-notice'><div class='ant-message-notice-content'>\n            <div class='ant-message-custom-content ant-message-info'><span role='img' aria-label='info-circle' class='anticon anticon-info-circle'>\n            <svg viewBox='64 64 896 896' focusable='false' data-icon='info-circle' width='1em' height='1em' fill='currentColor' aria-hidden='true'>\n            <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z'></path></svg></span><span>\n            " + t + "\n            </span></div></div></div></span>\n            </div>"),
                    setTimeout('$(".ant-message").detach()', 2e3)
                }
            },
            beforeDestroy: function() {
                this.countTime && clearInterval(this.countTime),
                this.countTime = null
            }
        },
        Yt = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return t.payInfo.deposit_no ? a("div", {
                    attrs: {
                        id: "app-container"
                    }
                },
                [a("div", {
                    staticClass: "n1sHi1_gDox2Q8ezpdZH5"
                },
                [a("div", {
                    staticClass: "_3nvVZbeP_KKFGRKZ3SxfW4"
                },
                [a("div", {
                    staticClass: "_2uM338LxSZnEUB6bCz4axi"
                },
                [t._m(0), t._v(" "), a("div", {
                    staticClass: "_3ATbZ84037ZhIQDiT-2nyD"
                }), t._v(" "), a("div", {
                    staticClass: "_3CQ4hAT8Rn9-ZCUrRPjV7M"
                },
                [a("div", {
                    staticClass: "_9SJLkU9QpzPYzWOZY3Rqk"
                },
                [a("span", [t._v("订单编号：")]), a("span", [t._v(t._s(t.payInfo.deposit_no))])]), t._v(" "), "usdtpay" == t.type ? a("div", {
                    staticClass: "_9SJLkU9QpzPYzWOZY3Rqk"
                },
                [a("span", [t._v("当前汇率：")]), a("span", {
                    staticClass: "_3ZmEMAaXkrKqQ113p9F_uq"
                },
                [t._v("1 " + t._s(t.payInfo.cardlist.content) + " = " + t._s(t.payInfo.info.usdtrate) + " CNY")])]) : t._e(), t._v(" "), "usdtpay" == t.type ? a("div", {
                    staticClass: "_9SJLkU9QpzPYzWOZY3Rqk"
                },
                [a("span", [t._v("充值数量：")]), a("span", {
                    staticClass: "_3ZmEMAaXkrKqQ113p9F_uq"
                },
                [t._v(t._s(t.payInfo.info.real_money) + " " + t._s(t.payInfo.cardlist.content))])]) : t._e(), t._v(" "), a("div", {
                    staticClass: "_9SJLkU9QpzPYzWOZY3Rqk"
                },
                [a("span", [t._v("充值金额：")]), a("span", {
                    staticClass: "_3ZmEMAaXkrKqQ113p9F_uq"
                },
                [t._v(t._s(t.payInfo.info.amount) + " CNY")])])])]), t._v(" "), a("div", {
                    staticClass: "_2xx45NdpwT5KPaYgeMsdYE"
                },
                [a("div", {
                    staticClass: "_2q5dKVSXvbkX8syq1-Hl2W"
                },
                [a("div", {
                    staticClass: "_3VdBrxwboIJ2v_ON4OCRjS"
                },
                [t._v(t._s(t.payInfo.info.paytype))]), t._v(" "), a("div", {
                    staticClass: "_3785zJoWCXtLIHtAS_cA1C"
                },
                [a("span", [t._v(t._s(t.payInfo.info.real_money) + " " + t._s("usdtpay" == t.type ? t.payInfo.cardlist.content: ""))])]), t._v(" "), a("div", {
                    staticClass: "_1QI9TzXm1Ybnj9BJm4UQ7V"
                },
                [t._v("请注意：您的实际到账金额要与此金额完全一致，否则无法及时到账")]), t._v(" "), a("div", {
                    staticClass: "_21R49Y-pIno9CckiAjl0Id"
                },
                [a("div", {
                    staticClass: "_1f6333Dfetv7YoltY9pL-t"
                },
                [t._v(t._s(t.payInfo.cardlist.content))]), t._v(" "), a("div", {
                    staticClass: "_2_w4FbHMpnRRSdxBYtSL0e"
                },
                [a("img", {
                    staticStyle: {
                        height: "210px",
                        width: "210px"
                    },
                    attrs: {
                        src: t.payInfo.cardlist.payimg,
                        alt: ""
                    }
                })])]), t._v(" "), "usdtpay" == t.type ? a("div", {
                    staticClass: "_3sbSiVFgNQ2SK94qDJaI90"
                },
                [a("span", {
                    staticClass: "_2Vrrgjd_XLAifnNQgYu0NQ"
                },
                [t._v(t._s(t.payInfo.cardlist.mch_id))]), t._v(" "), a("div", {
                    staticClass: "f9bxdbnqcRudnKSP3y-bt",
                    staticStyle: {
                        cursor: "pointer"
                    },
                    on: {
                        click: function(e) {
                            return t.doCopy(t.payInfo.cardlist.mch_id)
                        }
                    }
                },
                [t._v("复制")])]) : t._e()]), t._v(" "), a("div", {
                    staticClass: "_2eg9lTattt1yp1qvWhgifb"
                },
                [a("div", {
                    staticClass: "_2-xkzXq0hmbuW9CZeDhVx_"
                },
                [t._v("温馨提示")]), t._v(" "), "usdtpay" != t.type ? a("div", {
                    staticClass: "HU1qShwkRp6KtCq22dC6O"
                },
                [t._v("\n            1. 请勿向上述地址充值任何非"), a("span", {
                    staticClass: "M8ZjTEuW7Q3mUpU0PbEeW"
                },
                [t._v(t._s(t.payInfo.cardlist.content))]), t._v("资产，否则资产将会丢失；"), a("br"), t._v("2. 请务必确认电脑及浏览器安全，防止信息被篡改或泄密。\n            "), a("br")]) : t._e(), t._v(" "), "usdtpay" == t.type ? a("div", {
                    staticClass: "HU1qShwkRp6KtCq22dC6O"
                },
                [t._v("\n            1. 请勿向上述地址充值任何非"), a("span", {
                    staticClass: "M8ZjTEuW7Q3mUpU0PbEeW"
                },
                [t._v(t._s(t.payInfo.cardlist.content))]), t._v("资产，否则资产将会丢失；"), a("br"), t._v("2. 向上述地址充值后，需要网络节点区块确认，链上网络确认后到账； "), a("br"), t._v("3. 请务必确认电脑及浏览器安全，防止信息被篡改或泄密。\n            "), a("br"), t._v("4. " + t._s("usdtpay" == t.type ? t.payInfo.cardlist.content: "TRC20") + "协议：请使用"), a("span", {
                    staticStyle: {
                        color: "red"
                    }
                },
                [t._v(" \n              \n              " + t._s("usdtpay" == t.type ? "TRC20" == t.payInfo.info.bank ? "波场链": "以太坊链": "波场链") + "（" + t._s("usdtpay" == t.type ? t.payInfo.info.bank: "TRC20") + "协议）\n              ")]), t._v("进行交易 ，其他智能链充值造成的不到账，金额损失自己承担。\n          ")]) : t._e()]), t._v(" "), a("div", {
                    staticStyle: {
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                        height: "30px",
                        "margin-top": "25px"
                    }
                },
                [a("el-button", {
                    attrs: {
                        type: "success"
                    },
                    on: {
                        click: function(e) {
                            return t.$router.push({
                                path: "/transRecord"
                            })
                        }
                    }
                },
                [t._v("已完成付款")])], 1)])])])]) : t._e()
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", [e("div", {
                    staticClass: "_2HCazjAzieT4L96opZihj9"
                },
                [this._v("剩余支付时间：")]), this._v(" "), e("div", {
                    staticClass: "_1ar3pTm_JYB-u2qWpt6e_z"
                })])
            }]
        };
        var te = a("VU/8")(Xt, Yt, !1,
        function(t) {
            a("fjoo")
        },
        "data-v-b118294e", null).exports,
        ee = {
            name: "userredpacket",
            data: function() {
                return {
                    show: !1,
                    redpacketList: [],
                    page: 1,
                    redpacketShowData: {},
                    userredpacket: {
                        rules: []
                    },
                    weikaishi: !1,
                    end: !1,
                    mey: 0,
                    zhongjiang: !1,
                    henbaoqian: !1,
                    message: ""
                }
            },
            created: function() {
                this.getuserredpacket()
            },
            methods: {
                closeAll: function() {
                    this.show = !1,
                    this.show = !1,
                    this.weikaishi = !1,
                    this.end = !1,
                    this.zhongjiang = !1,
                    this.henbaoqian = !1,
                    this.message = ""
                },
                changShow: function() {
                    if (this.userredpacket.sendnums <= 0) return this.henbaoqian = !0,
                    void(this.message = "您暂未达到领取条件，快去完成吧！");
                    this.getwelfare()
                },
                getwelfare: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/douserredpacket", {}).then(function(e) {
                        console.log(e),
                        200 == e.code ? (t.mey = e.data.redpacketmoney, t.getuserredpacket(), t.zhongjiang = !0) : (t.henbaoqian = !0, t.message = e.message),
                        t.$parent.hideLoading()
                    }).
                    catch(function() {
                        t.$parent.showTost(0, "服务器异常，请稍后再试"),
                        t.$parent.hideLoading()
                    })
                },
                getuserredpacket: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.get("/api/userredpacket", {}).then(function(e) {
                        console.log(e),
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t.userredpacket = e.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        ae = {
            render: function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticStyle: {
                        background: "url(/static/image/bg123456.jpg) top center no-repeat !important"
                    }
                },
                [a("input", {
                    attrs: {
                        type: "hidden",
                        id: "startDate",
                        value: "2022-06-18"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "endDate",
                        value: "2022-06-18"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "startTime",
                        value: "14:00:00"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "endTime",
                        value: "15:59:59"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "currentDateTime",
                        value: "2022-06-18 16:13:44"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "redPacketStatus",
                        value: "END"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "activityTimeId",
                        value: ""
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "memberType",
                        value: "0"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "amount1",
                        value: "0"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "amount2",
                        value: "00"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "isLocal",
                        value: "0"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "isWindow",
                        value: "0"
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "windowHeight",
                        value: ""
                    }
                }), t._v(" "), a("input", {
                    attrs: {
                        type: "hidden",
                        id: "windowWidth",
                        value: ""
                    }
                }), t._v(" "), a("div", {
                    staticClass: "redEnveBody"
                },
                [a("div", {
                    staticClass: "redEnveBodyToo"
                },
                [a("div", {
                    staticClass: "redEnveBodyMain center"
                },
                [t._m(0), t._v(" "), t._m(1), t._v(" "), a("div", {
                    staticClass: "toddyTotal"
                }), t._v(" "), t._e(), t._v(" "), a("div", {
                    staticClass: "receiveTimes",
                    staticStyle: {
                        "margin-top": "30px"
                    }
                },
                [a("p", {
                    staticStyle: {
                        "text-align": "center"
                    }
                },
                [t._v("\n            剩余领取次数 "), a("span", {
                    staticClass: "yellow",
                    staticStyle: {
                        "font-size": "32px"
                    },
                    attrs: {
                        id: "remainNum"
                    }
                },
                [t._v(t._s(t.userredpacket.sendnums < 0 ? 0 : t.userredpacket.sendnums))]), t._v(" 次，已领取 "), a("span", {
                    staticClass: "yellow",
                    staticStyle: {
                        "font-size": "32px"
                    },
                    attrs: {
                        id: "currentNum"
                    }
                },
                [t._v(t._s(t.userredpacket.acquirednum))]), t._v(" 次\n          ")])]), t._v(" "), a("div", {
                    staticClass: "currReceiveTimes"
                },
                [a("p", {
                    staticStyle: {
                        "text-align": "center"
                    }
                },
                [t._v("\n            当前最多可领取 "), a("span", {
                    staticClass: "yellow3",
                    staticStyle: {
                        "font-size": "29px"
                    }
                },
                [t._v(t._s(t.userredpacket.max_times))]), t._v(" 次， "), a("span", {
                    attrs: {
                        id: "maxMsg"
                    }
                },
                [t._v(" 快去满足条件吧！ ")])])]), t._v(" "), a("div", {
                    staticClass: "redEnveButtons",
                    on: {
                        click: t.changShow
                    }
                }), t._v(" "), a("div", {
                    staticClass: "activityInfo",
                    staticStyle: {
                        "margin-top": "230px"
                    }
                },
                [a("div", {
                    staticClass: "activityTop wow zoomIn",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "zoomIn"
                    }
                }), t._v(" "), t.userredpacket.rules.length > 0 ? a("table", {
                    attrs: {
                        id: "activityTable"
                    }
                },
                [a("tbody", [t._m(4), t._v(" "), t._l(t.userredpacket.rules,
                function(e, s) {
                    return a("tr", {
                        key: s
                    },
                    [a("td", [t._v(t._s(e.start_time) + " ~ " + t._s(e.end_time))]), t._v(" "), a("td", [t._v(t._s(e.day_flow) + "-" + t._s(e.flow_money))]), t._v(" "), a("td", [t._v(t._s(Math.floor(e.recharge)))])])
                })], 2)]) : t._e(), t._v(" "), t._m(5)]), t._v(" "), a("div", {
                    staticClass: "h400"
                }), t._v(" "), a("div", {
                    staticClass: "activityDes"
                },
                [a("div", {
                    staticClass: "activityDesTop wow zoomIn",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "zoomIn"
                    }
                }), t._v(" "), a("div", {
                    staticClass: "activityDesMain"
                },
                [a("p", {
                    staticStyle: {
                        "text-align": "center"
                    }
                },
                [a("strong", [t._v(t._s(t.$store.state.appInfo.title))])]), t._v(" "), t._m(6), t._v(" "), a("p", [t._v("1、会员必须在指定的活动日期（美东时间）范围内，根据充值累计金额，即可获得对应抢红包次数。若在规定的时间范围内没有达到存款金额范围，则不计算抢红包次数，逾期作废！")]), t._v(" "), a("p", [t._v("2、所有的活动优惠特为玩家而设，如发现任何团体或个人，以不诚实的方式套取红利或任何威胁、滥用公司优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利。")]), t._v(" "), a("p", [t._v("3、" + t._s(t.$store.state.appInfo.title) + "保留所有解释权，在任何时候都可以更改、停止、取消优惠活动。")]), t._v(" "), t._m(7)])])])]), t._v(" "), t._m(8), t._v(" "), t._m(9)]), t._v(" "), a("div", {
                    staticClass: "rightFloat",
                    staticStyle: {
                        position: "fixed",
                        "z-index": "1000",
                        top: "365px",
                        right: "0.25px",
                        width: "183px"
                    },
                    attrs: {
                        id: "box1",
                        picfloat: "right"
                    }
                },
                [a("a", {
                    staticClass: "myRedEnves",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/welfare")
                        }
                    }
                }), t._v(" "), a("a", {
                    staticClass: "myService",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                })]), t._v(" "), t.weikaishi ? a("div", {
                    staticClass: "weikaishi divIndex"
                },
                [a("p", [t._v("活动还没开始，请静待活动开始。")]), t._v(" "), a("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e(), t._v(" "), t.end ? a("div", {
                    staticClass: "qiangwan divIndex"
                },
                [a("p", [t._v("请静待下次活动。")]), t._v(" "), a("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e(), t._v(" "), t.zhongjiang ? a("div", {
                    staticClass: "zhongjiang divIndex"
                },
                [a("p", [t._v("恭喜您")]), t._v(" "), a("p", [t._v("\n      抢到"), a("span", {
                    staticClass: "yellow bigFont",
                    attrs: {
                        id: "redPacketAmount"
                    }
                },
                [t._v(t._s(t.mey))]), t._v("元\n    ")]), t._v(" "), a("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e(), t._v(" "), t.henbaoqian ? a("div", {
                    staticClass: "henbaoqian divIndex"
                },
                [a("p", {
                    attrs: {
                        id: "henbaoqian"
                    }
                },
                [t._v(t._s(t.message))]), t._v(" "), a("div", {
                    staticClass: "rules",
                    attrs: {
                        id: "viewRules"
                    },
                    on: {
                        click: function(e) {
                            return t.$parent.goNav("/recharge")
                        }
                    }
                },
                [t._v("立即充值")]), t._v(" "), a("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "redEnveBodyTop"
                },
                [e("div", {
                    staticClass: "pen"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/pen.png"
                    }
                })]), this._v(" "), e("div", {
                    staticClass: "hongbao"
                }), this._v(" "), e("div", {
                    staticClass: "jinbi"
                }), this._v(" "), e("div", {
                    staticClass: "jinbi2"
                }), this._v(" "), e("div", {
                    staticClass: "jinbi3"
                }), this._v(" "), e("div", {
                    staticClass: "caidai"
                }), this._v(" "), e("div", {
                    staticClass: "lcaidai"
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "redEnveFont"
                },
                [e("img", {
                    attrs: {
                        alt: "",
                        src: "/static/image/qianghb.png"
                    }
                })])
            },
            function() {
                var t = this,
                e = t.$createElement,
                a = t._self._c || e;
                return a("div", {
                    staticClass: "time"
                },
                [a("span", {
                    attrs: {
                        id: "dd"
                    }
                },
                [t._v("00")]), t._v(": "), a("span", {
                    attrs: {
                        id: "hh"
                    }
                },
                [t._v("00")]), t._v(" "), a("div", {
                    staticClass: "redEnveClock redEnveClock2"
                },
                [a("div", {
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        id: "ready"
                    }
                },
                [a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.35s",
                        "animation-delay": "0.35s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.35s",
                        "data-wow-delay": "0.35s"
                    }
                },
                [t._v("始")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("开")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("包")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("红")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("离")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("距")])]), t._v(" "), a("div", {
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        id: "starting"
                    }
                },
                [a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.35s",
                        "animation-delay": "0.35s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.35s",
                        "data-wow-delay": "0.35s"
                    }
                },
                [t._v("束")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("结")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("包")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("红")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("离")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("距")])]), t._v(" "), a("div", {
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        id: "red-packet-finish"
                    }
                },
                [a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("完")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("抢")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("已")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("包")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("红")])]), t._v(" "), a("div", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        id: "finish"
                    }
                },
                [a("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("束")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("结")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("已")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("包")]), t._v(" "), a("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("红")])])]), t._v(" "), a("span", {
                    attrs: {
                        id: "mm"
                    }
                },
                [t._v("00")]), t._v(": "), a("span", {
                    attrs: {
                        id: "ss"
                    }
                },
                [t._v("00")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "time2"
                },
                [e("span", [this._v("天")]), this._v(" "), e("span", [this._v("时")]), this._v(" "), e("span", [this._v("分")]), this._v(" "), e("span", [this._v("秒")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("tr", [e("td", {
                    staticStyle: {
                        "border-radius": "17px 0px 0px"
                    }
                },
                [this._v("活动时间")]), this._v(" "), e("td", [this._v("累计充值金额")]), this._v(" "), e("td", {
                    staticStyle: {
                        "border-radius": "0px 17px 0px 0px"
                    }
                },
                [this._v("红包次数")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "activityBot wow flipInX",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "flipInX",
                        "line-height": "2"
                    }
                },
                [e("h3", {
                    staticClass: "yellow"
                },
                [this._v("领取规则：")]), this._v(" "), e("p", [this._v("1.抢到红包后，系统自动派彩，"), e("span", {
                    staticClass: "yellow"
                },
                [this._v("秒到账")]), this._v("，达到流水倍数即可取款；")]), this._v(" "), e("p", [this._v("2.领取红包条件：充值金额需要在规定的活动日期（美东时间）范围内，根据充值累计金额，获取抢红包次数，即可抢对应次数的红包；")])])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("strong", [this._v("注意："), e("strong", {
                    staticStyle: {
                        "white-space": "normal"
                    }
                },
                [this._v("抢红包")]), this._v("北京时间为每天早上 10点到12点，存款计算为前一天12点到今天10点，谢谢~")]), e("br"), this._v("每日百万现金红包！存款越多，机会越多，红包享不停，惊喜抢不停，还等什么？快快叫上好友一起分享吧！！"), e("br")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("p", [e("br")])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "botLeft wow bounceInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "bounceInLeft"
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/botLeft.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                e = this._self._c || t;
                return e("div", {
                    staticClass: "botright"
                },
                [e("img", {
                    staticClass: "wow bounceInRight",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "bounceInRight"
                    },
                    attrs: {
                        src: "/static/image/botRight.png"
                    }
                })])
            }]
        };
        var se = a("VU/8")(ee, ae, !1,
        function(t) {
            a("dAV2")
        },
        "data-v-726f5f58", null).exports;
        s.
    default.use(_.a);
        var ie = new _.a({
            mode: "hash",
            routes: [{
                path: "/",
                name: "Main",
                component: v,
                children: [{
                    path: "/",
                    name: "index",
                    component: h,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/abouts",
                    name: "abouts",
                    component: y,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/realbet",
                    name: "realbet",
                    component: C,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/sport",
                    name: "sport",
                    component: I,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/gaming",
                    name: "gaming",
                    component: z,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/joker",
                    name: "joker",
                    component: P,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/concise",
                    name: "concise",
                    component: Q,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/lottery",
                    name: "lottery",
                    component: A,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/activity",
                    name: "activity",
                    component: R,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/activityInfo",
                    name: "activityInfo",
                    component: H
                },
                {
                    path: "/app",
                    name: "app",
                    component: K
                },
                {
                    path: "/vip",
                    name: "vip",
                    component: Z
                },
                , {
                    path: "/mine",
                    name: "mine",
                    component: et,
                    meta: {
                        requireAuth: !0
                    },
                    children: [{
                        path: "/message",
                        name: "message",
                        component: it
                    },
                    {
                        path: "/center",
                        name: "center",
                        component: ct
                    },
                    {
                        path: "/applyagent",
                        name: "applyagent",
                        component: lt
                    },
                    {
                        path: "/activityRecord",
                        name: "activityRecord",
                        component: mt
                    },
                    {
                        path: "/fanshui",
                        name: "fanshui",
                        component: gt
                    },
                    {
                        path: "/betRecord",
                        name: "betRecord",
                        component: bt
                    },
                    {
                        path: "/transRecord",
                        name: "transRecord",
                        component: xt
                    },
                    {
                        path: "/transfer",
                        name: "transfer",
                        component: St
                    },
                    {
                        path: "/recharge",
                        name: "recharge",
                        component: zt,
                        meta: {
                            keepAlive: !0,
                            useCatch: !1
                        }
                    },
                    {
                        path: "/withdraw",
                        name: "withdraw",
                        component: Pt
                    },
                    {
                        path: "/bankCard",
                        name: "bankCard",
                        component: Qt
                    },
                    {
                        path: "/welfare",
                        name: "welfare",
                        component: At
                    }]
                }]
            },
            {
                path: "/gamePage",
                name: "gamePage",
                component: Jt
            },
            {
                path: "/login",
                name: "login",
                component: Rt
            },
            {
                path: "/register",
                name: "register",
                component: Ht
            },
            {
                path: "/payInfo",
                name: "payInfo",
                component: te
            },
            {
                path: "/userredpacket",
                name: "userredpacket",
                component: se
            },
            {
                path: "/asdwl",
                name: "asdwl",
                component: Ot
            },
            {
                path: "*",
                redirect: "/"
            }]
        }),
        ne = a("//Fk"),
        oe = a.n(ne),
        ce = a("mtWM"),
        re = a.n(ce),
        _e = "http://127.0.13.6";
        sessionStorage.setItem("baseURL", _e);
        var le = {
            baseURL: _e,
            timeout: 6e4
        },
        de = re.a.create(le);
        de.interceptors.request.use(function(t) {
            var e = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "";
            return t.headers.Authorization = "Bearer " + e,
            t
        },
        function(t) {
            return oe.a.reject(t)
        }),
        de.interceptors.response.use(function(t) {
            return t.data.code,
            t
        },
        function(t) {
            return oe.a.reject(t)
        });
        var pe = {
            get: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new oe.a(function(a, s) {
                    de({
                        url: t,
                        params: e,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        method: "GET"
                    }).then(function(t) {
                        return a(t.data),
                        t
                    }).
                    catch(function(t) {
                        s(t)
                    })
                })
            },
            post: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return "/api/register" != t && "/api/login_pc" != t || sessionStorage.setItem("baseURL", _e),
                new oe.a(function(a, s) {
                    de({
                        url: t,
                        data: e,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        method: "POST"
                    }).then(function(t) {
                        return a(t.data),
                        t
                    }).
                    catch(function(t) {
                        s(t)
                    })
                })
            }
        },
        me = {
            get: function(t, e) {
                return pe.get(t, e)
            },
            post: function(t, e) {
                return pe.post(t, e)
            },
            login: function(t) {
                var e = sessionStorage.getItem("baseURL") || "";
                return e || sessionStorage.setItem("baseURL", e),
                pe.post("/api/login_pc", t)
            },
            register: function(t) {
                var e = sessionStorage.getItem("baseURL") || "";
                return e || sessionStorage.setItem("baseURL", e),
                pe.post("/api/register", t)
            }
        },
        ue = me,
        ve = a("NYxO");
        s.
    default.use(ve.a);
        var ge = JSON.parse(localStorage.getItem("userInfo")) || {},
        fe = sessionStorage.getItem("token") || "",
        he = JSON.parse(localStorage.getItem("appInfo")) || {},
        be = fe && localStorage.getItem("messageNum") || 0,
        ye = new ve.a.Store({
            state: {
                userInfo: ge,
                token: fe,
                messageNum: be,
                appInfo: he,
                bannerList: [],
                realbetList: [],
                jokerList: [],
                gamingList: [],
                sportList: [],
                lotteryList: [],
                conciseList: []
            },
            getters: {},
            mutations: {
                changGameList: function(t) {
                    var e = localStorage.getItem("bannerList") ? JSON.parse(localStorage.getItem("bannerList")) : [];
                    t.bannerList = e;
                    var a = localStorage.getItem("realbetList") ? JSON.parse(localStorage.getItem("realbetList")) : [];
                    t.realbetList = a;
                    var s = localStorage.getItem("jokerList") ? JSON.parse(localStorage.getItem("jokerList")) : [];
                    t.jokerList = s;
                    var i = localStorage.getItem("gamingList") ? JSON.parse(localStorage.getItem("gamingList")) : [];
                    t.gamingList = i;
                    var n = localStorage.getItem("sportList") ? JSON.parse(localStorage.getItem("sportList")) : [];
                    t.sportList = n;
                    var o = localStorage.getItem("lotteryList") ? JSON.parse(localStorage.getItem("lotteryList")) : [];
                    t.lotteryList = o;
                    var c = localStorage.getItem("conciseList") ? JSON.parse(localStorage.getItem("conciseList")) : [];
                    t.conciseList = c
                },
                changUserInfo: function(t) {
                    var e = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
                    t.userInfo = e
                },
                changToken: function(t) {
                    t.token = sessionStorage.getItem("token") || ""
                },
                changMessageNum: function(t) {
                    var e = localStorage.getItem("show");
                    t.messageNum = e ? 0 : localStorage.getItem("messageNum")
                },
                changappInfo: function(t) {
                    var e = JSON.parse(localStorage.getItem("appInfo"));
                    t.appInfo = e
                }
            },
            actions: {},
            modules: {}
        }),
        we = a("zL8q"),
        xe = a.n(we),
        Ce = (a("tvR6"), a("ppUw")),
        ke = a.n(Ce);
        s.
    default.use(xe.a),
        s.
    default.use(ke.a),
        s.
    default.prototype.$apiFun = ue,
        s.
    default.config.productionTip = !1,
        ie.afterEach(function(t, e, a) {
            window.scrollTo(0, 0),
            document.querySelector(".index-page") && document.querySelector(".index-page").scrollTo(0, 0)
        }),
        ie.beforeEach(function(t, e, a) {
            sessionStorage.getItem("token") && sessionStorage.getItem("token");
            t.matched.some(function(t) {
                return t.meta.requireAuth
            }) ? sessionStorage.getItem("token") ? a() : a({
                path: "/login",
                query: {
                    redirect: t.fullPath
                }
            }) : a()
        }),
        new s.
    default({
            el:
            "#app",
            store: ye,
            router: ie,
            components: {
                App: r
            },
            template: "<App/>"
        })
    },
    QNeT: function(t, e) {},
    bwTS: function(t, e) {},
    cumU: function(t, e) {},
    dAV2: function(t, e) {},
    dOJm: function(t, e) {},
    eVZB: function(t, e) {},
    fjoo: function(t, e) {},
    "fyu+": function(t, e) {},
    ip6p: function(t, e) {},
    k5zD: function(t, e) {},
    kEOr: function(t, e) {},
    mOG6: function(t, e) {},
    pE6g: function(t, e) {},
    pGD6: function(t, e) {},
    qGo2: function(t, e) {},
    qlWE: function(t, e) {},
    rMhH: function(t, e) {},
    tmiB: function(t, e) {},
    tvR6: function(t, e) {},
    "u+Mf": function(t, e) {},
    u2Bv: function(t, e) {},
    uc4V: function(t, e) {},
    viLX: function(t, e) {},
    vtem: function(t, e) {},
    we7j: function(t, e) {},
    xX1K: function(t, e) {}
},
["NHnr"]);
//# sourceMappingURL=app.6e723b1c3f58b5b52cb8.js.map
