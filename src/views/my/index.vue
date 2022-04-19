<template>
	<div class="my mt-10">
		<Card class="mt-10">
			<div class="container grid">
				<div class="left-nav">
					<div class="item header">我是你爹</div>
					<div
						class="item"
						:class="{ active: index === currentIndex }"
						v-for="(item, index) in navList"
						:key="item.t"
						@click="handleCurrent(index)"
					>
						{{ item.t }}
					</div>
				</div>
				<div class="right-content">
					<component :is="`info`" />
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
import info from './components/info.vue'
export default {
	components: { info },
	data() {
		return {
			currentIndex: 0,
			navList: [{ t: '我的信息', com: 'info' }, { t: '我的失物' }, { t: '我的消息' }, { t: '我的反馈' }],
		}
	},
	methods: {
		handleCurrent(index) {
			this.currentIndex = index
		},
	},
}
</script>

<style scoped>
.my {
	width: 50%;
	min-width: 500px;
	max-width: 1500px;
	margin: 0 auto;
}
.grid {
	display: grid;
	grid-template-columns: 1fr 3fr;
	justify-content: center;
}

.left-nav {
	height: calc(100vh - 200px);
}

.right-content {
	overflow: hidden;
	padding-bottom: 20px;
}

.header {
	background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
	margin-bottom: 10px;
	text-align: center;
}

.item {
	padding: 20px;
	transition: 0.3s all;
	cursor: pointer;
}

.active {
	background-color: #ddf1f3;
	color: #f60;
	font-weight: bold;
}
</style>
