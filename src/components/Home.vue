<template>
  <div class="home">
    <Layout>
      <Header class="header"
        :style="{'line-height': '48px'}">
        <Row>
          <Col span="4">
          <div class="logo">
            <Icon type="android-send"></Icon>
            EASY
            <span>MOCK</span>
          </div>
          </Col>
          <Col span="20">
          <Menu width="auto"
            mode="horizontal"
            theme="dark"
            active-name="1"
            :style="{'height': '48px', 'line-height': '48px'}">
            <MenuItem name="1"
              @click.native="$router.push('/project/list')">
            <Icon type="ios-folder"></Icon>项目列表</MenuItem>
          </Menu>
          </Col>
        </Row>

      </Header>
      <Layout class="content"
        :style="{'height': `${contentHeight}px`}">
        <Content :style="{'padding': '10px'}">
          <router-view/>
        </Content>
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
  .logo {
    padding-left: 15px;
    font-size: 20px;
    font-weight: 600;
    span {
      color: #ff9900;
    }
    i {
      margin-right: 8px;
      font-size: 25px;
      position: relative;
      top: 3px;
    }
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
