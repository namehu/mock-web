<template>
  <div class="home">
    {{username}}
    <el-button @click="click">按钮</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      username: state => state.name,
    })
  },
  methods: {
    ...mapMutations([
      'UPDATE_NAME',
    ]),
    click() {
      this.UPDATE_NAME('hhaha');
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$store);
  }
};
</script>

<style lang="scss" scoped>

</style>

