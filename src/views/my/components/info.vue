<template>
	<div class="form">
		<div>
			<p style="color: red">Tip:请完善个人信息，以便更快寻找失物。</p>
		</div>
		<div class="flex-end">
			<Button type="primary" @click="handleEdit">编辑</Button>
			<Button class="ml-10" type="success" @click="loginout">退出登录</Button>
		</div>

		<div class="item">
			<span>头像: </span>
			<img :src="detail.avatar" width="100" style="border-radius: 50%" alt="" />
		</div>
		<div class="item"><span>姓名: </span> {{ detail.name }}</div>
		<div class="item"><span>性别: </span> {{ ['女', '男'][detail.gender] }}</div>
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
		<Drawer title="编辑信息" :closable="false" width="500" v-model="show">
			<div>
				姓名：<Input
					v-model="copyDetail.name"
					placeholder="Enter something..."
					clearable
					style="width: 200px"
				/>
			</div>
			<div class="pt-10">
				性别：<Input
					v-model="copyDetail.gender"
					placeholder="Enter something..."
					clearable
					style="width: 200px"
				/>
			</div>
			<div class="pt-10">
				学校：<Select v-model="copyDetail.schoolname" style="width: 200px" filterable>
					<Option v-for="item in schoolList" :value="item.name" :key="item.id">{{ item.name }}</Option>
				</Select>
			</div>
			<div class="pt-10">
				手机：<Input
					v-model="copyDetail.phone"
					placeholder="Enter something..."
					clearable
					style="width: 200px"
				/>
			</div>
			<div class="pt-10">
				邮箱：<Input
					v-model="copyDetail.email"
					placeholder="Enter something..."
					clearable
					style="width: 200px"
				/>
			</div>
			<div class="pt-10">
				<Button type="primary" @click="saveStu">保存</Button>
			</div>
		</Drawer>
	</div>
</template>

<script>
import useRequest from '@/mixins/useRequest'
import { getInfo, sendCode, verify, edit } from '@/api/stu'
import { getSchoolList } from '@/api/school'
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
			show: false,
			copyDetail: {},
			schoolList: [],
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
		handleEdit() {
			console.log(this.detail)
			this.copyDetail = JSON.parse(JSON.stringify(this.detail))
			this.show = true
			this.getSchool()
		},
		saveStu() {
			edit(this.copyDetail).then((res) => {
				this.$Message.success(res.message)
				this.show = false
				this.pageInit()
			})
		},
		getSchool() {
			getSchoolList().then((res) => {
				this.schoolList = res.data.schoolList
			})
		},
		loginout() {
			window.localStorage.removeItem('token')
			this.$router.go(0)
		},
	},
}
</script>

<style scoped>
.form {
	border: 1px solid #ccc;
	padding: 20px;
	overflow: scroll;
	height: calc(100% - 100px);
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
