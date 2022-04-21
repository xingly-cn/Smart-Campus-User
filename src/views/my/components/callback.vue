<template>
	<div>
		<Table border :columns="columns" :data="list">
			<template slot="status" slot-scope="{ row }">
				<Tag :color="['error', 'primary'][row.status]">{{ ['未回复', '已回复'][row.status] }}</Tag>
			</template>
			<template slot-scope="{ row }" slot="action">
				<Button
					type="primary"
					size="small"
					style="margin-right: 5px"
					v-if="!row.status"
					@click="hanleOper(row.id)"
					>删除</Button
				>
			</template>
		</Table>
		<Page
			:total="total"
			:current.sync="params.cur"
			:page-size.sync="params.size"
			:page-size-opts="[10, 20, 100]"
			@on-change="getList"
			@on-page-size-change="getList"
			show-elevator
			show-sizer
			show-total
			class="flex-end mt-10"
		/>
	</div>
</template>

<script>
const columns = [
	{
		title: '标题',
		key: 'title',
	},
	{
		title: '内容',
		key: 'content',
	},
	{
		title: '状态',
		key: 'status',
		slot: 'status',
		width: 100,
	},
	{
		title: '时间',
		key: 'createtime',
		width: 170,
	},
	{
		title: 'Action',
		slot: 'action',
		width: 160,
		align: 'center',
	},
]
import useRequest from '@/mixins/useRequest'
import { getCallbackList, callbackdel } from '@/api/callback'

export default {
	mixins: [useRequest],
	data() {
		return {
			api: {
				list: getCallbackList,
			},
			columns: Object.freeze(columns),
			good: {
				title: '查看信息',
				show: false,
				form: {},
				loading: false,
			},
		}
	},
	created() {
		this.pageInit()
	},
	methods: {
		pageInit() {
			this.getList()
		},
		hanleOper(id) {
			callbackdel(id).then((res) => {
				this.$Message.success(res.message)
				this.params.cur = 1
				this.getList()
			})
		},
	},
}
</script>

<style></style>
