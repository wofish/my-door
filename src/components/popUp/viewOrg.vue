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
                    <div class="input-item">
                        <span>类型：</span>
                        <Select v-model="viewOrgData.type" style="width:240px" :transfer="true">
                            <Option v-for="item in types" :value="item.type" :key="item.type">{{item.name}}
                            </Option>
                        </Select>
                    </div>
                    <div class="input-item">
                        <span>备注：</span>
                        <Input v-model="viewOrgData.remark"  placeholder="请输入备注" style="width: 210px"></Input>
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

            };
        },
        props: [
            'viewOrgData', 'types'
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
