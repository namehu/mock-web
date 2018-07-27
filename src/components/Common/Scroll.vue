<template>
  <div class="v-scroll"
    :style="{'height': height + 'px'}">
    <div class="v-scorll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VScroll',
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    bindScroll() {
      const that = this;
      let type = 'mousewheel';
      const el = this.$el;
      // if (!el) {
      //   console.error('element is not exist');
      // } else if (window.addEventListener) {
      //   if (document.mozFullScreen !== undefined) {
      //     type = 'DOMMouseScroll';
      //   }
      //   el.addEventListener(
      //     type,
      //     event => {
      //       fn.call(window, that._eventCompat(event));
      //     },
      //     capture || false,
      //   );
      // } else if (window.attachEvent) {
      //   el.attachEvent('on' + type, event => {
      //     event = event || window.event;
      //     fn.call(el, that._eventCompat(event));
      //   });
      // }
    },
  },
  mounted() {
    this.bindScroll();
  },
};


// // 事件兼容处理
//   _eventCompat(event: any) {
//     var type = event.type;
//     if (type == "DOMMouseScroll" || type == "mousewheel") {
//       event.delta = event.wheelDelta
//         ? event.wheelDelta / 120
//         : -(event.detail || 0) / 3;
//     } //alert(event.delta);
//     if (event.srcElement && !event.target) {
//       event.target = event.srcElement;
//     }
//     if (!event.preventDefault && event.returnValue !== undefined) {
//       event.preventDefault = function() {
//         event.returnValue = false;
//       };
//     } /* ......其他一些兼容性处理 */
//     return event;
//   }

//   // 添加绑定事件
//   addScroll(el: any, fn: Function, capture?: boolean) {
//     const that = this;
//     let type = "mousewheel";
//     if (window.addEventListener) {
//       if (document.mozFullScreen !== undefined) {
//         type = "DOMMouseScroll";
//       }
//       el.addEventListener(
//         type,
//         function(event) {
//           fn.call(window, that._eventCompat(event));
//         },
//         capture || false
//       );
//     } else if (window.attachEvent) {
//       el.attachEvent("on" + type, function(event) {
//         event = event || window.event;
//         fn.call(el, that._eventCompat(event));
//       });
//     }
//   }

//   // 获取transform属性值
//   getTransform(el: Element) {
//     const st = window.getComputedStyle(el);
//     const tr =
//       st.getPropertyValue("-webkit-transform") ||
//       st.getPropertyValue("-moz-transform") ||
//       st.getPropertyValue("-ms-transform") ||
//       st.getPropertyValue("-o-transform") ||
//       st.getPropertyValue("transform") ||
//       "FAIL";
//     return tr;
//   }

//   // 滚动事件处理函数
//   bindScroll(event: any) {
//     event.preventDefault();
//     const height = this.$el.clientHeight;
//     const childrenElement = this.$el.firstChild as HTMLElement;
//     const childrenHeight = childrenElement.clientHeight;
//     const h = childrenHeight - height;
//     if (h <= 0) return;

//     const delta = event.delta;
//     const tr = this.getTransform(childrenElement);
//     let X = 0;
//     if (tr && tr !== "none") {
//       const v = tr
//         .split("(")[1]
//         .split(")")[0]
//         .split(",");
//       X = parseInt(v[v.length - 1]);
//     }

//     if (delta < 0) {
//       X -= 100;
//       if (Math.abs(X) > h) X = -h;
//     } else {
//       X += 100;
//       X = X >= 0 ? 0 : X;
//     }
//     const transfromValue = `translate3d(0, ${X}px, 0)`;
//     ['transform', 'webkitTransform', 'mozTransform', 'msTransform', 'oTransform'].forEach(v=> {
//       childrenElement.style[v] = transfromValue;
//     })
    
//   }
//   // 初始滚动条
//   initBar() {
//     const scrollDom: HTMLDivElement = this.$refs.rsScroll as HTMLDivElement;
//     const height = scrollDom.clientHeight;
//     console.log(height);
//   }

//   mounted() {
//     this.addScroll(this.$el, this.bindScroll);
//     /** TODO: 滚动条需要做一下 */
//     // this.initBar();
//   }

//   destroyed() {
//     //TODO: 这里需要注意事件是否重复绑定以及组件销毁只有事件没有销毁掉。
//     // 事件销毁.
//   }
</script>

<style lang="scss" scoped>
.v-scroll {
  overflow: hidden;
  width: 100%;

  .v-scorll-content {
    transition: transform 0.3s linear;
  }
}
</style>
