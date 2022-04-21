<template>
	<div>
		<Card shadow>
			<template v-slot:title>
				<p>用户信息</p>
			</template>
			<div class="user-info">
				<div>姓名：{{ value.username }}</div>
				<div class="mt-10 mb-10">用户邮箱：{{ value.email }}</div>
				<div>用户手机：{{ value.phone }}</div>
			</div>
		</Card>

		<Card style="margin-top: 20px">
			<template v-slot:title>
				<p>发送信息</p>
			</template>
			<Input type="textarea" v-model="message"></Input>
			<div class="flex-end mt-10">
				<Button type="primary" @click="handleSend">发送</Button>
			</div>
		</Card>
	</div>
</template>

<script>
import { send } from '@/api/msg'
export default {
	model: {
		prop: 'value',
	},
	props: {
		value: {
			type: Object,
			require: true,
		},
	},
	data() {
		return {
			message: '',
			msg: {},
		}
	},
	methods: {
		handleSend() {
			this.msg.goodid = this.value.goodid
			this.msg.stuid = this.value.id
			this.msg.content = this.message
			send(this.msg).then((res) => {
				this.$Message.success(res.message)
			})
			this.message = ''
		},
	},
}
</script>

<style></style>
