<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <h1>千里寻物</h1>
      </div>
      <Menu
        mode="horizontal"
        theme="light"
        active-name="1"
        @on-select="onSelect"
      >
        <MenuItem v-for="m in menu" :name="m.name" :key="m.path">
          <template v-if="m.name === 'My'">
            <Icon :type="m.meta.icon" />
            <Badge :count="count" :offset="[16,0]">
              <span>{{ m.meta.title }}</span>
            </Badge>
          </template>
          <template v-else>
            <Icon :type="m.meta.icon" />
            <span>{{ m.meta.title }}</span>
          </template>
        </MenuItem>
      </Menu>
    </div>

    <div class="body">
      <router-view></router-view>
    </div>
    <footer class="footer">
      COPYRIGHT © 2021 – 2022 FANGTANG. ALL RIGHTS RESERVED. 方糖软件 版权所有
      技术指导：<span @click="handleVx">North</span>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    menu() {
      return this.$router.options.routes;
    },
  },
  created() {
    this.getMessage()
  },
  methods: {
    onSelect(name) {
      this.$router.push({
        name,
      });
    },
    handleVx() {
      this.$Message.success("al_North");
    },
    getMessage() {
      this.count = 12
    }
  },
};
</script>

<style>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  box-shadow: 0 0 10px #ccc;
}
.logo {
  box-shadow: 0 0 10px rgba(241, 237, 237, 0.418);
}

.footer {
  position: fixed;
  width: 100%;
  display: block;
  height: 50px;
  line-height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
}

.body {
  background: url(https://s3.bmp.ovh/imgs/2021/08/f5d845ce6d32cccf.jpg);
  background-size: cover;
  padding: 0 0 50px 0;
}

body {
}
</style>