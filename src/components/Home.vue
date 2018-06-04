<template>
  <div class="layout">
    <Layout>
      <Header class="header">
        <Row>
          <Col span="2">logo</Col>
          <Col span="14"
            class="content">content
          </Col>
          <Col span="4">
          <Menu mode="horizontal"
            theme="dark"
            active-name="1">
            <MenuItem name="1">
            <Badge count="3"
              class="badge">
              <Icon type="flag"></Icon>
            </Badge>
            </MenuItem>
            <MenuItem name="2">
            <Icon type="email"></Icon>
            </MenuItem>
            <MenuItem name="3">
            <Icon type="chatbox-working"></Icon>
            </MenuItem>
          </Menu>
          </Col>
          <Col span="3">用户信息</Col>
          <Col span="1">
          <Icon type="gear-b"></Icon>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider hide-trigger
          :style="{background: '#fff'}">
          <Menu active-name="1-2"
            theme="light"
            width="auto"
            :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </template>
              <MenuItem name="1-1">Option 1</MenuItem>
              <MenuItem name="1-2">Option 2</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss">
.layout .header {
  color: #ffffff;
  .content {
    text-align: right;
  }
}
.header .badge {
  font-size: 12px;
  .ivu-badge-count {
    height: 10px;
    min-width: 10px;
    background: transparent;
    border: noone;
    border: none;
    box-shadow: none;
    color: #ef471e;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
<style scoped lang="scss">
.ivu-layout-header {
  padding: 0;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>
