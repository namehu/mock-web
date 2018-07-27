<template>
  <div class="list-operation">
    <Tooltip content="查看"
      placement="top"
      :delay="200">
      <Icon type="eye"
        class="icon"
        :style="{'color': '#1c2438'}"
        @click.native="$router.push(`/project/${data.id}`)"></Icon>
    </Tooltip>
    <Tooltip content="编辑"
      placement="top"
      :delay="200">
      <Icon type="ios-compose-outline"
        class="icon"
        :style="{'color': '#2d8cf0'}"
        @click.native="$emit('on-edit')"></Icon>
    </Tooltip>
    <Tooltip content="删除"
      placement="top"
      :delay="200">
      <Icon type="ios-trash-outline"
        class="icon"
        :style="{'color': '#ed3f14'}"
        @click.native="deleteRow"></Icon>
    </Tooltip>
  </div>
</template>

<script>
import { deleteProject } from '@/api';

export default {
  name: 'ListOperation',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    delete() {
      // 删除
      deleteProject(this.data.id).then(res => {
        if (res.code === 200) {
          this.$Message.success('删除成功');
          this.$emit('on-delete');
        } else {
          this.$Message.error('删除失败');
        }
      });
    },
    deleteRow() {
      const self = this;
      this.$Modal.confirm({
        content: '确认删除?',
        onOk() {
          self.delete();
        },
      });
    },
  },
};
</script>

<style lang="scss">
.list-operation {
  button {
    margin-right: 5px;
    padding: 0;
    width: 60px;
  }
  button:last-child {
    margin: 0;
  }
  i {
    font-size: 2em;
  }

  .icon {
    cursor: pointer;
    width: 30px;
    margin: 0 5px;
    text-align: center;
    font-size: 30px;
  }
}
</style>
