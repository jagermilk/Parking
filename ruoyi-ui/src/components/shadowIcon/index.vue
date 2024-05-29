<template>
    <div class="container" @mouseover="showShadow" @mouseout="hideShadow">
      <div class="content" id="content">
        <slot></slot>
      </div>
      <div class="icon" v-show="isHover">
        <screenfull id="screenfull" class="right-menu-item hover-effect"  :isCard="isCard" @parentEvent="fullscreen"  />
      </div>
    </div>
  </template>
  
  <script>
  import Screenfull from '@/components/Screenfull';
  export default {
    components: {
    Screenfull,
  },
  props:['idname'],
    data() {
      return {
        isHover: false,
        isCard:true
      };
    },
    methods: {
      showShadow() {
        this.isHover = true;
      },
      hideShadow() {
        this.isHover = false;
      },
    fullscreen(){
      this.isCard=true
     let a=document.getElementById(this.idname)
     console.log("传输",a);
     this.$store.commit('transmission/set_SmallCard',a)
     this.$store.commit('transmission/set_fontSize',this.fontSize2)
    }
    }
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    height: 100%;
    transition: box-shadow 0.3s ease;
  }
  
  .content {
    /* 你的内容样式 */
    height: 100%;
    background-color: #fff;
   }
   
  .container:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .icon img {
    width: 20px;
    height: 20px;
  }
  </style>
