<template>
  <div class="index">
    <!-- 标题 -->
    <div class="carTitler" v-if="Titler">项目停车概况</div>
    <el-row :gutter="12" class="bg">
      <!-- 板块一 -->
      <el-col :span="12">
          <div class="grid-content bg-purple one  ">
            <shadowIcon :idname="'one'">
              <div class="tag" shadow="hover" id="one">
                <div class="numName" >在场车辆</div>
                <div class="num">9999</div>
                <div class="yesterdayData">昨日 <span>888</span></div>
              </div>
            </shadowIcon>
            <shadowIcon :idname="'two'">
              <div class="tag" shadow="hover" id="two">     
                <div class="numName">在场车辆</div>
                <div class="num">9999</div>
                <div class="yesterdayData">昨日 <span>888</span></div>
              </div>
            </shadowIcon>
            <shadowIcon :idname="'three'">
              <div class="tag" shadow="hover" id="three" >     
                <div class="numName">在场车辆</div>
                <div class="num">9999</div>
                <div class="yesterdayData">昨日 <span>888</span></div>
              </div>
            </shadowIcon>
            <shadowIcon :idname="'four'">
              <div class="tag" shadow="hover" id="four">     
                <div class="numName">在场车辆</div>
                <div class="num">9999</div>
                <div class="yesterdayData">昨日 <span>888</span></div>
              </div>
            </shadowIcon>
            <shadowIcon :idname="'five'" >
              <div class="tag" shadow="hover" id="five">     
                <div class="numName">在场车辆</div>
                <div class="num">9999</div>
                <div class="yesterdayData">昨日 <span>888</span></div>
              </div>
            </shadowIcon>
            <shadowIcon :idname="'six'">
              <div class="tag" shadow="hover" id="six">     
                <div class="numName">在场车辆</div>
                <div class="num">9999</div>
                <div class="yesterdayData">昨日 <span>888</span></div>
              </div>
            </shadowIcon>
          </div>
        
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
            <el-card class="inMangement" >
              <div slot="header" class="clearfix">
              <span >管理入口</span> 
              </div> 
              <el-row :gutter="10">
                <el-col :span="12" v-for="(item, index) in items" :key="index">
                  <div class="icon-text-container">
                      <i :class="'el-icon-' + item.icon"></i> 
                    <span>{{ item.text }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
        </div>
      </el-col>
      <!-- 车道列表 -->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <shadowIcon :idname="'seven'" >
      
            <div slot="header" class="clearfix" >
               <span>车道列表</span> 
            </div>
            <el-table
              :data="tableData"
              max-height="154"
              style="width: 100%"
              size="mini"
              fit
              id="seven"
            >
              <el-table-column prop="date" label="名称"> </el-table-column>
              <el-table-column prop="name" label="网络"> </el-table-column>
              <el-table-column label="查看">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="
                      handleEdit(scope.$index, scope.row), (visible = true)
                    "
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
        </shadowIcon>
        </div>
      </el-col>
    </el-row>
    <!-- 饼状图 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <shadowIcon :idname="'eight'" >
          <div class="grid-content bg-purple"  id="eight">
            <div class="numName">收费汇总</div>
            <div
              class="onee"
              style="height: 90%; "
            ></div>         
          </div>
        </shadowIcon>
      </el-col>
      <el-col :span="6">
        <shadowIcon :idname="'nine'">
          <div class="grid-content bg-purple">
            <div
              class="onee"
              style="height: 100%;"
              id="nine"
            ></div>
          </div>
        </shadowIcon>
      </el-col>
      <el-col :span="6">
        <shadowIcon :idname="'ten'">
          <div class="grid-content bg-purple">
            <div
              class="onee"
              style="height: 100%;"
              id="ten"
            ></div>
          </div>
        </shadowIcon>
      </el-col>
      <el-col :span="6">
        <shadowIcon :idname="'eleven'">
          <div class="grid-content bg-purple">
            <div
              class="onee"
              style="height: 100%;"
              id="eleven"
            ></div>
          </div>
        </shadowIcon>
      </el-col>
    </el-row>
    <!-- 折线图 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <shadowIcon :idname="'twelve'">
          <div
            class="twoo"
            style="height: 100%; background-color: #fff"
            id="twelve"
          ></div>
          <!-- <div class="grid-content bg-purple"></div> -->
        </shadowIcon>
      </el-col>
      <el-col :span="12">
        <shadowIcon :idname="'thirteen'">
          <div
            class="twoo"
            style="height: 100%; background-color: #fff"
            id="thirteen"
          ></div>
          <!-- <div class="grid-content bg-purple"></div> -->
        </shadowIcon>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Screenfull from "@/components/Screenfull";
import ShadowIcon from "@/components/shadowIcon";
import { mapState } from 'vuex';
export default {
  components: {
    Screenfull,
    ShadowIcon,
  },
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.7",
      isCard: true,
      //鼠标移入
      isHover: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "王小虎",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "王小虎",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "王小虎",
        },
      ],
      visible: false,
      items: [
        { icon: 'delete', text: '两字' },
        { icon: 'share',  text: '其他四字' },
        { icon: 'delete', text: '两字' },
        { icon: 'share', text: '另两字' },
        { icon: 'delete', text: '两字' },
        { icon: 'share',  text: '其他四字' },
        { icon: 'delete', text: '两字' },
        { icon: 'share', text: '另两字' },
        { icon: 'delete', text: '两字' },
        { icon: 'share',  text: '其他四字' }
        // 添加更多项...
      ],
      chartInstance: null,
    };
  },
  mounted() {
    this.pieChart(), this.lineChart();
    this.resizeChart();
    window.addEventListener('resize', this.resizeChart);
  },
  methods: {
    resizeChart() {
         if (this.chartInstance) {
           this.chartInstance.resize();
         }
       },
    showShadow() {
      this.isHover = true;
    },
  hideShadow() {
    this.isHover = false;
  },
    goTarget(href) {
      window.open(href, "_blank");
    },
    pieChart() {
      var chartDomAll = document.querySelectorAll(".onee");
      chartDomAll.forEach(function (chartDom) {
        var myChart = echarts.init(chartDom);
        var option;
        window.addEventListener("resize", function () {
          // console.log("变meimei",);
          myChart.resize();
        });
        option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 12,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 1048, name: "Search Engine" },
                { value: 735, name: "Direct" },
              ],
            },
          ],
        };
        option && myChart.setOption(option);
      });
    },
    //折线图
    lineChart() {
      var chartDomAll = document.querySelectorAll(".twoo");
      chartDomAll.forEach(function (chartDom) {
        console.log(chartDom);
        var myChart = echarts.init(chartDom);
        var option;
        window.addEventListener("resize", function () {
          myChart.resize();
        });
        option = {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true,
            },
          ],
        };
        option && myChart.setOption(option);
      });
    },
    // 绑定全屏的dom
    fullscreen(idname) {
      this.isCard = true;
      let a = document.getElementById(idname);
      this.$store.commit("transmission/set_SmallCard", a);
    },
  },
  computed: {
    Titler:function(){
      return this.$store.state.transmission.carTitler;
    },
  },
  watch: {
    Titler(newVal, oldVal) {
      // 这里监听carTitler的变化
      console.log('carTitler changed from', oldVal, 'to', newVal);
    },
  },
};
</script>

<style scoped lang="scss">
.carTitler{
  width: 100%;
  height: 60px;

  font-size: 22px;
  color: #fff;
  line-height: 60px;
  text-align: center;
  background-image: url(../assets/images/title_bg.jpg);

}
.index {
  height: 100%;
  // background-color: #f5f6fa;
  font-family: GB;
  background-image: url('../assets/images/index-bg.jpeg') ;
  background-repeat: no-repeat; /* 防止背景图片平铺 */
  background-size: cover; /* 图片缩放以填满容器 */
    background-position: center; /* 图片居中 */
  
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
  // border-radius: 4px;
  // background-color: #f5f6fa;
}
//鼠标移入效果
.container {
  position: relative;
  height: 100%;
  transition: box-shadow 0.3s ease;
}
.container:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

// .bg-purple-dark {
//   background: #fff;
// }
.bg-purple {
  height: 100%;
  background: #fff;
 
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  // border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
  
}
// 第一个数据展示样式
.one{
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 创建3列的网格 */
  grid-gap: 8px; /* 为网格中的元素添加间距 */
  width: 100%; /* 根据需要设置宽度 */
  // background-color:#f5f6f9 ;
  background-color: transparent;
  .tag{
    background-color: #fff;
    height: 100% !important; 
    padding: 13px 15px 15px 15px;
    display: flex;
    flex-direction: column; /* 设置为垂直布局 */
    justify-content: space-around; /* 在主轴（这里是垂直方向）上均匀分配空间 */
    .numName{
      font-size: 15px;  
      font-family: GB;
      color: #62676b;
      
    }
    .num{
      font-size: 26px;
      color: #3d9bff;
      text-align: center;
    }  
    .yesterdayData{
      font-size: 12px; 
      color: #94999d;
    }
    }
}


.icon-text-container {
  display: flex;
  align-items: center; /* 对齐图标和文字 */
  margin-bottom: 10px; /* 可选：增加底部间距 */
}

/* 可选：调整图标和文字的间距 */
.icon-text-container > i {
  margin-right: 10px;
}

/* 可选：调整文字样式 */
.icon-text-container > span {
  font-size: 14px; /* 调整字体大小 */
}
li {
  list-style-type: none;
}
.i {
  float: right;
  margin-right: 10px;
}
.clearfix {
  height: 2px;
  font-size: 14px;
}
.carList {
  height: 100%;
}
.inMangement {
  height: 100%;
}
.infinite-list {
  background: rgb(221, 211, 211);
  height: 146px;
}
</style>
