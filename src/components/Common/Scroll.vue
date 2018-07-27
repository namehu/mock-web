<template>
  <div class="v-scroll"
    :class="scrllBarClass"
    :style="{'height': height + 'px'}">
    <div class="v-scorll-content">
      <slot></slot>
    </div>
    <div class="v-scroll-bar"
      :style="{
        height: `${scrollBarHeight}px`,
        transform: `translate(0, ${scrollBarTransY}px)`}"></div>
  </div>
</template>

<script>
/* eslint-disable  no-param-reassign */
export default {
  name: 'VScroll',
  props: {
    height: {
      type: Number,
      default: 0,
    },
    barPosition: {
      type: String,
      default: 'right',
    },
  },
  computed: {
    scrllBarClass() {
      return {
        'v-scrollbar-right': this.barPosition !== 'left',
        'v-scrollbar-left': this.barPosition === 'left',
      };
    },
  },
  data() {
    return {
      eventType: 'mousewheel',
      scrollBarHeight: 40,
      scrollBarTransY: 0,
    };
  },
  methods: {
    // 事件兼容处理， 同步不同浏览器之间的滚动处理
    eventCompat(event) {
      const type = event.type;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        event.delta = event.wheelDelta
          ? event.wheelDelta / 120
          : -(event.detail || 0) / 3;
      }
      if (event.srcElement && !event.target) {
        event.target = event.srcElement;
      }
      if (!event.preventDefault && event.returnValue !== undefined) {
        event.preventDefault = () => {
          event.returnValue = false;
        };
      }
      /* ......其他一些兼容性处理 */
      event.preventDefault();
      return event;
    },
    // 绑定滚动事件
    bindScroll() {
      const el = this.$el;
      if (document.mozFullScreen !== undefined) {
        this.eventType = 'DOMMouseScroll';
      }
      if (window.addEventListener) {
        // Chrome || FF
        el.addEventListener(this.eventType, this.handleEventListener);
      } else if (window.attachEvent) {
        // IE
        this.eventType = `on${this.eventType}`;
        el.attachEvent(this.eventType, this.handleAttachEvent);
      }
    },
    handleEventListener(e) {
      this.handleScroll.call(window, this.eventCompat(e));
    },
    handleAttachEvent(event) {
      const e = event || window.event;
      this.handleScroll.call(this.$el, this.eventCompat(e));
    },
    handleScroll(event) {
      const height = this.$el.clientHeight;
      const childrenElement = this.$el.firstChild;
      const childrenHeight = childrenElement.clientHeight;
      const h = childrenHeight - height;
      if (h <= 0) return;

      const delta = event.delta;
      const tr = this.getTransform(childrenElement);
      let X = 0;
      if (tr && tr !== 'none') {
        const v = tr
          .split('(')[1]
          .split(')')[0]
          .split(',');
        X = parseInt(v[v.length - 1], 10);
      }

      // console.log(tr);
      // FIXME： IE 获取getTransform无效

      if (delta < 0) {
        X -= 100;
        if (Math.abs(X) > h) X = -h;
      } else {
        X += 100;
        X = X >= 0 ? 0 : X;
      }
      const transfromValue = `translate3d(0, ${X}px, 0)`;
      [
        'transform',
        'webkitTransform',
        'mozTransform',
        'msTransform',
        'oTransform',
      ].forEach(v => {
        childrenElement.style[v] = transfromValue;
      });

      this.scrollBarTransY = Math.abs(X / h);
      this.scrollBarTransY =
        this.scrollBarTransY * (height - this.scrollBarHeight);
    },
    //   // 获取transform属性值
    getTransform(el) {
      const st = window.getComputedStyle(el);
      const tr =
        st.getPropertyValue('-webkit-transform') ||
        st.getPropertyValue('-moz-transform') ||
        st.getPropertyValue('-ms-transform') ||
        st.getPropertyValue('-o-transform') ||
        st.getPropertyValue('transform') ||
        'FAIL';
      return tr;
    },
    initBar() {
      const height = this.$el.clientHeight;
      const childrenElement = this.$el.firstChild;
      const childrenHeight = childrenElement.clientHeight;
      if (childrenHeight && height && childrenHeight > height) {
        const h = (childrenHeight / height).toFixed(4);
        this.scrollBarHeight = (height / h).toFixed(4);
        console.log(this.clientHeight);
      } else {
        this.scrollBarHeight = 0;
      }
    },
  },
  mounted() {
    this.bindScroll();
    this.initBar();
  },
  destroyed() {
    // TODO: 这里需要注意事件是否重复绑定以及组件销毁只有事件没有销毁掉。
    // 事件销毁.
    if (window.addEventListener !== undefined) {
      this.$el.removeEventListener.call(
        window,
        this.eventType,
        this.handleEventListener,
      );
    } else if (window.attachEven !== undefined) {
      this.$el.detachEvent(this.eventType, this.handleAttachEvent);
    }
  },
};
</script>

<style lang="scss" scoped>
.v-scroll {
  position: relative;
  overflow: hidden;
  width: 100%;

  &.v-scrollbar-left {
    padding-left: 5px;

    .v-scroll-bar {
      left: 0;
    }
  }

  &.v-scrollbar-right {
    padding-right: 5px;

    .v-scroll-bar {
      right: 0;
    }
  }

  .v-scorll-content {
    transition: transform 0.3s linear;
  }

  .v-scroll-bar {
    position: absolute;
    top: 0;
    height: 40px;
    width: 5px;
    border-radius: 4px;
    background-color: #666666;
    z-index: 11;
    transition: all 0.2s linear;
  }
}
</style>
