<template>
  <div :id="id"
    class="particles"
    :style="{'height': height + 'px'}"></div>
</template>

<script>
import 'particles.js';

export default {
  props: {
    data: String,
  },
  data() {
    return {
      id: `particles-${parseInt(Math.random() * 10000, 10)}`,
      height: 500,
    };
  },
  created() {
    this.$nextTick(() => {
      this.height = window.innerHeight - 10;
      window.particlesJS.load(this.id, 'static/json/particles.json', () => {
        console.log('callback - particles.js config loaded');
      });
    });
  },
};
</script>

<style lang="scss">
.particles {
  position: relative;
  z-index: 2;
  height: 500px;
  width: 100%;
}
</style>
