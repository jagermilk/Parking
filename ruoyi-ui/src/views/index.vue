<template>
  <div class="index">
    <el-row :gutter="10">
      <el-col :span="12">
        <shadowIcon :idname="'one'">
          <div class="grid-content bg-purple">
            <el-card class="one" shadow="hover">1</el-card>
            <el-card class="two" shadow="hover">2</el-card>
            <el-card class="three" shadow="hover">3</el-card>
            <el-card class="four" shadow="hover">4</el-card>
            <el-card class="five" shadow="hover">5</el-card>
            <el-card class="six" shadow="hover">6</el-card>
          </div>
        </shadowIcon>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="inMangement">
            <div slot="header" class="clearfix">
            <span>管理入口</span> 
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
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="carList">
            <div slot="header" class="clearfix">
               <span>车道列表</span> 
              <el-tooltip
                class="item"
                effect="dark"
                content="车道列表"
                placement="top-start"
              >
                <i
                  style="float: right; padding: 3px 0"
                  class="el-icon-warning"
                ></i>
              </el-tooltip>
            </div>
            <el-table
              :data="tableData"
              max-height="154"
              style="width: 100%"
              size="mini"
              fit
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
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <shadowIcon :idname="'three'">
          <div class="grid-content bg-purple">
            <div
              class="onee"
              style="height: 90%; background-color: #d3dce6"
              id="three"
            ></div>
          </div>
        </shadowIcon>
      </el-col>
      <el-col :span="6">
        <shadowIcon :idname="'four'">
          <div class="grid-content bg-purple">
            <div
              class="onee"
              style="height: 90%; background-color: #04395e"
              id="four"
            ></div>
          </div>
        </shadowIcon>
      </el-col>
      <el-col :span="6">
        <shadowIcon :idname="'five'">
          <div class="grid-content bg-purple">
            <div
              class="onee"
              style="height: 90%; background-color: #04395e"
              id="five"
            ></div>
          </div>
        </shadowIcon>
      </el-col>
      <el-col :span="6">
        <shadowIcon :idname="'six'">
          <div class="grid-content bg-purple">
            <div
              class="onee"
              style="height: 90%; background-color: #04395e"
              id="six"
            ></div>
          </div>
        </shadowIcon>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <shadowIcon :idname="'seven'">
          <div
            class="twoo"
            style="height: 100%; background-color: #04395e"
            id="seven"
          ></div>
          <div class="grid-content bg-purple"></div>
        </shadowIcon>
      </el-col>
      <el-col :span="12">
        <shadowIcon :idname="'eight'">
          <div
            class="twoo"
            style="height: 100%; background-color: #04395e"
            id="eight"
          ></div>
          <div class="grid-content bg-purple"></div>
        </shadowIcon>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Screenfull from "@/components/Screenfull";
import ShadowIcon from "@/components/shadowIcon";
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
      ]
    };
  },
  mounted() {
    this.pieChart(), this.lineChart();
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
    pieChart() {
      var chartDomAll = document.querySelectorAll(".onee");
      chartDomAll.forEach(function (chartDom) {
        var myChart = echarts.init(chartDom);
        var option;
        window.addEventListener("resize", function () {
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
};
</script>

<style scoped lang="scss">
.index {
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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

.one {
  float: left;
  width: 32%;
  height: 48%;
  margin-right: 13px;
}
.two {
  float: left;
  width: 32%;
  height: 48%;
  margin-right: 13px;
}
.three {
  float: left;
  width: 32%;
  height: 48%;
}
.five {
  float: left;
  width: 32%;
  height: 48%;
}
.four {
  float: left;
  width: 32%;
  height: 48%;
  margin-top: 10px;
  margin-right: 13px;
}
.five {
  float: left;
  width: 32%;
  height: 48%;
  margin-right: 13px;
  margin-top: 10px;
}
.six {
  float: left;
  width: 32%;
  height: 48%;
  margin-top: 10px;
}
.el-card {
  background-color: pink; /* 设置背景色，便于观察 */
  //margin-right: 8px;
  //margin-bottom: 10px; /* 设置下边距，实现均匀分布 */
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
