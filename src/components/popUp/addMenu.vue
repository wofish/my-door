<template>
    <div class="addJobRecord">
        <div class="ivu-modal-mask">
            <div class="ivu-modal-wrap">
                <div class="ivu-modal-header">
                    <div class="ivu-modal-header-inner">添加菜单</div>
                </div>
                <div class="ivu-modal-body">
                    <div>
                        <span>名称：</span>
                        <Input v-model="newAddMenu.name"  placeholder="请输入手机号码" style="width: 200px"></Input>
                    </div>
                    <div class="input-item">
                        <span>url：</span>
                        <Input v-model="newAddMenu.url"  placeholder="请输入姓名" style="width: 210px"></Input>
                    </div>

                </div>
                <div class="ivu-modal-footer">
                    <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="ok">
                        <span>保存</span>
                    </button>
                    <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="cancel">
                        <span>取消</span>
                    </button>

                </div>

            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import HeadTop from '../headtop/headtop';
    import SideBar from '../sidebar/sidebar';
    export default {
        data() {
            return {
                newAddMenu: {
                    url: null,
                    name: null
                }
            };
        },
        props: [
            'addJobRecord', 'addType'
        ],
        components: {
            HeadTop,
            SideBar
        },
        methods: {
            clear: function() {
                this.newAddMenu.url = null;
                this.newAddMenu.name = null;
            },
            cancel: function() {
                this.$emit('closeAddMenu');
            },
            ok: function() {
                this.$emit('saveAddMenu', this.newAddMenu);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import   '../../common/stylus/base.styl';
    .ivu-modal-wrap
        width 400px
        height 280px
        left 50%
        top 50%
        margin-left -200px
        margin-top -140px
        background-color #fff
        position  absolute
        -webkit-overflow-scrolling  touch
        outline 0
        border-radius 10px
    .addJobRecord
        .ivu-modal-wrap
            height 360px
            margin-top -180px
</style>
