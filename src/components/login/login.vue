<template>
    <div class="login">
        <div class="login-img">
            <!--<img src="../../common/images/bg.png" alt="">-->
        </div>
        <div class="login-box">
            <div class="login-wrapper">
                <div class="login-cont">
                    <div class="login-item">
                        <div class="login-input">
                            <label class="login-label">
                                <i class="icon-admin"></i>
                                <input type="text" placeholder="请输入用户名" v-model="phoneNo">
                            </label>
                        </div>
                        <div class="login-input">
                            <label class="login-label">
                                <i class="icon-key"></i>
                                <input type="password" placeholder="请输入密码" @keyup.enter="login" v-model="password">
                            </label>
                        </div>
                        <div class="login-input"  >
                            <span class="login-btn" @click="login" :class="{'active':verifyResult}">登录</span>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getData } from '../../server/getData';
    import { setStore } from '../../common/js/util';
    export default {
        data() {
            return {
                phoneNo: null,
                password: null
            };
        },
        created: function () {
            let aaa = this.$route.query.aaa;
            getData({method: 'post', url: '/card/image/upload', data: {a: aaa}}).then(res => {
                if (res.flags === 'success') {
                    localStorage.setItem('token', res.data.token);
//                            this.getCallToken();
                    setStore('userName', res.data.nickname);
                    if (res.data.indexPath) {
                        this.$router.push({path: '/home/' + res.data.indexPath});
                    }
                } else {
//                            alert(res.data);
                    this.$Message.info(res.data);
                    this.password = null;
                }
            }).catch(error => {
                console.log(error.respMsg);
            });
            console.log(aaa);
        },
        computed: {
            verifyResult() {
                if (this.phoneNo && this.password) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            login() {
                if (this.verifyResult) {
                    let data = {
                        phoneNo: this.phoneNo,
                        password: this.password
                    };
                    getData({method: 'post', url: '/passport/signIn', data: data}).then(res => {
                        if (res.flags === 'success') {
//                            localStorage.setItem('token', res.data.token);
//                            this.getCallToken();
//                            setStore('userName', res.data.nickname);
//                            if (res.data.indexPath) {
//                                  this.$router.push({path: '/home/' + res.data.indexPath});
//                            }
                        } else {
//                            alert(res.data);
                            this.$Message.info(res.data);
                            this.password = null;
                        }
                    }).catch(error => {
                        console.log(error.respMsg);
                    });
                }
            },
            getCallToken() {
                getData({method: 'post', url: '/collection/udeskController/getToken'}).then(res => {
                    if (res.flags === 'success') {
                        localStorage.setItem('callToken', res.data);
                    } else {
                        alert(res.data);
                    }
                }).catch(error => {
                    console.log(error.respMsg);
                });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus"　scoped>
    .login
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background-color white
        .login-img
           height 400px
           background url("../../common/images/login-bg.png")
           background-repeat no-repeat
           background-position-x 50%
        .login-box
            border-radius 10px
            position absolute
            margin auto
            width 467px
            height auto
            left 50%
            top 50%
            margin-left -233px
            .login-wrapper
              .login-tit
                    height 93px
                    line-height 93px
                    border-radius 5px 5px 0 0
                    background-color #099e68
              .login-cont
                    border-radius 0 0 5px 5px
                    background-color #fff
                    .login-item
                          padding 70px 84px 0 70px
                          .login-input
                                margin-bottom 30px
                                border 1px solid silver
                                padding 0 6px
                                &:last-child
                                    border-bottom none
                                    padding 0
    .login-input
        input
           height 30px
           line-height 30px
           vertical-align middle
           padding-left 10px
           border none
    .login-input
         .login-btn
                display block
                width 100%
                height 50px
                line-height 50px
                text-align center
                background-color #ccc
                font-size 24px
                color  #fff
                cursor pointer
                &.active
                    background-color #215aa9
    .icon-admin,.icon-key
        vertical-align middle
</style>

