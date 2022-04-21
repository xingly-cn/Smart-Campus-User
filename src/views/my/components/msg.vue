<template>
	<div>
		<Table border :columns="columns" :data="list">
			<template slot="isRead" slot-scope="{ row }">
				<Tag :color="['error', 'primary'][row.isRead]">{{ ['未读', '已读'][row.isRead] }}</Tag>
			</template>
			<template slot-scope="{ row }" slot="action">
				<Button
					type="primary"
					size="small"
					style="margin-right: 5px"
					v-if="!row.isRead"
					@click="hanleOper(row.id)"
					>查阅</Button
				>
				<Button type="error" size="small" @click="handleDetail(row.goodid)">物品详情</Button>
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
		<Drawer :title="good.title" :closable="true" v-model="good.show" width="500">
			<component :is="`info`" v-model="good.form"></component>
		</Drawer>
	</div>
</template>

<script>
const columns = [
	{
		title: '内容',
		key: 'content',
	},
	{
		title: '来自',
		key: 'fromer',
		width: 70,
	},
	{
		title: '状态',
		key: 'isRead',
		slot: 'isRead',
		width: 88,
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
import { getList as getMessageList, read } from '@/api/msg'
import info from '../../components/info.vue'
import * as good from '@/api/good'

export default {
	mixins: [useRequest],
	components: { info },
	data() {
		return {
			api: {
				list: getMessageList,
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
			read(id).then((res) => {
				this.$Message.success(res.message)
				this.params.cur = 1
				this.getList()
			})
		},
		async handleDetail(id) {
			const {
				data: { good: val },
			} = await good.getGoodInfo(id)
			console.log(val, '123')
			this.good.form = val
			this.good.show = true
		},
	},
}
</script>

<style></style>
