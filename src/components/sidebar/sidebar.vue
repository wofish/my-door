<template>
    <div id="sidebar ">
        <ul class="sidebar-item clearfix">
            <li v-for="item in tree1s" class="sidebar-name">
                <!--<i :class="item.icon"></i>-->
                <p @click="showToggle(item)"  class="firstText"  >
                    <span >
                        <i :class="item.icon"></i>
                        <strong>{{item.name}}</strong>
                    </span>
                    <i :class="{'icon-down': item.subShow,'icon-right':item.subShow === false}" ></i>
                </p>
                <ul v-show="item.subShow">
                    <li v-for="subItem in item.children"  >
                        <p @click="(subItem.children.length == 0)? showThird(subItem,subItem.url): showToggle(subItem)" class="secText" >
                            <span :class="{on: $route.path.indexOf( subItem.url ) !== -1}" >{{subItem.name}}</span>
                            <i v-show='subItem.children.length > 0 ' :class="{'icon-down': subItem.subShow,'icon-right':!subItem.subShow}" ></i>
                        </p>
                        <ul v-show="subItem.subShow">
                            <li v-for="thirdItem in subItem.children">
                                <p  @click="showForth(thirdItem,thirdItem.url)"  class="thirdText">
                                    <span :class="{on: $route.path.indexOf( thirdItem.url ) !== -1}">{{thirdItem.name}}</span>
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import { getData } from '../../server/getData';
//    import bus from '../../assets/eventBus';
//    import $ from 'jquery';
    export default {
        data() {
            return {
                 tree1s: []
//                 shrink: true
            };
        },
        methods: {
            showToggle: function(item) {
                item.subShow = !item.subShow;
            },
            showThird: function(item, path) {
                let that = this;
                setTimeout(function() {
                    that.$router.push(path);
                }, 200);
            },
            showForth: function(item, path) {
                let that = this;
                setTimeout(function() {
                    that.$router.push(path);
                }, 200);
            }
        },
        created() {
            getData({method: 'get', url: '/user/menus', data: {}}).then(res => {
                this.tree1s = res.data;
            }).catch(error => {
                console.log(error.respMsg);
            });
//            bus.$on('open', function() {
//                this.shrink = !this.shrink;
//            });
        }
//        mounted() {
//            bus.$on('open', function() {
//              this.shrink = !this.shrink;
//            });
//        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .firstText
        font-size 16px
    .secText
        text-indent 20px
        padding 3px 0
    .secText
        padding-left 8%
    .sidebar-item
            height 50px
            line-height 50px
            cursor pointer
            border-bottom 1px solid #f6f6f6
            color $color-white
            .text
                 vertical-align middle
            .sidebar-name
                padding 10px 0
                background-color #fff
                border-bottom 1px solid #f6f6f6
    .on
        background-color #0094e9
        color #fff
    .firstText
        span
            display inline-block
            width 80%
            padding-left 2%
            i
                margin-right 4%
        i
            display inline-block
            width 10%
    .secText
        span
            display inline-block
            width 67%
        i
            width 10%
            margin-right 4%
    .thirdText
        margin-left 38%
        span
            display inline-block
            padding 0px 10px
    .hide
        display none
</style>
