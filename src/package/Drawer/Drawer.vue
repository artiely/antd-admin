<template>
  <div>
    <div :class="['mask', !isCollapse ? 'open' : 'close']" @click="close"></div>
    <div :class="['drawer', placement, !isCollapse ? 'open' : 'close']">
      <div ref="drawer" style="position: relative; height: 100%;background:#fff">
        <slot></slot>
      </div>
      <div v-if="showHandler" :class="['handler-container', placement]" ref="handler" @click="handle">
        <slot v-if="$slots.handler" name="handler"></slot>
        <div v-else class="handler">
          <a-icon :type="isCollapse ? 'close'  : 'bars'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  data() {
    return {
      drawerWidth: 0
    }
  },
  props: {
    isCollapse: { type: Boolean, default: false },
    placement: {
      type: String,
      default: 'left'
    },
    showHandler: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.drawerWidth = this.getDrawerWidth()
  },
  watch: {
    drawerWidth: function(val) {
      if (!this.$refs.handler) return
      if (this.placement === 'left') {
        this.$refs.handler.style.left = val + 'px'
      } else {
        this.$refs.handler.style.right = val + 'px'
      }
    }
  },
  methods: {
    open() {
      this.$emit('change', true)
    },
    close() {
      this.$emit('change', false)
    },
    handle() {
      this.$emit('change', !this.isCollapse)
    },
    getDrawerWidth() {
      return this.$refs.drawer.clientWidth || 0
    }
  }
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  z-index: 100;
  top:0;
  left:0;
  &.open {
    display: inline-block;
  }
  &.close {
    display: none;
  }
}
.drawer {
  position: fixed;
  height: 100%;
  transition: all 0.2s;
  z-index: 100;
  flex-direction: row;
  &.left {
    left: 0px;
    &.open {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    }
    &.close {
      transform: translateX(-100%);
    }
  }
  &.right {
    right: 0px;
    &.open {
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    }
    &.close {
      transform: translateX(100%);
    }
  }
  .sider {
    height: 100%;
  }
}
.handler-container {
  position: fixed;
  top: 200px;
  text-align: center;
  transition: all 0.2s;
  .handler {
    height: 40px;
    width: 40px;
    background-color: #fff;
    z-index: 100;
    font-size: 26px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    line-height: 40px;
  }
  &.left {
    .handler {
      border-radius: 0 5px 5px 0;
    }
  }
  &.right {
    .handler {
      border-radius: 5px 0 0 5px;
    }
  }
}
</style>
