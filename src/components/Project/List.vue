<template>
  <div class="list">
    <Row class="operation">
      <Col span="6">
      <label for="projectName">项目名称:</label>
      <Input placeholder="请输入项目名称"
        v-model="query.name"
        class="input"
        size="small"
        clearable
        element-id="projectName"></Input>
      </Col>
      <Col span="6">
      <label for="path">路径名称:</label>
      <Input placeholder="请输入路径名称"
        v-model="query.path"
        class="input"
        size="small"
        clearable
        element-id="path"></Input>
      </Col>
      <Col span="6">
      <label for="protocol">协议:</label>
      <Select placeholder="请选择"
        v-model="query.protocol"
        class="input"
        size="small"
        clearable
        element-id="protocol">
        <Option v-for="(item, index) in protocols"
          :value="item.value"
          :key="index">{{item.name}}</Option>
      </Select>
      </Col>
      <Col span="6">
      <Button type="info"
        size="small"
        @click.native="queryList">查询</Button>
      <Button type="info"
        size="small"
        @click.native="add">新增</Button>
      </Col>
    </Row>
    <Table :data="tableData"
      :columns="columns"></Table>
    <Modal v-model="showModal">
      1233
    </Modal>
  </div>
</template>
<script>
import { getProjects } from '@/api';
import listMixins from './list.mixins';

export default {
  name: 'List',
  mixins: [listMixins],
  data() {
    return {
      query: {
        name: '',
        path: '',
        protocol: '',
      },
      project: {
        name: '',
        path: '',
        protocol: '',
        version: '1.0',
        description: '',
        status: 1,
      },
      tableData: [],
      showModal: false,
    };
  },
  methods: {
    // 查询项目列表
    queryList() {
      getProjects(this.pageNumber, this.pageSize, this.query).then(res => {
        if (res.code === 200) {
          this.tableData = res.data;
        }
      });
    },
    add() {
      this.showModal = true;
    },
  },
  created() {
    this.queryList();
  },
};
</script>

<style lang="scss" scoped>
.list {
  .operation {
    margin-bottom: 15px;
  }
  .input {
    display: inline-block;
    width: 50%;
  }
}
</style>
