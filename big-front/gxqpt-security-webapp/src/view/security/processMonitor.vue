<template>
	<Layout>
		<Content>
			<Breadcrumb>
				<BreadcrumbItem>服务器监控</BreadcrumbItem>
				<BreadcrumbItem>进程监控</BreadcrumbItem>
			</Breadcrumb>
			<Card>
				<Form ref="formValidate" inline :label-width="72" :model="searchFormData">
					<FormItem label="服务器地址">
						<Input type="text" v-model="searchFormData.serverIp">
						</Input>
					</FormItem>
					<FormItem label="进程名称">
						<Input type="text" v-model="searchFormData.processName">
						</Input>
					</FormItem>
					<FormItem label="处理状态">
						<Select type="text" v-model="searchFormData.status">
							<Option value="-1">全部</Option>
							<Option value="0">未处理</Option>
							<Option value="1">已处理</Option>
						</Select>
					</FormItem>
					<FormItem :label-width="30">
						<Button type="primary" @click="search" v-if="checkButton('security_server_monitor_process_search')">查询</Button>
					</FormItem>
					<!-- <FormItem :label-width="10" class="right">
						<Button type="primary" @click="whitelistModalShow = true" v-if="checkButton('security_server_monitor_process_whitelist')">进程白名单</Button>
					</FormItem> -->
				</Form>
				<hy-table border ref="table" :data="data" :columns="columns" :current="pageOption.current" :total="pageOption.total" :page-size="pageOption.pageSize" @on-change="pageChange" @on-page-size-change="changePageSize" show-sizer show-elevator/>
				<Modal class="modal-no-footer" title="进程异常处理" v-model="dealModalShow" :width="600" :mask-closable="false">
					<dealModal v-if="dealModalShow" @close="closeModal" ref="dealModal" :isCheck="isCheck" :id="selectedId" />
				</Modal>
				<Modal title="进程白名单" v-model="whitelistModalShow" :width="800" :mask-closable="false">
					<whitelistModal v-if="whitelistModalShow" ref="whitelistModal" :isCheck="isCheck" />
				</Modal>
			</Card>
		</Content>
	</Layout>
</template>

<script>
	import dealModal from './serverMachineMonitor/processDealModal.vue'
	import whitelistModal from './serverMachineMonitor/whitelistModal.vue'
	import api from '@/api/axiosApi'
	import apiList from '@/api/securityApiList'
	import { mapState } from 'vuex'
	export default {
		components: {
			dealModal: dealModal,
			whitelistModal: whitelistModal
		},
		data() {
			return {
				// 区别模态框是查看还是处理
				selectedId: '',
				selectedServerIp: '',
				isCheck: false,
				searchFormData: {
					status: '-1',
				},
				pageOption: { //分页配置参数
					current: 1,
					total: 0,
					pageSize: 10
				},
				columns: [{
						type: 'index',
						title: '序号',
						width: 60,
						align: 'center'
					},
					{
						title: '服务器地址',
						key: 'serverIp'
					},
					// {
					// 	title: '进程ID',
					// 	key: 'processId'
					// },
					{
						title: '进程名称',
						key: 'processName'
					},
					{
						title: '用户',
						key: 'account'
					},
					{
						title: '预警日期',
						key: 'warnTime'
					},
					{
						title: '处理状态',
						key: 'status',
						render(h, params) {
							let text;
							if(params.row.status == 0) {
								text = '未处理';
							} else {
								text = '已处理';
							}
							return h('span', text);
						}
					},
					{
						title: '处理人',
						key: 'handleUser'
					},
					{
						title: '处理时间',
						key: 'handleTime'
					},
					{
						title: '操作',
						key: 'act',
						align:'center',
						width:120,
						render: (h, params) => {
							const vm = this;
							const status = params.row.status
							const id = params.row.id
							switch(status) {
								case 0:
									return h('div', [
										h('Button', {
											props: {
												type: 'primary',
												size: 'small'
											},
											style: {
												marginRight: '5px',
												display:this.checkButton('security_server_monitor_process_log')?'inline-block':'none'
											},
											on: {
												click() {
													vm.deal(id)
												}
											}
										}, '处理记录')
									])
								case 1:
									return h('div', [
										h('Button', {
											props: {
												type: 'primary',
												size: 'small'
											},
											style: {
												marginRight: '5px',
												display:this.checkButton('security_server_monitor_process_view')?'inline-block':'none'
											},
											on: {
												click() {
													vm.check(id)
												}
											}
										}, '查看')
									])
								default:
									return h('span', '--')
							}
						}
					}
				],
				data: [],
				dealModalShow: false,
				whitelistModalShow: false
			}
		},
		computed:{
			...mapState([
				'authButton'
			])
		},
		methods: {
			init() {
				this.getProcess()
      },
      search() {
				this.pageOption.current=1;
				this.getProcess();
      },
			getProcess() {
				let params = {
					data: this.searchFormData,
					pageNo: this.pageOption.current,
					pageSize: this.pageOption.pageSize
				}
				api(apiList.getProcess, params).then((res) => {
					if(res.status == 200) {
						this.data = res.data.data.list;
						this.pageOption.total = res.data.data.total;
					}
				}, (err) => {
					//do something...
				})
			},
			// 点击处理
			deal(id) {
				this.selectedId = id;
				this.isCheck = false;
				this.dealModalShow = true;
			},
			// 点击查看
			check(id) {
				this.selectedId = id;
				this.isCheck = true;
				this.dealModalShow = true;
			},
//			whiteName(serverIp){
//				this.whitelistModalShow = true;
//			},
			pageChange(num) { //页码改变的回调
				this.pageOption.current = num;
				this.getProcess();
			},
			changePageSize(num) { //切换每页条数时的回调
				this.pageOption.pageSize = num;
				this.getProcess();
			},
			closeModal(type) {
				this.dealModalShow = false;
				if(type == 1) {
					this.getProcess();
				}
			},
			checkButton(code){
				if(this.authButton.indexOf(code) >= 0){
					return true;
				}else{
					return false;
				}
			}
		},
		created() {
			this.init();
		}
	}
</script>

<style lang="less" scoped>
	.page-split {
		margin-top: 10px;
	}
</style>
<style lang="less">
	.modal-no-footer .ivu-modal-footer {
		display: none;
	}
</style>