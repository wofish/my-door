<template>
    <div class="financeLoan">
        <div class="financeLoan-title">
            <span>角色列表</span>
        </div>
        <div class="financeLoan-filter clearfix">
            <div class="clearfix">
                <p style="float:left;width: 80%;">
                    <!--订单号：<Input  v-model = 'vertifyStatus.loanId'   style="width: 200px" placeholder="请输入订单号"></Input>-->
                    <strong>查询项：</strong>
                </p>
                <p  class="operate"  style="float:left;width: 18%;">
                    <Button @click="addMenu">添加</Button>
                </p>
            </div>
        </div>
        <div  class="financeLoan-list" id="vertify-manage-list"><!--height="450"-->
            <Table :data="historyData" :columns="historyColumns" border stripe  height="500" :no-data-text="text"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;padding:20px 0;">
                    <Page :total="dataCount" :current="1" @on-change="changepage" :page-size="pageSize" show-total class="paging" show-elevator ></Page>
                </div>
            </div>
        </div>
        <!--联系人信息-新增-->
        <addOrg @closeAddOrg="closeAddOrg" ref="orgAddChild" @saveAddMenu="saveAddOrg"  :class="{'hide':addOrgModal}"></addOrg>
        <viewOrg @closeViewMenu="closeViewOrg" ref="orgViewChild" @saveViewOrg="saveViewOrg"  :viewMenuData="viewOrgData" :class="{'hide':viewOrgModal}"></viewOrg>
    </div>
</template>

<script type="text/ecmascript-6" >
    import HeadTop from '../headtop/headtop';
    import SideBar from '../sidebar/sidebar';
    import addOrg from '../popUp/addOrg';
    import viewOrg from '../popUp/viewOrg';
    import { dateFormat, setTitle, formatDate, trim, getDate } from '../../common/js/util';
    import { getData } from '../../server/getData';

    export default {
        data() {
            return {
                active: false,
                text: '数据正在加载中',
                currentDate: null,
                current: 1,
                vertifyStatus: {
                    loadId: null,
                    phoneNo: null,
                    name: null,
                    transferStatus: 'WAITING_FOR_TRANSFER',
                    startDateStr: null,
                    endDateStr: null,
                    userId: 1,
                    rows: 10,
                    page: 1
                },
                chosenApplyNos: [],
                ajaxHistoryData: [],
                historyColumns: [
                    {type: 'selection', align: 'center', width: 80},
                    {type: 'index', align: 'center', width: 80, title: '编号'},
                    {title: '编号', key: 'no', align: 'center', width: '250'},
                    {title: '名称', key: 'name', align: 'center'},
                    {title: 'url', key: 'url', align: 'center'},
                    {title: '父节点', key: 'parentNo', align: 'center'},
                    {title: '创建时间', key: 'createTime', align: 'center'},
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        render: (h, params) => {
                            var isClick = null;
                            var color = null;
                            if (params.row.transferStatus === '放款成功') {
                                isClick = 'disabled';
                                color = 'rgba(0,0,0,0.3)';
                            } else {
                                color = '#fff';
                            }
                            return h('div', {
                                style: {
                                    width: '100%'
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: isClick
                                    },
                                    style: {
                                        borderColor: color,
                                        borderRadius: '10px',
                                        color: color,
                                        margin: '0 1% 1% 0'
                                    },
                                    on: {
                                        click: () => {
                                            this.viewMenu(params.row);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        borderRadius: '10px',
                                        margin: '0 1% 1% 0'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteMenu(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                historyData: [
                ],
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                addOrgModal: true,
                viewOrgModal: true,
                chooseSelection: [],
                viewOrgData: null,
                token: null
            };
        },
        components: {
            HeadTop,
            addOrg,
            viewOrg,
            SideBar
        },
        methods: {
            getList(data) {
                getData({method: 'post', url: '/org/orgs', data: data}).then(res => {
                    if (res.flags === 'success') {
                        if (res.data.rows.length === 0 || res.data.rows === null) {
                            this.text = '暂无数据';
                            this.historyData = [];
                        }
                        this.historyData = res.data.rows;
                        this.dataCount = res.data.total;
                    } else {
                        alert(res.data);
                    }
                }).catch(error => {
                    console.log(error.respMsg);
                });
            },
            changepage(index) {
                this.vertifyStatus.page = index;
                this.all();
                this.getList(this.vertifyStatus);
            },
            addOrg() {
                this.addOrgModal = !this.addOrgModal;
            },
            viewOrg(menu) {
                this.viewOrgData = menu;
                this.viewOrgModal = !this.viewOrgModal;
            },
            deleteOrg(menu) {

            },
            closeAddOrg: function() {
                this.addOrgModal = true;
            },
            closeViewOrg: function() {
                this.viewOrgModal = true;
            },
            saveAddMenu: function(res) {
                getData({method: 'post', url: '/org/create', data: res}).then(res => {
                    if (res.flags === 'success') {
                        this.$Message.info('保存成功！');
                        this.closeAddMenu();
                        this.historyData.push(res);
//                        this.$router.replace({path: '/home/menu'});
                    } else {
                        alert(res.data);
                    }
                }).catch(error => {
                    console.log(error.respMsg);
                });
            },
            saveViewOrg: function(res) {
                getData({method: 'post', url: '/org/update/' + res.no, data: res}).then(res => {
                    if (res.flags === 'success') {
                        this.$Message.info('修改成功！');
                        this.closeViewOrg();
                    } else {
                        alert(res.data);
                    }
                }).catch(error => {
                    console.log(error.respMsg);
                });
            },
            formatDate (time) {
                let ratingDate = new Date(time);
                return formatDate(ratingDate, 'yyyy-MM-dd hh:mm');
            },
            close() {
                this.payMoneyModal = true;
            },
            all() {
                if (this.vertifyStatus.startDateStr) {
                    this.vertifyStatus.startDateStr = dateFormat(this.vertifyStatus.startDateStr, 'yyyy-MM-dd');
                } else {
                    this.vertifyStatus.startDateStr = null;
                }
                if (this.vertifyStatus.endDateStr) {
                    this.vertifyStatus.endDateStr = dateFormat(this.vertifyStatus.endDateStr, 'yyyy-MM-dd');
                } else {
                    this.vertifyStatus.endDateStr = null;
                }
                if (this.vertifyStatus.loanId) {
                    this.vertifyStatus.loanId = trim(this.vertifyStatus.loanId);
                } else {
                    this.vertifyStatus.loanId = null;
                }
                if (this.vertifyStatus.name) {
                    this.vertifyStatus.name = trim(this.vertifyStatus.name);
                } else {
                    this.vertifyStatus.name = null;
                }
                if (this.vertifyStatus.phoneNo) {
                    this.vertifyStatus.phoneNo = trim(this.vertifyStatus.phoneNo);
                } else {
                    this.vertifyStatus.phoneNo = null;
                }
                if (!this.vertifyStatus.transferStatus) {
                    this.vertifyStatus.transferStatus = null;
                }
            },
            search() {
                this.current = 1;
                this.vertifyStatus.page = 1;
                this.all();
                this.getList(this.vertifyStatus);
            }
        },
        created() {
            this.currentDate = getDate();
            this.getList(this.vertifyStatus);
        },
        activated() {
            this.token = localStorage.getItem('token');
        },
        mounted() {
            setTimeout(function() {
                setTitle('菜单管理');
            }, 0);
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import  '../../common/stylus/base.styl';
    .financeLoan
        margin 1% 1% 0 1%
        padding-top 2%
        padding-left 2%
        background-color white
        min-height 680px
        border-top 4px solid #1fa4f0
        .financeLoan-title
            border-bottom 1px solid #ccc
            font-size 20px
            padding-bottom 10px
        .financeLoan-filter
            margin-top 1%
            p
                text-align left
            .search
                vertical-align bottom
            .operate
                cursor pointer
        .financeLoan-list
            margin-top 2%
            width 98%
    .ivu-table
       .demo-table-info-row
          td
          background-color #2db7f5
          color #fff
    .hide
        display none
    #popUpload
      .ivu-modal-wrap
           height 200px
           margin-top -100px
    #changeCard
         .ivu-modal-wrap
             height 240px
             margin-top -120px
</style>
