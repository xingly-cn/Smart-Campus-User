<template>
	<div class="home pt-10">
		<div style="background: #eee; padding: 20px; opacity: 0.8">
			<div class="grid-2">
				<Input placeholder="请输入名称" v-model="pages.keyword" @on-keyup.enter="handleSearch"></Input>
				<Select
					v-model="pages.categoryId"
					clearable
					placeholder="分类筛选"
					@on-clear="onclear"
					@on-query-change="findCategory"
				>
					<Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</div>
			<div class="grid-2">
				<Card :bordered="true" v-for="item in list" :key="item.id" style="margin: 10px 0" :title="item.title">
					<div class="flex">
						<Avatar :src="item.url" size="100" shape="square" />
						<div style="margin-left: 20px">
							<!-- TODO太长导致图片被压缩 -->
							{{ item.content }}
						</div>
					</div>
					<div class="flex-between mt-10 p-10" style="border-top: 1px solid #ccc">
						<Tag :color="['error', 'success'][item.tags]">{{ ['未找到', '找到'][item.tags] }}</Tag>
						<div>
							<Button type="text" @click="handleChat(item)">联系</Button>
							<Button type="text" @click="handleDetail(item)">详情</Button>
						</div>
					</div>
				</Card>
			</div>
			<Page
				:total="total"
				:current.sync="pages.cur"
				:page-size.sync="pages.size"
				:page-size-opts="[10, 20, 100]"
				@on-change="getGoodList"
				@on-page-size-change="getGoodList"
				show-elevator
				show-sizer
				show-total
				class="flex-end"
			/>

			<Drawer :title="good.title" :closable="true" v-model="good.show" width="500">
				<!-- <info v-model="good.form"></info> -->
				<component :is="com" v-model="good.form"></component>
			</Drawer>
		</div>
	</div>
</template>

<script>
import * as good from '@/api/good'
import { getInfo2 } from '@/api/stu'
import useRequest from '@/mixins/useRequest'
import info from './components/info.vue'
import chat from './components/chat.vue'
export default {
	mixins: [useRequest],
	components: { info, chat },
	mounted() {
		this.getGoodList()
		this.handleCategory()
	},
	data() {
		return {
			pages: {
				cur: 1,
				size: 10,
				categoryId: '',
				keyword: '',
				f: '肖念昕',
			},
			list: [],
			good: {
				title: '查看信息',
				show: false,
				form: {},
				loading: false,
			},
			cityList: [],
			com: 'info',
		}
	},
	methods: {
		async handleDetail({ id }) {
			const {
				data: { good: val },
			} = await good.getGoodInfo(id)
			this.good.form = val
			this.com = 'info'
			this.good.show = true
		},
		handleSearch() {
			this.pages.cur = 1
			this.getGoodList()
		},
		handleChat(item) {
			this.com = 'chat'
			this.good.show = true
			getInfo2(item.userId).then((res) => {
				this.good.form = res.data.stu
				this.good.form.goodid = item.id
			})
		},
		handleCategory() {
			good.getCategoryList().then((res) => {
				this.cityList = res.data.list
			})
		},
		onclear() {
			this.pages.categoryId = ''
			this.getGoodList()
		},
		async findCategory() {
			this.pages.cur = 1
			await this.getGoodList()
			this.$Message.success('筛选分类成功')
		},
		getGoodList() {
			good.getGoodList(this.pages).then((res) => {
				this.list = res.data.list
				this.total = res.data.total
			})
		},
	},
}
</script>

<style scoped>
.home {
	/* background-color: aqua; */
	width: 50%;
	min-width: 500px;
	max-width: 1500px;
	margin: 0 auto;
}

.grid-2 {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 16px;
}

::v-deep .ivu-card-shadow {
	box-shadow: -1px -1px 10px rgb(0 0 3 / 40%) !important;
}
</style>
