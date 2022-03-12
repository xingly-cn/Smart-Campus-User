export default {
    data() {
        return {
            list: [],
            total: 0,
            api: {},
            params: {
                cur: 1,
                size: 10,
            }
        }
    },
    methods: {
        async getList() {
            const result = await this.api.list(this.params)
            const {data: {list, total}} = result
            this.list = list
            this.total = total
            return result.data
        }
    }
}