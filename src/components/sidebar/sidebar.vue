<template>
    <div id="sidebar ">
        <ul class="sidebar-item clearfix">
            <my-tree v-for="menuItem in theModel" :key="menuItem.id" :model="menuItem" :subMenuData="subMenuData"></my-tree>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    const myData = [
        {
            'id': '1',
            'menuName': '基础管理',
            'menuCode': '10'
        },
        {
            'id': '2',
            'menuName': '商品管理',
            'menuCode': ''
        },
        {
            'id': '3',
            'menuName': '订单管理',
            'menuCode': '30',
            'children': [
                {
                    'menuName': '订单列表',
                    'menuCode': '31'
                },
                {
                    'menuName': '退货列表',
                    'menuCode': '32',
                    'children': []
                }
            ]
        },
        {
            'id': '4',
            'menuName': '商家管理',
            'menuCode': '',
            'children': []
        }
    ];

    const subMenuData = {
        parentId: '1',
        list: [
            {
                'menuName': '用户管理',
                'menuCode': '11'
            },
            {
                'menuName': '角色管理',
                'menuCode': '12',
                'children': [
                    {
                        'menuName': '管理员',
                        'menuCode': '121'
                    },
                    {
                        'menuName': 'CEO',
                        'menuCode': '122'
                    },
                    {
                        'menuName': 'CFO',
                        'menuCode': '123'
                    },
                    {
                        'menuName': 'COO',
                        'menuCode': '124'
                    },
                    {
                        'menuName': '普通人',
                        'menuCode': '124'
                    }
                ]
            },
            {
                'menuName': '权限管理',
                'menuCode': '13'
            }
        ]
    };
    import myTree from '../common/treeMenu.vue';
    import { getData } from '../../server/getData';
    export default {
        components: {
            myTree
        },
        data() {
            return {
                 tree1s: [],
                theModel: myData,
                subMenuData
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
