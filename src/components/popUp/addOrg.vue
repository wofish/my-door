<template>
    <div class="addOrgRecord">
        <div class="ivu-modal-mask">
            <div class="ivu-modal-wrap">
                <div class="ivu-modal-header">
                    <div class="ivu-modal-header-inner">添加角色</div>
                </div>
                <div class="ivu-modal-body">
                    <div>
                        <span>名称：</span>
                        <Input tabindex="0" v-model="newAddOrg.name"  placeholder="请输入名称" style="width: 200px"></Input>
                    </div>
                    <div class="input-item">
                        <span>类型：</span>
                        <Select tabindex="1" v-model="newAddOrg.type" style="width:240px" :transfer="true">
                            <Option v-for="item in types" :value="item.type" :key="item.type">{{item.name}}
                            </Option>
                        </Select>
                    </div>
                    <div class="input-item">
                        <span>备注：</span>
                        <Input tabindex="2" v-model="newAddOrg.remark"  placeholder="请输入备注" style="width: 210px"></Input>
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
                newAddOrg: {
                    name: null,
                    type: null,
                    remark: null
                }
            };
        },
        props: [
            'addOrgRecord', 'types'
        ],
        components: {
            HeadTop,
            SideBar
        },
        methods: {
            clear: function() {
                this.newAddOrg.url = null;
                this.newAddOrg.name = null;
            },
            cancel: function() {
                this.$emit('closeAddOrg');
            },
            ok: function() {
                this.$emit('saveAddOrg', this.newAddOrg);
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
    .addOrgRecord
        .ivu-modal-wrap
            height 360px
            margin-top -180px
</style>
