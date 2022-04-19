<template>
	<div class="form">
		<div class="item">
			<span>头像: </span>
			<img :src="detail.avatar" width="100" style="border-radius: 50%" alt="" />
		</div>
		<div class="item"><span>姓名: </span> {{ detail.name }}</div>
		<div class="item"><span>性别: </span> {{ ['变态女', '猥琐男'][detail.gender] }}</div>
		<div class="item"><span>账号: </span> {{ detail.username }}</div>
		<div class="item"><span>手机: </span> {{ detail.phone }}</div>
		<div class="item"><span>邮箱: </span> {{ detail.email }}</div>
		<div class="item"><span>学校: </span> {{ detail.schoolname }}</div>
		<div class="item">
			<span>是否认证:</span> {{ ['未认证', '已认证'][detail.verify] }}
			<Button class="ml-10" v-if="!detail.verify" type="primary" @click="modal.show = true">认证</Button>
		</div>
		<div class="item"><span>注册时间:</span> {{ detail.createtime }}</div>
		<div class="item"><span>上次登陆:</span> {{ detail.lastlogin }}</div>
		<Modal v-model="modal.show" :title="modal.title" @on-ok="ok" @on-cancel="cancel">
			<div class="flex">
				<Input v-model="modal.form.code"></Input>
				<Button type="primary" class="ml-10" @click="handleSendcode">获取验证码</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import useRequest from '@/mixins/useRequest'
import { getInfo, sendCode, verify } from '@/api/stu'
export default {
	mixins: [useRequest],
	data() {
		return {
			api: {},
			detail: {},
			modal: {
				show: false,
				title: '认证',
				form: {},
			},
		}
	},
	created() {
		this.pageInit()
	},
	methods: {
		pageInit() {
			getInfo().then((value) => {
				console.log(value)
				this.detail = value.data.stu
			})
		},
		handleSendcode() {
			sendCode().then((res) => {
				this.$Message.success(res.message)
			})
		},
		ok() {
			verify(this.modal.form).then((res) => {
				this.$Message.success(res.message)
				this.pageInit()
			})
		},
		cancel() {
			this.modal.show = false
		},
	},
}
</script>

<style scoped>
.form {
	border: 1px solid #ccc;
	margin-left: 20px;
	padding: 20px;
	margin-top: 70px;
	overflow: scroll;
	height: calc(100%-100px);
}

.item {
	margin: 10px;
	font-size: 16px;
	display: flex;
	align-items: center;
}

.item span {
	display: inline-block;
	width: 100px;
	text-align: right;
	font-weight: bold;
	font-size: 20px;
	margin-right: 20px;
}
</style>
