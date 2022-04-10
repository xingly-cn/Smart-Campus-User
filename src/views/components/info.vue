<template>
	<div>
		<Card shadow>
			<template v-slot:title>
				<p>失物图片</p>
			</template>
			<div style="text-align: center"><img :src="value.url" alt="失物图片" width="300" /></div>
		</Card>

		<Card style="margin-top: 20px" shadow>
			<template v-slot:title>
				<p>失物信息</p>
			</template>
			<div style="margin: 10px 0; font-size: 20px">姓名：{{ value.name }}</div>
			<div style="margin: 10px 0; font-size: 20px">内容：{{ value.content }}</div>
			<div style="margin: 10px 0; font-size: 20px">分类：{{ value.category }}</div>
			<div style="margin: 10px 0; font-size: 20px">发布时间：{{ value.createtime }}</div>
			<div style="margin: 10px 0; font-size: 20px">更新时间{{ value.updatetime }}</div>
			<div style="margin: 10px 0; font-size: 20px">访问：{{ value.look }}</div>
			<div style="margin: 10px 0; font-size: 20px">是否找到：{{ ['未找到', '找到'][value.tags] }}</div>
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
}
</script>

<style></style>
