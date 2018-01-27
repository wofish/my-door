<template>
    <div id="sidebar ">
        <ul class="sidebar-item clearfix">
            <my-tree v-for="menuItem in theModel" :key="menuItem.no" :model="menuItem" ></my-tree>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import myTree from '../common/treeMenu.vue';
    import { getData } from '../../server/getData';
    export default {
        components: {
            myTree
        },
        data() {
            return {
                theModel: null
            };
        },
        methods: {
            getPowers() {
                getData({method: 'post', url: '/passport/powers', data: {}}).then(res => {
                    console.log(res);
                    if (res.flags === 'success') {
                        console.log(res.data + '---');
                        this.theModel = res.data;
                    } else {
                        alert(res.data + '---');
                    }
                }).catch(error => {
                    console.log(error.respMsg);
                });
            }
        },
        created() {
            this.getPowers();
        }
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
