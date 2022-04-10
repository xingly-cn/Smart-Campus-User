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
		}
	},
	methods: {
		handleSend() {
			this.$Message.success(`我你爹${this.message}`)
		},
	},
}
</script>

<style></style>
