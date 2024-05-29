<!-- 全屏展示 -->
<template>
  <div v-if="fullscreenOpen">
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"  />
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
      fullscreenOpen:true
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
        screenfull.request(this.$store.state.transmission.SmallCard)
        this.adjustFontSize(true);
      }else{     
        screenfull.request(this.$store.state.transmission.appmine) 
        this.$store.commit('transmission/set_carTitler',true)
        console.log(this.$store.state.transmission.carTitler);
      }
      if (screenfull.isFullscreen) {
        // screenfull.exit();
        this.resetFontSize();
      } 
    },
    // 字体变大
    adjustFontSize(isFullscreen) {
      console.log(this.$store.state.transmission.SmallCard.children.length);
      // this.$store.state.transmission.SmallCard.style.padding='115px'
      let card = this.$store.state.transmission.SmallCard.children;  
      for(let i = 0; i < card.length; i++){
        if(!card[i]) continue; // 检查元素存在性
          
          let fontSize = '';
          
          switch(card[i].className){
            case 'numName':
              fontSize = isFullscreen ? '60px' : '15px';
              break;
            case 'num':
              fontSize = isFullscreen ? '100px' : '26px';
              break;
            case 'yesterdayData':
              fontSize = isFullscreen ? '50px' : '12px';
              break;
            // 可以添加更多case，如果需要
          }
          if(fontSize) card[i].style.fontSize = fontSize;
  // 如果fontSize已被赋值，则更新样式
  // if(fontSize) card[i].style.fontSize = fontSize;
  //       console.log(card[i].className);
  //       if(card[i].className == 'numName'){
  //         card[i].style.fontSize = isFullscreen ? '60px' : '15px';
  //       }
        
  //       if(card[i].className == 'num'){
  //         card[i].style.fontSize = isFullscreen ? '100px' : '26px';
  //       }
  //       if(card[i].className == 'yesterdayData'){
  //         card[i].style.fontSize = isFullscreen ? '50px' : '26px';
  //       }
      }
    },
    // 字体变小
    resetFontSize() {
      let card = this.$store.state.transmission.SmallCard.children; 
      for(let i = 0; i < card.length; i++){
        if(!card[i]) continue; // 检查元素存在性
          
          let fontSize = '';
          
          switch(card[i].className){
            case 'numName':
              fontSize =  '15px';
              break;
            case 'num':
              fontSize = '26px';
              break;
            case 'yesterdayData':
              fontSize = '12px';
              break;
            // 可以添加更多case，如果需要
          }
          if(fontSize) card[i].style.fontSize = fontSize;

        // console.log(card[i].className);
        // if(card[i].className == 'numName'){
        //   card[i].style.fontSize = '15px';
        // }
        
        // if(card[i].className == 'num'){
        //   card[i].style.fontSize = '26px';
        // }
        // if(card[i].className == 'yesterdayData'){
        //   card[i].style.fontSize =  '12px';
        // }
      }
      
    },
    // 屏幕变化事件
    change() {
      this.fullscreenOpen=false
      if(!screenfull.isFullscreen){
        this.$store.commit('transmission/set_carTitler',false)
        this.fullscreenOpen=true
        screenfull.exit();
        this.resetFontSize();
      }
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
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
