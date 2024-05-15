<template>
    <div class="index">
      <el-row :gutter="10">
        <el-col :span="12">
          <shadowIcon :idname="'one'">
            <div class="grid-content bg-purple">
            </div>
          </shadowIcon>
        </el-col>
        <el-col :span="12">
          <shadowIcon :idname="'two'">
            <div class="grid-content bg-purple"></div>
          </shadowIcon>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6"  >
          <shadowIcon :idname="'three'">
            <div class="grid-content bg-purple"  >
            <div class="one" style="height: 90%; background-color: #d3dce6;" id='three'></div>
          </div>
          </shadowIcon>
        </el-col> 
      <el-col :span="6"  >
          <shadowIcon :idname="'four'">
            <div class="grid-content bg-purple"  >
            <div class="one" style="height: 90%; background-color: #04395e;" id='four'></div>
          </div>
          </shadowIcon>
      </el-col>
      <el-col :span="6"  >
          <shadowIcon :idname="'five'">
            <div class="grid-content bg-purple"  >
            <div class="one" style="height: 90%; background-color: #04395e;" id='five'></div>
          </div>
          </shadowIcon>
      </el-col>
      <el-col :span="6"  >
          <shadowIcon :idname="'six'">
            <div class="grid-content bg-purple"  >
            <div class="one" style="height: 90%; background-color: #04395e;" id='six'></div>
          </div>
          </shadowIcon>
      </el-col>
      </el-row> 
      <el-row :gutter="10">
        <el-col :span="12">
          <shadowIcon :idname="'seven'">
            <div class="two" style="height: 100%; background-color: #04395e;" id='seven'></div>
            <div class="grid-content bg-purple"></div>
          </shadowIcon>
        </el-col>
        <el-col :span="12">
          <shadowIcon :idname="'eight'">
            <div class="two" style="height: 100%; background-color: #04395e;" id='eight'></div>
            <div class="grid-content bg-purple"></div>
          </shadowIcon>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import Screenfull from '@/components/Screenfull';
import ShadowIcon from '@/components/shadowIcon';
export default {
  components: {
    Screenfull,
    ShadowIcon
  },
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.7",
      isCard:true,
    //鼠标移入
    isHover: false
      
    };
  },
  mounted(){
    this.pieChart(),
    this.lineChart()
  },
  methods: {
    showShadow() {
        this.isHover = true;
      },
      hideShadow() {
        this.isHover = false;
      },
    goTarget(href) {
      window.open(href, "_blank");
    },
    pieChart(){
      var chartDomAll = document.querySelectorAll('.one');
      chartDomAll.forEach(function(chartDom){
          var myChart = echarts.init(chartDom);
          var option;
          window.addEventListener('resize', function() {
            myChart.resize();
          });
        option ={
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 12,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
              ]
            }
          ]
        }
          option && myChart.setOption(option);
    })
    },
    //折线图
    lineChart() {
      var chartDomAll = document.querySelectorAll('.two');
      chartDomAll.forEach(function(chartDom){
        console.log(chartDom);
          var myChart = echarts.init(chartDom);
          var option;
          window.addEventListener('resize', function() {
            myChart.resize();
          });
          option = {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
              }
            ]
          };
          option && myChart.setOption(option);
    })
    },
    // 绑定全屏的dom
    fullscreen(idname){
      this.isCard=true
     let a=document.getElementById(idname)
     this.$store.commit('transmission/set_SmallCard',a)
    }
  }
};
</script>

<style scoped lang="scss">
  .index{
    height: 100%;
  }
  .el-row {
    height: 32%;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    height: 100%;
    border-radius: 4px;
  }
  //鼠标移入效果
  .container {
    position: relative;
    height: 100%;
    transition: box-shadow 0.3s ease;
  }
  
  // .content {
  //   /* 你的内容样式 */
  //   height: 100%;
  //   background-color: #d3dce6;
  //  }
   
  .container:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    height: 100%;
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

