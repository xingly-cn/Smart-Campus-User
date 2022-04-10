<template>
	<div class="about">
		<div class="mt-10">
			<List border>
				<ListItem v-for="item in list" :key="item.id">
					<ListItemMeta :title="item.title" :description="item.content" />
					<template v-slot:extra>
						<span>{{ item.createtime }}</span>
					</template>
				</ListItem>
			</List>
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
	</div>
</template>

<script>
import useRequest from '@/mixins/useRequest'
import { informList } from '@/api/good'
export default {
	mixins: [useRequest],
	data() {
		return {
			params: {
				cur: 1,
				size: 10,
			},
			api: {
				list: informList,
			},
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageInit() {},
	},
}
</script>

<style scoped>
.about {
	color: #fff;
	margin: 0 auto;
	width: 1200px;
}

::v-deep .ivu-list-item-meta-content div {
	color: #fff !important;
}

::v-deep .ivu-list-item-meta-title {
	font-size: 20px;
	margin-bottom: 10px;
}
</style>
