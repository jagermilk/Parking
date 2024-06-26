<template>
    <!-- 区域管理 -->
    <div class="app-container">
        <div class="set">
            <!-- 添加区域 -->
            <el-button type="success" class="addRegion"  @click="addOpen">添加区域</el-button>
            <!-- 提示框 -->
            <el-tooltip placement="right">
                <div slot="content">1.区域为子车场,默认车场为大车场,如为大车场内有指定区域单独计费则添加区域
                    <br/>2.子区域需单独设置计费方式
                    <br/>3.月卡车可单独设罟区域月卡
                </div>
                <svg-icon icon-class="prompt"/>
            </el-tooltip>
            <!-- 搜索 -->
            <div class="serach">
                <el-input v-model="serachForm.areaName" placeholder="请输区域名称进行搜索" class='serachinput'></el-input>
                <el-button type="primary" @click="searchList">搜索</el-button>
            </div>
        </div>
        <!-- 列表 -->
        <el-table
        :data="tableData"
        row-key="id"
        :default-expand-all="isExpandAll"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
        <el-table-column
        prop="areaCode"
        label="区域编号"
        align="center"
        >
        </el-table-column>
        <el-table-column
        prop="areaName"
        label="区域名称"
        align="center"
        >
        </el-table-column>
        <el-table-column
        prop="areaParking"
        label="区域车位"
        align="center"
        >
        </el-table-column>
        <el-table-column
        prop="areaRemainPraking"
        label="区域余位"
        align="center"
        >
        </el-table-column>
        <el-table-column
        prop="operate"
        align="center"
        label="操作">
        <template slot-scope="scope">
            <el-button @click="viewFun(scope.row)" type="text" size="small">余位校准</el-button>
            <el-button @click="editFun(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteFun(scope.row)" type="text" size="small">删除</el-button>
        </template>

        </el-table-column>
        </el-table>

         
        <!-- 新增表单 -->
        <el-dialog title="添加区域" :visible.sync="dialogFormVisible" width="30%">
            <!-- 表单 -->
            <el-form ref="form" :rules="rules" :model="ruleForm" label-width="80px">
                <el-form-item label="区域编号" prop="areaCode">
                    <el-input v-model="ruleForm.areaCode"></el-input>
                </el-form-item>
                <el-form-item label="区域名称" prop="areaName">
                    <el-input v-model="ruleForm.areaName"></el-input>
                </el-form-item>
                <el-form-item label="区域车位" prop="areaParking">
                    <el-input v-model="ruleForm.areaParking"></el-input>
                </el-form-item>
                <el-form-item label="剩余车位" prop="areaRemainPraking">
                    <el-input v-model="ruleForm.areaRemainPraking"></el-input>
                </el-form-item>
                <el-form-item label="父区域ID" prop="parentId">
                    <treeselect v-model="ruleForm.parentId" :show-count="true" :options="menuOptions"  :normalizer="normalizerPar" class="treeSelect" />   
                </el-form-item>
                <el-form-item label="上级部门" prop="deptId">
                    <treeselect v-model="ruleForm.deptId" :show-count="true" :options="deptOptions"  :normalizer="normalizer" class="treeSelect" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addArea" v-if="judge==='add'">确 定</el-button>
                <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { getTableList,addBasicArea,delBasicArea,getAreaTree,getIdData,editBasicArea } from '@/api/basicConfiguration/areaManagement';
import { listMenu } from "@/api/system/menu";
import { listDept } from '@/api/system/dept'
import { number } from 'echarts';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
components: { Treeselect },
data(){
    return {
        judge:'',
        serachForm:{
            areaName:''
        },
        areaName:'',
        // 是否展开，默认全部展开
      isExpandAll: true,
        tableData:[],
        // dept:[],
        deptOptions:[],
          // 菜单树选项
        menuOptions: [],
        ruleForm:{
            areaName: '',
            areaParking: '',
            areaRemainPraking: '',
            parentId: undefined,
            deptId: undefined,
            areaCode: '',
        },
        rules: {
            areaName: [
            { required: false, message: '请输入区域名称', trigger: 'blur' },
          ],
          areaParking: [
            { required: false, message: '请输入区域车位数', trigger: 'change' }
          ],
          areaRemainPraking: [
            { required: false, message: '请输入剩余车位数', trigger: 'change' }
          ],
        },
        dialogFormVisible: false,
    }
},
created(){
    this.getList()
    console.log('ruleForm',this.ruleForm);
},
methods:{
    // 获取列表
    getList(){
        let params = {}
        if (this.serachForm) {
            params = Object.assign({}, params, { ...this.serachForm });
        }
        console.log("搜索",this.serachForm);
        console.log('par',params);
        getTableList(params).then(res => {
                console.log('res',res)
                this.tableData = this.handleTree(res.data);
                console.log('this.tableData',this.tableData);
            }).catch(err => {
                console.error('Error getting table list:', err);
            });
    },
    //查询
    searchList(){
        this.getList()
    },
    //新建
    addOpen(){
        this.judge = 'add'
        this.open()
    },
    
    //打开对话框
    open(){
        this.ruleForm = {}; // 清空表单
        this.getTreeselect()
        this.getParentTreeselect()
        this.dialogFormVisible = true
    },
    // 添加区域
  async addArea(){
        const valid = await this.$refs.form.validate()
        console.log('form',this.ruleForm);
      if (!valid) {
        console.log('error submit!!');
        return false;
      }
      try {
        console.log('this.ruleForm',this.ruleForm);
        let params=this.ruleForm
        await addBasicArea(params).then(res => {
          console.log('res',res);
        })
        this.dialogFormVisible = false
        this.ruleForm = {}
        this.getList()
      } catch (error) {
        console.error('Error adding area:', error);
      }
    },
    /** 转换上级部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children,
      };
    },
    //  /** 查询菜单下拉树结构 */
    async getTreeselect() {
      await listDept().then((response) => {
        console.log('response',response);
        this.deptOptions=[]
        const menu = { deptId: 0, deptName: '主类目', children: [] };
        menu.children = this.handleTree(response.data, 'deptId');
        console.log('menu',menu);
        this.deptOptions.push(menu);
        console.log('deptOptions',this.deptOptions);
      });
    },
        /** 转换父区域数据结构 */
    normalizerPar(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.label,
        children: node.children,
      };
    },
    //  /** 查询父区域下拉树结构 */
    async getParentTreeselect() {
      await getAreaTree().then((response) => {
        console.log('response',response);
        this.menuOptions=[]
       
        this.menuOptions=response.data
        console.log('menuOptions',this.menuOptions);
      });
    },
    //编辑
    editFun(data){
        this.judge='edit'
        this.open()
        // 获取当前数据
        getIdData(data.id).then(res=>{
            console.log('res',res);
            this.ruleForm = res.data
            // console.log(res.parentId);
            if(res.data.parentId===0){
                this.ruleForm.parentId=null
            }
        })
    },
    //编辑保存
    editArea(){
        console.log('编辑');
        editBasicArea(this.ruleForm).then(res=>{
            console.log('res',res);
            this.dialogFormVisible = false
            this.getList()
        })
    },
    //删除
    deleteFun(data){
    delBasicArea(data.id).then(res=>{
        this.getList()
    }).catch(err => {
            console.error('Error getting table list:', err);
        });
    },
    //余位校准
    viewFun(){

    }

}
}
</script>
<style lang="scss" scoped>
.set{
    display: flex;
    align-items: center; /* 垂直居中 */
    .addRegion{
        margin-right: 5px;
    }
    .serach{
        margin-left: 50px;
        display: flex;
        .serachinput{
            margin-right: 20px;
            width: 300px;
        }
    }
}
.list{
    margin-top: 20px;
}
.addform{
    width: 300px;
    .form{
    input{
        width: 300px !important;
    }
}
}
</style>