<template>
  <div class="list">
    <Table :data="tableData" :columns="columns"></Table>
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
      pageNumber: 1,
      pageSize: 10,
      tableData: [],
    };
  },
  methods: {
    // 查询项目列表
    queryList() {
      getProjects(this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.tableData = res.data;
        }
      });
    },
  },
  created() {
    this.queryList();
  },
};
</script>

<style lang="scss" scoped>
.list {
}
</style>
