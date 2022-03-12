<template>
  <div class="home">
    <div style="background: #eee; padding: 20px;opacity:.8">
      <div class="grid-2">
        <Input  placeholder="请输入名称" @on-keyup.enter="handleSearch"></Input>
      <Select v-model="category" clearable  
      placeholder="分类筛选"
      @on-clear="onclear"
      @on-query-change="findCategory(category)">
        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      </div>
      <div class="grid-2">
        <Card
          :bordered="true"
          v-for="item in list"
          :key="item.id"
          style="margin: 10px 0"
          :title="item.title"
        >
          <div class="flex">
            <Avatar
              src="https://camo.githubusercontent.com/928e731a3287ba608de7fce89b0b387cddf65bed6c6b8cb17edd37d269d39f44/68747470733a2f2f73322e6c6f6c692e6e65742f323032322f30322f30392f4b5a6d4f446336425143466a3265492e706e67"
              size="100"
              shape="square"
            />
            <div style="margin-left: 20px">
              <!-- TODO太长导致图片被压缩 -->
              {{item.content}}
            </div>
          </div>
          <div
            class="flex-end"
            style="border-top: 1px solid #ccc; margin-top: 10px"
          >
            <Button type="text" @click="handleDetail(item)">详情</Button>
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

      <Modal
        v-model="good.show"
        :title="good.title"
        @on-ok="good.show = false"
        @on-cancel="good.show = false"
      >
        {{ good.form }}
      </Modal>
    </div>
  </div>
</template>

<script>
import * as good from "@/api/good";
import useRequest from "@/mixins/useRequest";
export default {
  mixins: [useRequest],
  mounted() {
    this.getGoodList();
    this.handleCategory();
  },
  data() {
    return {
      pages: {
        cur: 1,
        size: 10,
        categoryId: ''
      },
      list: [],
      good: {
        title: "新增",
        show: false,
        form: {},
        rules: {},
        loading: false,
      },
      cityList: []
    };
  },
  methods: {
    handleDetail(item) {
      this.$Message.success(item.title);
      this.good.title = "编辑";
      this.good.show = true;
      this.good.form = item;
    },
    handleSearch() {
      this.$Message.error('123')
    },
    handleCategory() {
      good.getCategoryList().then(res => {
        this.cityList = res.data.list
      })
    },
    onclear() {
      this.pages.categoryId = ''
      this.getGoodList()
    },
    findCategory(id) {
      this.$Message.success("筛选分类成功")
      this.pages.categoryId = id
      this.getGoodList()
    },
    getGoodList() {
      good.getGoodList({cur:this.pages.cur,size:10,categoryId:this.pages.categoryId}).then(res => {
        this.list = res.data.list
        this.total = res.data.total
      })
    }
  },
};
</script>

<style>
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

.flex {
  display: flex;
  align-items: center;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>