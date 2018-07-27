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
      <label for="url">路径名称:</label>
      <Input placeholder="请输入路径名称"
        v-model="query.url"
        class="input"
        size="small"
        clearable
        element-id="url"></Input>
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
    <Modal v-model="showModal"
      :closable="false"
      :width="300"
      @on-ok="confirm"
      class-name="project-modal">
      <Row>
        <Col span="6">
        <label for="projectNameM">项目名:</label>
        </Col>
        <Col span="18">
        <Input v-model="project.name"
          element-id="projectNameM"></Input>
        </Col>
        <Col span="6">
        <label for="URLM">URL:</label>
        </Col>
        <Col span="18">
        <Input v-model="project.url"
          element-id="URLM"></Input>
        </Col>
        <Col span="6">
        <label for="protocolM">协议:</label>
        </Col>
        <Col span="18">
        <Select placeholder="请选择"
          v-model="project.protocol"
          class="input"
          clearable
          element-id="protocolM">
          <Option v-for="(item, index) in protocols"
            :value="item.value"
            :key="index">{{item.name}}</Option>
        </Select>
        </Col>
        <Col span="6">
        <label for="descriptionM">描述:</label>
        </Col>
        <Col span="18">
        <Input v-model="project.description"
          element-id="descriptionM"></Input>
        </Col>
      </Row>
      <div slot="footer">
        <Button @click.native="cancel">取消</Button>
        <Button type="info"
          @click.native="confirm"
          :disabled="disabledButton">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getProjects, addProject, updateProject } from '@/api';
import listMixins from './list.mixins';
import ListOperation from './List.operation';

export default {
  name: 'List',
  mixins: [listMixins],
  components: { ListOperation },
  computed: {
    disabledButton() {
      return (
        !this.project.name ||
        !this.project.url ||
        !this.project.protocol ||
        !this.project.description
      );
    },
  },
  data() {
    return {
      query: {
        name: '',
        url: '',
        protocol: '',
      },
      project: {
        name: '',
        url: '',
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
    edit(index) {
      const data = this.tableData[index];
      this.showModal = true;
      this.project = Object.assign({}, this.project, data);
    },
    cancel() {
      this.showModal = false;
      this.project = {
        name: '',
        url: '',
        protocol: '',
        version: '1.0',
        description: '',
        status: 1,
      };
    },
    confirm() {
      if (this.project.id) {
        updateProject(this.project).then(res => {
          this.cancel();
          if (res.code === 200) {
            this.queryList();
            this.$Message.success('更新成功');
          } else {
            this.$Message.error(res.message || '更新失败');
          }
        });
      } else {
        addProject(this.project).then(() => {
          this.cancel();
          this.queryList();
        });
      }
    },
    bindOperation() {
      const self = this;
      this.columns.push({
        title: '操作',
        width: 200,
        align: 'center',
        render(h, { row, index }) {
          return h(ListOperation, {
            props: {
              data: row,
            },
            on: {
              'on-edit': () => {
                self.edit(index);
              },
              'on-delete': () => {
                self.queryList();
              },
            },
          });
        },
      });
    },
  },
  created() {
    this.queryList();
    this.bindOperation();
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

.project-modal {
  .ivu-modal-body {
    .ivu-col {
      margin-top: 15px;

      &:nth-child(odd) {
        text-align: right;
        padding-right: 15px;
      }
    }
  }
}
</style>
