<template>
  <div class="home">
    <div style="background: #eee; padding: 20px;opacity:.8">
      <div class="grid-2">
        <Input  placeholder="请输入名称" @on-keyup.enter="handleSearch"></Input>
      <Select v-model="model8" clearable  placeholder="分类筛选">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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

            
            <!-- <div slot="extra"> -->
              <!-- 123 -->
            <!-- </div> -->
            <div style="margin-left: 20px"><p>这里是内容</p></div>
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
        :current.sync="params.cur"
        :page-size.sync="params.size"
        :page-size-opts="[2, 10, 20, 100]"
        @on-change="getList"
        @on-page-size-change="getList"
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
    this.getList();
  },
  data() {
    return {
      api: Object.freeze({
        list: good.getGoodList,
      }),
      good: {
        title: "新增",
        show: false,
        form: {},
        rules: {},
        loading: false,
      },
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