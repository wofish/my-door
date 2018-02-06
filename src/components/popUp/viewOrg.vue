<template>
    <div class="viewOrg">
        <div class="ivu-modal-mask">
            <div class="ivu-modal-wrap">
                <div class="ivu-modal-header">
                    <div class="ivu-modal-header-inner">查看菜单</div>
                </div>
                <div class="ivu-modal-body" v-if="viewOrgData">
                    <div>
                        <span>名称：</span>
                        <Input v-model="viewOrgData.name"  placeholder="请输入菜单名称" style="width: 200px"></Input>
                    </div>
                    <div>
                        <span>父节点：</span>
                        <Input v-model="viewOrgData.parentNo"  placeholder="请输入父节点" style="width: 200px"></Input>
                    </div>
                    <div class="input-item">
                        <span>url：</span>
                        <Input v-model="viewOrgData.url"  placeholder="请输入姓名" style="width: 210px"></Input>
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
                /*viewOrg: {
                    url: null,
                    name: null
                }*/
            };
        },
        props: [
            'viewOrgData'
        ],
        components: {
            HeadTop,
            SideBar
        },
        methods: {
            clear: function() {
//                this.viewOrgData.url = null;
//                this.viewOrgData.name = null;
            },
            cancel: function() {
                this.$emit('closeViewOrg');
            },
            ok: function() {
                this.$emit('saveViewOrg', this.viewOrgData);
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
    .viewOrg
        .ivu-modal-wrap
            height 360px
            margin-top -180px
</style>
