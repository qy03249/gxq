<template>
  <div>
    <Modal v-model="showModal" title="告警列表" width="80%" :mask-closable="false">
      <hy-table
        highlight-row
        border
        :current="pageInfo.pageNo"
        :columns="tableList.columns"
        :data="tableList.data"
        :total="Number(pageInfo.total)"
        :pageSize="Number(pageInfo.pageSize)"
        pageType="small"
        show-elevator
        show-sizer
        ref="safetyEvalTable"
        @on-page-change="pageChange" />
      <div slot="footer">
        <Button class="modalBtn" type="default" @click="showModal = false" size="large">关闭</Button>
      </div>
    </Modal>
    <ruleModal
      ref="ruleModal"
      currentAct="detail">
    </ruleModal>
  </div>
</template>
<script>
import api from '@/api/axiosApi'
import operationApiList from '@/api/operationApiList'
import ruleModal from "./../alarm/ruleModal.vue";

const alarmLevels = [{
  label: '全部',
  value: ''
}, {
  label: '一级',
  value: 1
}, {
  label: '二级',
  value: 2
}, {
  label: '三级',
  value: 3
}]
export default {
  components: {
    ruleModal
  },
  data () {
    const vm = this
    return {
      showModal: false,
      tableList: {
        columns: [{
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        }, {
          title: '告警名称',
          key: 'alarmName'
        }, {
          title: '告警级别',
          key: 'alarmLevel',
          render: (h, params) => {
            for (let level of alarmLevels) {
              if (level.value == params.row.alarmLevel) {
                return h('span', level.label)
              }
            }
            return h('span', '--')
          }
        }, {
          title: '系统名称',
          key: 'systemName'
        }, {
          title: '告警状态',
          key: 'status',
          render: (h, params) => {
            const status = ['--', '未处理', '已处理']
            return h('span', status[params.row.status])
          }
        }, {
          title: '产生时间',
          key: 'createTime'
        }, {
          title: '操作',
          type: 'act',
          width: 200,
          align: 'center',
          render: (h, params) => {
            const {status, ruleId, id, detailsUrl, applyCode} = params.row
            const detail = h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.currentAct = 'detail'
                  this.$refs.ruleModal.open(ruleId)
                }
              }
            }, '告警规则详情')
            const deal = h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  vm.$router.push({
                    path: `${detailsUrl}?code=${applyCode}`
                  })
                }
              }
            }, '处理')
            const btns = []
            // 未处理
            if (status === 1) {
              btns.push(deal)
            }
            btns.push(detail)
            return h('div', btns)
          }
        }],
        data: []
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.doSearch()
  },
  methods: {
    pageChange(pageNo, pageSize) {
      this.pageInfo.pageNo = pageNo
      this.pageInfo.pageSize = pageSize
      this.doSearch()
    },
    // 查询
    doSearch () {
      this.getList()
    },
    // 获取列表
    getList(pageNo, pageSize) {
      const vm = this
      api(operationApiList.alarmInformationPage, {
        pageNo: pageNo || vm.pageInfo.pageNo,
        pageSize: pageSize || vm.pageInfo.pageSize,
        data: {
          alarmName: '',
          alarmLevel: '',
          status: 1,
          endTime: '',
          startTime: ''
        }
      }).then(res => {
        if (res.data.errcode === 0) {
          const result = res.data.data
          vm.pageInfo.pageNo = result.pageNum
          vm.pageInfo.total = result.total
          vm.tableList.data = result.list
          if (result.list.length > 0) {
            vm.showModal = true
          }
        }
      }, error => {console.log(error)})
    }
  }
}
</script>
