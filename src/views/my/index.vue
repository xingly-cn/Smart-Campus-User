<template>
	<div class="my mt-10">
		<Card class="mt-10" v-if="token">
			<div class="container grid">
				<div class="left-nav">
					<div class="item header"><h1>个人中心</h1></div>
					<div
						class="item"
						:class="{ active: index === currentIndex }"
						v-for="(item, index) in navList"
						:key="item.t"
						@click="handleCurrent(index, item.com)"
					>
						{{ item.t }}
					</div>
				</div>
				<div class="right-content">
					<component :is="`${currentCom}`" />
				</div>
			</div>
		</Card>
		<Card class="mt-10" v-else>
			<div style="text-align: center">
				<h1 style="color: #2b85e4">千里寻物 - 登陆</h1>
				<h3>Tip：未注册用户，会自动创建一个账号！</h3>
				<div style="margin-top: 30px"></div>
				<div class="mt-10">
					<Input style="width: 300px" v-model="login.username" placeholder="账号" />
				</div>
				<div class="pt-10">
					<Input style="width: 300px" type="password" v-model="login.password" placeholder="密码" />
				</div>
				<Button class="mt-10" type="primary" @click="handleLogin">登录</Button>
			</div>
		</Card>
	</div>
</template>

<script>
import info from './components/info.vue'
import list from './components/list.vue'
import msg from './components/msg.vue'
import callback from './components/callback.vue'
import { useLogin } from '../../api/login'
export default {
	components: { info, list, msg, callback },
	data() {
		return {
			currentIndex: 0,
			currentCom: 'info',
			navList: [
				{ t: '我的信息', com: 'info' },
				{ t: '我的失物', com: 'list' },
				{ t: '我的消息', com: 'msg' },
				{ t: '我的反馈', com: 'callback' },
			],
			token: '',
			login: {},
		}
	},
	created() {
		this.token = localStorage.getItem('token')
	},
	methods: {
		handleCurrent(index, com) {
			this.currentIndex = index
			this.currentCom = com
		},
		handleLogin() {
			useLogin(this.login).then((res) => {
				this.$Message.success(res.message)
				this.token = res.data.token || ''
				window.localStorage.setItem('token', this.token)
			})
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
	opacity: 80%;
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
	margin-left: 20px;
	margin-top: 70px;
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
