<template>
    <div class="head-top clearfix">
        <div class="brand">
            <img src="../../common/images/yiqianbao.png">
            <span class="title">后台管理系统</span>
        </div>
        <div class="user clearfix">
            <div class="user-name">
                <span class="text">{{userName}}，您好！</span>
            </div>
            <div class="user-logout">
                <a @click="modify">修改密码</a>
                <a @click="exit">退出</a>
            </div>
        </div>
        <div class="popUp" :class="{'hide': modifyModal}" id="modify">
            <div class="ivu-modal-mask">
                <div class="ivu-modal-wrap">
                    <a class="ivu-modal-close" @click="close"><i class="ivu-icon">关闭</i></a>
                    <div class="ivu-modal-header">
                        <div class="ivu-modal-header-inner">修改密码</div>
                    </div>
                    <div class="ivu-modal-body">
                        <div class="input-item">
                            <span class="text">初始密码：</span>
                            <Input v-model="inputInfo.password" placeholder="请输入密码" style="width: 200px"></Input>
                        </div>
                        <div class="input-item">
                            <span class="text">设置密码：</span>
                            <Input v-model="inputInfo.newPassword" placeholder="请输入密码" type='password' style="width: 200px"></Input>
                        </div>
                        <div class="input-item">
                            <span class="text">再次输入密码：</span>
                            <Input v-model="inputInfo.confirmPassword" placeholder="请再次输入密码" type='password' style="width: 200px"></Input>
                        </div>
                    </div>
                    <div class="ivu-modal-footer">
                        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="cancelModify">
                            <span>取消</span>
                        </button>
                        <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="saveModify">
                            <span>确定修改</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
   import { getStore, password, trim } from '../../common/js/util';
   import { getData } from '../../server/getData';
//   import bus from '../../assets/eventBus';
    export default {
        data() {
            return {
                userName: null,
                modifyModal: true,
                inputInfo: {
                    password: null,
                    newPassword: null,
                    confirmPassword: null
                }
            };
        },
        methods: {
            open() {
                bus.$emit('open');
            },
            exit() {
                getData({method: 'get', url: '/login'}).then(res => {
                    if (res.flags === 'success') {
                        this.$router.push({path: '/login'});
                        localStorage.removeItem('token');
                        localStorage.removeItem('callToken');
                    } else {
//                        alert(res.data);
                    }
                }).catch(error => {
                    console.log(error.description);
                });
            },
            modify() {
                this.modifyModal = false;
            },
            all() {
                if (this.inputInfo.password) {
                    this.inputInfo.password = trim(this.inputInfo.password);
                } else {
                    this.inputInfo.password = null;
                }
                if (this.inputInfo.newPassword) {
                    this.inputInfo.newPassword = trim(this.inputInfo.newPassword);
                } else {
                    this.inputInfo.setPassword = null;
                }
                if (this.inputInfo.confirmPassword) {
                    this.inputInfo.confirmPassword = trim(this.inputInfo.confirmPassword);
                } else {
                    this.inputInfo.confirmPassword = null;
                }
            },
            saveModify() {
                /*保存修改*/
                if (this.inputInfo.password && this.inputInfo.newPassword && this.inputInfo.confirmPassword) {
//                this.modifyModal = true;
                    this.all();
                    if (this.inputInfo.newPassword === this.inputInfo.password) {
                        this.$Message.info('新密码不得与初始密码一致！');
                        return;
                    }
                    if (!password(this.inputInfo.newPassword) && this.inputInfo.newPassword) {
                        this.$Message.info('密码由6-12位数字或者数字与字母结合组成！');
                        return;
                    }
                    if (this.inputInfo.newPassword !== this.inputInfo.confirmPassword) {
                        this.$Message.info('密码与原密码不一致！');
                        return;
                    }
                    console.log(this.inputInfo);
                    this.modifyPassword(this.inputInfo);
                } else {
                    this.$Message.info('请输入完整！');
                }
            },
            cancelModify() {
                /*取消修改*/
                this.modifyModal = true;
            },
            close() {
                this.modifyModal = true;
            },
            modifyPassword(data) {
                getData({method: 'post', url: '/user/updatePassword', data: data}).then(res => {
                    if (res.flags === 'success') {
                        this.modifyModal = true;
                        this.$Message.info('密码修改成功，请重新登录！');
                        this.inputInfo.password = null;
                        this.inputInfo.newPassword = null;
                        this.inputInfo.confirmPassword = null;
                        this.exit();
                    } else {
                        alert(res.data);
                    }
                }).catch(error => {
                    console.log(error.description);
                });
            }
        },
        created: function () {
            this.userName = getStore('userName');
        },
        mounted() {
            setTimeout(() => {
                this.exit();
            }, 86400000);
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl";
    .head-top
        position fixed
        width 100%
        height 60px;
        line-height 60px
        left 0
        top 0
        z-index 2
        background-color #0088d6
        .brand
            width 30%
            float left
            margin-left 30px
            img
                vertical-align middle
            .title
                font-size 26px
                color #fff
                margin-left 15%
        .user
            float right
            margin-right 40px
        .user-name
            float left
            margin-right 58px
            img
                width 18px
                height 18px
                display inline-block
                vertical-align middle
                border-radius 50%
            .text
                display inline-block
                vertical-align middle
                color #fff
        .user-logout
            float left
            font-size 0
            a
                font-size 14px
                padding 0 10px
                color white
                border-right 1px solid white
                &:last-child
                    border-right none
    .hide
        display none
    #modify
        .ivu-modal-wrap
            height 326px
            margin-top -163px
            .input-item
                display flex
                .text
                     flex 1
    .ivu-icon
        display inline-block
        padding 2px 8px
        border 1px solid #ccc
        border-radius 10px
        color #666
    .ivu-modal-close
        top -14px
</style>

