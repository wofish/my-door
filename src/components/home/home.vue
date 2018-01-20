<template>
    <div class="home">
        <head-top></head-top>
        <div class="side-left">
            <side-bar></side-bar>
        </div>
        <div class="content">
            <keep-alive include="reviewManage">
                <router-view></router-view>
            </keep-alive>
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
        components: {
            HeadTop,
            SideBar
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '../../common/stylus/mixins.styl';
    .home
        height 100%
        .side-left
            position fixed
            width 240px
            left 0
            top 60px
            bottom 0
            background-color #f6f6f6
            overflow-y auto
            padding-top 1%
        .content
            position relative
            padding-top  60px
            margin-left 240px
            background-color #f1f2f7
            height 100%
</style>

