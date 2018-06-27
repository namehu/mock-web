<template>
  <div class="home">
    <Layout>
      <Header class="header">

      </Header>
      <Layout class="content"
        :style="{'height': `${contentHeight}px`}">
        <Sider hide-trigger>
          <Menu width="auto"
            theme="dark"
            active-name="1">
            <MenuItem name="1">项目列表</MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '15px'}">
          <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      contentHeight: window.innerHeight,
    };
  },
  methods: {
    onWindowResize() {
      this.contentHeight = window.innerHeight;
    },
  },
  created() {
    window.addEventListener('resize', this.onWindowResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onWindowResize);
  },
};
</script>

<style lang="scss">
.home .header {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 48px;
  color: #ffffff;
  .content {
    text-align: right;
  }
}

.home .content {
  padding-top: 48px;
}
</style>
<style scoped lang="scss">
.ivu-layout-header {
  padding: 0;
}
.home {
  // border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>
