<template>
	<div>
		<div class="flex-end">
			<Button class="mb-10" type="success" @click="drawer.show = true">发布失物</Button>
		</div>

		<Table border :columns="columns" :data="list">
			<template slot="url" slot-scope="{ row }">
				<div>
					<!-- <div v-for="_ in 10" :key="_"> -->
					<img :src="row.url" alt="" width="60" />
					<!-- </div> -->
				</div>
			</template>
			<template slot="tags" slot-scope="{ row }">
				<Tag :color="['error', 'primary'][row.tags]">{{ ['未找到', '已找到'][row.tags] }}</Tag>
			</template>
			<template slot-scope="{ row }" slot="action">
				<Button
					type="primary"
					size="small"
					style="margin-right: 5px"
					v-if="!row.tags"
					@click="hanleOper(row.id, 'change')"
					>已找到</Button
				>
				<Button type="error" size="small" @click="hanleOper(row.id, 'del')">删除</Button>
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
			class="flex-end"
		/>
		<Drawer title="发布失物" :closable="false" width="500" v-model="drawer.show">
			<div>
				标题：<Input v-model="good.title" placeholder="Enter something..." clearable style="width: 400px" />
			</div>
			<div class="pt-10">
				内容：<Input v-model="good.content" placeholder="Enter something..." clearable style="width: 400px" />
			</div>
			<div class="pt-10">
				分类：<Select v-model="good.category" style="width: 400px" filterable>
					<Option v-for="item in category" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</div>
			<div class="pt-10">
				图片：<Input v-model="good.url" placeholder="Enter something..." clearable style="width: 400px" />
			</div>
			<div class="pt-10">
				<Button type="primary" @click="saveGood">发布</Button>
			</div>
		</Drawer>
	</div>
</template>

<script>
const columns = [
	{
		title: '姓名',
		key: 'name',
	},
	{
		title: '标题',
		key: 'title',
	},
	{
		title: '分类',
		key: 'category',
	},
	{
		title: '内容',
		key: 'content',
	},
	{
		title: '状态',
		key: 'tags',
		slot: 'tags',
	},
	{
		title: '图片',
		slot: 'url',
	},
	{
		title: 'Action',
		slot: 'action',
		width: 150,
		align: 'center',
	},
]
import useRequest from '@/mixins/useRequest'
import { getGoodList, addGood } from '@/api/good'
import { find, del } from '@/api/stu'
import { getCategoryList } from '@/api/category'
export default {
	mixins: [useRequest],
	data() {
		return {
			api: {
				list: getGoodList,
			},
			columns: Object.freeze(columns),
			drawer: {
				show: false,
			},
			good: {},
			category: [],
		}
	},
	created() {
		this.pageInit()
		this.getCategory()
	},
	methods: {
		pageInit() {
			this.getList()
		},
		hanleOper(id, type) {
			const api = type === 'del' ? del(id) : find(id)
			api.then((res) => {
				this.$Message.success(res.message)
				this.params.cur = 1
				this.getList()
			})
		},
		saveGood() {
			addGood(this.good).then((res) => {
				this.$Message.success(res.message)
				this.getList()
			})
		},
		getCategory() {
			getCategoryList().then((res) => {
				this.category = res.data.list
			})
		},
	},
}
</script>

<style></style>
