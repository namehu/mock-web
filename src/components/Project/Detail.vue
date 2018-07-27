<template>
  <div class="project-detail">
    <Card :dis-hover="false"
      :shadow="true">
      <h2 class="project-detail-name">{{project.name}}</h2>
      <h5 class="project-detail-description">{{project.description}}</h5>
    </Card>
    <Row :style="{'margin-top': '10px'}">
      <Col span="5">
      <Card :dis-hover="false"
        :shadow="true">
        <DetailApis></DetailApis>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { queryProjectById } from '../../api';
import DetailApis from './Detail.Apis';

export default {
  components: { DetailApis },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      project: {
        name: '',
        description: '暂无描述信息~',
      },
    };
  },
  methods: {
    queryProject() {
      queryProjectById(this.id).then(res => {
        if (res.code === 200) {
          this.project = Object.assign({}, this.project, res.data || {});
        } else {
          this.$Message.error(res.message || '查询项目信息失败');
        }
      });
    },
  },
  created() {
    this.queryProject();
  },
};
</script>
<style lang="scss">
.project-detail {
  &-name {
    font-size: 24px;
    color: #607d8b;
  }

  &-description {
    font-size: 14px;
    color: #999999;
    font-weight: normal;
  }
}
</style>
