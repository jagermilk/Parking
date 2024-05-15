<!-- 全屏展示 -->
<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  props:['isCard'],
   data() {
    return {
      isFullscreen: false,
      sonIscard:this.isCard,
      shenme:''
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
        return false
      }
      // this.$emit('parentEvent',this.shenme)
      this.$emit('parentEvent')
      //判断打开的是不是为首页外的卡片
      if(this.sonIscard){
        console.log('ka',this.$store.state.transmission.SmallCard);
        screenfull.request(this.$store.state.transmission.SmallCard)
        // 监听是否关闭全屏
        document.addEventListener("fullscreenchange", () => {
        });
      }else{
        screenfull.request(this.$store.state.transmission.appmine)
      }
  
     
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      console.log('444');
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
