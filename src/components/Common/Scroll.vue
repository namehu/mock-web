<template>
  <div class="v-scroll">
    <div class="v-scroll-wrapper"
      :style="[scrollWrapperStyle]">
      <div class="v-scorll-content"
        :style="[scrollContentStyle]">
        <div class="v-scorll-content-wrapper"
          ref="scrollContent"
          :style="[scrollContentWrapperStyle]">
          <slot></slot>
        </div>
      </div>
      <!-- 竖向滚动条 -->
      <div v-show="showYBar"
        class="v-scroll-bar-y"
        :style="[scrollBarYStyle]"
        @mousedown.prevent="handleYBarMouseDown"></div>
      <!-- 横向滚动条 -->
      <div v-show="showXBar"
        class="v-scroll-bar-x"
        :style="[scrollBarXStyle]"
        @mousedown.prevent="handleXBarMouseDown"> </div>
    </div>
  </div>
</template>

<script>
import Event from './event';

export default {
  name: 'VScroll',
  props: {
    // 滚动条宽度
    width: {
      type: [String, Number],
      default: 8,
    },
    // 滚动条位置
    position: {
      type: [String, Array],
      default: 'right',
    },
    // 滚动条距离内容距离
    offset: {
      type: Number,
      default: 2,
    },
    // 是否显示滚动条
    show: {
      type: [Boolean, Array],
      default: true,
    },
    // 滚动内容宽度
    contentWidth: {
      type: Number,
      default: 0,
    },
    // 滚动内容高度
    contentHeight: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    scrollWrapperStyle() {
      const bw = `${this.barWidthNum}px`;
      return {
        'padding-top': this.XBarPosition === 'top' ? bw : null,
        'padding-bottom': this.XBarPosition !== 'top' ? bw : null,
        'padding-right': this.YBarPosition !== 'left' ? bw : null,
        'padding-left': this.YBarPosition == 'left' ? bw : null,
      };
    },
    scrollContentStyle() {
      return {
        height: `${this.height_}px`,
        width: `${this.width_}px`,
      };
    },
    scrollContentWrapperStyle() {
      return {
        transform: `translate(${this.translateContentX}px, ${
          this.translateContentY
        }px)`,
        'transition-duration':
          this.mouseDownY || this.mouseDownX ? 'unset' : null,
      };
    },
    scrollBarYStyle() {
      return {
        width: this.barWidth_,
        top: this.XBarPosition === 'top' ? this.barWidth_ : null,
        right: this.YBarPosition !== 'left' ? 0 : null,
        left: this.YBarPosition === 'left' ? 0 : null,
        height: `${this.scrollYBarHeight}px`,
        transform: `translate(0, ${this.scrollBarTransY}px)`,
        'transition-duration': this.mouseDownY ? 'unset' : null,
      };
    },
    scrollBarXStyle() {
      return {
        width: `${this.scrollXBarWidth}px`,
        height: this.barWidth_,
        left: this.YBarPosition === 'left' ? this.barWidth_ : null,
        top: this.XBarPosition === 'top' ? 0 : null,
        bottom: this.XBarPosition !== 'top' ? 0 : null,
        transform: `translate(${this.scrollBarTransX}px, 0)`,
        'transition-duration': this.mouseDownX ? 'unset' : null,
      };
    },
  },
  data() {
    return {
      height_: 0, // 包裹的文本区域高度
      width_: 0,
      showXBar: true,
      showYBar: true,
      barWidth_: '5px', // 滚动条宽度
      barWidthNum: 5, // 滚动条宽度数字
      XBarPosition: 'bottom',
      YBarPosition: 'right',
      translateContentX: 0,
      translateContentY: 0,
      eventType: 'mousewheel',
      scrollYBarHeight: 40,
      scrollXBarWidth: 40,
      scrollBarTransX: 0,
      scrollBarTransY: 0,
      mouseDownY: false, // 点击Y滚动条
      mouseDownX: false, // 点击x滚动条
      mouseX: 0,
      mouseY: 0,
    };
  },
  methods: {
    // 初始化数据
    initLocalData() {
      const show = this.show;
      // 初始化显示滚动条
      if (typeof show === 'boolean') {
        this.showXBar = this.showYBar = show;
      } else if (show instanceof Array) {
        this.showXBar = !!show[0];
        this.showYBar = !!show[1];
      }
      // 滚动条宽度
      const bw = this.width;
      if (bw) {
        if (typeof bw === 'string') {
          this.barWidth_ = bw;
          this.barWidthNum = parseInt(bw) + this.offset;
        } else {
          this.barWidth_ = `${bw}px`;
          this.barWidthNum = bw + this.offset;
        }
      }
      // 内容区域宽高
      this.width_ = this.contentWidth || this.$el.parentNode.clientWidth;
      this.width_ -= this.barWidthNum;
      this.height_ = this.contentHeight || this.$el.parentNode.clientHeight;
      this.height_ -= this.barWidthNum;
      // 滚动条位置
      const pos = this.position;
      if (pos instanceof Array) {
        this.XBarPosition = pos[0];
        this.YBarPosition = pos[1];
      } else {
        this.YBarPosition = pos || 'right';
      }
    },
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
      return event;
    },
    handleScroll(event) {
      const ev = this.eventCompat(event);
      // const height = this.$el.clientHeight;
      const childrenElement = this.$refs.scrollContent;
      const childrenHeight = childrenElement.scrollHeight;
      const h = childrenHeight - this.height_;
      if (h > 0) {
        let Y = this.translateContentY;
        if (ev.delta < 0) {
          Y -= 100;
          if (Math.abs(Y) > h) Y = -h;
        } else {
          Y += 100;
          Y = Y >= 0 ? 0 : Y;
        }
        this.translateContentY = Y;
        this.scrollBarTransY = Math.abs(Y / h);
        this.scrollBarTransY =
          this.scrollBarTransY * (this.height_ - this.scrollYBarHeight);
      }
    },
    initBar() {
      const scrollContentEl = this.$refs.scrollContent;
      if (scrollContentEl) {
        const h = this.height_;
        const SH = scrollContentEl.scrollHeight;
        if (SH && h && SH > h) {
          this.scrollYBarHeight = (h / (SH / h)).toFixed(4);
        } else {
          this.scrollYBarHeight = 0;
          this.showYBar = false;
        }

        const w = this.width_;
        const SW = scrollContentEl.scrollWidth;
        if (SW && w && SW > w) {
          this.scrollXBarWidth = parseFloat((w / (SW / w)).toFixed(4));
        } else {
          this.scrollXBarWidth = 0;
          this.showXBar = false;
        }
      }
    },
    addEvent() {
      if (document.mozFullScreen !== undefined) {
        this.eventType = 'DOMMouseScroll';
      }
      Event.addEvent(this.$el, this.eventType, this.handleScroll);
      Event.addEvent(document, 'mousemove', this.handleBarMouseMove);
      Event.addEvent(document, 'mouseup', this.handleBarMouseUp);
    },
    handleYBarMouseDown(e) {
      this.mouseDownY = true;
      const mp = this.getMouseXY(e);
      this.mouseX = mp.x;
      this.mouseY = mp.y;
    },
    handleXBarMouseDown(e) {
      this.mouseDownX = true;
      const mp = this.getMouseXY(e);
      this.mouseX = mp.x;
      this.mouseY = mp.y;
    },
    handleBarMouseMove(e) {
      if (this.mouseDownY) {
        const SSH = this.height_ - this.scrollYBarHeight; // scrollbar scroll height 滚动条可滚动的距离
        const mp = this.getMouseXY(e);
        const dY = mp.y - this.mouseY;
        this.scrollBarTransY += dY;
        this.mouseY = mp.y;
        if (this.scrollBarTransY <= 0) {
          this.scrollBarTransY = 0;
        } else if (this.scrollBarTransY >= SSH) {
          this.scrollBarTransY = SSH;
        }

        const SH = this.$refs.scrollContent.scrollHeight;
        const h = SH - this.height_;
        if (dY < 0) {
          if (this.translateContentY >= 0) {
            this.translateContentY = 0;
          } else {
            this.translateContentY -= dY / SSH * h;
          }
        } else {
          if (-this.translateContentY >= h) {
            this.translateContentY = -h;
          } else {
            this.translateContentY -= dY / SSH * h;
          }
        }
      }
      if (this.mouseDownX) {
        const SSW = this.width_ - this.scrollXBarWidth;
        const mp = this.getMouseXY(e);
        const dX = mp.x - this.mouseX;
        this.scrollBarTransX += dX;
        this.mouseX = mp.x;
        if (this.scrollBarTransX <= 0) {
          this.scrollBarTransX = 0;
        } else if (this.scrollBarTransX >= SSW) {
          this.scrollBarTransX = SSW;
        }

        const SW = this.$refs.scrollContent.scrollWidth;
        const w = SW - this.width_;
        if (dX < 0) {
          if (this.translateContentX >= 0) {
            this.translateContentX = 0;
          } else {
            this.translateContentX -= dX / SSW * w;
          }
        } else {
          if (this.translateContentX <= -w) {
            this.translateContentX = -w;
          } else {
            this.translateContentX -= dX / SSW * w;
          }
        }
      }
    },
    handleBarMouseUp() {
      this.mouseDownY = false;
      this.mouseDownX = false;
      this.mouseX = 0;
      this.mouseY = 0;
    },
    getMouseXY(e) {
      let x = 0;
      let y = 0;
      e = e || window.event;
      if (e.pageX) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
        y = e.clientY + document.body.scrollTop - document.body.clientTop;
      }
      return {
        x,
        y,
      };
    },
  },
  mounted() {
    this.initLocalData();
    this.$nextTick(() => {
      this.initBar();
      this.addEvent();
    });
  },
  destroyed() {
    // 事件销毁.
    Event.removeEvent(this.$el, this.eventType, this.handleScroll);
    Event.removeEvent(document, 'mousemove', this.handleBarMouseMove);
    Event.removeEvent(document, 'mouseup', this.handleBarMouseUp);
  },
};
</script>

<style lang="scss" scoped>
.v-scroll {
  .v-scroll-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .v-scorll-content {
    box-sizing: content-box;
    overflow: hidden;

    & > div {
      transition-property: transform;
      transition-duration: 0.3s;
      transition-timing-function: linear;
    }
  }

  .v-scroll-bar-y {
    position: absolute;
    top: 0;
    height: 40px;
    border-radius: 4px;
    background-color: #666666;
    z-index: 11;
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    // transition: all 0.1s linear;
  }
  .v-scroll-bar-x {
    position: absolute;
    left: 0;
    width: 40px;
    border-radius: 4px;
    background-color: #666666;
    z-index: 11;
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: linear;
  }
}
</style>
