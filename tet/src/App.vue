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
          <Icon type="ios-paper" />
          {{ m.meta.title }}
        </MenuItem>
      </Menu>
    </div>

    <div class="body">
      <router-view></router-view>
    </div>
    <footer class="footer">
      COPYRIGHT © 2021 – 2022 FANGTANG. ALL RIGHTS RESERVED.
方糖软件 版权所有
    </footer>
  </div>
</template>
<script>
export default {
  computed: {
    menu() {
      return this.$router.options.routes;
    },
  },
  methods: {
    onSelect(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>

<style scoped>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  box-shadow: 0 0 10px #ccc;
}
.logo {
  
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
}

.body {
  text-align: center;
}
</style>